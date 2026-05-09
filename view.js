export function createView() {
    const chatBox = document.getElementById("chatbox")
      const input = document.getElementById("userinput")
    const status = document.getElementById("status")
    function appendMessage(role, text) {
         const div = document.createElement("div");
        div.className = `msg ${role}`;
           div.innerHTML = text
             .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
             .replace(/\n/g, "<br>");
           chatBox.appendChild(div);
           chatBox.scrollTop = chatBox.scrollHeight;
    }


  function setStatus(msg) {
    status.textContent = msg
  }
  function clearStatus() {
    status.textContent = ""
  }
  function getValue() {
    return input.value.trim()
  }
  function clearInput() {
    input.value = ""
  }

  return { appendMessage, setStatus, clearStatus, getValue, clearInput };



}
