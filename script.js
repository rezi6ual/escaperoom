const questions = [
  {
    question: "When does the infinite series ∑(7x)ⁿ converge?",
    answers: [
      { text: "x = 1/7", correct: false },
      { text: "x = 0", correct: false },
      { text: "x = -1/7", correct: false },
      { text: "None", correct: true },
    ]
  },
  {
    question: "Find ∫ sin³(x)cos²(x)dx",
    answers: [
      { text: "-1/3 cos³(x) + 1/5 cos⁵(x) + C", correct: true },
      { text: "1/4 sin⁴(x)cos²(x)+ C", correct: false },
      { text: "1/7 cos⁷(x) + C", correct: false },
      { text: "1/3 sin³(x)cos³(x) + C", correct: false },
    ]
  },
  {
    question: "Evaluate the following improper integral from 1 to ∞: ∫ 3/x⁴ dx",
    answers: [
      { text: "1", correct: true },
      { text: "-3", correct: false },
      { text: "-1", correct: false },
      { text: "Diverges", correct: false },
    ]
  },
  {
    question: "Solve the differential equation: dy/dx = ysin(x)",
    answers: [
      { text: "y = Ceᶜᵒˢ⁽ˣ⁾", correct: false },
      { text: "y = Ce⁻ᶜᵒˢ⁽ˣ⁾", correct: true},
      { text: "y = Ceˢᶦⁿ⁽ˣ⁾", correct: false},
      { text: "y = Ce⁻ˣˢᶦⁿ⁽ˣ⁾", correct: false },
    ]
  },
  {
    question: "Evaluate ∫ tan²(x)dx from 0 to π /4",
    answers: [
      { text: "π /4 - 1", correct: false },
      { text: "1- π /4 ", correct: true },
      { text: "π /8 - ln(√2)", correct: false },
      { text: "π /8 - ln(2)", correct: false },
    ]
  },
  {
    question: "Find the length of the curve y = ln(cos(x)) from x = 0 to x =  π /4 ",
    answers: [
      { text: "ln(1 + √2)", correct: true },
      { text: "π /4", correct: false },
      { text: "1/2 ln(2)", correct: false },
      { text: "π /2", correct: false },
    ]
  },
  {
    question: "Determine the convergence for the infinite series: ∑ ln(n)/n² ",
    answers: [
      { text: "Converges absolutely", correct: true },
      { text: "Converges conditionally", correct: false },
      { text: "Diverges", correct: false },
      { text: "Inconclusive", correct: false },
    ]
  },
  {
    question: "Find the area enclosed by the curve y = sin²(x) and the x-axis from x = 0 to x = π/2",
    answers: [
      { text: "π /2", correct: false},
      { text: "π /4", correct: true },
      { text: "π /3", correct: false },
      { text: "π", correct: false },
    ]
  },
  {
    question: "Evaluate the following integral from 0 to 1: ∫ ln(x+1)/x+1 dx ",
    answers: [
      { text: "1", correct: false},
      { text: "0", correct: false },
      { text: "1/2 ln²(2)", correct: true},
      { text: "ln(2)", correct: false },
    ]
  },
  {
    question: "Evaluate the following integral from 0 to ∞ : ∫ e⁻ˣ ² dx ",
    answers: [
      { text: "√π", correct: false},
      { text: "π ²", correct: false },
      { text: "1/2 √π ", correct: true},
      { text: "5", correct: false },
    ]
  }


];






const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let correctAnswerSelected = false;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  correctAnswerSelected = false;
  showQuestion();
}
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  if (currentQuestionIndex === 1) { // Check if it's the second question
    showPopup(); // Show the popup for the second question
  } else {
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButtons.appendChild(button);
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
    });
  }
}

function showPopup() {
  // Create the popup container
  const popupContainer = document.createElement("div");
  popupContainer.classList.add("popup");

  // Create the input field for the password
  const passwordInput = document.createElement("input");
  passwordInput.setAttribute("type", "password");
  passwordInput.setAttribute("placeholder", "Enter the password");
  popupContainer.appendChild(passwordInput);

  // Create the submit button
  const submitButton = document.createElement("button");
  submitButton.innerHTML = "Submit";
  submitButton.classList.add("btn");
  submitButton.addEventListener("click", () => {
    const password = passwordInput.value.trim();
    if (password === "dp3") { // Change "your_password_here" to the actual password
      window.location.href = "thankyou.html"; // Redirect to thankyou.html if the password is correct
    } else {
      alert("Incorrect password. Please try again."); // Show an alert for incorrect password
    }
  });
  popupContainer.appendChild(submitButton);

  // Append the popup container to the answer buttons container
  answerButtons.appendChild(popupContainer);

  // Display the answers for the second question
  const currentQuestion = questions[currentQuestionIndex];
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}



function resetState() {
  nextButton.style.display = "none";
  correctAnswerSelected = false;
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
    correctAnswerSelected = true;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You have now escaped!`;
  const redirectButton = document.createElement("button");
  redirectButton.innerHTML = "Continue";
  redirectButton.classList.add("btn");
  redirectButton.addEventListener("click", () => {
    // Redirect to the specified HTML file
    window.location.href = "thankyou.html";
  });
  
  // Append the redirect button to the answer buttons container
  answerButtons.appendChild(redirectButton);
}




 

function handleNextButton() {
  if (correctAnswerSelected) {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
}

nextButton.addEventListener("click", () => {
  if (correctAnswerSelected) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
