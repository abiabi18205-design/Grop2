// Dark/Light Mode Toggle
const toggleButton = document.getElementById('toggleMode');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Change icon
    if(document.body.classList.contains('dark-mode')){
        toggleButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        toggleButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
});


// 2nd 

const chatBody = document.getElementById('chat-body');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Simple simulated AI responses
const aiResponses = {
  hello: "Hello! I'm your AI Fitness Coach. How can I help you today?",
  workout: "I suggest 30 mins of cardio and 20 mins of strength training today!",
  diet: "Remember to include proteins, vegetables, and drink plenty of water.",
  motivation: "Keep pushing! Every step you take gets you closer to your goal.",
  default: "Sorry, I didn't understand that. Can you try asking differently?"
};

function addMessage(message, className) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', className);
  msgDiv.textContent = message;
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function botReply(userMsg) {
  const msg = userMsg.toLowerCase();
  if (msg.includes('hello') || msg.includes('hi')) return aiResponses.hello;
  if (msg.includes('workout') || msg.includes('exercise')) return aiResponses.workout;
  if (msg.includes('diet') || msg.includes('food') || msg.includes('nutrition')) return aiResponses.diet;
  if (msg.includes('motivate') || msg.includes('motivation')) return aiResponses.motivation;
  return aiResponses.default;
}

sendBtn.addEventListener('click', () => {
  const msg = userInput.value.trim();
  if (!msg) return;
  addMessage(msg, 'user-msg');
  const reply = botReply(msg);
  setTimeout(() => addMessage(reply, 'bot-msg'), 500);
  userInput.value = '';
});

userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendBtn.click();
});







document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault(); // stop the form from refreshing the page

    // Show the success message
    document.getElementById("successMsg").style.display = "block";

    // Clear the form
    document.getElementById("contactForm").reset();
});








// JS to handle submit
const btn = document.getElementById('subscribe-btn');
  const message = document.getElementById('message');
  const emailInput = document.getElementById('email');

  btn.addEventListener('click', () => {
    if(emailInput.value.trim() !== "") {
      message.style.display = 'block'; // Show message
      emailInput.value = "";           // Clear input
    } else {
      alert("Please enter a valid email.");
    }
  });