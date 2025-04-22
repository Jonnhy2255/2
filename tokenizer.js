function buildBPE(text, numIterations = 10) {
    // Séparer le texte en mots
    let words = text.split(/\s+/);  // On sépare par les espaces blancs
    let pairs = {};

    // Fonction pour récupérer toutes les paires dans les mots
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

    // Initialiser les paires de caractères
    pairs = getPairs(words);

    // Appliquer BPE pendant un certain nombre d'itérations
    for (let iteration = 0; iteration < numIterations; iteration++) {
        // Trouver la paire la plus fréquente
        let maxPair = Object.keys(pairs).reduce((a, b) => pairs[a] > pairs[b] ? a : b);

        // Créer un nouveau token à partir de la paire la plus fréquente
        let newToken = maxPair;
        let newWords = [];

        // Remplacer la paire la plus fréquente par un nouveau token dans tous les mots
        words.forEach(word => {
            // Remplacer toutes les occurrences de la paire par le nouveau token
            const newWord = word.replace(new RegExp(maxPair, 'g'), newToken);
            newWords.push(newWord);
        });

        // Mettre à jour les mots avec les nouvelles paires fusionnées
        words = newWords;

        // Recalculer les paires après cette itération
        pairs = getPairs(words);
    }

    // Retourner le texte transformé avec les sous-mots fusionnés
    return words.join(' ');
}

// Exemple d'utilisation
const text = "low low lower newest";
const tokenizedText = buildBPE(text, 10); // Appliquer BPE avec 10 itérations
console.log(tokenizedText);
