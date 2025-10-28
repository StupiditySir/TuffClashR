// main.js

// Simulated console override (browser equivalent of better-console)
const logDiv = document.getElementById("log");
function log(...args) {
  const msg = args.map(a => (typeof a === "object" ? JSON.stringify(a, null, 2) : a)).join(" ");
  const p = document.createElement("div");
  p.textContent = msg;
  logDiv.appendChild(p);
  logDiv.scrollTop = logDiv.scrollHeight;
  console.log(...args);
}

log("TuffClashR Web Port loaded.");

document.getElementById("startBtn").addEventListener("click", () => {
  log("Starting server simulation...");
  startServer();
});

function startServer() {
  // Simulated Server from Node (placeholder)
  const Server = {
    start() {
      log("[Server] Server started (simulated)");
      log("[Server] Waiting for player connection...");
      setTimeout(() => {
        log("[Server] Player connected!");
        simulateGameLoop();
      }, 1000);
    }
  };
  Server.start();
}

function simulateGameLoop() {
  let tick = 0;
  const interval = setInterval(() => {
    tick++;
    log(`[Server] Game tick ${tick}`);
    if (tick >= 10) {
      clearInterval(interval);
      log("[Server] Simulation complete!");
    }
  }, 500);
}
