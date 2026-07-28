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

        // Add event listener to difficulty selector
        document.addEventListener("DOMContentLoaded", function() {
            const difficultySelect = document.getElementById("inputGroupSelect01");
            difficultySelect.addEventListener("change", displaySampleText);
            // Display initial text on page load
            displaySampleText();
        });
    