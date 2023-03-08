let responseAsJson;
let pokeName;
let pokeImage;
let pokemons = ["charmander", "squirtle", "bulbasaur","ditto"];

async function getInformation() {
    let url = 'https://pokeapi.co/api/v2/pokemon/ditto';
    let response = await fetch(url);
    responseAsJson = await response.json();
    pokeName = responseAsJson['name'];
    pokeImage = responseAsJson['sprites']['front_default'];
    console.log('Pokemon information', responseAsJson);
    showPokemon();

}

async function renderFrontPage() {
    for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
        let response = await fetch(url);
        responseAsJson = await response.json();
        pokeName = responseAsJson['name'];
        pokeImage = responseAsJson['sprites']['front_default'];
        document.getElementById('main-container').innerHTML += `
        <div class="poke-box"><img class="pokemon" src="${pokeImage}" onclick="showCard(${i})">
        ${pokeName}
        </div>
        `;

    }
}

function showCard(){
    document.getElementById('main-container').classList.add('opacity');
    
}

function showFrontPokemon(i){
    document.getElementById('pokemonHeader').innerHTML = `${pokeName}
    `;
    
}

function showPokemon() {
    document.getElementById('pokemonHeader').innerHTML = `${pokeName}
    `;
    document.getElementById('pokemonImage').src = pokeImage;

}