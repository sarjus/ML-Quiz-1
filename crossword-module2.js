const GRID_SIZE = 21;
const XP_PER_LEVEL = 50;
const XP_PER_CORRECT = 15;
const XP_HINT_PENALTY = 5;

const CLUE_BANK = {
  across: [
    {
      clue: "Predicts continuous numerical values instead of categories.",
      answer: "REGRESSION",
    },
    {
      clue: "A classification problem with only two possible classes.",
      answer: "BINARY",
    },
    {
      clue: "The function that converts a linear score into a probability between 0 and 1.",
      answer: "SIGMOID",
    },
    {
      clue: "The probability value commonly used to decide between Class 0 and Class 1.",
      answer: "THRESHOLD",
    },
    {
      clue: "A loss function used for logistic regression, also known as Log Loss.",
      answer: "CROSSENTROPY",
    },
    {
      clue: "The estimation technique that maximizes the likelihood of the observed data.",
      answer: "MLE",
    },
    {
      clue: "The logarithm of the likelihood, used to simplify optimization.",
      answer: "LOGLIKELIHOOD",
    },
    {
      clue: "A classification problem where one instance may belong to multiple classes simultaneously.",
      answer: "MULTILABEL",
    },
    {
      clue: "A classification problem with more than two mutually exclusive classes.",
      answer: "MULTICLASS",
    },
    {
      clue: "The algorithm that predicts probabilities using the sigmoid function despite its name suggesting regression.",
      answer: "LOGISTICREGRESSION",
    },
  ],
  down: [
    {
      clue: "Linear regression is unsuitable for classification because it can predict values outside the valid range.",
      answer: "PROBABILITY",
    },
    {
      clue: "The mathematical function used to transform products into sums in MLE.",
      answer: "LOGARITHM",
    },
    {
      clue: "A confident incorrect prediction receives a large penalty in this loss function.",
      answer: "CROSSENTROPY",
    },
    {
      clue: "The objective that logistic regression minimizes during training.",
      answer: "LOGLOSS",
    },
    {
      clue: "The parameter estimation approach that combines likelihood with prior knowledge.",
      answer: "MAP",
    },
    {
      clue: "A function that produces an S-shaped curve.",
      answer: "SIGMOID",
    },
    {
      clue: "The value calculated as z = wx + b before applying the sigmoid function.",
      answer: "LINEARSCORE",
    },
    {
      clue: "The process of assigning an input to one of several categories.",
      answer: "CLASSIFICATION",
    },
  ],
};

const ACROSS_PER_PUZZLE = 6;
const DOWN_PER_PUZZLE = 6;
const MIN_TOTAL_WORDS = 8;
const MAX_BUILD_ATTEMPTS = 60;

const gridElement = document.getElementById("crosswordGrid");
const acrossCluesElement = document.getElementById("acrossClues");
const downCluesElement = document.getElementById("downClues");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const hintBtn = document.getElementById("hintBtn");
const feedbackText = document.getElementById("feedbackText");
const filledText = document.getElementById("filledText");
const filledBar = document.getElementById("filledBar");
const filledTrack = document.querySelector(".crossword-progress");
const gridWrapElement = document.querySelector(".crossword-grid-wrap");
const zoomInBtn = document.getElementById("zoomInBtn");
const zoomOutBtn = document.getElementById("zoomOutBtn");
const zoomLabel = document.getElementById("zoomLabel");
const activeClueText = document.getElementById("activeClueText");
const timerText = document.getElementById("timerText");

const levelText = document.getElementById("levelText");
const xpText = document.getElementById("xpText");
const hintsText = document.getElementById("hintsText");
const bestStreakText = document.getElementById("bestStreakText");
const entryCountText = document.getElementById("entryCountText");
const badgesWrap = document.getElementById("badgesWrap");

const resultBox = document.getElementById("resultBox");
const scoreLine = document.getElementById("scoreLine");
const summaryLine = document.getElementById("summaryLine");
const answerReview = document.getElementById("answerReview");

