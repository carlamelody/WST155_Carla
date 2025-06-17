let currentPage = 1;
const itemsPerPage = 20;
const maxPagesToShow = 10;
let characters = [];
let totalPages = 1;
let currentStartPage = 1;

const getData = async () => {
    try {
        const response = await fetch('https://api.api-onepiece.com/v2/characters/en');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        characters = data;
        totalPages = Math.ceil(characters.length / itemsPerPage);
        renderPage();
        updatePaginationButtons();
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        document.getElementById('data').innerHTML = `<p style="color:red;">Failed to fetch data. Check console for details.</p>`;
    }
};

const renderPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageCharacters = characters.slice(startIndex, endIndex);

    const output = pageCharacters.map(character =>
        `<div class="character-card">
            <h2>${character.name}</h2>
            <p>Age: ${character.age}</p>
            <p>Size: ${character.size} cm</p>                       
            <p>Bounty: ${character.bounty} berries</p>
            <p>Job: ${character.job}</p>

            ${character.crew ? `  
            <p>Crew: ${character.crew.name}</p>
            <p>Roman Name: ${character.crew.roman_name}</p>
            ` : '<p>No Crew</p>'}

            ${character.fruit ? `  
            <p>Fruit: ${character.fruit.name}</p>
            <p>Type: ${character.fruit.type}</p>
            <p>Roman Name: ${character.fruit.roman_name}</p>
            ` : '<p>No Devil Fruit</p>'}

            <p>Status: ${character.status}</p>
        </div>`).join('');

    document.getElementById('data').innerHTML = output;
    renderPageNumbers();
    window.scrollTo(0, 0);
};

const renderPageNumbers = () => {
    const pageNumbersDiv = document.getElementById('pageNumbers');
    pageNumbersDiv.innerHTML = '';
    const startPage = currentStartPage;
    const endPage = Math.min(currentStartPage + maxPagesToShow - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement('button');
        pageButton.classList.add('page-button');
        pageButton.textContent = i;
        pageButton.disabled = i === currentPage;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            renderPage();
            updatePaginationButtons();
        });
        pageNumbersDiv.appendChild(pageButton);
    }
};

const updatePaginationButtons = () => {
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages;
};

document.getElementById('prevPage').addEventListener('click', () => {
    if (currentStartPage > 1) {
        currentStartPage -= maxPagesToShow;
        renderPage();
        updatePaginationButtons();
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    if (currentStartPage + maxPagesToShow <= totalPages) {
        currentStartPage += maxPagesToShow;
        renderPage();
        updatePaginationButtons();
    }
});

document.getElementById('fetchData').addEventListener('click', getData);
