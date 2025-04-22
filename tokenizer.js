console.log("tokenizer.js chargé");

function buildBPE(text, numIterations = 10) {
    console.log("Texte reçu pour tokenisation :", text);
    let words = text.split(/\s+/);
    let pairs = {};

    function getPairs(words) {
        let pairFreqs = {};
        words.forEach(word => {
            let wordChars = word.split('');
            for (let i = 0; i < wordChars.length - 1; i++) {
                const pair = wordChars[i] + wordChars[i + 1];
                pairFreqs[pair] = (pairFreqs[pair] || 0) + 1;
            }
        });
        return pairFreqs;
    }

    pairs = getPairs(words);

    for (let iteration = 0; iteration < numIterations; iteration++) {
        console.log(`Itération ${iteration + 1}:`);
        console.log("Paires actuelles:", pairs);

        let maxPair = Object.keys(pairs).reduce((a, b) => pairs[a] > pairs[b] ? a : b, null);

        if (!maxPair || pairs[maxPair] <= 1) {
            console.log("Aucune paire fréquente trouvée, arrêt du processus.");
            break;
        }

        console.log(`Fusion de la paire la plus fréquente: ${maxPair}`);

        let newWords = [];

        words.forEach(word => {
            const newWord = word.replace(new RegExp(maxPair, 'g'), maxPair);
            newWords.push(newWord);
        });

        words = newWords;
        pairs = getPairs(words);
    }

    const result = words.join(' ');
    console.log("Texte final tokenisé :", result);
    return result;
}

// Exemple automatique
const text = "low low lower newest";
const tokenizedText = buildBPE(text, 10);
console.log("Résultat final :", tokenizedText);
