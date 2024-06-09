# Radek Drweski Portfolio Website

Welcome to my personal portfolio website. This website is designed to showcase my skills, projects, and provide a way to contact me. Below you'll find a detailed description of the website's features and how to set it up on your local machine.

## Table of Contents

- [Features](#features)
  - [Navigation](#navigation)
  - [Header](#header)
  - [Skills Section](#skills-section)
  - [Projects Section](#projects-section)
  - [Contact Section](#contact-section)
- [Technologies Used](#technologies-used)
- [Installation](#setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

### Navigation

- **Fixed Navigation Bar**: The navigation bar remains fixed at the top of the page while scrolling.
- **Animated Navigation Links**: Links have a smooth animation effect using jQuery.
- **Responsive Burger Menu**:
  - When the page width is 480px or less, the navigation links transform into a burger menu.
  - The burger icon is animated with CSS: when closed, it shows three lines; when opened, it transforms into an arrow indicating how to close the menu.
  - When the burger menu is open, the background is blurred. Clicking anywhere on the blurred background closes the menu.

### Header

- **Intro Section**: Includes an introductory message with a JavaScript animation effect using classes.

### Skills Section

- **Skills Display**: Skills are displayed with images (SVG's) and descriptions.
  - **Desktop View**: Displays 4 images per row.
  - **Mobile View**: Displays 2 rows with 2 images per row.
- **Image Slider**:
  - Images are displayed in a slider format using `setInterval` in JavaScript along with CSS animations.
  - **Progress Bar**:
    - Dots and connecting lines are generated automatically with JavaScript based on the number of images.
    - Clicking on a dot highlights the corresponding set of images. Each set of 4 images has a dot that becomes highlighted when active.

### Projects Section

- **Project Display**: Shows my work with the same progress bar functionality as the Skills section.

### Contact Section

- **Form Validation**:
  - Each input is validated upon clicking the submit button.
  - If an input is not filled, a message is displayed indicating which input needs attention.
  - Inputs have placeholders that move to the top when clicked (using CSS focus).
  - If an input is not filled and loses focus, the placeholder and bottom border return to their original state.
- **Form Submission**:
  - When all fields are filled, the form submission is sent to the website owner's email address using PHP and PHPMailer with Composer.
  - The form is checked on the server side again for validation to ensure all fields are correctly filled.
  - In case of server errors, the user receives a message displayed as a 'toast' (popup message).
  - If there is no internet connection when the form is submitted, the user gets a warning message displayed as a 'toast'.
  - An animation is shown while waiting for the server response during form submission. Once a positive response is received, the animation disappears.
  - All sensitive data in the PHP file is hidden in a `config.php` file.

### General

- **Responsive Design**: The website is fully responsive and works on all devices.
- **SEO and Social Media Meta Tags**: The website includes SEO enhancements and meta tags for better visibility on search engines and social media platforms.
- **Webpack Configuration**: The project uses Webpack for bundling.

## Technologies Used

- **HTML5**
- **SASS**
- **JavaScript (ES6+)**
- **jQuery**
- **Webpack**
- **PHP**
- **PHPMailer**
- **Composer**

## Installation

### Prerequisites

- Ensure you have Node.js, npm, PHP, and Composer installed on your machine.

### Steps

1. **Clone the Repository**:

   ```bash
   - git clone https://github.com/radek-drw/Portfolio.git
   - cd radek-drweski-portfolio

   ```

2. **Install dependencies**:

   - npm install
   - composer install

3. **Start the Development Server**:

   - npm start

   This will start the development server and open the website in your default browser.

4. **Build for Production**:

   - npm run build

   This will create an optimized production build in the dist folder.

## Usage

- Navigation: Use the top navigation bar to jump to different sections of the website.
- Skills and Projects: Click on the dots in the skills and projects sections to navigate through different items.
- Contact Form: Fill in the contact form to get in touch with me. Ensure all fields are filled correctly before submitting.

## Contributing

If you would like to contribute to this project, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

This project is open source and available under the MIT License.

## Contact

If you have any questions or feedback, feel free to contact me at [rdrweski@gmail.com].

Thank you for visiting my portfolio website!
