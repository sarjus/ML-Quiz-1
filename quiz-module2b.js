const QUIZ_LENGTH = 10;
const XP_PER_LEVEL = 60;
const WRONG_ANSWER_DELAY_MS = 1800;

const QUESTION_BANK = [
  // ── Confusion Matrix ──────────────────────────────────────────
  {
    question: "A Confusion Matrix is the foundation of all classification evaluation metrics. What does it compare?",
    options: ["Training loss vs validation loss", "Actual class vs predicted class", "Feature importance vs weight", "Precision vs recall only"],
    answerIndex: 1,
    topic: "Confusion Matrix",
  },
  {
    question: "True Positive (TP) means:",
    options: ["Model predicts negative and is correct", "Model predicts positive and it is actually positive", "Model predicts positive but it is actually negative", "Model predicts negative but it is actually positive"],
    answerIndex: 1,
    topic: "Confusion Matrix",
  },
  {
    question: "True Negative (TN) means:",
    options: ["Model predicts positive and is correct", "Model predicts negative but it is actually positive", "Model predicts negative and it is actually negative", "Model predicts positive and it is actually negative"],
    answerIndex: 2,
    topic: "Confusion Matrix",
  },
  {
    question: "False Positive (FP) is also called:",
    options: ["Type-II Error", "Type-I Error", "True Error", "Zero Error"],
    answerIndex: 1,
    topic: "Confusion Matrix",
  },
  {
    question: "False Negative (FN) is also called:",
    options: ["Type-I Error", "Zero Error", "Type-II Error", "Sensitivity Error"],
    answerIndex: 2,
    topic: "Confusion Matrix",
  },
  {
    question: "A patient has cancer but the model predicts healthy. This is a:",
    options: ["True Positive", "True Negative", "False Positive", "False Negative"],
    answerIndex: 3,
    topic: "Confusion Matrix",
  },
  {
    question: "A healthy patient is wrongly predicted as having cancer. This is a:",
    options: ["True Positive", "False Positive", "False Negative", "True Negative"],
    answerIndex: 1,
    topic: "Confusion Matrix",
  },
  {
    question: "Why are False Negatives often considered more dangerous in medical diagnosis?",
    options: ["They cause model overfitting", "The disease goes undetected", "They increase precision", "They decrease training speed"],
    answerIndex: 1,
    topic: "Confusion Matrix",
  },
  // ── Accuracy ──────────────────────────────────────────────────
  {
    question: "Accuracy is defined as:",
    options: ["TP / (TP + FP)", "(TP + TN) / (TP + TN + FP + FN)", "TP / (TP + FN)", "2 × Precision × Recall / (Precision + Recall)"],
    answerIndex: 1,
    topic: "Accuracy",
  },
  {
    question: "Given TP=40, TN=45, FP=5, FN=10, what is the Accuracy?",
    options: ["80%", "88.9%", "85%", "90%"],
    answerIndex: 2,
    topic: "Accuracy",
  },
  {
    question: "Accuracy is NOT reliable when:",
    options: ["Classes are balanced", "Dataset is large", "Dataset is imbalanced", "Model uses sigmoid"],
    answerIndex: 2,
    topic: "Accuracy",
  },
  {
    question: "A model predicts everyone as healthy in a dataset of 990 healthy and 10 cancer patients. Its accuracy is 99% but:",
    options: ["It perfectly detects cancer", "It completely fails to detect cancer", "It has high recall for cancer", "It has high precision for cancer"],
    answerIndex: 1,
    topic: "Accuracy",
  },
  // ── Precision ─────────────────────────────────────────────────
  {
    question: "Precision answers the question:",
    options: ["Out of all actual positives, how many did the model find?", "Out of all predicted positives, how many are actually positive?", "What fraction of negatives were correct?", "How many total predictions were made?"],
    answerIndex: 1,
    topic: "Precision",
  },
  {
    question: "The formula for Precision is:",
    options: ["TP / (TP + FN)", "TP / (TP + FP)", "(TP + TN) / Total", "2 × TP / (2TP + FP + FN)"],
    answerIndex: 1,
    topic: "Precision",
  },
  {
    question: "Given TP=40, FP=5, what is the Precision?",
    options: ["80%", "85%", "88.9%", "90%"],
    answerIndex: 2,
    topic: "Precision",
  },
  {
    question: "High Precision means:",
    options: ["Model identifies most actual positives", "Most predicted positives are actually positive (few false positives)", "Model has high recall", "Model has low accuracy"],
    answerIndex: 1,
    topic: "Precision",
  },
  {
    question: "Precision is especially important when:",
    options: ["False Negatives are costly", "False Positives are costly", "Dataset is balanced", "Training data is limited"],
    answerIndex: 1,
    topic: "Precision",
  },
  // ── Recall ────────────────────────────────────────────────────
  {
    question: "Recall (Sensitivity) answers the question:",
    options: ["Out of all predicted positives, how many are correct?", "Out of all actual positives, how many did the model correctly identify?", "What is the overall correctness?", "How many negatives were correctly classified?"],
    answerIndex: 1,
    topic: "Recall",
  },
  {
    question: "The formula for Recall is:",
    options: ["TP / (TP + FP)", "(TP + TN) / Total", "TP / (TP + FN)", "2 × Precision × Recall / (Precision + Recall)"],
    answerIndex: 2,
    topic: "Recall",
  },
  {
    question: "Given TP=40, FN=10, what is the Recall?",
    options: ["88.9%", "85%", "80%", "75%"],
    answerIndex: 2,
    topic: "Recall",
  },
  {
    question: "Recall is especially important when:",
    options: ["False Positives are costly", "False Negatives are costly", "Dataset is perfectly balanced", "Model uses softmax"],
    answerIndex: 1,
    topic: "Recall",
  },
  {
    question: "Low Recall means:",
    options: ["Few false positives exist", "Model misses many actual positive cases", "Precision is also low", "Model overfits the training data"],
    answerIndex: 1,
    topic: "Recall",
  },
  // ── F1-Score ──────────────────────────────────────────────────
  {
    question: "The F1-Score is the:",
    options: ["Arithmetic mean of Precision and Recall", "Harmonic mean of Precision and Recall", "Geometric mean of Precision and Recall", "Sum of Precision and Recall"],
    answerIndex: 1,
    topic: "F1-Score",
  },
  {
    question: "The formula for F1-Score is:",
    options: ["(Precision + Recall) / 2", "Precision × Recall", "2 × Precision × Recall / (Precision + Recall)", "TP / (TP + FP + FN)"],
    answerIndex: 2,
    topic: "F1-Score",
  },
  {
    question: "Given Precision=0.889 and Recall=0.80, the F1-Score is approximately:",
    options: ["85.8%", "84.2%", "80.0%", "88.9%"],
    answerIndex: 1,
    topic: "F1-Score",
  },
  {
    question: "The harmonic mean in F1-Score is used because it:",
    options: ["Is always larger than arithmetic mean", "Penalises extreme values, so both Precision and Recall must be high", "Is easier to compute", "Ignores false negatives"],
    answerIndex: 1,
    topic: "F1-Score",
  },
  {
    question: "A model with high Precision but very low Recall will have:",
    options: ["A high F1-Score", "A low F1-Score", "An F1-Score equal to Precision", "An F1-Score equal to 1"],
    answerIndex: 1,
    topic: "F1-Score",
  },
  // ── ROC & AUC ─────────────────────────────────────────────────
  {
    question: "The ROC Curve plots:",
    options: ["Precision on Y-axis vs Recall on X-axis", "True Positive Rate (TPR) on Y-axis vs False Positive Rate (FPR) on X-axis", "Accuracy vs Loss", "F1-Score vs Threshold"],
    answerIndex: 1,
    topic: "ROC Curve",
  },
  {
    question: "True Positive Rate (TPR) is also known as:",
    options: ["Precision", "Specificity", "Recall (Sensitivity)", "F1-Score"],
    answerIndex: 2,
    topic: "ROC Curve",
  },
  {
    question: "False Positive Rate (FPR) is calculated as:",
    options: ["FP / (FP + FN)", "FP / (FP + TN)", "TP / (TP + FN)", "TN / (TN + FP)"],
    answerIndex: 1,
    topic: "ROC Curve",
  },
  {
    question: "A ROC curve close to the top-left corner indicates:",
    options: ["Random guessing", "Poor model performance", "Excellent model performance", "Overfitting only"],
    answerIndex: 2,
    topic: "ROC Curve",
  },
  {
    question: "A ROC curve near the diagonal line indicates:",
    options: ["Excellent performance", "Random guessing", "Perfect precision", "Zero recall"],
    answerIndex: 1,
    topic: "ROC Curve",
  },
  {
    question: "AUC (Area Under the Curve) range for a classifier is:",
    options: ["0 to 1", "0.5 to 1", "-1 to 1", "0 to infinity"],
    answerIndex: 1,
    topic: "AUC",
  },
  {
    question: "An AUC value of 1.0 means:",
    options: ["Random classifier", "Perfect classifier", "Worst possible classifier", "Balanced classifier"],
    answerIndex: 1,
    topic: "AUC",
  },
  {
    question: "An AUC value of 0.5 means:",
    options: ["Perfect classifier", "Good classifier", "Random classifier (no useful discrimination)", "Poor but usable classifier"],
    answerIndex: 2,
    topic: "AUC",
  },
  {
    question: "AUC is threshold-independent because it:",
    options: ["Uses a fixed threshold of 0.5", "Summarises performance across all possible thresholds", "Only considers the best threshold", "Ignores true positives"],
    answerIndex: 1,
    topic: "AUC",
  },
  {
    question: "An AUC of 0.90–1.00 is interpreted as:",
    options: ["Poor", "Fair", "Good", "Excellent (Outstanding)"],
    answerIndex: 3,
    topic: "AUC",
  },
  // ── Naïve Bayes – Concepts ────────────────────────────────────
  {
    question: "Naïve Bayes is called 'Naïve' because it assumes:",
    options: ["All features are correlated with each other", "All features are completely independent of one another given the class", "The dataset is always balanced", "Labels are always binary"],
    answerIndex: 1,
    topic: "Naïve Bayes",
  },
  {
    question: "Bayes' Theorem is written as P(A|B) = ?",
    options: ["P(A) × P(B)", "P(B|A) × P(A) / P(B)", "P(A) / P(B|A)", "P(B) / P(A)"],
    answerIndex: 1,
    topic: "Bayes Theorem",
  },
  {
    question: "In Bayes' Theorem, P(A) is called the:",
    options: ["Posterior probability", "Likelihood", "Prior probability", "Predictor Prior"],
    answerIndex: 2,
    topic: "Bayes Theorem",
  },
  {
    question: "In Bayes' Theorem, P(B|A) is called the:",
    options: ["Prior", "Posterior", "Likelihood", "Evidence"],
    answerIndex: 2,
    topic: "Bayes Theorem",
  },
  {
    question: "In Bayes' Theorem, P(A|B) is called the:",
    options: ["Prior probability", "Likelihood", "Predictor prior", "Posterior probability"],
    answerIndex: 3,
    topic: "Bayes Theorem",
  },
  {
    question: "The Naïve Bayes classification formula is: P(C | X) ∝",
    options: ["P(C) + ΣP(Xi|C)", "P(C) × ΠP(Xi|C)", "P(X) / P(C)", "P(C) − P(X)"],
    answerIndex: 1,
    topic: "Naïve Bayes",
  },
  {
    question: "In Naïve Bayes, the decision rule selects:",
    options: ["The class with the lowest prior", "The class with the highest posterior probability", "The class with fewest features", "The class closest to zero"],
    answerIndex: 1,
    topic: "Naïve Bayes",
  },
  {
    question: "The Zero-Frequency Problem in Naïve Bayes occurs when:",
    options: ["A word appears too often in training data", "A word in the test data never appeared in training data for a class, giving probability 0", "Training data is too large", "Prior probability equals 1"],
    answerIndex: 1,
    topic: "Naïve Bayes",
  },
  {
    question: "Laplace Smoothing resolves the Zero-Frequency Problem by:",
    options: ["Removing unseen words from vocabulary", "Adding 1 to all word counts so no probability is zero", "Ignoring the prior probability", "Multiplying all probabilities by 2"],
    answerIndex: 1,
    topic: "Laplace Smoothing",
  },
  {
    question: "The Laplace Smoothing formula for P(word|class) is:",
    options: ["count(word,class) / total words in class", "(count(word,class) + 1) / (total words in class + V)", "count(word,class) / V", "(count(word,class) + V) / total words"],
    answerIndex: 1,
    topic: "Laplace Smoothing",
  },
  {
    question: "In Laplace Smoothing, V stands for:",
    options: ["Number of training documents", "Vocabulary size (number of unique words)", "Number of classes", "Variance of the dataset"],
    answerIndex: 1,
    topic: "Laplace Smoothing",
  },
  {
    question: "Multinomial Naïve Bayes is best suited for:",
    options: ["Continuous numerical features like height and weight", "Word count / frequency features in text", "Binary presence/absence features", "Image pixel features"],
    answerIndex: 1,
    topic: "Types of Naïve Bayes",
  },
  {
    question: "Bernoulli Naïve Bayes is best suited for:",
    options: ["Word frequency counts", "Binary 0/1 features such as word presence or absence", "Continuous numerical data", "Multi-label outputs"],
    answerIndex: 1,
    topic: "Types of Naïve Bayes",
  },
  {
    question: "Gaussian Naïve Bayes is best suited for:",
    options: ["Word counts in emails", "Binary features", "Continuous numerical features (e.g., height, temperature)", "Categorical text data"],
    answerIndex: 2,
    topic: "Types of Naïve Bayes",
  },
  {
    question: "All variants of Naïve Bayes share which core assumption?",
    options: ["Features follow a Gaussian distribution", "Features are independent given the class", "Training data must be balanced", "Only binary classes are supported"],
    answerIndex: 1,
    topic: "Types of Naïve Bayes",
  },
  // ── Applied / Calculation questions ───────────────────────────
  {
    question: "A spam filter test on 100 emails gives TP=15, FP=25, FN=15, TN=45. What is the Precision?",
    options: ["50%", "37.5%", "60%", "25%"],
    answerIndex: 1,
    topic: "Precision",
  },
  {
    question: "Using the same spam filter (TP=15, FP=25, FN=15, TN=45), what is the Recall?",
    options: ["60%", "37.5%", "50%", "45%"],
    answerIndex: 2,
    topic: "Recall",
  },
  {
    question: "For Model A: Precision=95%, Recall=60%. For Model B: Precision=85%, Recall=90%. Which model has fewer false alarms?",
    options: ["Model B", "Both are equal", "Model A", "Cannot be determined"],
    answerIndex: 2,
    topic: "Precision vs Recall",
  },
  {
    question: "For Model A: Precision=95%, Recall=60%. For Model B: Precision=85%, Recall=90%. Which model detects more actual fraud cases?",
    options: ["Model A", "Model B", "Both are equal", "Cannot be determined"],
    answerIndex: 1,
    topic: "Precision vs Recall",
  },
  {
    question: "For cancer detection, which metric is generally most important and why?",
    options: ["Precision, because false alarms are costly", "Accuracy, because overall correctness matters most", "Recall, because missing a cancer patient is dangerous", "F1-Score only, because it balances everything"],
    answerIndex: 2,
    topic: "Recall",
  },
  {
    question: "A Naïve Bayes spam classifier has P(Spam)=0.5, P(Free|Spam)=0.5, P(Money|Spam)=0.5. The spam score for email 'Free Money' is:",
    options: ["0.25", "0.125", "0.5", "1.0"],
    answerIndex: 1,
    topic: "Naïve Bayes",
  },
  {
    question: "In a Naïve Bayes example with P(Spam)=0.40, P(Free|Spam)=0.80, P(Prize|Spam)=0.70, the spam score is:",
    options: ["0.224", "0.056", "0.336", "0.560"],
    answerIndex: 0,
    topic: "Naïve Bayes",
  },
  {
    question: "Which metric is best for comparing two models when classes are imbalanced?",
    options: ["Accuracy alone", "F1-Score", "Only AUC", "Training loss"],
    answerIndex: 1,
    topic: "F1-Score",
  },
  {
    question: "In a confusion matrix with TP=80, TN=90, FP=10, FN=20, the Accuracy is:",
    options: ["80%", "90%", "85%", "88.9%"],
    answerIndex: 2,
    topic: "Accuracy",
  },
  {
    question: "Which of the following is a real-world application where Precision is prioritised?",
    options: ["Cancer screening", "Intrusion detection systems", "Spam email detection (avoiding blocking legitimate emails)", "Disease diagnosis (detecting all sick patients)"],
    answerIndex: 2,
    topic: "Precision",
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
  if (score >= 1) badges.add("First Correct");
  if (bestStreak >= 3) badges.add("Streak Starter (3)");
  if (bestStreak >= 5) badges.add("Combo Master (5)");
  if (answered >= 13) badges.add("Halfway Hero");
  if (score >= 20) badges.add("Module Master (20+)");
  if (skipped >= 3) badges.add("Scope Scout (3 skips)");
}

function renderBadges() {
  updateBadges();
  if (badges.size === 0) {
    badgesWrap.innerHTML = '<p class="status-text">No badges yet. Keep going.</p>';
    return;
  }
  badgesWrap.innerHTML = [...badges].map((b) => `<span class="badge-pill">${b}</span>`).join("");
}

function getLevelFromXp(value) {
  return Math.floor(value / XP_PER_LEVEL) + 1;
}

function renderGamification() {
  levelText.textContent = `Level ${getLevelFromXp(xp)}`;
  xpText.textContent = String(xp);
  streakText.textContent = String(streak);
  bestStreakText.textContent = String(bestStreak);
  skippedText.textContent = String(skipped);
  renderBadges();
}

function renderQuestion() {
  if (currentIndex >= QUIZ_LENGTH) { finishQuiz(); return; }
  const current = selectedQuestions[currentIndex];
  questionTag.textContent = `Q${currentIndex + 1}`;
  questionText.textContent = current.question;
  progressText.textContent = `Question ${currentIndex + 1} of ${QUIZ_LENGTH}`;
  scoreText.textContent = `Score: ${score}`;
  progressFill.style.width = `${Math.round((currentIndex / QUIZ_LENGTH) * 100)}%`;
  quizForm.innerHTML = current.options
    .map((option, index) => `
      <label class="quiz-option">
        <input type="radio" name="answer" value="${index}" />
        <span>${option}</span>
      </label>`)
    .join("");
}

function gainXp(base) { xp += base; }

function highlightAnswerReview(selectedIndex, answerIndex) {
  const optionLabels = quizForm.querySelectorAll(".quiz-option");
  const optionInputs = quizForm.querySelectorAll('input[name="answer"]');
  optionLabels.forEach((label, index) => {
    label.classList.add("locked");
    if (index === answerIndex) label.classList.add("is-correct");
    if (index === selectedIndex && selectedIndex !== answerIndex) label.classList.add("is-wrong");
  });
  optionInputs.forEach((input) => { input.disabled = true; });
}

function renderSubmissionReview() {
  if (responseLog.length === 0) {
    submissionReview.innerHTML = '<p class="status-text">No responses were recorded.</p>';
    return;
  }
  submissionReview.innerHTML = responseLog.map((entry, index) => {
    const statusClass =
      entry.status === "correct" ? "review-correct" :
      entry.status === "incorrect" ? "review-incorrect" : "review-skipped";
    return `
      <article class="review-item ${statusClass}">
        <p class="review-title">Q${index + 1}. ${entry.question}</p>
        <p class="review-topic">Topic: ${entry.topic}</p>
        <p class="review-line"><strong>Your submission:</strong> ${entry.submission}</p>
        <p class="review-line"><strong>Correct answer:</strong> ${entry.correctAnswer}</p>
        <p class="review-line"><strong>Feedback:</strong> ${entry.feedback}</p>
      </article>`;
  }).join("");
}

function submitAnswer() {
  if (currentIndex >= QUIZ_LENGTH || isTransitioning) return;
  const selected = quizForm.querySelector('input[name="answer"]:checked');
  if (!selected) { feedbackText.textContent = "Choose an answer before submitting."; return; }

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
    responseLog.push({ question: current.question, topic: current.topic,
      submission: current.options[selectedIndex], correctAnswer: current.options[current.answerIndex],
      feedback: "Great job. Your answer is correct.", status: "correct" });
  } else {
    streak = 0;
    gainXp(2);
    feedbackText.textContent = `Incorrect. Correct answer is highlighted in green. Next question in ${Math.round(WRONG_ANSWER_DELAY_MS / 1000)}s.`;
    responseLog.push({ question: current.question, topic: current.topic,
      submission: current.options[selectedIndex], correctAnswer: current.options[current.answerIndex],
      feedback: "Review this concept and try again.", status: "incorrect" });
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
  if (currentIndex >= QUIZ_LENGTH || isTransitioning) return;
  skipped += 1;
  streak = 0;
  gainXp(1);
  if (reserveQuestions.length > 0) {
    const replacement = reserveQuestions.shift();
    selectedQuestions[currentIndex] = replacement;
    feedbackText.textContent = "Question skipped as out of scope. Replaced with a new question from the bank.";
  } else {
    const current = selectedQuestions[currentIndex];
    responseLog.push({ question: current.question, topic: current.topic,
      submission: "Skipped (Out of Scope)", correctAnswer: current.options[current.answerIndex],
      feedback: "This question was skipped and not evaluated.", status: "skipped" });
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
  questionText.textContent = "You have completed the Module 2 Evaluation & Naïve Bayes quiz.";
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
  currentIndex = 0; score = 0; answered = 0; skipped = 0;
  streak = 0; bestStreak = 0; xp = 0;
  badges = new Set(); responseLog = []; isTransitioning = false;
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
