let responseAsJson;
let pokeName;
let pokeImage;

async function getInformation() {
    let url = 'https://pokeapi.co/api/v2/pokemon/ditto';
    let response = await fetch(url);
    responseAsJson= await response.json();
    pokeName = responseAsJson['name'];
    pokeImage = responseAsJson['sprites']['front_default'];
    console.log('Pokemon information', responseAsJson);
    showPokemon();

}

function showPokemon(){
    document.getElementById('pokemonHeader').innerHTML = `${pokeName}
    `;
    document.getElementById('pokemonImage').src = pokeImage;

}