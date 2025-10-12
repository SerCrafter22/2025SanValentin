import confetti from 'canvas-confetti';

let noMessages, emojis;
let lastNoMessageIndex = -1;
let yesButtonScale = 1;

const questionElement = document.getElementById('question');
const buttonsDiv = document.getElementById('buttons');
const messageElement = document.getElementById('message');
const yesButton = document.getElementById('yesButton');
const noButton = document.querySelector('.no');
const emojisContainer = document.getElementById('emojisContainer');

/**
 * Fetches data (messages and emojis) from the data.json file and initializes the application.
 */
async function fetchData() {
    try {
        const response = await fetch('/data.json');
        const data = await response.json();
        noMessages = data.noMessages;
        emojis = data.emojis;
        initialize();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

/**
 * Displays a message on the screen.
 * @param {string} text - The message to display.
 * @param {boolean} [isFinalMessage=false] - Whether this is the final message, which affects styling.
 */
function showMessage(text, isFinalMessage = false) {
    messageElement.innerHTML = text;
    messageElement.style.color = "#ff4d4d";
    messageElement.style.fontWeight = "bold";
    messageElement.style.display = "block";
    if (isFinalMessage) {
        messageElement.style.fontSize = "2.5rem";
        messageElement.classList.add("glow");
    } else {
        messageElement.style.fontSize = "1.5rem";
    }
}

/**
 * Handles the click event for the "No" button.
 * It increases the size of the "Yes" button and displays a random message.
 */
function handleNoClick() {
    yesButtonScale += 0.2;
    yesButton.style.transform = `scale(${yesButtonScale})`;

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * noMessages.length);
    } while (randomIndex === lastNoMessageIndex);
    lastNoMessageIndex = randomIndex;

    showMessage(noMessages[randomIndex]);
}

/**
 * Handles the click event for the "Yes" button.
 * It displays a confirmation message, triggers a confetti animation,
 * and shows the share button.
 */
function handleYesClick() {
    questionElement.style.display = "none";
    buttonsDiv.style.display = "none";

    showMessage('SIIII, I LOVE YOUUU SO MUCH MY LOVE 💖😍', true);

    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 30; i++) {
        const emoji = createEmoji();
        fragment.appendChild(emoji);
    }
    emojisContainer.appendChild(fragment);

    const shareContainer = document.getElementById('share-container');
    shareContainer.style.display = 'block';

    const shareButton = document.getElementById('share-button');
    shareButton.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: 'San Valentín',
                text: '¡Dije que sí!',
                url: window.location.href
            }).catch(console.error);
        } else {
            // Fallback for desktop
            const shareUrl = `https://twitter.com/intent/tweet?text=¡Dije que sí!&url=${window.location.href}`;
            window.open(shareUrl, '_blank');
        }
    });
}

/**
 * Creates a single emoji span element with random positioning and animation delay.
 * @returns {HTMLElement} The created emoji span element.
 */
function createEmoji() {
    const emoji = document.createElement('span');
    emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = Math.random() * 100 + 'vw';
    emoji.style.animationDelay = Math.random() * 5 + 's';
    return emoji;
}

/**
 * Initializes the application.
 * - Personalizes the question if a name is provided in the URL.
 * - Creates the initial falling emoji animation.
 * - Sets up event listeners for the buttons.
 */
function initialize() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    if (name) {
        questionElement.innerHTML = `¿${name}, quieres ser mi San Valentín? 💕`;
    }

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 20; i++) {
        const emoji = createEmoji();
        fragment.appendChild(emoji);
    }
    emojisContainer.appendChild(fragment);

    yesButton.addEventListener('click', handleYesClick);
    noButton.addEventListener('click', handleNoClick);
    noButton.addEventListener('mouseover', () => {
        const card = document.querySelector('.card');
        const cardRect = card.getBoundingClientRect();
        const noButtonRect = noButton.getBoundingClientRect();

        const newTop = Math.random() * (cardRect.height - noButtonRect.height);
        const newLeft = Math.random() * (cardRect.width - noButtonRect.width);

        noButton.style.position = 'absolute';
        noButton.style.top = `${newTop}px`;
        noButton.style.left = `${newLeft}px`;
    });
}

fetchData();