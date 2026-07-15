const QUESTION_BANK = [
  {
    topic: "ML vs Traditional Programming",
    question: "In traditional programming, which combination is used to produce output?",
    options: ["Data + Program", "Data + Output", "Model + Labels", "Rules + Rewards"],
    answer: 0,
    explanation: "Traditional programming applies explicit rules (program) to data.",
  },
  {
    topic: "ML vs Traditional Programming",
    question: "In machine learning, which combination is used during training to produce a model?",
    options: ["Data + Program", "Input + Hardware", "Data + Labels", "Model + Program"],
    answer: 2,
    explanation: "Supervised ML learns a model from data and labels.",
  },
  {
    topic: "ML vs Traditional Programming",
    question: "Which best describes machine learning systems?",
    options: [
      "They learn patterns from data",
      "They never require optimization",
      "They always give exact symbolic rules",
      "They do not need evaluation",
    ],
    answer: 0,
    explanation: "ML identifies patterns and relationships from examples.",
  },
  {
    topic: "ML vs Traditional Programming",
    question: "When should ML usually be preferred over hard-coded rules?",
    options: [
      "When patterns are too complex to manually encode",
      "When no data is available",
      "When the task is pure arithmetic",
      "When outputs are fully deterministic and known",
    ],
    answer: 0,
    explanation: "ML is useful when explicit rule-writing is difficult.",
  },
  {
    topic: "ML vs Traditional Programming",
    question: "What is a key drawback of traditional rule-based systems for complex perception tasks?",
    options: [
      "Rules are hard to scale and maintain",
      "They need too much matrix algebra",
      "They cannot run on computers",
      "They always overfit",
    ],
    answer: 0,
    explanation: "Handcrafted rules become brittle and unmanageable in complex domains.",
  },
  {
    topic: "ML Paradigms",
    question: "Supervised learning requires:",
    options: ["Only unlabeled inputs", "Labeled input-output pairs", "Only rewards", "No data"],
    answer: 1,
    explanation: "Supervised learning uses known targets during training.",
  },
  {
    topic: "ML Paradigms",
    question: "Unsupervised learning typically aims to:",
    options: ["Predict known labels", "Discover hidden structure", "Maximize reward", "Compile rules"],
    answer: 1,
    explanation: "It finds structure like clusters or latent factors without labels.",
  },
  {
    topic: "ML Paradigms",
    question: "Semi-supervised learning uses:",
    options: [
      "Only labeled data",
      "Only unlabeled data",
      "A small labeled set with a large unlabeled set",
      "Only reward signals",
    ],
    answer: 2,
    explanation: "It combines scarce labels with abundant unlabeled samples.",
  },
  {
    topic: "ML Paradigms",
    question: "Reinforcement learning agent learns primarily from:",
    options: ["Class labels", "Rewards from environment interaction", "Cluster IDs", "Closed-form equations"],
    answer: 1,
    explanation: "RL uses trial-and-error feedback via rewards.",
  },
  {
    topic: "ML Paradigms",
    question: "Which is a supervised learning task?",
    options: ["K-means clustering", "Linear regression", "Dimensionality reduction", "Association rule mining"],
    answer: 1,
    explanation: "Regression predicts continuous targets from labeled examples.",
  },
  {
    topic: "ML Paradigms",
    question: "Which is an unsupervised method?",
    options: ["Logistic regression", "K-means", "Policy gradient", "Decision tree with labels"],
    answer: 1,
    explanation: "K-means groups data without labels.",
  },
  {
    topic: "ML Paradigms",
    question: "In reinforcement learning, the policy maps:",
    options: ["Labels to losses", "States to actions", "Features to priors", "Errors to gradients"],
    answer: 1,
    explanation: "A policy selects actions for observed states.",
  },
  {
    topic: "ML Paradigms",
    question: "Which paradigm explicitly models sequential decision-making?",
    options: ["Supervised learning", "Unsupervised learning", "Reinforcement learning", "Batch normalization"],
    answer: 2,
    explanation: "RL focuses on action sequences and long-term return.",
  },
  {
    topic: "MLE, MAP, Bayesian",
    question: "Maximum Likelihood Estimation chooses parameters that:",
    options: [
      "Maximize posterior probability",
      "Maximize likelihood of observed data",
      "Minimize number of features",
      "Ignore the dataset",
    ],
    answer: 1,
    explanation: "MLE finds parameters that make observed data most probable.",
  },
  {
    topic: "MLE, MAP, Bayesian",
    question: "MAP estimation differs from MLE by incorporating:",
    options: ["A prior distribution", "Only test data", "Random labels", "A larger step size"],
    answer: 0,
    explanation: "MAP optimizes posterior, which includes prior information.",
  },
  {
    topic: "MLE, MAP, Bayesian",
    question: "Bayes theorem states posterior is proportional to:",
    options: [
      "Likelihood times prior",
      "Prior minus likelihood",
      "Evidence divided by likelihood",
      "Likelihood plus gradient",
    ],
    answer: 0,
    explanation: "Posterior ∝ likelihood × prior.",
  },
  {
    topic: "MLE, MAP, Bayesian",
    question: "If the prior is uniform, MAP estimate usually equals:",
    options: ["Mean squared error", "MLE", "Evidence", "Kernel density"],
    answer: 1,
    explanation: "A constant prior does not change the optimizer.",
  },
  {
    topic: "MLE, MAP, Bayesian",
    question: "In Bayesian formulation, evidence p(D) is used mainly for:",
    options: ["Parameter initialization", "Normalizing the posterior", "Computing gradients only", "Feature scaling"],
    answer: 1,
    explanation: "Evidence ensures posterior is a valid probability distribution.",
  },
  {
    topic: "MLE, MAP, Bayesian",
    question: "A strong prior in MAP typically has what effect?",
    options: [
      "No effect",
      "Pulls estimate toward prior belief",
      "Always increases variance",
      "Forces likelihood to zero",
    ],
    answer: 1,
    explanation: "Prior acts like regularization toward plausible values.",
  },
  {
    topic: "MLE, MAP, Bayesian",
    question: "For independent samples, total log-likelihood is typically:",
    options: ["Product of logs", "Sum of log probabilities", "Difference of priors", "Always zero"],
    answer: 1,
    explanation: "Log transforms product of probabilities into a sum.",
  },
  {
    topic: "MLE, MAP, Bayesian",
    question: "Which objective corresponds to MAP?",
    options: ["max p(D|theta)", "max p(theta|D)", "min p(D)", "max p(theta) only"],
    answer: 1,
    explanation: "MAP maximizes posterior parameter probability given data.",
  },
  {
    topic: "MLE, MAP, Bayesian",
    question: "In frequentist MLE, parameters are usually treated as:",
    options: ["Random variables with priors", "Fixed unknown constants", "Observed labels", "Actions in MDP"],
    answer: 1,
    explanation: "Frequentist view treats parameters as fixed but unknown.",
  },
  {
    topic: "MLE, MAP, Bayesian",
    question: "Negative log-likelihood minimization is equivalent to:",
    options: ["Maximizing likelihood", "Maximizing evidence", "Ignoring data", "Computing confusion matrix"],
    answer: 0,
    explanation: "Minimizing -log L is equivalent to maximizing L.",
  },
  {
    topic: "Feature Representation",
    question: "Feature representation means:",
    options: [
      "Converting raw data into informative numerical inputs",
      "Removing all variability",
      "Replacing labels with random values",
      "Skipping preprocessing always",
    ],
    answer: 0,
    explanation: "Features encode useful information for learning algorithms.",
  },
  {
    topic: "Feature Representation",
    question: "In supervised learning, training data is often denoted as:",
    options: ["(X, y)", "(A, R)", "(S, P)", "(mu, sigma)"],
    answer: 0,
    explanation: "X denotes features and y denotes targets.",
  },
  {
    topic: "Feature Representation",
    question: "A poor feature set typically causes:",
    options: ["Better generalization", "Lower model quality", "Guaranteed convexity", "No impact"],
    answer: 1,
    explanation: "Weak features limit the information available to the model.",
  },
  {
    topic: "Feature Representation",
    question: "Problem formulation in supervised learning requires defining:",
    options: [
      "Input features, target variable, and objective",
      "Only hardware specs",
      "Only color palette",
      "Only random seed",
    ],
    answer: 0,
    explanation: "Clear inputs, outputs, and objective are fundamental.",
  },
  {
    topic: "Feature Representation",
    question: "Feature scaling is often helpful because:",
    options: [
      "It can improve optimization convergence",
      "It eliminates labels",
      "It converts regression to clustering",
      "It guarantees zero training error",
    ],
    answer: 0,
    explanation: "Comparable scales can stabilize and speed up gradient descent.",
  },
  {
    topic: "Loss and Optimization",
    question: "Loss function in supervised learning quantifies:",
    options: ["Model complexity only", "Prediction error", "CPU usage", "Dataset size"],
    answer: 1,
    explanation: "Loss captures discrepancy between predictions and true targets.",
  },
  {
    topic: "Loss and Optimization",
    question: "Optimization aims to:",
    options: ["Increase loss", "Minimize objective function", "Remove all features", "Maximize random noise"],
    answer: 1,
    explanation: "Training adjusts parameters to minimize loss.",
  },
  {
    topic: "Loss and Optimization",
    question: "For linear regression, common loss is:",
    options: ["Hinge loss", "Mean squared error", "Cross-entropy only", "Zero-one loss"],
    answer: 1,
    explanation: "MSE is standard for continuous-output linear regression.",
  },
  {
    topic: "Loss and Optimization",
    question: "Gradient descent update for parameter theta is:",
    options: [
      "theta := theta + alpha * grad",
      "theta := theta - alpha * grad",
      "theta := grad / alpha",
      "theta unchanged always",
    ],
    answer: 1,
    explanation: "We move opposite to gradient direction to reduce loss.",
  },
  {
    topic: "Loss and Optimization",
    question: "Learning rate alpha controls:",
    options: ["Training set size", "Step size in parameter updates", "Number of classes", "Type of prior"],
    answer: 1,
    explanation: "Alpha sets how large each update step is.",
  },
  {
    topic: "Loss and Optimization",
    question: "If alpha is too large in gradient descent, one risk is:",
    options: ["Very slow but stable convergence", "Divergence or oscillation", "Guaranteed optimum", "No updates"],
    answer: 1,
    explanation: "Large steps can overshoot minima and destabilize training.",
  },
  {
    topic: "Loss and Optimization",
    question: "Convex loss functions are useful because they:",
    options: ["Always overfit", "Can provide a unique global minimum", "Need no data", "Require RL"],
    answer: 1,
    explanation: "Convex objectives simplify optimization guarantees.",
  },
  {
    topic: "Loss and Optimization",
    question: "Regularization in objective functions primarily helps with:",
    options: ["Underfitting only", "Overfitting control", "Label creation", "Data compression only"],
    answer: 1,
    explanation: "Penalty terms discourage overly complex models.",
  },
  {
    topic: "Linear Regression (One Variable)",
    question: "Hypothesis for one-variable linear regression is:",
    options: ["h(x)=theta0+theta1x", "h(x)=x^2", "h(x)=theta1/theta0", "h(x)=log x"],
    answer: 0,
    explanation: "Simple linear model is affine in one input variable.",
  },
  {
    topic: "Linear Regression (One Variable)",
    question: "In h(x)=theta0+theta1x, theta0 represents:",
    options: ["Slope", "Intercept", "Variance", "Loss"],
    answer: 1,
    explanation: "theta0 is the predicted value when x = 0.",
  },
  {
    topic: "Linear Regression (One Variable)",
    question: "In h(x)=theta0+theta1x, theta1 represents:",
    options: ["Intercept", "Slope", "Noise term", "Prior"],
    answer: 1,
    explanation: "theta1 is change in prediction per unit change in x.",
  },
  {
    topic: "Linear Regression (One Variable)",
    question: "Cost function J(theta0,theta1) for one-variable linear regression is commonly:",
    options: ["(1/2m) sum(h_theta(x_i)-y_i)^2", "sum |h-y|", "-sum log p", "sum rewards"],
    answer: 0,
    explanation: "The standard squared-error objective uses factor 1/(2m).",
  },
  {
    topic: "Linear Regression (One Variable)",
    question: "Batch gradient descent updates parameters using:",
    options: ["One sample at a time", "All training examples per step", "No gradients", "Only test examples"],
    answer: 1,
    explanation: "Batch method computes gradient over full dataset each iteration.",
  },
  {
    topic: "Linear Regression (Multiple Variables)",
    question: "Multi-variable linear regression hypothesis can be written as:",
    options: ["h_theta(x)=theta^T x", "h(x)=theta/x", "h(x)=x^T x", "h(x)=exp(theta)"],
    answer: 0,
    explanation: "Vectorized form uses dot product between theta and feature vector.",
  },
  {
    topic: "Linear Regression (Multiple Variables)",
    question: "What is x0 usually set to in linear regression with intercept term?",
    options: ["0", "1", "-1", "Mean of features"],
    answer: 1,
    explanation: "x0 = 1 allows theta0 to act as bias/intercept.",
  },
  {
    topic: "Linear Regression (Multiple Variables)",
    question: "Normal equation for linear regression parameters is:",
    options: [
      "theta=(X^T X)^-1 X^T y",
      "theta=X(X^T X)^-1 y",
      "theta=(X X^T)^-1 y",
      "theta=X^T y",
    ],
    answer: 0,
    explanation: "Closed-form least-squares solution uses the normal equation.",
  },
  {
    topic: "Linear Regression (Multiple Variables)",
    question: "A practical advantage of gradient descent over normal equation when n is huge is:",
    options: [
      "No hyperparameters needed",
      "Avoids explicit matrix inversion",
      "Always exact in one step",
      "Requires no data matrix",
    ],
    answer: 1,
    explanation: "Matrix inversion can be expensive for very high feature counts.",
  },
  {
    topic: "Linear Regression (Multiple Variables)",
    question: "A practical advantage of normal equation is:",
    options: [
      "No need to choose learning rate",
      "Always better for massive n",
      "Needs iterative epochs",
      "Requires reward function",
    ],
    answer: 0,
    explanation: "Normal equation directly computes theta without iterative alpha tuning.",
  },
  {
    topic: "Linear Regression (Multiple Variables)",
    question: "Feature normalization is especially useful for:",
    options: ["Normal equation only", "Gradient descent speed and stability", "Removing labels", "Bayesian evidence"],
    answer: 1,
    explanation: "Scaling helps gradient descent converge more efficiently.",
  },
  {
    topic: "Linear Regression (Multiple Variables)",
    question: "If X^T X is singular, one common remedy is:",
    options: ["Delete all rows", "Regularization or remove redundant features", "Increase labels", "Set alpha to zero"],
    answer: 1,
    explanation: "Collinearity can make inversion unstable; regularization helps.",
  },
  {
    topic: "Linear Regression (Multiple Variables)",
    question: "In vectorized gradient descent, theta is updated using:",
    options: [
      "theta := theta - (alpha/m) X^T (X theta - y)",
      "theta := theta + (alpha/m) X theta",
      "theta := X^T y",
      "theta := y - X",
    ],
    answer: 0,
    explanation: "This is the standard vectorized gradient step for MSE loss.",
  },
  {
    topic: "Linear Regression (Multiple Variables)",
    question: "For m training examples and n features (with bias), shape of X is usually:",
    options: ["n x m", "m x (n+1)", "(n+1) x (n+1)", "m x m"],
    answer: 1,
    explanation: "Rows correspond to examples and columns to features including bias.",
  },
];

