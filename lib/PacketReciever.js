/* 
* From https://github.com/royale-proxy/node-cr-proxy/blob/master/lib/packetreceiver.js
* No sense in reinventing the wheel, this already works perfectly
*/

module.exports = class PacketReceiver {
    constructor() {
        this._buffer = null;
        this._packet = null;
    }

    packetize(data, callback) {
        var messageId, offset, payloadLength, ref, ref1, results;

        if (this._buffer) {
            this._buffer = Buffer.concat([this._buffer, data]);
        } else {
            this._buffer = data;
        }

        while (this._buffer && this._buffer.length) {
            if (this._packet && this._packet.length) {
                payloadLength = this._packet.readUIntBE(2, 3);

                if (this._buffer.length >= payloadLength) {
                    if (this._packet) {
                        this._packet = Buffer.concat([this._packet, this._buffer.slice(0, payloadLength)]);
                    } else {
                        this._packet = this._buffer.slice(0, payloadLength);
                    }

                    callback(this._packet);
                    this._packet = null;

                    this._buffer = this._buffer.slice(payloadLength);
                } else {
                    break;
                }
            } else if (this._buffer.length >= 7) {
                this._packet = this._buffer.slice(0, 7);
                this._buffer = this._buffer.slice(7);
            } else {
                break;
            }
        }
    }
}