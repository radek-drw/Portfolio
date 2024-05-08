const intervalTime = 3500;
const itemsPerPage = 4;
let currentIndex = 0;
const skills = document.querySelectorAll(".skills__list-item");
const progressBar = document.querySelector(".skills__progress-bar");
let intervalId;

// Function to update the displayed skills and the active dot
function updateSkillsAndDots() {
  // Get all currently active skills and dots
  const activeSkills = document.querySelectorAll(".skills__list-item--active");
  const activeDots = document.querySelectorAll(
    ".skills__progress-bar-dot--active"
  );

  // Remove the active class from all currently active skills and dots
  activeSkills.forEach((skill) =>
    skill.classList.remove("skills__list-item--active")
  );
  activeDots.forEach((dot) =>
    dot.classList.remove("skills__progress-bar-dot--active")
  );

  // Add the active class to the next set of skills
  for (let i = 0; i < itemsPerPage; i++) {
    if (skills[currentIndex + i]) {
      skills[currentIndex + i].classList.add("skills__list-item--active");
    }
  }

  // Add the active class to the corresponding dot
  const activeDotIndex = Math.floor(currentIndex / itemsPerPage);
  const dots = document.querySelectorAll(".skills__progress-bar-dot");
  dots[activeDotIndex].classList.add("skills__progress-bar-dot--active");
}

// Function to start the automatic scroll
function startInterval() {
  intervalId = setInterval(() => {
    updateSkillsAndDots();
    // Move to the next set of skills
    currentIndex += itemsPerPage;
    // If we've reached the end, go back to the start
    if (currentIndex >= skills.length) {
      currentIndex = 0;
    }
  }, intervalTime);

  const dots = document.querySelectorAll(".skills__progress-bar-dot");
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(intervalId);
      // Move to the clicked dot's set of skills
      currentIndex = index * itemsPerPage;
      updateSkillsAndDots();
      // Restart the automatic scroll
      startInterval();
    });
  });
}

// Initialization
// Display the first set of skills
for (let i = 0; i < itemsPerPage; i++) {
  if (skills[i]) {
    skills[i].classList.add("skills__list-item--active");
  }
}

// Create the dots and lines in the progress bar
for (let i = 0; i < skills.length / itemsPerPage; i++) {
  const dot = document.createElement("span");
  dot.classList.add("skills__progress-bar-dot");
  progressBar.appendChild(dot);

  // Don't add a line after the last dot
  if (i < skills.length / itemsPerPage - 1) {
    const line = document.createElement("span");
    line.classList.add("skills__progress-bar-line");
    progressBar.appendChild(line);
  }

  // Make the first dot active
  if (i === 0) {
    dot.classList.add("skills__progress-bar-dot--active");
  }
}
startInterval();