const QUIZ_LENGTH = 25;

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const timerModeInput = document.getElementById("timerMode");
const timerSecondsInput = document.getElementById("timerSeconds");
const negativeModeInput = document.getElementById("negativeMode");
const negativeValueInput = document.getElementById("negativeValue");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const playAgainBtn = document.getElementById("playAgainBtn");
const nextBtn = document.getElementById("nextBtn");
const downloadReportBtn = document.getElementById("downloadReportBtn");
const printReportBtn = document.getElementById("printReportBtn");

const questionCounter = document.getElementById("questionCounter");
const scoreValue = document.getElementById("scoreValue");
const xpValue = document.getElementById("xpValue");
const streakValue = document.getElementById("streakValue");
const timerValue = document.getElementById("timerValue");
const levelValue = document.getElementById("levelValue");
const progressPercent = document.getElementById("progressPercent");
const progressBar = document.getElementById("progressBar");

const topicTag = document.getElementById("topicTag");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const feedback = document.getElementById("feedback");

const finalMessage = document.getElementById("finalMessage");
const finalScore = document.getElementById("finalScore");
const finalCorrect = document.getElementById("finalCorrect");
const finalWrong = document.getElementById("finalWrong");
const finalAccuracy = document.getElementById("finalAccuracy");
const finalXP = document.getElementById("finalXP");
const bestStreak = document.getElementById("bestStreak");
const badgeValue = document.getElementById("badgeValue");

