const QUIZ_LENGTH = 25;
const XP_PER_LEVEL = 60;
const WRONG_ANSWER_DELAY_MS = 1800;

const QUESTION_BANK = [
  {
    question: "What is the output type in a regression problem?",
    options: ["A continuous numeric value", "A class label only", "A cluster ID", "A policy action"],
    answerIndex: 0,
    topic: "Regression",
  },
  {
    question: "What is the output type in a classification problem?",
    options: ["A class or category", "Only a continuous value", "Only random noise", "A matrix inverse"],
    answerIndex: 0,
    topic: "Classification",
  },
  {
    question: "Which task is best modeled by regression?",
    options: ["Predicting house price", "Spam vs not spam", "Digit recognition", "Sentiment class"],
    answerIndex: 0,
    topic: "Regression vs Classification",
  },
  {
    question: "Which task is best modeled by classification?",
    options: ["Predicting temperature", "Predicting stock price", "Detecting if a tumor is benign or malignant", "Estimating distance"],
    answerIndex: 2,
    topic: "Regression vs Classification",
  },
  {
    question: "Binary classification means:",
    options: ["Exactly two target classes", "Two features only", "Two models combined", "Two loss terms always"],
    answerIndex: 0,
    topic: "Binary Classification",
  },
  {
    question: "An example of binary classification is:",
    options: ["Age prediction", "Email spam detection", "Rainfall amount prediction", "Fuel consumption prediction"],
    answerIndex: 1,
    topic: "Binary Classification",
  },
  {
    question: "Multi-class classification means:",
    options: ["More than two mutually exclusive classes", "Two labels can be true together", "Only continuous output", "Only one feature"],
    answerIndex: 0,
    topic: "Multi-class Classification",
  },
  {
    question: "Digit recognition (0-9) is usually:",
    options: ["Binary classification", "Regression", "Multi-class classification", "Multi-label classification"],
    answerIndex: 2,
    topic: "Multi-class Classification",
  },
  {
    question: "Multi-label classification allows:",
    options: ["Exactly one class per sample", "No class per sample", "Multiple labels per sample", "Only numeric targets"],
    answerIndex: 2,
    topic: "Multi-label Classification",
  },
  {
    question: "A photo tagged with both 'beach' and 'sunset' is:",
    options: ["Regression", "Binary classification", "Multi-class classification", "Multi-label classification"],
    answerIndex: 3,
    topic: "Multi-label Classification",
  },
  {
    question: "Why is linear regression not preferred for classification probabilities?",
    options: ["It cannot learn weights", "Its predictions can go below 0 or above 1", "It has no bias term", "It cannot use gradient descent"],
    answerIndex: 1,
    topic: "Linear Regression for Classification",
  },
  {
    question: "Another issue with using linear regression for binary classes is:",
    options: ["No loss function exists", "Sensitivity to outliers can distort decision threshold", "It cannot be trained", "It always gives integer outputs"],
    answerIndex: 1,
    topic: "Linear Regression for Classification",
  },
  {
    question: "The sigmoid function maps real numbers to:",
    options: ["[-1, 1]", "[0, 1]", "[0, infinity)", "(-infinity, infinity)"],
    answerIndex: 1,
    topic: "Sigmoid Function",
  },
  {
    question: "In logistic regression, sigmoid output is interpreted as:",
    options: ["Distance", "Probability of positive class", "Gradient magnitude", "Feature importance only"],
    answerIndex: 1,
    topic: "Sigmoid Function",
  },
  {
    question: "Sigmoid(z) is defined as:",
    options: ["1 / (1 + e^z)", "1 / (1 + e^-z)", "e^z", "z / (1 + z)"],
    answerIndex: 1,
    topic: "Sigmoid Function",
  },
  {
    question: "If z is very large positive, sigmoid(z) is close to:",
    options: ["0", "0.5", "1", "-1"],
    answerIndex: 2,
    topic: "Sigmoid Function",
  },
  {
    question: "If z is very large negative, sigmoid(z) is close to:",
    options: ["1", "0", "0.5", "2"],
    answerIndex: 1,
    topic: "Sigmoid Function",
  },
  {
    question: "In logistic regression, z is commonly:",
    options: ["w^T x + b", "x / w", "w - x", "x^T x"],
    answerIndex: 0,
    topic: "Logistic Regression",
  },
  {
    question: "Log-likelihood for independent samples is usually the:",
    options: ["Product of log terms", "Sum of log probabilities", "Difference of priors", "Square of residuals"],
    answerIndex: 1,
    topic: "Log-likelihood",
  },
  {
    question: "Why do we often maximize log-likelihood instead of likelihood directly?",
    options: ["Logs make values larger always", "Logs convert products to sums and improve numerical stability", "Logs remove all parameters", "Logs guarantee zero error"],
    answerIndex: 1,
    topic: "Log-likelihood",
  },
  {
    question: "For binary logistic regression, likelihood uses:",
    options: ["p^y (1-p)^(1-y)", "(y-p)^2", "|y-p|", "max(0, 1-yp)"],
    answerIndex: 0,
    topic: "Log-likelihood",
  },
  {
    question: "Binary cross-entropy for one sample is:",
    options: ["-(y log p + (1-y) log(1-p))", "(y-p)^2", "|y-p|", "-log(y+p)"],
    answerIndex: 0,
    topic: "Cross-Entropy",
  },
  {
    question: "Cross-entropy in logistic regression is directly related to:",
    options: ["Negative log-likelihood", "R-squared", "Variance only", "Euclidean distance only"],
    answerIndex: 0,
    topic: "Cross-Entropy",
  },
  {
    question: "Minimizing cross-entropy is equivalent to:",
    options: ["Maximizing log-likelihood", "Minimizing feature count", "Maximizing bias only", "Removing sigmoid"],
    answerIndex: 0,
    topic: "Cross-Entropy",
  },
  {
    question: "Cross-entropy heavily penalizes:",
    options: ["Correct high-confidence predictions", "Confident wrong predictions", "Balanced predictions", "Linear features"],
    answerIndex: 1,
    topic: "Cross-Entropy",
  },
  {
    question: "Which activation is standard in binary logistic regression output layer?",
    options: ["ReLU", "Sigmoid", "Tanh", "Softplus"],
    answerIndex: 1,
    topic: "Sigmoid Function",
  },
  {
    question: "A common decision rule in binary logistic regression is:",
    options: ["Predict class 1 if p >= 0.5", "Predict class 1 if p <= 0", "Predict class 1 if z < 0", "Always predict class 0"],
    answerIndex: 0,
    topic: "Binary Classification",
  },
  {
    question: "Softmax is typically used for:",
    options: ["Multi-class classification", "Linear regression", "Binary-only labels", "Feature scaling"],
    answerIndex: 0,
    topic: "Multi-class Classification",
  },
  {
    question: "For multi-label classification, output units usually use:",
    options: ["Single softmax", "Independent sigmoids", "Linear output only", "No activation"],
    answerIndex: 1,
    topic: "Multi-label Classification",
  },
  {
    question: "Which pair is correct?",
    options: ["Regression -> class labels, Classification -> continuous values", "Regression -> continuous values, Classification -> labels", "Both always predict labels", "Both always predict probabilities"],
    answerIndex: 1,
    topic: "Regression vs Classification",
  },
  {
    question: "Binary classification classes are usually encoded as:",
    options: ["0 and 1", "1 and 2 only", "-10 and 10", "Any random string without mapping"],
    answerIndex: 0,
    topic: "Binary Classification",
  },
  {
    question: "In logistic regression, model parameters are typically learned by:",
    options: ["Maximizing likelihood or minimizing cross-entropy", "Normal equation closed form", "Sorting labels", "Removing outliers only"],
    answerIndex: 0,
    topic: "Logistic Regression",
  },
  {
    question: "Which is NOT a classification type?",
    options: ["Binary", "Multi-class", "Multi-label", "Polynomial interpolation"],
    answerIndex: 3,
    topic: "Classification",
  },
  {
    question: "When labels are mutually exclusive among many categories, use:",
    options: ["Multi-label setup", "Multi-class setup", "Regression setup", "Clustering setup"],
    answerIndex: 1,
    topic: "Multi-class Classification",
  },
  {
    question: "When several labels can be true at once, use:",
    options: ["Binary only", "Multi-class only", "Multi-label", "Regression"],
    answerIndex: 2,
    topic: "Multi-label Classification",
  },
  {
    question: "The log function in log-likelihood is useful because it is:",
    options: ["Monotonically increasing", "Always negative", "Non-differentiable", "Periodic"],
    answerIndex: 0,
    topic: "Log-likelihood",
  },
  {
    question: "For a correctly classified sample with p near the true label, cross-entropy is:",
    options: ["Small", "Very large", "Undefined", "Always exactly 1"],
    answerIndex: 0,
    topic: "Cross-Entropy",
  },
  {
    question: "Logistic regression models a linear boundary in:",
    options: ["Original feature space after thresholding probability", "Only transformed label space", "Time domain only", "No space"],
    answerIndex: 0,
    topic: "Logistic Regression",
  },
  {
    question: "Why is output bounded in logistic regression?",
    options: ["Because of normalization of features", "Because sigmoid constrains outputs to [0,1]", "Because of one-hot labels", "Because of matrix inversion"],
    answerIndex: 1,
    topic: "Sigmoid Function",
  },
  {
    question: "What does a probability output p = 0.8 in binary classification indicate?",
    options: ["80% confidence for positive class under model", "80 classes exist", "Output is invalid", "Negative class is certain"],
    answerIndex: 0,
    topic: "Binary Classification",
  },
  {
    question: "A key distinction between multi-class and multi-label is:",
    options: ["Multi-class allows multiple simultaneous classes", "Multi-label requires exactly one class", "Multi-class chooses one class, multi-label can choose many", "There is no distinction"],
    answerIndex: 2,
    topic: "Classification Types",
  },
];

