const intervalTime = 4000;
const itemsPerPage = 4;
let intervalId;

export function updateSkillsAndDots(currentIndex, skills, progressBar) {
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

  const activeDotIndex = Math.floor(currentIndex / itemsPerPage);
  const dots = progressBar.querySelectorAll(".progress-bar-dot");
  dots[activeDotIndex].classList.add("progress-bar-dot--active");
}

export function startInterval(
  currentIndex,
  skills,
  progressBar,
  setCurrentIndex
) {
  intervalId = setInterval(() => {
    currentIndex += itemsPerPage;
    if (currentIndex >= skills.length) {
      currentIndex = 0;
    }
    setCurrentIndex(currentIndex);
    updateSkillsAndDots(currentIndex, skills, progressBar);
  }, intervalTime);
}

export function initializeSkillsSlider(skills, progressBar) {
  for (let i = 0; i < itemsPerPage; i++) {
    if (skills[i]) {
      skills[i].classList.add("skills__list-item--active");
    }
  }

  for (let i = 0; i < Math.ceil(skills.length / itemsPerPage); i++) {
    const dot = document.createElement("span");
    dot.classList.add("progress-bar-dot");
    progressBar.appendChild(dot);

    if (i < Math.ceil(skills.length / itemsPerPage) - 1) {
      const line = document.createElement("span");
      line.classList.add("progress-bar-line");
      progressBar.appendChild(line);
    }

    if (i === 0) {
      dot.classList.add("progress-bar-dot--active");
    }
  }

  return {
    currentIndex: 0, // Initial index
  };
}