let state = {
  selectedQuestions: [],
  index: 0,
  score: 0,
  correctCount: 0,
  wrongCount: 0,
  xp: 0,
  streak: 0,
  maxStreak: 0,
  answered: false,
  timerEnabled: true,
  timerSeconds: 25,
  timerRemaining: 25,
  timerId: null,
  questionStartTime: null,
  negativeEnabled: true,
  negativeValue: 0.25,
  answersLog: [],
};

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickRandomQuestions(bank, count) {
  return shuffle(bank).slice(0, count);
}

function getLevelFromXP(xp) {
  return Math.floor(xp / 60) + 1;
}

function calculateBadge(accuracy) {
  if (accuracy >= 90) return "Grandmaster";
  if (accuracy >= 80) return "Expert";
  if (accuracy >= 70) return "Scholar";
  if (accuracy >= 50) return "Apprentice";
  return "Rookie";
}

function resetState() {
  const timerEnabled = timerModeInput.checked;
  const timerSeconds = Math.min(120, Math.max(10, Number(timerSecondsInput.value) || 25));
  const negativeEnabled = negativeModeInput.checked;
  const negativeValue = Math.min(1, Math.max(0.1, Number(negativeValueInput.value) || 0.25));

  timerSecondsInput.value = String(timerSeconds);
  negativeValueInput.value = negativeValue.toFixed(2);

  state = {
    selectedQuestions: pickRandomQuestions(QUESTION_BANK, QUIZ_LENGTH),
    index: 0,
    score: 0,
    correctCount: 0,
    wrongCount: 0,
    xp: 0,
    streak: 0,
    maxStreak: 0,
    answered: false,
    timerEnabled,
    timerSeconds,
    timerRemaining: timerSeconds,
    timerId: null,
    questionStartTime: null,
    negativeEnabled,
    negativeValue,
    answersLog: [],
  };
}

