let responseAsJson;
let id;
let pokeName;
let pokeImage;
let stats;
let currentPokemon;
let pokemons = [];
let pokemon;
let results;
let pokeNrFrom = 0;
let PokeNrTo = 99;
let statNames = [];
let statNumbers = [];


async function filterPokemons() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    document.getElementById('main-container').innerHTML = ` 
    <div id="card-container" style="display:none" onclick="hideCard()">
    </div>`;
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
            <div class="poke-box"><img class="pokemon" src="${pokeImage}" onclick="showClickedPokemon(${i})">
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
    id = currentPokemon['id'];
    console.log('Pokemon information', responseAsJson);
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
        <div class="poke-box"><img class="pokemon" src="${pokeImage}" onclick="showClickedPokemon(${i})">
        ${pokeName}
        </div>
        `;
    }
    //console.log(pokemons);
}


function renderSecondPage(startNr, endNr) {
    document.getElementById('main-container').innerHTML = ` 
    <div id="card-container" style="display:none" onclick="hideCard()">
    </div>`;
    pokeNrFrom = startNr;
    PokeNrTo = endNr;
    loadPokemon();
    //console.log(pokemons);
}

function showCard() {
    document.getElementById('card-container').style.display = '';
}

function hideCard() {
    document.getElementById('card-container').style.display = 'none';
    document.getElementById('card-container').innerHTML ='';
    document.getElementById('search').value = '';
}

function showClickedPokemon(i) {
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

            <canvas id="stats" width="50" height="20">
            </canvas>

            <div id="moves">
            </div>
        </div>
</div>`;
}

function showPokemon() {
    statNames = [];
    statNumbers = [];
    showCard();
    renderCard();
    renderHeader();
    renderStats();
    //console.log(statNames, statNumbers);
    drawChart();
    typeCheck();

}

function renderHeader(){
    document.getElementById('pokemonHeader').innerHTML = `
    <div class="name-box">
    <div>
    ${pokeName}
    </div>
    <div>
    #${id}
    </div>
    </div>
    `;
    document.getElementById('pokemonImage').src = pokeImage;
}

function renderStats(){
    for (let i = 0; i < stats.length; i++) {
        let stat = stats[i]['base_stat'];
        let statName = stats[i]['stat']['name'];
        statNames.push(statName);
        statNumbers.push(stat);
    }

}



function typeCheck() {
    if (type == 'grass' || type == 'bug') {
        document.getElementById('pokemonHeader').style.backgroundColor = "green";
    }
    if (type == 'water' || type == 'steel') {
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
        type: 'doughnut',
        data: {
            labels: statNames,
            datasets: [{
                axis: 'y',
                label: 'stats',
                data: statNumbers,
                fill: false,
                borderWidth: 1
            }
            ]
        },
        options: {
          
            layout: {
                padding: {
                    left: 50,
                    right:50
                }
            },
            indexAxis: 'y',
            scales: {
                
                x: {
                    display:false,
                    grid: {
                        display: false
                    },
                    ticks: {
                        display: false
                    }
                },
                y: {
                    border:{
                        display:false
                    },
                    grid: {
                        display: false
                    },
                    ticks: {
                        display:false,
                        crossAlign: "far",
                      },

                }
            }  
        },
        plugins: [ChartDataLabels]
    });
}