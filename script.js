let responseAsJson;
let pokeName;
let pokeImage;
let currentPokemon;
let pokemons = [];
let stats;
let pokemon;
let results;
let pokeNrFrom = 0;
let PokeNrTo = 99;
let statNames = [];
let statNumbers = [];


async function filterPokemons() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    console.log(search);
    document.getElementById('main-container').innerHTML = '';

    for (let i = 0; i < pokemons.length; i++) {
        let name = pokemons[i];
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemons[i]}`;
        let response = await fetch(url);
        responseAsJson = await response.json();
        let currentPokemon = responseAsJson;
        pokeName = currentPokemon['name'];
        pokeImage = currentPokemon['sprites']['front_default']
        if (name.toLowerCase().includes(search)) {
            document.getElementById('main-container').innerHTML += `
            <div class="poke-box"><img class="pokemon" src="${pokeImage}" onclick="showFrontPokemon(${i});window.scrollTo(0, 0)">
            ${pokeName}
            </div>
            `;

        }

    }

}

async function getInformation() {
    let input = document.getElementById('search').value;
    let url = `https://pokeapi.co/api/v2/pokemon/${input}`;
    let response = await fetch(url);
    responseAsJson = await response.json();
    let currentPokemon = responseAsJson;
    pokeName = currentPokemon['name'];
    pokeImage = currentPokemon['sprites']['front_default'];
    type = currentPokemon['types']['0']['type']['name'];
    stats = currentPokemon['stats'];
    //console.log('Pokemon information', responseAsJson);
    showPokemon();
}

async function renderFrontPage() {
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
    let response = await fetch(url);
    responseAsJson = await response.json();
    let currentPokemon = responseAsJson['results'];
    for (let i = 0; i < currentPokemon.length; i++) {
        const pokemon = currentPokemon[i]['name'];
        pokemons.push(pokemon);
    }
    loadPokemon();
}

async function loadPokemon() {
    for (let i = pokeNrFrom; i < PokeNrTo; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemons[i]}`;
        let response = await fetch(url);
        responseAsJson = await response.json();
        let currentPokemon = responseAsJson;
        pokeName = currentPokemon['name'];
        pokeImage = currentPokemon['sprites']['front_default']
        document.getElementById('main-container').innerHTML += `
        <div class="poke-box"><img class="pokemon" src="${pokeImage}" onclick="showFrontPokemon(${i})">
        ${pokeName}
        </div>
        `;
    }
    console.log(pokemons);
}


function renderSecondPage(startNr, endNr) {
    document.getElementById('main-container').innerHTML = ` 
    <div id="card-container" style="display:none" onclick="hideCard()">
    </div>`;
    pokeNrFrom = startNr;
    PokeNrTo = endNr;
    loadPokemon();
    console.log(pokemons);
}

function showCard() {
    document.getElementById('card-container').style.display = '';
}

function hideCard() {
    document.getElementById('card-container').style.display = 'none';
    document.getElementById('search').value = '';
}

function showFrontPokemon(i) {
    document.getElementById('search').value = pokemons[i];
    renderCard();
    getInformation();

}

function renderCard() {
    document.getElementById('card-container').innerHTML = `
    
        <div id="card">
        <div id="pokemonHeader">
        </div>
        <div id="pokeInfo">
            <img id="pokemonImage">
            <div id="type-container">
            </div>

            <canvas id="stats">

            </canvas>
        </div>
    </div>
</div>`;

}

function showPokemon() {
    statNames=[];
    statNumbers=[];
    renderCard();
    document.getElementById('stats').innerHTML = '';
    document.getElementById('type-container').innerHTML = '';
    document.getElementById('pokemonHeader').innerHTML = `${pokeName}
    `;
    document.getElementById('pokemonImage').src = pokeImage;
    for (let i = 0; i < stats.length; i++) {
        let stat = stats[i]['base_stat'];
        let statName = stats[i]['stat']['name'];
        statNames.push(statName);
        statNumbers.push(stat);
    }
    console.log(statNames,statNumbers);
    drawChart();
    typeCheck();
    showCard();
}

function typeCheck() {
    if (type == 'grass' || type == 'bug') {
        document.getElementById('pokemonHeader').style.backgroundColor = "green";
    }
    if (type == 'water') {
        document.getElementById('pokemonHeader').style.backgroundColor = "blue";
    }
    if (type == 'normal') {
        document.getElementById('pokemonHeader').style.backgroundColor = "grey";
    }
    if (type == 'poison' || type == 'psychic') {
        document.getElementById('pokemonHeader').style.backgroundColor = "purple";
    }
    if (type == 'electric') {
        document.getElementById('pokemonHeader').style.backgroundColor = "yellow";
    }
    if (type == 'ground' || type == 'fighting' || type == 'rock') {
        document.getElementById('pokemonHeader').style.backgroundColor = "brown";
    }
    if (type == 'fire') {
        document.getElementById('pokemonHeader').style.backgroundColor = "red";
    }
    document.getElementById('type-container').innerHTML += `Typ: ${type}`;

}

function drawChart() {
    const ctx = document.getElementById('stats');

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: statNames,
            datasets: [{
                label: 'stats',
                data: statNumbers,
                borderWidth: 2
            }]
        }
    });
}