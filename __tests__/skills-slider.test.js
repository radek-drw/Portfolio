import {
  updateSkillsAndDots,
  startInterval,
  initializeSkillsSlider,
} from "../src/js/skills-slider";

describe("Skills Slider Tests", () => {
  let skills, progressBar, state;

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
    state = initializeSkillsSlider(skills, progressBar);
  });

  test("updateSkillsAndDots should display the correct skills and activate the correct dot", () => {
    state.currentIndex += 4; // Move to the next set of skills
    updateSkillsAndDots(state.currentIndex, skills, progressBar);

    const activeSkills = document.querySelectorAll(
      ".skills__list-item--active"
    );
    expect(activeSkills.length).toBe(2); // Only 2 remaining skills
    expect(activeSkills[0].textContent).toBe("Skill 5");

    const activeDot = document.querySelector(".progress-bar-dot--active");
    expect(activeDot).not.toBeNull();
  });

  test("startInterval should cycle through skills automatically", () => {
    jest.useFakeTimers();

    startInterval(state.currentIndex, skills, progressBar, (index) => {
      state.currentIndex = index;
    });

    jest.advanceTimersByTime(4000);

    const activeSkills = document.querySelectorAll(
      ".skills__list-item--active"
    );
    expect(activeSkills.length).toBe(2);
    expect(activeSkills[0].textContent).toBe("Skill 5");

    jest.useRealTimers();
  });
});
