let currentStep = 1;
const totalSteps = 3;
const progressBar = document.getElementById("progressBar");

function nextQuestion(step) {
  const current = document.getElementById(`q${currentStep}`);
  const next = document.getElementById(`q${step}`);

  // Slide out current question
  current.classList.add("slide-out-left");

  setTimeout(() => {
    current.classList.remove("slide-out-left", "active");
    next.classList.add("active");
    currentStep = step;
    updateProgress();
  }, 650);
}

function showResults() {
  const current = document.getElementById(`q${currentStep}`);
  const results = document.getElementById("results");

  current.classList.add("slide-out-left");

  setTimeout(() => {
    current.classList.remove("slide-out-left", "active");
    results.classList.add("active");
    updateProgress(100);

    const budget = document.getElementById("budget").value || "unknown";
    const dest = document.getElementById("destinationType").value || "anywhere";
    const time = document.getElementById("travelTime").value || "anytime";

    document.getElementById("resultText").innerText =
      `We’ll find ${dest} destinations for ${time} trips within £${budget}.`;
  }, 650);
}

function restart() {
  document.querySelectorAll(".question").forEach(q => q.classList.remove("active"));
  document.getElementById("q1").classList.add("active");
  currentStep = 1;
  updateProgress();
}

function updateProgress(percentOverride) {
  const percent = percentOverride ?? ((currentStep - 1) / totalSteps) * 100;
  progressBar.style.width = `${percent}%`;
}