function showScreen(name) {
  startScreen.classList.add("hidden");
  quizScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");

  if (name === "start") startScreen.classList.remove("hidden");
  if (name === "quiz") quizScreen.classList.remove("hidden");
  if (name === "result") resultScreen.classList.remove("hidden");
}

function updateHud() {
  const completed = state.index;
  const percent = Math.round((completed / QUIZ_LENGTH) * 100);
  questionCounter.textContent = `${Math.min(state.index + 1, QUIZ_LENGTH)} / ${QUIZ_LENGTH}`;
  scoreValue.textContent = state.score.toFixed(2);
  xpValue.textContent = state.xp;
  streakValue.textContent = state.streak;
  timerValue.textContent = state.timerEnabled ? `${state.timerRemaining}s` : "Off";
  levelValue.textContent = getLevelFromXP(state.xp);
  progressPercent.textContent = `${percent}%`;
  progressBar.style.width = `${percent}%`;
}

function stopTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}

function startTimer() {
  stopTimer();
  state.questionStartTime = Date.now();

  if (!state.timerEnabled) {
    state.timerRemaining = state.timerSeconds;
    updateHud();
    return;
  }

  state.timerRemaining = state.timerSeconds;
  updateHud();

  state.timerId = setInterval(() => {
    state.timerRemaining -= 1;
    if (state.timerRemaining <= 0) {
      state.timerRemaining = 0;
      updateHud();
      stopTimer();
      handleAnswer(-1, true);
      return;
    }
    updateHud();
  }, 1000);
}

