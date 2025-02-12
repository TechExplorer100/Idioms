let idiomsData = [];
const jsonFiles = [
    'Idioms1.json',
    'Idioms2.json',
    'Idioms3.json',
    'Idioms4.json',
    'Idioms5.json'
];

// Load all JSON files and merge the data
async function loadIdioms() {
    for (let file of jsonFiles) {
        await fetch(file)
            .then(response => response.json())
            .then(data => idiomsData = idiomsData.concat(data));
    }
    console.log('Idioms loaded:', idiomsData);
}

function suggestIdiom() {
    const input = document.getElementById('search').value.toLowerCase();
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = '';

    if (input === '') return;

    const filteredIdioms = idiomsData.filter(item => item.Idiom.toLowerCase().includes(input));
    filteredIdioms.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('suggestion-item');
        div.textContent = item.Idiom;
        div.onclick = () => showMeaning(item);
        suggestions.appendChild(div);
    });
}

function showMeaning(item) {
    const idiomInfo = document.getElementById('idiom-info');
    idiomInfo.innerHTML = `<h2>${item.Idiom}</h2><p>${item.Meaning}</p>`;
}

function toggleMode() {
    const body = document.body;
    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
    }
}

// Load idioms when the page loads
window.onload = loadIdioms;