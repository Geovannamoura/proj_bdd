// Obtendo os elementos da pesquisa
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultList = document.getElementById('result-list');

// Função para buscar os dados do arquivo JSON (simulando a API)
function fetchSweets() {
  return fetch('api-doces/doces.json') // Caminho para o seu arquivo JSON
    .then(response => response.json()) // Converte a resposta em JSON
    .then(data => data.sweets); // Retorna a lista de doces
}

// Função para exibir os resultados da pesquisa
function displayResults(results) {
  resultList.innerHTML = ''; // Limpa os resultados anteriores
if (results.length === 0) {
    resultList.innerHTML = '<p>Nenhum doce encontrado.</p>';
    return;
}

results.forEach(doc => {
    const listItem = document.createElement('table');
    listItem.innerHTML = `
    <div class = "card">
        <h3 style="color: #ff69b4;">${doc.name}</h3>
        <img src="${doc.urlImg}" alt="${doc.name}" style="width: 200px; height: 200px; object-fit: cover; border-radius: 50%;">
        <p>${doc.description}</p>
    </div>
    `;
    resultList.appendChild(listItem);
});
}

// Função para simular a pesquisa da API
function searchSweets(searchTerm) {
fetchSweets().then(sweets => {
    const filteredSweets = sweets.filter(sweet =>
    sweet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    displayResults(filteredSweets);
});
}

// Ação do botão de pesquisa
searchButton.addEventListener('click', function () {
const searchTerm = searchInput.value;
if (searchTerm === '') {
    resultList.innerHTML = ''; // Limpa os resultados se a busca estiver vazia
    return;
}

searchSweets(searchTerm);
});

// pesquisa também ao pressionar "Enter"
searchInput.addEventListener('keydown', function (event) {
if (event.key === 'Enter') {
    const searchTerm = searchInput.value;
    if (searchTerm !== '') {
    searchSweets(searchTerm);
    }
}
});