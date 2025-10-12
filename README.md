# San Valentín 💖

A simple, interactive, and fun web page to ask someone to be your Valentine, now powered by Vite and packed with new features!

## Description

This project is a single-page web application that presents a "Will you be my Valentine?" question with "Yes" and "No" buttons. It has been refactored to use Vite for a modern development workflow and includes several new features to make it more interactive and engaging.

## Features

- **Interactive "No" Button:** The "No" button will try to escape the cursor, making it a fun game to try and click it.
- **Personalized Greeting:** You can personalize the question by adding a `name` parameter to the URL (e.g., `?name=Ana`).
- **Confetti Celebration:** A beautiful confetti animation appears when the "Yes" button is clicked.
- **Progressive Web App (PWA):** The application can be installed on your device and will work offline.
- **Social Sharing:** After saying "Yes", you can share the good news on social media.
-**Accessibility:** The application has been improved to be more accessible to users with disabilities.

## Setup and Usage

To run this project locally, you need to have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd vite-project
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start a local server, and you can view the application in your browser at the URL provided (usually `http://localhost:5173`).

5.  **Build for production:**
    ```bash
    npm run build
    ```
    This will create a `dist` folder with the optimized and minified files for deployment.

## Files

-   `vite-project/`: The main project directory.
    -   `index.html`: The main HTML file.
    -   `src/`: Contains the source code.
        -   `main.js`: The main JavaScript file with all the application logic.
        -   `style.css`: The stylesheet for the application.
    -   `public/`: Contains static assets.
        -   `data.json`: The JSON file with the messages and emojis.
        -   `photoOne.png`: An image used in one of the "No" button responses.
        -   `photoTwo.png`: An image used in one of the "No" button responses.
-   `README.md`: This file.