const quizForm = document.getElementById("quizForm");
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("scoreText");
const questionTag = document.getElementById("questionTag");
const questionText = document.getElementById("questionText");
const feedbackText = document.getElementById("feedbackText");
const progressFill = document.getElementById("progressFill");
const submitAnswerBtn = document.getElementById("submitAnswerBtn");
const skipQuestionBtn = document.getElementById("skipQuestionBtn");

const levelText = document.getElementById("levelText");
const xpText = document.getElementById("xpText");
const streakText = document.getElementById("streakText");
const bestStreakText = document.getElementById("bestStreakText");
const skippedText = document.getElementById("skippedText");
const badgesWrap = document.getElementById("badgesWrap");

const finalResult = document.getElementById("finalResult");
const finalScoreText = document.getElementById("finalScoreText");
const finalSummaryText = document.getElementById("finalSummaryText");
const submissionReview = document.getElementById("submissionReview");
const restartQuizBtn = document.getElementById("restartQuizBtn");

let selectedQuestions = [];
let reserveQuestions = [];
let currentIndex = 0;
let score = 0;
let answered = 0;
let skipped = 0;
let streak = 0;
let bestStreak = 0;
let xp = 0;
let badges = new Set();
let responseLog = [];
let isTransitioning = false;

function shuffle(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function updateBadges() {
  if (score >= 1) {
    badges.add("First Correct");
  }
  if (bestStreak >= 3) {
    badges.add("Streak Starter (3)");
  }
  if (bestStreak >= 5) {
    badges.add("Combo Master (5)");
  }
  if (answered >= 13) {
    badges.add("Halfway Hero");
  }
  if (score >= 20) {
    badges.add("Module Master (20+)");
  }
  if (skipped >= 3) {
    badges.add("Scope Scout (3 skips)");
  }
}

function renderBadges() {
  updateBadges();

  if (badges.size === 0) {
    badgesWrap.innerHTML = '<p class="status-text">No badges yet. Keep going.</p>';
    return;
  }

  badgesWrap.innerHTML = [...badges]
    .map((badge) => `<span class="badge-pill">${badge}</span>`)
    .join("");
}

function getLevelFromXp(value) {
  return Math.floor(value / XP_PER_LEVEL) + 1;
}

function renderGamification() {
  const level = getLevelFromXp(xp);
  levelText.textContent = `Level ${level}`;
  xpText.textContent = String(xp);
  streakText.textContent = String(streak);
  bestStreakText.textContent = String(bestStreak);
  skippedText.textContent = String(skipped);
  renderBadges();
}

function renderQuestion() {
  if (currentIndex >= QUIZ_LENGTH) {
    finishQuiz();
    return;
  }

  const current = selectedQuestions[currentIndex];
  questionTag.textContent = `Q${currentIndex + 1}`;
  questionText.textContent = current.question;
  progressText.textContent = `Question ${currentIndex + 1} of ${QUIZ_LENGTH}`;
  scoreText.textContent = `Score: ${score}`;
  progressFill.style.width = `${Math.round((currentIndex / QUIZ_LENGTH) * 100)}%`;

  quizForm.innerHTML = current.options
    .map(
      (option, index) => `
        <label class="quiz-option">
          <input type="radio" name="answer" value="${index}" />
          <span>${option}</span>
        </label>
      `
    )
    .join("");
}

function gainXp(base) {
  xp += base;
}

function highlightAnswerReview(selectedIndex, answerIndex) {
  const optionLabels = quizForm.querySelectorAll(".quiz-option");
  const optionInputs = quizForm.querySelectorAll('input[name="answer"]');

  optionLabels.forEach((label, index) => {
    label.classList.add("locked");

    if (index === answerIndex) {
      label.classList.add("is-correct");
    }

    if (index === selectedIndex && selectedIndex !== answerIndex) {
      label.classList.add("is-wrong");
    }
  });

  optionInputs.forEach((input) => {
    input.disabled = true;
  });
}

function renderSubmissionReview() {
  if (responseLog.length === 0) {
    submissionReview.innerHTML = '<p class="status-text">No responses were recorded.</p>';
    return;
  }

  submissionReview.innerHTML = responseLog
    .map((entry, index) => {
      const statusClass =
        entry.status === "correct"
          ? "review-correct"
          : entry.status === "incorrect"
          ? "review-incorrect"
          : "review-skipped";

      return `
        <article class="review-item ${statusClass}">
          <p class="review-title">Q${index + 1}. ${entry.question}</p>
          <p class="review-topic">Topic: ${entry.topic}</p>
          <p class="review-line"><strong>Your submission:</strong> ${entry.submission}</p>
          <p class="review-line"><strong>Correct answer:</strong> ${entry.correctAnswer}</p>
          <p class="review-line"><strong>Feedback:</strong> ${entry.feedback}</p>
        </article>
      `;
    })
    .join("");
}

function submitAnswer() {
  if (currentIndex >= QUIZ_LENGTH || isTransitioning) {
    return;
  }

  const selected = quizForm.querySelector('input[name="answer"]:checked');

  if (!selected) {
    feedbackText.textContent = "Choose an answer before submitting.";
    return;
  }

  const current = selectedQuestions[currentIndex];
  const selectedIndex = Number.parseInt(selected.value, 10);
  const isCorrect = selectedIndex === current.answerIndex;

  answered += 1;

  if (isCorrect) {
    score += 1;
    streak += 1;
    bestStreak = Math.max(bestStreak, streak);
    gainXp(10 + Math.min(streak * 2, 10));
    feedbackText.textContent = `Correct! +XP and streak ${streak}. Topic: ${current.topic}`;

    responseLog.push({
      question: current.question,
      topic: current.topic,
      submission: current.options[selectedIndex],
      correctAnswer: current.options[current.answerIndex],
      feedback: "Great job. Your answer is correct.",
      status: "correct",
    });
  } else {
    streak = 0;
    gainXp(2);
    feedbackText.textContent = `Incorrect. Correct answer is highlighted in green. Next question in ${Math.round(
      WRONG_ANSWER_DELAY_MS / 1000
    )}s.`;

    responseLog.push({
      question: current.question,
      topic: current.topic,
      submission: current.options[selectedIndex],
      correctAnswer: current.options[current.answerIndex],
      feedback: "Review this concept and try again.",
      status: "incorrect",
    });

    isTransitioning = true;
    submitAnswerBtn.disabled = true;
    skipQuestionBtn.disabled = true;
    highlightAnswerReview(selectedIndex, current.answerIndex);

    renderGamification();

    setTimeout(() => {
      currentIndex += 1;
      renderQuestion();
      submitAnswerBtn.disabled = false;
      skipQuestionBtn.disabled = false;
      isTransitioning = false;
    }, WRONG_ANSWER_DELAY_MS);

    return;
  }

  currentIndex += 1;
  renderGamification();
  renderQuestion();
}

function skipQuestion() {
  if (currentIndex >= QUIZ_LENGTH || isTransitioning) {
    return;
  }

  skipped += 1;
  streak = 0;
  gainXp(1);

  if (reserveQuestions.length > 0) {
    const replacement = reserveQuestions.shift();
    selectedQuestions[currentIndex] = replacement;
    feedbackText.textContent = "Question skipped as out of scope. Replaced with a new question from the bank.";
  } else {
    const current = selectedQuestions[currentIndex];

    responseLog.push({
      question: current.question,
      topic: current.topic,
      submission: "Skipped (Out of Scope)",
      correctAnswer: current.options[current.answerIndex],
      feedback: "This question was skipped and not evaluated.",
      status: "skipped",
    });

    currentIndex += 1;
    feedbackText.textContent = "Question skipped. No replacement left in the bank.";
  }

  renderGamification();
  renderQuestion();
}

function finishQuiz() {
  progressFill.style.width = "100%";
  quizForm.innerHTML = "";
  questionTag.textContent = "Completed";
  questionText.textContent = "You have completed the Module 2 quiz.";
  progressText.textContent = `Completed: ${QUIZ_LENGTH} questions`;
  scoreText.textContent = `Final Score: ${score}`;

  const accuracy = answered === 0 ? 0 : Math.round((score / answered) * 100);

  finalScoreText.textContent = `Marks: ${score} / ${QUIZ_LENGTH}`;
  finalSummaryText.textContent = `Answered: ${answered}, Skipped: ${skipped}, Accuracy: ${accuracy}%, XP: ${xp}, Level: ${getLevelFromXp(xp)}`;
  renderSubmissionReview();
  finalResult.hidden = false;

  submitAnswerBtn.disabled = true;
  skipQuestionBtn.disabled = true;

  feedbackText.textContent = "Quiz complete. Review your gamification stats and badges.";
}

function startQuiz() {
  const shuffled = shuffle(QUESTION_BANK);

  selectedQuestions = shuffled.slice(0, QUIZ_LENGTH);
  reserveQuestions = shuffled.slice(QUIZ_LENGTH);
  currentIndex = 0;
  score = 0;
  answered = 0;
  skipped = 0;
  streak = 0;
  bestStreak = 0;
  xp = 0;
  badges = new Set();
  responseLog = [];
  isTransitioning = false;

  finalResult.hidden = true;
  submissionReview.innerHTML = "";
  submitAnswerBtn.disabled = false;
  skipQuestionBtn.disabled = false;
  feedbackText.textContent = "Select an option and submit your answer.";

  renderGamification();
  renderQuestion();
}

submitAnswerBtn.addEventListener("click", submitAnswer);
skipQuestionBtn.addEventListener("click", skipQuestion);
restartQuizBtn.addEventListener("click", startQuiz);

startQuiz();
