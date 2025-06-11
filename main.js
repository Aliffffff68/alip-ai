const apiKey = "MASUKKAN_API_KEY_KAMU_DI_SINI";
const chatbox = document.getElementById("chatbox");

async function sendMessage() {
  const input = document.getElementById("input");
  const message = input.value.trim();
  if (!message) return;
  chatbox.innerHTML += `<div><b>Kamu:</b> ${message}</div>`;
  input.value = "";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Kamu adalah asisten AI bernama Alip AI." },
        { role: "user", content: message },
      ],
    }),
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "(Tidak ada balasan)";
  chatbox.innerHTML += `<div><b>Alip AI:</b> ${reply}</div>`;
  chatbox.scrollTop = chatbox.scrollHeight;
}