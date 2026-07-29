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

        // Function to display sample text when difficulty is selected
        function displaySampleText() {
            const difficulty = document.getElementById("inputGroupSelect01").value;
            const difficultyKey = Object.keys(sampleTexts)[difficulty - 1];
            const sampleTextElement = document.getElementById("sample-text");
            const randomText = getRandomSampleText(difficultyKey);
            sampleTextElement.textContent = randomText;
        }

        let startTime = null;
        let endTime = null;

        function startTest() {
            startTime = Date.now();
            endTime = null;
            document.getElementById("start-button").disabled = true;
            document.getElementById("stop-button").disabled = false;
            document.getElementById("time").textContent = "0";
        }

        function stopTest() {
            if (startTime === null) return;
            endTime = Date.now();
            const elapsedSeconds = (endTime - startTime) / 1000;
            displayTestTime(elapsedSeconds);
            document.getElementById("stop-button").disabled = true;
        }

        function resetTest() {
            startTime = null;
            endTime = null;
            document.getElementById("start-button").disabled = false;
            document.getElementById("stop-button").disabled = true;
            document.getElementById("time").textContent = "0";
        }

        function displayTestTime(seconds) {
            const formattedTime = seconds.toFixed(2);
            document.getElementById("time").textContent = formattedTime;
        }

        // Add event listener to difficulty selector
        document.addEventListener("DOMContentLoaded", function() {
            const difficultySelect = document.getElementById("inputGroupSelect01");
            difficultySelect.addEventListener("change", displaySampleText);
            document.getElementById("start-button").addEventListener("click", startTest);
            document.getElementById("stop-button").addEventListener("click", stopTest);
            document.getElementById("reset-button").addEventListener("click", resetTest);
            // Display initial text on page load
            displaySampleText();
        });
    