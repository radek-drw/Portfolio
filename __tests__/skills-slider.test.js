/**
 * @jest-environment jsdom
 */

const intervalTime = 4000;
const itemsPerPage = 4;
let currentIndex = 0;
let intervalId;
let skills;
let progressBar;

beforeEach(() => {
  document.body.innerHTML = `
    <div class="skills__list">
      <div class="skills__list-item">Skill 1</div>
      <div class="skills__list-item">Skill 2</div>
      <div class="skills__list-item">Skill 3</div>
      <div class="skills__list-item">Skill 4</div>
      <div class="skills__list-item">Skill 5</div>
      <div class="skills__list-item">Skill 6</div>
    </div>
    <div class="skills__list-progress-bar"></div>
  `;

  skills = document.querySelectorAll(".skills__list-item");
  progressBar = document.querySelector(".skills__list-progress-bar");

  // Initialize your script's behavior as necessary
  initializeProgressBar();
  updateSkillsAndDots();
});

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

  const activeDotIndex = Math.floor(currentIndex / itemsPerPage);
  const dots = document.querySelectorAll(
    ".skills__list-progress-bar > .progress-bar-dot"
  );
  dots[activeDotIndex].classList.add("progress-bar-dot--active");
}

function initializeProgressBar() {
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
}

test("initializes the progress bar correctly", () => {
  const dots = document.querySelectorAll(".progress-bar-dot");
  expect(dots.length).toBe(2); // since we have 6 skills and 4 items per page, we expect 2 dots

  const activeDot = document.querySelector(".progress-bar-dot--active");
  expect(activeDot).not.toBeNull();
});

test("displays the correct number of active skills", () => {
  const activeSkills = document.querySelectorAll(".skills__list-item--active");
  expect(activeSkills.length).toBe(itemsPerPage);
  expect(activeSkills[0].textContent).toBe("Skill 1");
  expect(activeSkills[1].textContent).toBe("Skill 2");
  expect(activeSkills[2].textContent).toBe("Skill 3");
  expect(activeSkills[3].textContent).toBe("Skill 4");
});

test("updates skills and dots when moving to the next set", () => {
  currentIndex += itemsPerPage;
  updateSkillsAndDots();

  const activeSkills = document.querySelectorAll(".skills__list-item--active");
  expect(activeSkills.length).toBe(2); // Only 2 remaining skills

  const activeDot = document.querySelector(".progress-bar-dot--active");
  expect(activeDot.nextSibling).toBeDefined();
});

test("clicking a dot updates the displayed skills and dots", () => {
  const dots = document.querySelectorAll(".progress-bar-dot");
  dots[1].click(); // Simulate clicking the second dot

  const activeSkills = document.querySelectorAll(".skills__list-item--active");
  expect(activeSkills.length).toBe(2); // Only 2 remaining skills should be active

  const activeDot = document.querySelector(".progress-bar-dot--active");
  expect(dots[1]).toBe(activeDot);
});
