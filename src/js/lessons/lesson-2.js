document.addEventListener('DOMContentLoaded', () => {
    // --- SHOGGOTH INTERACTIVE ---
    const shoggothControls = document.getElementById('shoggoth-controls');
    const layers = {
        pretrain: document.getElementById('shoggoth-pretrain'),
        sft: document.getElementById('shoggoth-sft'),
        rlhf: document.getElementById('shoggoth-rlhf')
    };
    
    if (shoggothControls && layers.pretrain) {
        shoggothControls.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                const step = e.target.dataset.step;
                Object.values(layers).forEach(l => l.style.opacity = '0');
                if (step === 'pretrain') {
                    layers.pretrain.style.opacity = '1';
                } else if (step === 'sft') {
                    layers.pretrain.style.opacity = '1';
                    layers.sft.style.opacity = '1';
                } else if (step === 'rlhf') {
                    layers.pretrain.style.opacity = '1';
                    layers.sft.style.opacity = '1';
                    layers.rlhf.style.opacity = '1';
                }
            }
        });
    }

    // --- TEMPERATURE SAMPLING VIZ ---
    const tempSlider = document.getElementById('temp-slider');
    const tempValue = document.getElementById('temp-value');
    const tempViz = document.getElementById('temp-viz');
    
    if (tempSlider && tempValue && tempViz) {
        const initialLogits = [
            { token: 'deterministic', logit: 4.0 },
            { token: 'focused', logit: 3.5 },
            { token: 'creative', logit: 2.0 },
            { token: 'surprising', logit: 1.5 },
            { token: 'random', logit: 0.5 }
        ];

        const softmax = (logits, temp) => {
            const adjustedLogits = logits.map(l => l / temp);
            const maxLogit = Math.max(...adjustedLogits);
            const exps = adjustedLogits.map(l => Math.exp(l - maxLogit));
            const sumExps = exps.reduce((a, b) => a + b, 0);
            return exps.map(e => e / sumExps);
        };

        const updateTempViz = () => {
            const temp = parseFloat(tempSlider.value);
            tempValue.textContent = temp.toFixed(1);
            const probs = softmax(initialLogits.map(l => l.logit), temp);
            
            tempViz.innerHTML = initialLogits.map((item, i) => {
                const probPercent = (probs[i] * 100).toFixed(1);
                return `
                    <div class="flex items-center">
                        <span class="w-32 font-mono text-sm text-gray-400">${item.token}</span>
                        <div class="flex-grow h-5 bg-gray-700 rounded overflow-hidden">
                            <div class="h-full bg-indigo-500 rounded bar" style="width: ${probPercent}%;"></div>
                        </div>
                        <span class="ml-3 w-12 text-sm font-mono">${probPercent}%</span>
                    </div>
                `;
            }).join('');
        };

        tempSlider.addEventListener('input', updateTempViz);
        updateTempViz();
    }
});