function renderQuestion() {
  const current = state.selectedQuestions[state.index];
  state.answered = false;
  nextBtn.disabled = true;
  feedback.textContent = "";
  feedback.className = "feedback";

  topicTag.textContent = current.topic;
  questionText.textContent = current.question;
  optionsContainer.innerHTML = "";

  current.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-btn";
    btn.textContent = opt;
    btn.addEventListener("click", () => handleAnswer(idx));
    optionsContainer.appendChild(btn);
  });

  startTimer();
  updateHud();
}

function applyOptionStyles(selectedIndex, correctIndex) {
  const buttons = optionsContainer.querySelectorAll("button");
  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === correctIndex) btn.classList.add("correct");
    if (idx === selectedIndex && selectedIndex !== correctIndex) btn.classList.add("wrong");
  });
}

function handleAnswer(selectedIndex, isTimeout = false) {
  if (state.answered) return;

  const current = state.selectedQuestions[state.index];
  const isCorrect = selectedIndex === current.answer;
  state.answered = true;
  stopTimer();

  const elapsedMs = state.questionStartTime ? Date.now() - state.questionStartTime : 0;
  const timeTakenSec = state.timerEnabled
    ? isTimeout
      ? state.timerSeconds
      : Math.min(state.timerSeconds, Math.max(0, Math.round(elapsedMs / 1000)))
    : Math.max(0, Math.round(elapsedMs / 1000));

  applyOptionStyles(selectedIndex, current.answer);

  if (isCorrect) {
    state.score += 1;
    state.correctCount += 1;
    state.streak += 1;
    state.maxStreak = Math.max(state.maxStreak, state.streak);
    const streakBonus = state.streak >= 3 ? 2 : 0;
    state.xp += 10 + streakBonus;
    feedback.textContent = `Correct! ${current.explanation}${streakBonus ? ` Streak bonus +${streakBonus} XP.` : ""}`;
    feedback.classList.add("good");
  } else {
    state.wrongCount += 1;
    if (state.negativeEnabled) {
      state.score -= state.negativeValue;
    }
    state.streak = 0;
    if (isTimeout) {
      feedback.textContent = `Time up! ${current.explanation}`;
    } else {
      feedback.textContent = `Not quite. ${current.explanation}`;
    }
    feedback.classList.add("bad");
  }

  state.answersLog.push({
    questionNo: state.index + 1,
    topic: current.topic,
    question: current.question,
    selected: selectedIndex >= 0 ? current.options[selectedIndex] : "No answer",
    correct: current.options[current.answer],
    result: isCorrect ? "Correct" : isTimeout ? "Timeout" : "Wrong",
    timeTakenSec,
    scoreAfter: state.score.toFixed(2),
  });

  nextBtn.disabled = false;
  updateHud();
}

