const QUESTIONS = [
  {
    id: 1,
    category: "AI Fundamentals",
    difficulty: "Basic",
    question: "What best describes Artificial Intelligence?",
    options: [
      "A fixed set of rules that automates tasks without learning",
      "Systems that simulate human intelligence",
      "A high-speed database",
      "A programming language"
    ],
    answer: 1,
    explanation: "AI simulates human intelligence such as learning and reasoning."
  },
  {
    id: 2,
    category: "LLMs",
    difficulty: "Basic",
    question: "What does LLM stand for?",
    options: [
      "Large Language Model",
      "Logical Learning Machine",
      "Long Linear Memory",
      "Language Logic Method"
    ],
    answer: 0,
    explanation: "LLM stands for Large Language Model."
  }
];

const TOPICS = [
  "AI Governance",
  "Responsible AI",
  "AI Security",
  "RAG",
  "Embeddings",
  "Vector Databases",
  "DPDPA Compliance",
  "Prompt Engineering",
  "Enterprise AI Adoption"
];

while (QUESTIONS.length < 100) {
  const topic = TOPICS[QUESTIONS.length % TOPICS.length];

  QUESTIONS.push({
    id: QUESTIONS.length + 1,
    category: topic,
    difficulty: "Intermediate",
    question: `Which statement best describes ${topic}?`,
    options: [
      `${topic} improves AI operations and governance`,
      `${topic} is only used in gaming`,
      `${topic} removes security needs`,
      `${topic} replaces cloud computing`
    ],
    answer: 0,
    explanation: `${topic} helps enterprises adopt AI securely and effectively.`
  });
}

QUESTIONS.sort(() => Math.random() - 0.5);

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let timeLeft = 45 * 60;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const feedbackElement = document.getElementById("feedback");
const progressElement = document.getElementById("progress");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const nextButton = document.getElementById("next-btn");

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function startTimer() {
  const timer = setInterval(() => {
    timerElement.textContent = formatTime(timeLeft);

    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timer);
      showResults();
    }
  }, 1000);
}

function loadQuestion() {
  selectedAnswer = null;

  const q = QUESTIONS[currentQuestion];

  questionElement.textContent = q.question;

  progressElement.textContent =
    `${currentQuestion + 1}/${QUESTIONS.length}`;

  scoreElement.textContent = score;

  optionsElement.innerHTML = "";
  feedbackElement.innerHTML = "";

  q.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.className = "option-btn";

    button.innerHTML =
      `<strong>${String.fromCharCode(65 + index)}.</strong> ${option}`;

    button.onclick = () => selectAnswer(index, button);

    optionsElement.appendChild(button);
  });
}

function selectAnswer(index, button) {
  if (selectedAnswer !== null) return;

  selectedAnswer = index;

  const q = QUESTIONS[currentQuestion];
  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach(btn => btn.disabled = true);

  if (index === q.answer) {
    button.classList.add("correct");
    score++;

    feedbackElement.innerHTML = `
      <div class="feedback-box correct-feedback">
        <strong>Correct!</strong><br>
        ${q.explanation}
      </div>
    `;
  } else {
    button.classList.add("wrong");
    buttons[q.answer].classList.add("correct");

    feedbackElement.innerHTML = `
      <div class="feedback-box wrong-feedback">
        <strong>Wrong!</strong><br>
        Correct Answer: ${q.options[q.answer]}<br><br>
        ${q.explanation}
      </div>
    `;
  }

  scoreElement.textContent = score;
}

nextButton.addEventListener("click", () => {
  if (selectedAnswer === null) {
    alert("Please answer the question first.");
    return;
  }

  currentQuestion++;

  if (currentQuestion < QUESTIONS.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  document.getElementById("quiz-container").classList.add("hidden");
  document.getElementById("result-container").classList.remove("hidden");

  const percentage =
    ((score / QUESTIONS.length) * 100).toFixed(2);

  let level = "Needs Improvement";

  if (percentage >= 85) {
    level = "Expert";
  } else if (percentage >= 70) {
    level = "Proficient";
  } else if (percentage >= 50) {
    level = "Intermediate";
  }

  document.getElementById("final-score").textContent =
    `${score}/${QUESTIONS.length}`;

  document.getElementById("percentage").textContent =
    percentage;

  document.getElementById("performance").textContent =
    level;
}

function restartQuiz() {
  location.reload();
}

loadQuestion();
startTimer();
