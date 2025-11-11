const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

function appendMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender === "user" ? "user-message" : "bot-message");
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userMessage = input.value.trim();
    if (!userMessage) return;

    appendMessage(userMessage, "user");
    input.value = "";

    // show a temporary "typing..." message
    const typing = document.createElement("div");
    typing.classList.add("message", "bot-message");
    typing.textContent = "Typing...";
    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        // Send GET request to your backend
        const response = await fetch(`http://localhost:8080/api/chat/chat?message=${encodeURIComponent(userMessage)}`);


        if (!response.ok) {
            throw new Error("Server error: " + response.status);
        }

        const data = await response.json();
        typing.remove();

        // Extract assistant response text
        if (data.Choices && data.Choices.length > 0) {
            const reply = data.Choices[0].message.content;
            appendMessage(reply, "bot");
        } else {
            appendMessage("No response received.", "bot");
        }
    } catch (error) {
        typing.remove();
        appendMessage("⚠️ Error: Could not reach the server.", "bot");
        console.error(error);
    }
});
