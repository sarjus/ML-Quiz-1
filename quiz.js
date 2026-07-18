const QUIZ_LENGTH = 25;
const XP_PER_LEVEL = 60;

const QUESTION_BANK = [
  {
    question: "What is the main goal of machine learning?",
    options: [
      "To learn patterns from data and make predictions/decisions",
      "To replace all mathematical models",
      "To avoid using any data",
      "To write only hard-coded rules",
    ],
    answerIndex: 0,
    topic: "Introduction",
  },
  {
    question: "Traditional programming typically combines rules and data to produce:",
    options: ["Features", "Predictions", "A trained model", "Loss functions"],
    answerIndex: 1,
    topic: "Introduction",
  },
  {
    question: "In machine learning, data and outputs are used to learn:",
    options: ["A model", "Compiler settings", "Network hardware", "Only labels"],
    answerIndex: 0,
    topic: "Introduction",
  },
  {
    question: "Which paradigm uses labeled examples?",
    options: ["Unsupervised learning", "Supervised learning", "Reinforcement learning", "Self-learning"],
    answerIndex: 1,
    topic: "Paradigms",
  },
  {
    question: "Semi-supervised learning uses:",
    options: [
      "Only unlabeled data",
      "Only labeled data",
      "A small labeled set with a larger unlabeled set",
      "No data",
    ],
    answerIndex: 2,
    topic: "Paradigms",
  },
  {
    question: "Unsupervised learning is commonly used for:",
    options: ["Classification with labels", "Clustering and structure discovery", "Reward maximization", "Policy updates"],
    answerIndex: 1,
    topic: "Paradigms",
  },
  {
    question: "Reinforcement learning is based on:",
    options: ["Direct labels", "Reward signals from environment interaction", "Only matrix inversion", "Data normalization only"],
    answerIndex: 1,
    topic: "Paradigms",
  },
  {
    question: "In reinforcement learning, an agent learns a:",
    options: ["Prior distribution", "Policy mapping states to actions", "Kernel function", "Feature scaler"],
    answerIndex: 1,
    topic: "Paradigms",
  },
  {
    question: "Maximum Likelihood Estimation chooses parameter values that:",
    options: [
      "Minimize posterior probability",
      "Maximize probability of observed data",
      "Ignore observed data",
      "Always equal zero",
    ],
    answerIndex: 1,
    topic: "Parameter Estimation",
  },
  {
    question: "MAP estimation differs from MLE by incorporating:",
    options: ["A prior distribution over parameters", "Extra labels", "A larger learning rate", "Only test data"],
    answerIndex: 0,
    topic: "Parameter Estimation",
  },
  {
    question: "Bayes theorem combines likelihood with prior to form:",
    options: ["Posterior", "Gradient", "Feature map", "Bias term"],
    answerIndex: 0,
    topic: "Bayesian",
  },
  {
    question: "Which statement is true about MLE and MAP?",
    options: [
      "MLE uses prior, MAP does not",
      "MAP uses prior, MLE does not",
      "Both ignore data",
      "Both require reinforcement rewards",
    ],
    answerIndex: 1,
    topic: "Parameter Estimation",
  },
  {
    question: "If prior is uniform, MAP estimate often becomes similar to:",
    options: ["PCA", "MLE", "K-means", "RL policy"],
    answerIndex: 1,
    topic: "Parameter Estimation",
  },
  {
    question: "Posterior is proportional to:",
    options: ["Likelihood × Prior", "Prior / Likelihood", "Loss + Noise", "Weights + Bias"],
    answerIndex: 0,
    topic: "Bayesian",
  },
  {
    question: "Feature representation refers to:",
    options: [
      "How input data is encoded as usable variables",
      "Only plotting outputs",
      "Reducing labels to zero",
      "Selecting optimizer only",
    ],
    answerIndex: 0,
    topic: "Supervised Learning",
  },
  {
    question: "A supervised learning problem needs:",
    options: ["Unlabeled data only", "Input-output training pairs", "Reward-only episodes", "No objective"],
    answerIndex: 1,
    topic: "Supervised Learning",
  },
  {
    question: "Loss functions are used to:",
    options: ["Measure prediction error", "Generate labels automatically", "Shuffle data", "Draw decision boundaries"],
    answerIndex: 0,
    topic: "Optimization",
  },
  {
    question: "Optimization in supervised learning aims to:",
    options: ["Maximize random noise", "Minimize chosen loss", "Remove all features", "Skip training"],
    answerIndex: 1,
    topic: "Optimization",
  },
  {
    question: "Which is a common loss for regression?",
    options: ["Cross entropy", "Mean Squared Error", "Hinge loss", "Reward loss"],
    answerIndex: 1,
    topic: "Optimization",
  },
  {
    question: "Linear regression with one variable models relationship using:",
    options: ["A line", "A tree", "A policy", "A cluster center"],
    answerIndex: 0,
    topic: "Regression",
  },
  {
    question: "In y = w0 + w1x, w0 is:",
    options: ["Slope", "Bias/intercept", "Loss value", "Learning rate"],
    answerIndex: 1,
    topic: "Regression",
  },
  {
    question: "In y = w0 + w1x, w1 is:",
    options: ["Feature vector", "Slope/weight", "Intercept", "Error term"],
    answerIndex: 1,
    topic: "Regression",
  },
  {
    question: "Gradient descent updates parameters by moving:",
    options: ["Along gradient", "Against gradient", "Randomly", "Toward larger loss"],
    answerIndex: 1,
    topic: "Gradient Descent",
  },
  {
    question: "Learning rate in gradient descent controls:",
    options: ["Step size", "Number of labels", "Feature count", "Posterior shape"],
    answerIndex: 0,
    topic: "Gradient Descent",
  },
  {
    question: "Too large a learning rate may cause:",
    options: ["Stable convergence always", "Divergence or oscillation", "Better prior", "Guaranteed optimum"],
    answerIndex: 1,
    topic: "Gradient Descent",
  },
  {
    question: "Multiple linear regression uses:",
    options: ["One feature only", "Multiple input features", "Only unlabeled data", "No parameters"],
    answerIndex: 1,
    topic: "Regression",
  },
  {
    question: "Matrix form of linear regression prediction is:",
    options: ["y = Xw", "w = Xy", "X = yw", "y = wX^-1"],
    answerIndex: 0,
    topic: "Matrix Method",
  },
  {
    question: "Normal equation for least squares (when invertible) is:",
    options: ["w = (X^T X)^-1 X^T y", "w = X^T y", "w = Xy", "w = y^-1X"],
    answerIndex: 0,
    topic: "Matrix Method",
  },
  {
    question: "An advantage of matrix method over iterative gradient descent can be:",
    options: ["No data needed", "Direct closed-form solution", "Works only with one sample", "Requires rewards"],
    answerIndex: 1,
    topic: "Matrix Method",
  },
  {
    question: "One limitation of the normal equation is:",
    options: ["Cannot handle labels", "Computationally expensive for very high-dimensional data", "Needs reinforcement environment", "Uses no matrices"],
    answerIndex: 1,
    topic: "Matrix Method",
  },
  {
    question: "In supervised learning, the target variable is often called:",
    options: ["Label", "Cluster", "Policy", "Prior"],
    answerIndex: 0,
    topic: "Supervised Learning",
  },
  {
    question: "For diabetes yes/no prediction, the task type is usually:",
    options: ["Regression", "Classification", "Clustering", "Dimensionality reduction"],
    answerIndex: 1,
    topic: "Problem Formulation",
  },
  {
    question: "Why is pure linear regression not ideal for binary class probability outputs?",
    options: [
      "It cannot use features",
      "Predictions may fall outside [0,1]",
      "It always overfits",
      "It requires labels from RL",
    ],
    answerIndex: 1,
    topic: "Problem Formulation",
  },
  {
    question: "Feature scaling often helps gradient descent by:",
    options: ["Making optimization more stable and faster", "Increasing overfitting always", "Removing all parameters", "Replacing loss"],
    answerIndex: 0,
    topic: "Optimization",
  },
  {
    question: "A convex loss function generally provides:",
    options: ["Many unrelated minima", "A single global minimum landscape", "No gradients", "Infinite labels"],
    answerIndex: 1,
    topic: "Optimization",
  },
  {
    question: "Batch gradient descent computes gradient using:",
    options: ["One random sample", "Entire training set", "Only validation set", "Only priors"],
    answerIndex: 1,
    topic: "Gradient Descent",
  },
  {
    question: "Stochastic gradient descent updates using:",
    options: ["Entire dataset each step", "One sample (or very small subset) each step", "No data", "Only test data"],
    answerIndex: 1,
    topic: "Gradient Descent",
  },
  {
    question: "Mini-batch gradient descent balances:",
    options: ["Prior and posterior", "Speed and gradient noise", "Labels and features", "Rules and compilers"],
    answerIndex: 1,
    topic: "Gradient Descent",
  },
  {
    question: "Overfitting means a model:",
    options: ["Performs well on training but poorly on unseen data", "Cannot fit training data", "Has no parameters", "Is always linear"],
    answerIndex: 0,
    topic: "Supervised Learning",
  },
  {
    question: "Underfitting indicates:",
    options: ["Model too simple to capture pattern", "Model memorized training data", "Model has perfect generalization", "Model solved RL task"],
    answerIndex: 0,
    topic: "Supervised Learning",
  },
  {
    question: "Bias-variance trade-off concerns balance between:",
    options: ["Training speed and memory", "Model simplicity and flexibility", "Labels and rewards", "Priors and clusters"],
    answerIndex: 1,
    topic: "Supervised Learning",
  },
  {
    question: "In Bayesian view, parameters are treated as:",
    options: ["Fixed constants only", "Random variables with distributions", "Always zero", "Always integers"],
    answerIndex: 1,
    topic: "Bayesian",
  },
  {
    question: "Likelihood in parameter estimation is interpreted as:",
    options: ["P(data | parameters)", "P(parameters | data)", "P(data)", "P(parameters)"],
    answerIndex: 0,
    topic: "Parameter Estimation",
  },
  {
    question: "Posterior in Bayesian estimation is:",
    options: ["P(parameters | data)", "P(data | parameters)", "P(data)", "P(parameters)"],
    answerIndex: 0,
    topic: "Bayesian",
  },
  {
    question: "A prior expressing strong belief affects MAP by:",
    options: ["Ignoring data entirely", "Pulling parameter estimate toward prior preference", "Making MAP equal to MLE always", "Removing parameters"],
    answerIndex: 1,
    topic: "Parameter Estimation",
  },
  {
    question: "Which method directly optimizes objective iteratively?",
    options: ["Normal equation", "Gradient descent", "K-means", "Bayes rule"],
    answerIndex: 1,
    topic: "Optimization",
  },
  {
    question: "For linear regression, objective is often to minimize:",
    options: ["Sum of squared errors", "Classification accuracy directly", "Reward delay", "Cluster variance only"],
    answerIndex: 0,
    topic: "Regression",
  },
  {
    question: "Adding many irrelevant features may:",
    options: ["Always improve generalization", "Increase noise and risk of overfitting", "Guarantee lower loss on test", "Eliminate need for labels"],
    answerIndex: 1,
    topic: "Feature Representation",
  },
  {
    question: "In matrix notation, each row of X usually represents:",
    options: ["A feature type", "One training example", "The bias only", "The posterior"],
    answerIndex: 1,
    topic: "Matrix Method",
  },
  {
    question: "In matrix notation, each column of X usually represents:",
    options: ["One training sample", "One feature", "One reward", "One policy"],
    answerIndex: 1,
    topic: "Matrix Method",
  },
  {
    question: "Which statement best describes supervised problem formulation?",
    options: [
      "Define inputs, outputs, hypothesis class, and objective",
      "Only choose colors for plots",
      "Only remove outliers",
      "Only choose CPU",
    ],
    answerIndex: 0,
    topic: "Problem Formulation",
  },
  {
    question: "If data labels are expensive, a practical approach can be:",
    options: ["Semi-supervised learning", "Pure reinforcement learning only", "No training", "Fixed rules only"],
    answerIndex: 0,
    topic: "Paradigms",
  },
  {
    question: "Which paradigm is most associated with delayed rewards?",
    options: ["Supervised", "Unsupervised", "Reinforcement", "Semi-supervised"],
    answerIndex: 2,
    topic: "Paradigms",
  },
  {
    question: "A model that predicts continuous values is solving:",
    options: ["Classification", "Regression", "Clustering", "Policy search"],
    answerIndex: 1,
    topic: "Regression",
  },
  {
    question: "Which algorithmic idea is central to fitting linear regression by iterations?",
    options: ["Dynamic programming", "Gradient descent", "Q-learning", "Apriori"],
    answerIndex: 1,
    topic: "Gradient Descent",
  },
  {
    question: "The expression y = Xw + b (or augmented Xw) is a:",
    options: ["Linear model", "Nonparametric tree", "Kernel trick", "Markov process"],
    answerIndex: 0,
    topic: "Regression",
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
  if (currentIndex >= QUIZ_LENGTH) {
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
    feedbackText.textContent = `Incorrect. Correct answer: ${current.options[current.answerIndex]}`;

    responseLog.push({
      question: current.question,
      topic: current.topic,
      submission: current.options[selectedIndex],
      correctAnswer: current.options[current.answerIndex],
      feedback: "Review this concept and try again.",
      status: "incorrect",
    });
  }

  currentIndex += 1;
  renderGamification();
  renderQuestion();
}

function skipQuestion() {
  if (currentIndex >= QUIZ_LENGTH) {
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
  questionText.textContent = "You have completed the Module 1 quiz.";
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
