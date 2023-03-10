let responseAsJson;
let pokeName;
let pokeImage;
let pokemons = ["charmander","charmeleon","charizard", "squirtle","	wartortle","blastoise", "bulbasaur","ivysaur","venusaur"];
let currentPokemon;
let stats;
let pokemon;

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

    console.log('Pokemon information', responseAsJson);
    showPokemon();

}

async function renderFrontPage() {
    for (let i = 0; i < pokemons.length; i++) {
        let pokemon = pokemons[i];
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
        let response = await fetch(url);
        responseAsJson = await response.json();
        let currentPokemon = responseAsJson;
        pokeName = currentPokemon['name'];
        pokeImage = currentPokemon['sprites']['front_default'];
        document.getElementById('main-container').innerHTML += `
        <div class="poke-box"><img class="pokemon" src="${pokeImage}" onclick="showFrontPokemon(${i})">
        ${pokeName}
        </div>
        `;

    }
}

function showCard(){
    
    document.getElementById('card-container').style.display ='';
}

function hideCard(){
    document.getElementById('card-container').style.display ='none';
    document.getElementById('search').value ='';
}

function showFrontPokemon(i){
    document.getElementById('search').value = pokemons[i];
    getInformation();
    
}

function showPokemon() {
    document.getElementById('stats').innerHTML ='';
    document.getElementById('type-container').innerHTML ='';
    document.getElementById('pokemonHeader').innerHTML = `${pokeName}
    `;
    document.getElementById('pokemonImage').src = pokeImage;
for (let i = 0; i < stats.length; i++) {
    let stat = stats[i]['base_stat'];
    let statName = stats[i]['stat']['name'];
    document.getElementById('stats').innerHTML+=`
    <tr>
        <td>${statName}</td>
        <td>${stat}</td>
    </tr>
    `;
}
document.getElementById('type-container').innerHTML +=`Typ: ${type}`;
showCard();

}