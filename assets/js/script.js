            // Sample texts for different difficulty levels
        const sampleTexts = {
            easy: [
                "The quick brown fox jumps over the lazy dog.",
                "Hello world, this is a simple typing test.",
                "Practice makes perfect when typing fast."
            ],
            medium: [
                "The future of artificial intelligence is boundless and full of possibilities.",
                "Web development requires attention to detail and continuous learning.",
                "Typing speed and accuracy are essential skills in the digital age."
            ],
            hard: [
                "Sophisticated algorithms and complex data structures form the foundation of modern computing paradigms.",
                "Metamorphosis occurs throughout nature as organisms adapt to their constantly changing environments.",
                "The quintessential entrepreneurial spirit thrives on innovation, perseverance, and an unwavering commitment to excellence."
            ]
        };

        // Function to get a random sample text based on difficulty level
        function getRandomSampleText(difficulty) {
            const texts = sampleTexts[difficulty];
            if (!texts) return "Invalid difficulty level.";
            return texts[Math.floor(Math.random() * texts.length)];
        }

        // Store the current sample text so WPM can be calculated later
        let currentSampleText = "";

        // Function to update the sample text shown on the page
        function displaySampleText() {
            const difficulty = document.getElementById("inputGroupSelect01").value;
            const difficultyKey = Object.keys(sampleTexts)[difficulty - 1];
            const randomText = getRandomSampleText(difficultyKey);
            currentSampleText = randomText;
            displaySelectedLevel(difficultyKey);
            renderSampleText();
        }

        function renderSampleText() {
            const sampleTextElement = document.getElementById("sample-text");
            const sampleWords = normalizeText(currentSampleText).split(" ").filter(Boolean);
            sampleTextElement.innerHTML = sampleWords.map(word => ` <span class="pending-word">${word}</span>`).join(" ");
        }

        // Function to show the selected difficulty level in the results area
        function displaySelectedLevel(difficultyKey) {
            const levelText = difficultyKey
                ? difficultyKey.charAt(0).toUpperCase() + difficultyKey.slice(1)
                : "Unknown";
            document.getElementById("level").textContent = levelText;
        }

        function highlightTypedWords() {
            const typedText = document.getElementById("user-input").value;
            const typedWords = normalizeText(typedText).split(" ").filter(Boolean);
            const sampleTextElement = document.getElementById("sample-text");
            const wordSpans = sampleTextElement.querySelectorAll("span");

            wordSpans.forEach((span, index) => {
                const sampleWord = span.textContent;
                const typedWord = typedWords[index];
                if (typedWord === undefined) {
                    span.className = "pending-word";
                } else if (typedWord === sampleWord) {
                    span.className = "correct-word";
                } else {
                    span.className = "incorrect-word";
                }
            });
        }

        // Clean up whitespace so comparisons are consistent
        function normalizeText(text) {
            return text.trim().replace(/\s+/g, " ");
        }

        // Count how many words the user typed correctly in the same order
        function calculateCorrectWords(typedText, sampleText) {
            const sampleWords = normalizeText(sampleText).split(" ").filter(Boolean);
            const typedWords = normalizeText(typedText).split(" ").filter(Boolean);
            let correctWords = 0;
            const wordCount = Math.min(sampleWords.length, typedWords.length);
            for (let i = 0; i < wordCount; i++) {
                if (typedWords[i] === sampleWords[i]) {
                    correctWords += 1;
                }
            }
            return correctWords;
        }

        // Convert correct words and elapsed time into words per minute
        function calculateWpm(correctWords, elapsedSeconds) {
            if (elapsedSeconds <= 0) return 0;
            return Math.round((correctWords / elapsedSeconds) * 60);
        }

        // State variables for the test timer
        let startTime = null;
        let endTime = null;

        // Start the typing test: record the time, clear input, and enable user typing
        function startTest() {
            startTime = Date.now();
            endTime = null;
            const typingInput = document.getElementById("user-input");
            typingInput.value = "";
            typingInput.disabled = false;
            typingInput.focus();
            document.getElementById("start-button").disabled = true;
            document.getElementById("stop-button").disabled = false;
            document.getElementById("time").textContent = "0";
        }

        // Stop the test: calculate elapsed time, WPM, and lock the input area
        function stopTest() {
            if (startTime === null) return;
            endTime = Date.now();
            const elapsedSeconds = (endTime - startTime) / 1000;
            displayTestTime(elapsedSeconds);

            const typedText = document.getElementById("user-input").value;
            const correctWords = calculateCorrectWords(typedText, currentSampleText);
            const wpm = calculateWpm(correctWords, elapsedSeconds);
            document.getElementById("wpm").textContent = wpm;

            document.getElementById("stop-button").disabled = true;
            document.getElementById("user-input").disabled = true;
        }

        // Reset the test state and results to the initial values
        function resetTest() {
            startTime = null;
            endTime = null;
            const typingInput = document.getElementById("user-input");
            typingInput.value = "";
            typingInput.disabled = true;
            document.getElementById("start-button").disabled = false;
            document.getElementById("stop-button").disabled = true;
            document.getElementById("time").textContent = "0";
            document.getElementById("wpm").textContent = "0";
        }

        // Display the elapsed test time rounded to two decimal places
        function displayTestTime(seconds) {
            const formattedTime = seconds.toFixed(2);
            document.getElementById("time").textContent = formattedTime;
        }

        // Add event listener to difficulty selector
        document.addEventListener("DOMContentLoaded", function() {
            const difficultySelect = document.getElementById("inputGroupSelect01");
            const typingInput = document.getElementById("user-input");
            difficultySelect.addEventListener("change", displaySampleText);
            typingInput.addEventListener("input", highlightTypedWords);
            document.getElementById("start-button").addEventListener("click", startTest);
            document.getElementById("stop-button").addEventListener("click", stopTest);
            document.getElementById("reset-button").addEventListener("click", resetTest);
            // Display initial text on page load
            displaySampleText();
        });
    