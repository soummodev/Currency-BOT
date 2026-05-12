import { createBot } from "./bot.js"
import { createView } from "./view.js"
import { store } from "./store.js"

const bot = createBot()
const view = createView()

const messageQueue = []
let isProcessing = false

function enqueue(task) {
  messageQueue.push(task)
  processQueue();
}

async function processQueue() {
  if (isProcessing || messageQueue.length === 0) return
  isProcessing = true
  const task = messageQueue.shift()
  await task()
  isProcessing = false
  processQueue();
}

const handleSend = (() => {
  return async function () {
    const userText = view.getValue()
    if (!userText) return
    view.clearInput()
    store.addMessage("user", userText)
    view.appendMessage("user", userText);
    view.setStatus("Bot is thinking.....");
    enqueue(async () => {
      const reply = await bot.respond(userText);
      store.addMessage("bot", reply)
      view.appendMessage("bot", reply)
      view.clearStatus();
    });
  };
})();

document.getElementById("input").addEventListener("click", (e) => {
  if (e.target.id === "button") handleSend();
});

document.getElementById("clearbtn").addEventListener("click", () => {
  store.clearHistory();
  document.getElementById("chatbox").innerHTML = ""
  view.appendMessage("bot", "🗑️ History cleared.")
});

document.getElementById("historybtn").addEventListener("click", () => {
  const panel = document.getElementById("historypanel")
  const historyList = document.getElementById("historylist")
  const isHidden = panel.classList.contains("hidden");

  if (isHidden) {
    historyList.innerHTML = "";
    const { history } = store.getState();
    if (history.length === 0) {
      historyList.innerHTML =
        "<p style='color:#555;font-size:12px'>No history yet.</p>";
    } else {
      history.forEach(({ role, text }) => {
        const div = document.createElement("div");
        div.className = `h-msg ${role === "user" ? "h-user" : "h-bot"}`;
        div.innerHTML = text
          .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
          .replace(/\n/g, "<br>");
        historyList.appendChild(div);
      });
    }
    panel.classList.remove("hidden");
  } else {
    panel.classList.add("hidden");
  }
});

(function loadHistory() {
  const { history } = store.getState();
  history.forEach(({ role, text }) => view.appendMessage(role, text));
})();

if (!store.getState().history.length) {
  view.appendMessage(
    "bot",
    "👋 Hello! I'm **Currency Bot**.\nTry:\n• *What is the currency of Japan?*\n• *Convert 1000 BDT to USD*",
  );
}
