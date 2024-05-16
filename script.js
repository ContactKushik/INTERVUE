
const questions = [
  {
    question:
      'What is the output of the following C code?\n\n#include <stdio.h>\nint main() {\n    int a = 5;\n    printf("%d", a);\n    return 0;\n}',
    options: ["5", "0", "Garbage value", "None of the above"],
    answer: "5",
  },
  {
    question: "Which of the following is not a valid C variable name?",
    options: ["int number;", "float rate;", "1stname", "_identifier"],
    answer: "1stname",
  },
  {
    question: "Which of the following is used to declare a constant in C++?",
    options: ["const", "var", "let", "define"],
    answer: "const",
  },
  {
    question: "What is the size of an int data type in C?",
    options: ["2 bytes", "4 bytes", "8 bytes", "Depends on the compiler"],
    answer: "Depends on the compiler",
  },
  {
    question:
      "Which of the following is a correct syntax to declare a pointer?",
    options: ["int* ptr;", "int ptr;", "ptr* int;", "int &ptr;"],
    answer: "int* ptr;",
  },
  {
    question:
      "Which of the following function is used to read a single character from the console in C?",
    options: ["scanf()", "getchar()", "get()", "input()"],
    answer: "getchar()",
  },
  {
    question:
      'What is the output of the following code?\n\n#include <stdio.h>\nint main() {\n    int a = 10;\n    printf("%d", ++a);\n    return 0;\n}',
    options: ["9", "10", "11", "Compilation Error"],
    answer: "11",
  },
  {
    question: "Which of the following is the address operator in C?",
    options: ["*", "&", "%", "#"],
    answer: "&",
  },
  {
    question: "Which of the following is not a logical operator in C?",
    options: ["&&", "||", "!", "&"],
    answer: "&",
  },
  {
    question:
      "Which of the following function is used to allocate memory in C?",
    options: ["malloc()", "alloc()", "memalloc()", "calloc()"],
    answer: "malloc()",
  },
  {
    question:
      "Which of the following loop is guaranteed to execute at least once?",
    options: ["for", "while", "do-while", "None of the above"],
    answer: "do-while",
  },
  {
    question: "What is the default value of a static variable in C?",
    options: ["0", "1", "Garbage value", "Depends on the compiler"],
    answer: "0",
  },
  {
    question: "Which of the following is a user-defined data type in C?",
    options: ["typedef int", "struct", "enum", "Both struct and enum"],
    answer: "Both struct and enum",
  },
  {
    question: "What is the keyword used to define a macro in C?",
    options: ["macro", "define", "include", "typedef"],
    answer: "define",
  },
  {
    question: "Which of the following is used to deallocate memory in C?",
    options: ["delete", "free", "remove", "dealloc"],
    answer: "free",
  },
  
  
  
  
];

let currentQuestionIndex = 0;
let score = 0;
let userName = "";
let attempted = 0;
let skipped = 0;
let startTime, timerInterval;

function startQuiz() {
  userName = document.getElementById("name").value;
  if (userName === "") {
    alert("Please enter your name to start the quiz.");
    return;
  }
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("progress-bar").classList.remove("hidden");
  document.getElementById("indicator").classList.remove("hidden");
  document.getElementById("timer").classList.remove("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");

  document.getElementById("user-name").textContent = `Hello, ${userName}!`;

  startTime = new Date();
  timerInterval = setInterval(updateTimer, 1000);

  generateSidebar();
  updateProgress();
  displayQuestion();
}

function updateTimer() {
  const now = new Date();
  const elapsedTime = Math.floor((now - startTime) / 1000);
  document.getElementById("timer").textContent = `Time: ${elapsedTime}s`;
}

function updateProgress() {
  const progress = (currentQuestionIndex / questions.length) * 100;
  document.getElementById("progress").style.width = `${progress}%`;
  document.getElementById("question-number").textContent = `Question: ${
    currentQuestionIndex + 1
  }/${questions.length}`;
  document.getElementById("attempted").textContent = `Attempted: ${attempted}`;
  document.getElementById("skipped").textContent = `Skipped: ${skipped}`;
}

function displayQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById("question-title").textContent = question.question;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-button");
    button.onclick = () => selectOption(option);
    optionsDiv.appendChild(button);
  });
}

function selectOption(selectedOption) {
  const question = questions[currentQuestionIndex];
  if (selectedOption === question.answer) {
    score++;
  }
  attempted++;
  updateSidebarStatus(currentQuestionIndex, "attended");
  nextQuestion();
}

function skipQuestion() {
  skipped++;
  updateSidebarStatus(currentQuestionIndex, "skipped");
  nextQuestion();
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    updateProgress();
    displayQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timerInterval);
  updateProgress();
  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");

  const now = new Date();
  const elapsedTime = Math.floor((now - startTime) / 1000);

  document.getElementById(
    "result"
  ).textContent = `Well done, ${userName}! You scored ${score} out of ${questions.length}.`;
  document.getElementById(
    "time-taken"
  ).textContent = `Time taken: ${elapsedTime}s`;
}

function generateSidebar() {
  const sidebar = document.getElementById("question-list");
  sidebar.innerHTML = "";
  questions.forEach((_, index) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = index + 1;
    
    button.classList.add("not-attended");
    button.onclick = () => navigateToQuestion(index);
    li.appendChild(button);
    sidebar.appendChild(li);
  });
}

function navigateToQuestion(index) {
  currentQuestionIndex = index;
  updateProgress();
  displayQuestion();
}

function updateSidebarStatus(index, status) {
  const sidebar = document.getElementById("question-list");
  const button = sidebar.children[index].firstChild;
  button.className = status;
}
