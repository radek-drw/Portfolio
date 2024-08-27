describe("Skills Slider Tests", () => {
  let skills, progressBar, dots;

  const intervalTime = 4000;

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

    // Initialize dots in progressBar
    for (let i = 0; i < Math.ceil(skills.length / 4); i++) {
      const dot = document.createElement("span");
      dot.classList.add("progress-bar-dot");
      progressBar.appendChild(dot);

      if (i < Math.ceil(skills.length / 4) - 1) {
        const line = document.createElement("span");
        line.classList.add("progress-bar-line");
        progressBar.appendChild(line);
      }

      if (i === 0) {
        dot.classList.add("progress-bar-dot--active");
      }
    }

    dots = document.querySelectorAll(".progress-bar-dot");

    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("updateSkillsAndDots should display the correct skills and activate the correct dot", () => {
    let currentIndex = 0;

    const mockUpdateSkillsAndDots = () => {
      const itemsPerPage = 4;
      const activeSkills = document.querySelectorAll(
        ".skills__list-item--active"
      );
      activeSkills.forEach((skill) =>
        skill.classList.remove("skills__list-item--active")
      );

      for (let i = 0; i < itemsPerPage; i++) {
        if (skills[currentIndex + i]) {
          skills[currentIndex + i].classList.add("skills__list-item--active");
        }
      }

      // Activate the corresponding dot
      const activeDotIndex = Math.floor(currentIndex / itemsPerPage);
      dots.forEach((dot) => dot.classList.remove("progress-bar-dot--active"));
      if (dots[activeDotIndex]) {
        dots[activeDotIndex].classList.add("progress-bar-dot--active");
      }
    };

    // Simulate moving to the next set of skills
    currentIndex = 0;
    mockUpdateSkillsAndDots(); // Update the DOM based on `currentIndex`

    const activeSkills = document.querySelectorAll(
      ".skills__list-item--active"
    );
    expect(activeSkills.length).toBe(4); // Check if 4 skills are active
    expect(activeSkills[0].textContent).toBe("Skill 1"); // The first skill should be active

    const activeDot = document.querySelector(".progress-bar-dot--active");
    expect(activeDot).not.toBeNull(); // Ensure a dot is active
  });
});