function nextQuestion() {
  if (!state.answered) return;

  state.index += 1;

  if (state.index >= QUIZ_LENGTH) {
    showResults();
    return;
  }

  renderQuestion();
}

function showResults() {
  const accuracy = Math.round((state.correctCount / QUIZ_LENGTH) * 100);
  const badge = calculateBadge(accuracy);

  finalScore.textContent = `${state.score.toFixed(2)} / ${QUIZ_LENGTH}`;
  finalCorrect.textContent = `${state.correctCount}`;
  finalWrong.textContent = `${state.wrongCount}`;
  finalAccuracy.textContent = `${accuracy}%`;
  finalXP.textContent = `${state.xp}`;
  bestStreak.textContent = `${state.maxStreak}`;
  badgeValue.textContent = badge;

  if (accuracy >= 85) {
    finalMessage.textContent = "Outstanding run. Your fundamentals are strong.";
  } else if (accuracy >= 65) {
    finalMessage.textContent = "Solid performance. Review weak spots and push for Expert badge.";
  } else {
    finalMessage.textContent = "Good effort. Revise concepts and attempt again for a higher streak.";
  }

  showScreen("result");
}

function escapeCsv(value) {
  const text = String(value ?? "");
  if (text.includes(",") || text.includes("\"") || text.includes("\n")) {
    return `"${text.replace(/\"/g, '""')}"`;
  }
  return text;
}

function downloadReportCsv() {
  const now = new Date();
  const headerRows = [
    ["Generated At", now.toISOString()],
    ["Quiz Length", QUIZ_LENGTH],
    ["Timer Mode", state.timerEnabled ? "On" : "Off"],
    ["Timer Seconds", state.timerSeconds],
    ["Negative Marking", state.negativeEnabled ? "On" : "Off"],
    ["Penalty Per Wrong", state.negativeEnabled ? state.negativeValue : 0],
    ["Net Score", state.score.toFixed(2)],
    ["Correct", state.correctCount],
    ["Wrong/Timeout", state.wrongCount],
    ["Accuracy", `${Math.round((state.correctCount / QUIZ_LENGTH) * 100)}%`],
    [],
    ["QNo", "Topic", "Question", "Selected", "Correct", "Result", "TimeSec", "ScoreAfter"],
  ];

  const detailRows = state.answersLog.map((row) => [
    row.questionNo,
    row.topic,
    row.question,
    row.selected,
    row.correct,
    row.result,
    row.timeTakenSec,
    row.scoreAfter,
  ]);

  const lines = [...headerRows, ...detailRows].map((r) => r.map(escapeCsv).join(","));
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  const stamp = now.toISOString().replace(/[:.]/g, "-");
  anchor.href = url;
  anchor.download = `ml-arena-report-${stamp}.csv`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

function updateModeInputs() {
  timerSecondsInput.disabled = !timerModeInput.checked;
  negativeValueInput.disabled = !negativeModeInput.checked;
}

function startQuiz() {
  stopTimer();
  resetState();
  showScreen("quiz");
  renderQuestion();
}

startBtn.addEventListener("click", startQuiz);
playAgainBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", () => {
  stopTimer();
  showScreen("start");
});
nextBtn.addEventListener("click", nextQuestion);
downloadReportBtn.addEventListener("click", downloadReportCsv);
printReportBtn.addEventListener("click", () => window.print());
timerModeInput.addEventListener("change", updateModeInputs);
negativeModeInput.addEventListener("change", updateModeInputs);

updateModeInputs();
showScreen("start");
