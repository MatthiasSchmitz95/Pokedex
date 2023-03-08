

async function getInformation() {
    let url = 'https://pokeapi.co/api/v2/pokemon/ditto';
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let pokeName = responseAsJson['name'];
    let pokeImage = responseAsJson['sprites']['front_default'];
    console.log('Pokemon information', responseAsJson);
    document.getElementById('pokemonHeader').innerHTML = `${pokeName}
    `;
    document.getElementById('pokemonImage').src = pokeImage;
}