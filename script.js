const pollForm = document.getElementById("pollForm");
const resetBtn = document.getElementById("resetBtn");
const statusText = document.getElementById("statusText");
const totalCount = document.getElementById("totalCount");
const studentNameInput = document.getElementById("studentName");
const submissionList = document.getElementById("submissionList");
const liveCount = document.getElementById("liveCount");
const leadingOption = document.getElementById("leadingOption");
const latestResponse = document.getElementById("latestResponse");
const presenterModeBtn = document.getElementById("presenterModeBtn");
const resultsCard = document.getElementById("resultsCard");
const yesBar = document.getElementById("yesBar");
const maybeBar = document.getElementById("maybeBar");
const yesValue = document.getElementById("yesValue");
const maybeValue = document.getElementById("maybeValue");

const API_BASE = "/api";
let presenterModeEnabled = false;
let pollState = {
  votes: { Yes: 0, Maybe: 0 },
  submissions: [],
};

async function getPollStateFromServer() {
  const response = await fetch(`${API_BASE}/poll`);

  if (!response.ok) {
    throw new Error("Unable to fetch shared poll data.");
  }

  return response.json();
}

function renderSubmissions() {
  const submissions = pollState.submissions;

  if (submissions.length === 0) {
    submissionList.innerHTML = '<p class="status-text">No submissions yet.</p>';
    return;
  }

  submissionList.innerHTML = submissions
    .map((item, index) => {
      return `
        <article class="submission-item">
          <p class="submission-title">${index + 1}. ${item.studentName}</p>
          <p class="submission-answer">Answer: ${item.answer}</p>
          <p class="submission-time">${item.time}</p>
        </article>
      `;
    })
    .join("");
}

function toPercent(count, total) {
  if (total === 0) {
    return 0;
  }

  return Math.round((count / total) * 100);
}

function render() {
  const submissions = pollState.submissions;
  const votes = pollState.votes;
  const total = submissions.length;
  const yesPercent = toPercent(votes.Yes, total);
  const maybePercent = toPercent(votes.Maybe, total);

  totalCount.textContent = `Total submissions: ${total}`;
  yesBar.style.width = `${yesPercent}%`;
  maybeBar.style.width = `${maybePercent}%`;
  yesValue.textContent = `${votes.Yes} (${yesPercent}%)`;
  maybeValue.textContent = `${votes.Maybe} (${maybePercent}%)`;

  if (liveCount) {
    liveCount.textContent = String(total);
  }

  if (leadingOption) {
    if (total === 0) {
      leadingOption.textContent = "-";
    } else if (votes.Yes === votes.Maybe) {
      leadingOption.textContent = "Tie";
    } else {
      leadingOption.textContent = votes.Yes > votes.Maybe ? "Yes" : "Maybe";
    }
  }

  if (latestResponse) {
    const latest = submissions[submissions.length - 1];
    latestResponse.textContent = latest ? `${latest.studentName}: ${latest.answer}` : "-";
  }

  if (total === 0) {
    statusText.textContent = "No submissions yet.";
  }

  renderSubmissions();
}

async function loadAndRender() {
  try {
    pollState = await getPollStateFromServer();
    render();
  } catch (error) {
    statusText.textContent = "Unable to connect to shared poll server.";
  }
}

pollForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(pollForm);
  const answer = formData.get("answer");
  const studentName = String(formData.get("studentName") || "").trim();

  if (!studentName) {
    statusText.textContent = "Please enter student name.";
    return;
  }

  if (answer !== "Yes" && answer !== "Maybe") {
    statusText.textContent = "Please choose Yes or Maybe.";
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentName,
        answer,
      }),
    });

    if (!response.ok) {
      throw new Error("Submission failed.");
    }

    statusText.textContent = `Submission recorded for ${studentName}: ${answer}`;
    pollForm.reset();
    studentNameInput.focus();
    await loadAndRender();
  } catch (error) {
    statusText.textContent = "Submission failed. Please try again.";
  }
});

presenterModeBtn.addEventListener("click", () => {
  presenterModeEnabled = !presenterModeEnabled;
  document.body.classList.toggle("presenter-mode", presenterModeEnabled);
  presenterModeBtn.textContent = presenterModeEnabled ? "Exit Presenter" : "Presenter Mode";

  if (presenterModeEnabled) {
    resultsCard.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

resetBtn.addEventListener("click", async () => {
  try {
    const response = await fetch(`${API_BASE}/poll`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Reset failed.");
    }

    statusText.textContent = "Poll reset. No submissions yet.";
    await loadAndRender();
  } catch (error) {
    statusText.textContent = "Reset failed. Please try again.";
  }
});

loadAndRender();
setInterval(loadAndRender, 2000);
