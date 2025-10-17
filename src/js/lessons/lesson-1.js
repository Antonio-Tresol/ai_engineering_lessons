document.addEventListener('DOMContentLoaded', () => {
    // Tab functionality for adaptation techniques
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding content
            const targetTab = tab.dataset.tab;
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Crawl-Walk-Run interactive element
    const cwrStages = document.querySelectorAll('.cwr-stage');
    const cwrDesc = document.getElementById('cwr-description');
    const cwrData = {
        crawl: { text: "AI suggests, human decides. (Low Risk)", color: "green" },
        walk: { text: "AI acts, but only internally. (Medium Risk)", color: "yellow" },
        run: { text: "AI acts externally with customers. (High Risk)", color: "red" }
    };

    cwrStages.forEach(stage => {
        stage.addEventListener('click', () => {
            const selectedStage = stage.dataset.stage;
            
            cwrStages.forEach(s => {
                s.classList.add('opacity-50');
                const indicator = s.querySelector('.cwr-indicator');
                indicator.classList.remove('bg-green-500/30', 'bg-yellow-500/30', 'bg-red-500/30');
            });
            
            stage.classList.remove('opacity-50');
            const activeIndicator = stage.querySelector('.cwr-indicator');
            activeIndicator.classList.add(`bg-${cwrData[selectedStage].color}-500/30`);
            cwrDesc.textContent = cwrData[selectedStage].text;
        });
    });

    // Simple text animation for self-supervision demo
    const demoText = document.querySelector('#self-supervision-demo span');
    if (demoText) {
        const phrases = ["The quick brown fox...", "Self-supervision is key...", "Data provides the labels...", "Enabling massive scale..."];
        let phraseIndex = 0;
        setInterval(() => {
            phraseIndex = (phraseIndex + 1) % phrases.length;
            demoText.style.opacity = 0;
            setTimeout(() => {
                demoText.textContent = phrases[phraseIndex];
                demoText.style.opacity = 1;
            }, 500);
        }, 4000);
        demoText.style.transition = 'opacity 0.5s ease-in-out';
    }
});