let cellMap = new Map();
let cellWrapperMap = new Map();
let placedEntries = [];
let entryKeyToCells = new Map();
let clueButtonMap = new Map();
let entryMetaMap = new Map();
let solutionMap = new Map();
let usedHints = 0;
let xp = 0;
let bestStreak = 0;
let badges = new Set();
let startTime = Date.now();
let timerId;
let selectedEntryKey = null;
let mobileCellSize = 34;

function keyFor(row, col) {
  return `${row},${col}`;
}

function emptyBoard() {
  return Array.from({ length: GRID_SIZE }, () => Array.from({ length: GRID_SIZE }, () => null));
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function normalizeAnswer(answer) {
  return (answer || "")
    .toUpperCase()
    .replace(/[^A-Z]/g, "");
}

function getWordBank() {
  const dedupe = new Set();
  const allEntries = [
    ...CLUE_BANK.across.map((entry) => ({ ...entry, direction: "across" })),
    ...CLUE_BANK.down.map((entry) => ({ ...entry, direction: "down" })),
  ];

  return allEntries
    .map((item) => {
      const normalized = normalizeAnswer(item.answer);
    return {
        clue: item.clue,
        answer: normalized,
        direction: item.direction,
      };
    })
    .filter((item) => item.answer.length >= 3 && item.answer.length <= GRID_SIZE)
    .filter((item) => {
      const uniqKey = `${item.direction}-${item.answer}`;
      if (dedupe.has(uniqKey)) {
        return false;
      }
      dedupe.add(uniqKey);
      return true;
    });
}

function selectEntriesForPuzzle(wordBank, acrossCount, downCount, acrossOffset = 0, downOffset = 0) {
  const acrossEntries = wordBank.filter((entry) => entry.direction === "across");
  const downEntries = wordBank.filter((entry) => entry.direction === "down");

  const takeAcross = Math.min(acrossCount, acrossEntries.length);
  const takeDown = Math.min(downCount, downEntries.length);
  const selectedAcross = [];
  const selectedDown = [];

  for (let i = 0; i < takeAcross; i += 1) {
    selectedAcross.push(acrossEntries[(acrossOffset + i) % acrossEntries.length]);
  }

  for (let i = 0; i < takeDown; i += 1) {
    selectedDown.push(downEntries[(downOffset + i) % downEntries.length]);
  }

  return [...selectedAcross, ...selectedDown];
}

function buildRandomCrossword() {
  const wordBank = getWordBank();
  let lastError;

  const maxTotalWords = Math.min(
    ACROSS_PER_PUZZLE + DOWN_PER_PUZZLE,
    wordBank.filter((entry) => entry.direction === "across").length +
      wordBank.filter((entry) => entry.direction === "down").length,
  );

  for (let totalWords = maxTotalWords; totalWords >= MIN_TOTAL_WORDS; totalWords -= 1) {
    const acrossTarget = Math.max(1, Math.ceil(totalWords / 2));
    const downTarget = Math.max(1, totalWords - acrossTarget);

    const acrossCount = wordBank.filter((entry) => entry.direction === "across").length;
    const downCount = wordBank.filter((entry) => entry.direction === "down").length;
    const deterministicAttempts = Math.max(1, Math.min(MAX_BUILD_ATTEMPTS, acrossCount * downCount));

    // Try predictable clue windows to keep puzzle content repeatable without randomization.
    for (let attempt = 0; attempt < deterministicAttempts; attempt += 1) {
      const acrossOffset = acrossCount ? attempt % acrossCount : 0;
      const downOffset = downCount ? Math.floor(attempt / Math.max(1, acrossCount)) % downCount : 0;
      const words = selectEntriesForPuzzle(wordBank, acrossTarget, downTarget, acrossOffset, downOffset);

      try {
        return buildCrossword(words);
      } catch (error) {
        lastError = error;
      }
    }
  }

  throw lastError || new Error("Could not build a fully connected crossword from current clue set.");
}

function inBounds(row, col) {
  return row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE;
}

function canPlaceWord(board, word, row, col, direction, requireOverlap) {
  const deltaRow = direction === "down" ? 1 : 0;
  const deltaCol = direction === "across" ? 1 : 0;
  const beforeRow = row - deltaRow;
  const beforeCol = col - deltaCol;
  const afterRow = row + deltaRow * word.length;
  const afterCol = col + deltaCol * word.length;

  if (inBounds(beforeRow, beforeCol) && board[beforeRow][beforeCol]) {
    return { ok: false, overlaps: 0 };
  }
  if (inBounds(afterRow, afterCol) && board[afterRow][afterCol]) {
    return { ok: false, overlaps: 0 };
  }

  let overlaps = 0;

  for (let i = 0; i < word.length; i += 1) {
    const r = row + deltaRow * i;
    const c = col + deltaCol * i;

    if (!inBounds(r, c)) {
      return { ok: false, overlaps: 0 };
    }

    const existing = board[r][c];
    const letter = word[i];

    if (existing && existing !== letter) {
      return { ok: false, overlaps: 0 };
    }

    if (existing === letter) {
      overlaps += 1;
    }

    if (!existing) {
      if (direction === "across") {
        const up = r - 1;
        const down = r + 1;
        if ((inBounds(up, c) && board[up][c]) || (inBounds(down, c) && board[down][c])) {
          return { ok: false, overlaps: 0 };
        }
      } else {
        const left = c - 1;
        const right = c + 1;
        if ((inBounds(r, left) && board[r][left]) || (inBounds(r, right) && board[r][right])) {
          return { ok: false, overlaps: 0 };
        }
      }
    }
  }

  if (requireOverlap && overlaps === 0) {
    return { ok: false, overlaps: 0 };
  }

  return { ok: true, overlaps };
}

function placeWord(board, word, row, col, direction) {
  const deltaRow = direction === "down" ? 1 : 0;
  const deltaCol = direction === "across" ? 1 : 0;

  for (let i = 0; i < word.length; i += 1) {
    const r = row + deltaRow * i;
    const c = col + deltaCol * i;
    board[r][c] = word[i];
  }
}

function buildCrossword(entries) {
  const board = emptyBoard();
  const occupied = [];
  const sorted = [...entries].sort((a, b) => b.answer.length - a.answer.length);

  const first = sorted[0];
  const firstDirection = first.direction;
  const firstRow = firstDirection === "across" ? Math.floor(GRID_SIZE / 2) : Math.floor((GRID_SIZE - first.answer.length) / 2);
  const firstCol = firstDirection === "across" ? Math.floor((GRID_SIZE - first.answer.length) / 2) : Math.floor(GRID_SIZE / 2);
  placeWord(board, first.answer, firstRow, firstCol, firstDirection);
  occupied.push({ ...first, row: firstRow, col: firstCol, direction: firstDirection });

  for (let i = 1; i < sorted.length; i += 1) {
    const entry = sorted[i];
    const answer = entry.answer;
    const direction = entry.direction;
    let bestCandidate = null;

    for (let wIndex = 0; wIndex < answer.length; wIndex += 1) {
      const letter = answer[wIndex];

      for (let r = 0; r < GRID_SIZE; r += 1) {
        for (let c = 0; c < GRID_SIZE; c += 1) {
          if (board[r][c] !== letter) {
            continue;
          }

          const startRow = direction === "across" ? r : r - wIndex;
          const startCol = direction === "across" ? c - wIndex : c;
          const check = canPlaceWord(board, answer, startRow, startCol, direction, true);
          if (check.ok) {
            const score =
              check.overlaps * 10 -
              Math.abs(Math.floor(GRID_SIZE / 2) - startRow) -
              Math.abs(Math.floor(GRID_SIZE / 2) - startCol);

            if (!bestCandidate || score > bestCandidate.score) {
              bestCandidate = {
                row: startRow,
                col: startCol,
                direction,
                score,
              };
            }
          }
        }
      }
    }

    if (!bestCandidate) {
      throw new Error(`Unable to place word: ${answer}`);
    }

    placeWord(board, answer, bestCandidate.row, bestCandidate.col, bestCandidate.direction);
    occupied.push({ ...entry, row: bestCandidate.row, col: bestCandidate.col, direction: bestCandidate.direction });
  }

  const numbered = [...occupied].sort((a, b) => a.row - b.row || a.col - b.col);
  let counter = 1;
  const startCellToNumber = new Map();

  numbered.forEach((entry) => {
    const startKey = keyFor(entry.row, entry.col);
    if (!startCellToNumber.has(startKey)) {
      startCellToNumber.set(startKey, counter);
      counter += 1;
    }
    entry.number = startCellToNumber.get(startKey);
    entry.entryKey = `${entry.number}-${entry.direction}`;
  });

  return { board, entries: numbered, startCellToNumber };
}

function clearTimer() {
  if (timerId) {
    clearInterval(timerId);
  }
}

function isCompactViewport() {
  return window.matchMedia("(max-width: 760px)").matches;
}

function updateZoomControls() {
  if (!zoomInBtn || !zoomOutBtn || !zoomLabel) {
    return;
  }

  const mobileView = isCompactViewport();
  zoomInBtn.disabled = !mobileView || mobileCellSize >= 44;
  zoomOutBtn.disabled = !mobileView || mobileCellSize <= 26;
  zoomLabel.textContent = mobileView ? `Zoom: ${mobileCellSize}px` : "Zoom available on mobile";
}

function applyGridScale() {
  gridElement.style.gridTemplateColumns = isCompactViewport()
    ? `repeat(${GRID_SIZE}, ${mobileCellSize}px)`
    : `repeat(${GRID_SIZE}, 1fr)`;

  updateZoomControls();
}

function centerCellInMobileView(cellWrapper) {
  if (!isCompactViewport() || !gridWrapElement || !cellWrapper) {
    return;
  }

  const targetLeft = cellWrapper.offsetLeft - gridWrapElement.clientWidth / 2 + cellWrapper.clientWidth / 2;
  gridWrapElement.scrollTo({
    left: Math.max(0, targetLeft),
    behavior: "smooth",
  });
}

function startTimer() {
  clearTimer();
  timerId = setInterval(() => {
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    const minutes = String(Math.floor(elapsedSeconds / 60)).padStart(2, "0");
    const seconds = String(elapsedSeconds % 60).padStart(2, "0");
    timerText.textContent = `Time: ${minutes}:${seconds}`;
  }, 1000);
}

function updateGamification() {
  const level = Math.max(1, Math.floor(xp / XP_PER_LEVEL) + 1);
  levelText.textContent = `Level ${level}`;
  xpText.textContent = String(xp);
  hintsText.textContent = String(usedHints);
  bestStreakText.textContent = String(bestStreak);
  entryCountText.textContent = String(placedEntries.length);
}

function updateBadges(correctEntries, perfect) {
  badges.clear();

  if (correctEntries >= 1) {
    badges.add("First Word Solved");
  }
  if (correctEntries >= Math.ceil(placedEntries.length * 0.6)) {
    badges.add("Concept Climber");
  }
  if (correctEntries === placedEntries.length - 1) {
    badges.add("Almost There");
  }
  if (perfect) {
    badges.add("Perfect Grid");
  }
  if (usedHints === 0) {
    badges.add("No-Hint Hero");
  }
  if (bestStreak >= 3) {
    badges.add("Streak Starter");
  }

  if (!badges.size) {
    badgesWrap.innerHTML = '<p class="status-text">No badges yet. Solve more correctly to unlock them.</p>';
    return;
  }

  badgesWrap.innerHTML = "";
  badges.forEach((badge) => {
    const tag = document.createElement("span");
    tag.className = "badge-pill";
    tag.textContent = badge;
    badgesWrap.appendChild(tag);
  });
}

function getEntryCells(entry) {
  return entryKeyToCells.get(entry.entryKey) || [];
}

function readEntryAnswer(entry) {
  return getEntryCells(entry)
    .map((cell) => {
      const input = cellMap.get(keyFor(cell.row, cell.col));
      return (input?.value || "").toUpperCase();
    })
    .join("");
}

function computeFilledPercentage() {
  let filled = 0;
  let total = 0;

  cellMap.forEach((input) => {
    total += 1;
    if (input.value.trim()) {
      filled += 1;
    }
  });

  const percent = total === 0 ? 0 : Math.round((filled / total) * 100);
  filledText.textContent = `Filled Cells: ${percent}%`;
  if (filledBar) {
    filledBar.style.width = `${percent}%`;
  }
  if (filledTrack) {
    filledTrack.setAttribute("aria-valuenow", String(percent));
  }
}

function setSelectedEntry(entryKey) {
  selectedEntryKey = entryKey;

  cellMap.forEach((input) => input.classList.remove("is-active"));
  clueButtonMap.forEach((button) => button.classList.remove("is-active"));

  const cells = entryKeyToCells.get(entryKey) || [];
  cells.forEach((cell) => {
    const input = cellMap.get(keyFor(cell.row, cell.col));
    if (input) {
      input.classList.add("is-active");
    }
  });

  const clueButton = clueButtonMap.get(entryKey);
  if (clueButton) {
    clueButton.classList.add("is-active");
  }

  if (activeClueText) {
    const entry = entryMetaMap.get(entryKey);
    activeClueText.textContent = entry
      ? `${entry.number}. ${entry.direction.toUpperCase()}: ${entry.clue} (${entry.answer.length})`
      : "Select a clue or tap a cell to view the active question here.";
  }
}

function focusEntryStart(entryKey) {
  const cells = entryKeyToCells.get(entryKey) || [];
  if (!cells.length) {
    return;
  }

  setSelectedEntry(entryKey);
  const first = cells[0];
  const input = cellMap.get(keyFor(first.row, first.col));
  if (input) {
    input.focus();
    input.select();
  }
}

function moveToNextCell(entryKey, currentRow, currentCol) {
  const cells = entryKeyToCells.get(entryKey) || [];
  const index = cells.findIndex((cell) => cell.row === currentRow && cell.col === currentCol);
  if (index === -1 || index === cells.length - 1) {
    return;
  }

  const next = cells[index + 1];
  const input = cellMap.get(keyFor(next.row, next.col));
  if (input) {
    input.focus();
    input.select();
  }
}

function useHint() {
  const candidates = [];

  solutionMap.forEach((correctLetter, key) => {
    const input = cellMap.get(key);
    if (!input) {
      return;
    }

    const current = (input.value || "").toUpperCase();
    if (current !== correctLetter) {
      candidates.push({ key, correctLetter, input });
    }
  });

  if (!candidates.length) {
    feedbackText.textContent = "No hint needed. All filled letters are already correct.";
    return;
  }

  const chosen = candidates[Math.floor(Math.random() * candidates.length)];
  chosen.input.value = chosen.correctLetter;
  chosen.input.classList.add("hinted");

  usedHints += 1;
  xp = Math.max(0, xp - XP_HINT_PENALTY);
  updateGamification();
  computeFilledPercentage();

  feedbackText.textContent = "Hint used: one letter was revealed.";
}

function buildClues() {
  const across = placedEntries.filter((entry) => entry.direction === "across");
  const down = placedEntries.filter((entry) => entry.direction === "down");

  acrossCluesElement.innerHTML = "";
  downCluesElement.innerHTML = "";
  clueButtonMap = new Map();
  entryMetaMap = new Map();

  across.forEach((entry) => {
    const item = document.createElement("li");
    item.className = "clue-item";
    item.innerHTML = `<button type="button" class="clue-btn"><strong>${entry.number}.</strong> ${entry.clue} <span>(${entry.answer.length})</span></button>`;
    const button = item.querySelector("button");
    button.addEventListener("click", () => focusEntryStart(entry.entryKey));
    clueButtonMap.set(entry.entryKey, button);
    entryMetaMap.set(entry.entryKey, entry);
    acrossCluesElement.appendChild(item);
  });

  down.forEach((entry) => {
    const item = document.createElement("li");
    item.className = "clue-item";
    item.innerHTML = `<button type="button" class="clue-btn"><strong>${entry.number}.</strong> ${entry.clue} <span>(${entry.answer.length})</span></button>`;
    const button = item.querySelector("button");
    button.addEventListener("click", () => focusEntryStart(entry.entryKey));
    clueButtonMap.set(entry.entryKey, button);
    entryMetaMap.set(entry.entryKey, entry);
    downCluesElement.appendChild(item);
  });
}

function renderGrid(board, startCellToNumber) {
  applyGridScale();
  gridElement.innerHTML = "";
  cellMap = new Map();
  cellWrapperMap = new Map();
  solutionMap = new Map();
  entryKeyToCells = new Map();

  placedEntries.forEach((entry) => {
    const cells = [];
    const deltaRow = entry.direction === "down" ? 1 : 0;
    const deltaCol = entry.direction === "across" ? 1 : 0;

    for (let i = 0; i < entry.answer.length; i += 1) {
      cells.push({
        row: entry.row + deltaRow * i,
        col: entry.col + deltaCol * i,
      });
    }

    entryKeyToCells.set(entry.entryKey, cells);
  });

  for (let row = 0; row < GRID_SIZE; row += 1) {
    for (let col = 0; col < GRID_SIZE; col += 1) {
      const wrapper = document.createElement("div");
      wrapper.className = "cw-cell";

      if (!board[row][col]) {
        wrapper.classList.add("blocked");
        gridElement.appendChild(wrapper);
        continue;
      }

      const key = keyFor(row, col);
      solutionMap.set(key, board[row][col]);

      const input = document.createElement("input");
      input.type = "text";
      input.maxLength = 1;
      input.autocomplete = "off";
      input.inputMode = "text";
      input.autocapitalize = "characters";
      input.spellcheck = false;
      input.className = "cw-input";
      input.setAttribute("aria-label", `Cell row ${row + 1}, column ${col + 1}`);

      const ownerKeys = placedEntries
        .filter((entry) => getEntryCells(entry).some((cell) => cell.row === row && cell.col === col))
        .map((entry) => entry.entryKey);

      if (ownerKeys.length) {
        input.dataset.entries = ownerKeys.join("|");
      }

      input.addEventListener("focus", () => {
        if (!input.dataset.entries) {
          return;
        }
        const firstEntry = input.dataset.entries.split("|")[0];
        setSelectedEntry(firstEntry);
        centerCellInMobileView(wrapper);
      });

      input.addEventListener("input", () => {
        input.value = (input.value || "").toUpperCase().replace(/[^A-Z]/g, "");
        input.classList.remove("is-wrong");
        computeFilledPercentage();

        if (!selectedEntryKey && input.dataset.entries) {
          [selectedEntryKey] = input.dataset.entries.split("|");
        }

        if (input.value && selectedEntryKey) {
          moveToNextCell(selectedEntryKey, row, col);
        }
      });

      input.addEventListener("keydown", (event) => {
        if (event.key === "Backspace" && !input.value && selectedEntryKey) {
          const cells = entryKeyToCells.get(selectedEntryKey) || [];
          const currentIndex = cells.findIndex((cell) => cell.row === row && cell.col === col);
          if (currentIndex > 0) {
            const previous = cells[currentIndex - 1];
            const previousInput = cellMap.get(keyFor(previous.row, previous.col));
            if (previousInput) {
              previousInput.focus();
              previousInput.select();
            }
          }
        }
      });

      const number = startCellToNumber.get(key);
      if (number) {
        const numberTag = document.createElement("span");
        numberTag.className = "cw-number";
        numberTag.textContent = String(number);
        wrapper.appendChild(numberTag);
      }

      wrapper.appendChild(input);
      cellMap.set(key, input);
      cellWrapperMap.set(key, wrapper);
      gridElement.appendChild(wrapper);
    }
  }
}

function evaluateCrossword() {
  let correctEntries = 0;
  let streak = 0;
  bestStreak = 0;
  answerReview.innerHTML = "";

  cellWrapperMap.forEach((wrapper) => {
    wrapper.classList.remove("entry-correct", "entry-fixed");
  });

  const sortedByNumber = [...placedEntries].sort((a, b) => a.number - b.number);

  sortedByNumber.forEach((entry) => {
    const userAnswer = readEntryAnswer(entry);
    const isCorrect = userAnswer === entry.answer;
    const startKey = keyFor(entry.row, entry.col);
    const startWrapper = cellWrapperMap.get(startKey);

    if (isCorrect) {
      correctEntries += 1;
      streak += 1;
      bestStreak = Math.max(bestStreak, streak);
      xp += XP_PER_CORRECT;
      if (startWrapper) {
        startWrapper.classList.add("entry-correct");
      }
    } else {
      streak = 0;
      const cells = getEntryCells(entry);
      cells.forEach((cell, index) => {
        const key = keyFor(cell.row, cell.col);
        const input = cellMap.get(key);
        const wrapper = cellWrapperMap.get(key);
        if (!input) {
          return;
        }

        if ((input.value || "").toUpperCase() !== entry.answer[index]) {
          input.value = entry.answer[index];
          if (wrapper) {
            wrapper.classList.add("entry-fixed");
          }
        }
      });
    }

    const card = document.createElement("article");
    card.className = `review-item ${isCorrect ? "review-correct" : "review-incorrect"}`;
    card.innerHTML = `
      <p class="review-title">${entry.number}. ${entry.direction.toUpperCase()} - ${isCorrect ? "Correct" : "Incorrect"}</p>
      <p class="review-line">Answer: ${entry.answer}</p>
    `;
    answerReview.appendChild(card);
  });

  const total = placedEntries.length;
  const percent = Math.round((correctEntries / total) * 100);
  const perfect = correctEntries === total;

  updateBadges(correctEntries, perfect);
  updateGamification();

  clearTimer();
  resultBox.hidden = false;
  scoreLine.textContent = `Score: ${correctEntries}/${total} (${percent}%)`;
  summaryLine.textContent =
    percent >= 80
      ? "Excellent conceptual grip on classification and logistic regression."
      : "Good attempt. Review incorrect entries and retry to improve your mastery.";

  feedbackText.textContent = "Final scoring complete. Correct entries show tick marks, and incorrect entries were replaced with correct letters.";

  submitBtn.disabled = true;
  hintBtn.disabled = true;
}

function resetPuzzle() {
  const crossword = buildRandomCrossword();
  placedEntries = crossword.entries;
  usedHints = 0;
  xp = 0;
  bestStreak = 0;
  badges = new Set();
  selectedEntryKey = null;

  renderGrid(crossword.board, crossword.startCellToNumber);
  buildClues();
  computeFilledPercentage();

  resultBox.hidden = true;
  answerReview.innerHTML = "";
  scoreLine.textContent = "";
  summaryLine.textContent = "";
  submitBtn.disabled = false;
  hintBtn.disabled = false;

  feedbackText.textContent = "Puzzle reset. Fill all clues and use Final Submit to score.";
  if (activeClueText) {
    activeClueText.textContent = "Select a clue or tap a cell to view the active question here.";
  }

  startTime = Date.now();
  timerText.textContent = "Time: 00:00";
  startTimer();

  updateBadges(0, false);
  updateGamification();
}

submitBtn.addEventListener("click", evaluateCrossword);
resetBtn.addEventListener("click", resetPuzzle);
hintBtn.addEventListener("click", useHint);

if (zoomInBtn) {
  zoomInBtn.addEventListener("click", () => {
    mobileCellSize = Math.min(44, mobileCellSize + 2);
    applyGridScale();
  });
}

if (zoomOutBtn) {
  zoomOutBtn.addEventListener("click", () => {
    mobileCellSize = Math.max(26, mobileCellSize - 2);
    applyGridScale();
  });
}

window.addEventListener("resize", () => {
  applyGridScale();
});

resetPuzzle();
