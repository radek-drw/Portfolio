const intervalTime = 4000;
const itemsPerPage = 4;
let currentIndex = 0;
const skills = document.querySelectorAll(".skills__list-item");
const progressBar = document.querySelector(".skills__list-progress-bar");
let intervalId;

function updateSkillsAndDots() {
  const activeSkills = document.querySelectorAll(".skills__list-item--active");
  const activeDots = document.querySelectorAll(
    ".skills__list-progress-bar > .progress-bar-dot--active"
  );

  activeSkills.forEach((skill) =>
    skill.classList.remove("skills__list-item--active")
  );
  activeDots.forEach((dot) => dot.classList.remove("progress-bar-dot--active"));

  for (let i = 0; i < itemsPerPage; i++) {
    if (skills[currentIndex + i]) {
      skills[currentIndex + i].classList.add("skills__list-item--active");
    }
  }

  // Add the active class to the corresponding dot
  const activeDotIndex = Math.floor(currentIndex / itemsPerPage);
  const dots = document.querySelectorAll(
    ".skills__list-progress-bar > .progress-bar-dot"
  );
  dots[activeDotIndex].classList.add("progress-bar-dot--active");
}

function startInterval() {
  intervalId = setInterval(() => {
    currentIndex += itemsPerPage;
    if (currentIndex >= skills.length) {
      currentIndex = 0;
    }
    updateSkillsAndDots();
  }, intervalTime);
  return intervalId;
}

// Display the first set of skills
for (let i = 0; i < itemsPerPage; i++) {
  if (skills[i]) {
    skills[i].classList.add("skills__list-item--active");
  }
}

// Create the dots and lines in the progress bar
for (let i = 0; i < Math.ceil(skills.length / itemsPerPage); i++) {
  const dot = document.createElement("span");
  dot.classList.add("progress-bar-dot");
  progressBar.appendChild(dot);

  // Don't add a line after the last dot
  if (i < Math.ceil(skills.length / itemsPerPage) - 1) {
    const line = document.createElement("span");
    line.classList.add("progress-bar-line");
    progressBar.appendChild(line);
  }

  // Make the first dot active
  if (i === 0) {
    dot.classList.add("progress-bar-dot--active");
  }
}

// Add click event listeners to dots for manual navigation
const dots = document.querySelectorAll(
  ".skills__list-progress-bar > .progress-bar-dot"
);
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    clearInterval(intervalId);
    // Move to the clicked dot's set of skills
    currentIndex = index * itemsPerPage;
    updateSkillsAndDots();
    startInterval();
  });
});

startInterval();
