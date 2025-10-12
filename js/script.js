document.addEventListener('DOMContentLoaded', () => {
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
     * Fetches data from the JSON file.
     */
    async function fetchData() {
        try {
            const response = await fetch('data.json');
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
     * @param {boolean} [isFinalMessage=false] - Whether this is the final message.
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
     * It displays a confirmation message and creates a celebratory emoji animation.
     */
    function handleYesClick() {
        questionElement.style.display = "none";
        buttonsDiv.style.display = "none";

        showMessage('SIIII, I LOVE YOUUU SO MUCH MY LOVE 💖😍', true);

        const fragment = document.createDocumentFragment();
        for (let i = 0; i < 30; i++) {
            const emoji = createEmoji();
            fragment.appendChild(emoji);
        }
        emojisContainer.appendChild(fragment);
    }

    /**
     * Creates an emoji element for animation.
     * @returns {HTMLElement} The emoji element.
     */
    function createEmoji() {
        const emoji = document.createElement('span');
        emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + 'vw';
        emoji.style.animationDelay = Math.random() * 3 + 's';
        return emoji;
    }

    /**
     * Initializes the falling emoji animation and event listeners.
     */
    function initialize() {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < 20; i++) {
            const emoji = createEmoji();
            fragment.appendChild(emoji);
        }
        emojisContainer.appendChild(fragment);

        yesButton.addEventListener('click', handleYesClick);
        noButton.addEventListener('click', handleNoClick);
    }

    fetchData();
});