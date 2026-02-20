const API_URL = 'https://pokeapi.co/api/v2';

const typeTranslations: { [key: string]: string } = {
    normal: 'Normal',
    fighting: 'Combat',
    flying: 'Vol',
    poison: 'Poison',
    ground: 'Sol',
    rock: 'Roche',
    bug: 'Insecte',
    ghost: 'Spectre',
    steel: 'Acier',
    fire: 'Feu',
    water: 'Eau',
    grass: 'Plante',
    electric: 'Électrique',
    psychic: 'Psychique',
    ice: 'Glace',
    dragon: 'Dragon',
    dark: 'Ténèbres',
    fairy: 'Fée',
};

const colorMap: { [key: string]: string } = {
    normal: 'bg-gray-400',
    combat: 'bg-red-600',
    vol: 'bg-blue-300',
    poison: 'bg-purple-500',
    sol: 'bg-yellow-600',
    roche: 'bg-gray-600',
    insecte: 'bg-green-600',
    spectre: 'bg-purple-700',
    acier: 'bg-gray-500',
    feu: 'bg-red-500',
    eau: 'bg-blue-500',
    plante: 'bg-green-500',
    électrique: 'bg-yellow-400',
    psychique: 'bg-pink-500',
    glace: 'bg-cyan-400',
    dragon: 'bg-purple-600',
    ténèbres: 'bg-gray-800',
    fée: 'bg-pink-400',
};

const typeGradientMap: { [key: string]: string } = {
    normal: 'from-gray-300 to-gray-500',
    fighting: 'from-red-400 to-red-700',
    flying: 'from-blue-200 to-blue-400',
    poison: 'from-purple-400 to-purple-600',
    ground: 'from-yellow-500 to-yellow-700',
    rock: 'from-gray-500 to-gray-700',
    bug: 'from-green-400 to-green-700',
    ghost: 'from-purple-600 to-purple-900',
    steel: 'from-gray-400 to-gray-600',
    fire: 'from-orange-400 to-red-600',
    water: 'from-blue-400 to-blue-600',
    grass: 'from-green-400 to-green-600',
    electric: 'from-yellow-300 to-yellow-500',
    psychic: 'from-pink-400 to-pink-600',
    ice: 'from-cyan-300 to-cyan-500',
    dragon: 'from-purple-500 to-purple-700',
    dark: 'from-gray-700 to-gray-900',
    fairy: 'from-pink-300 to-pink-500',
};

// Récupération des détails d'un pokémon
async function getPokemonDetails(name: string) {
    const response = await fetch(`${API_URL}/pokemon/${name.toLowerCase()}`);
    if (!response.ok) return null;
    const data = await response.json();

    return {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        image: data.sprites.other['official-artwork'].front_default,
        types: data.types.map((t: any) => typeTranslations[t.type.name] || t.type.name),
        primaryType: data.types[0]?.type.name,
    };
}

//Répétition de carte pokémon
function createPokemonCard(pokemon: any): HTMLElement {
    const gradient = typeGradientMap[pokemon.primaryType] || 'from-emerald-400 to-teal-500'; // Dégradé basé sur le type principal

    const typesHTML = pokemon.types
        .map((type: string) => {
            const color = colorMap[type.toLowerCase()] || 'bg-gray-400';
            return `<span class="${color} text-white px-3 py-1 rounded-full text-sm">${type}</span>`;
        })
        .join('');

    const card = document.createElement('div');
    card.className = 'bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 cursor-pointer';
    card.innerHTML = `
        <div class="bg-gradient-to-br ${gradient} p-8 flex justify-center relative">
            <img src="${pokemon.image}" alt="${pokemon.name}" class="h-48 w-48 object-contain" />
            <button class="heart-btn absolute top-3 right-3 text-white hover:[&_svg]:fill-white ">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
                </svg>
            </button>
        </div>
        <div class="p-4">
            <h3 class="text-xl font-bold text-emerald-700 mb-2">${pokemon.name}</h3>
            <div class="flex gap-2">${typesHTML}</div>
        </div>
    `;

    // Clic sur la carte → popup
    card.addEventListener('click', () => {
        showPopup(pokemon);
    });

    // Clic sur le coeur
    const heartBtn = card.querySelector('.heart-btn')!;
    heartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    return card;
}

// Affichage du popup lors du clic sur une carte
function showPopup(pokemon: any) {
    const popup = document.getElementById('pokemonDetail');
    const popupName = document.getElementById('popup-name')!;
    const popupImage = document.getElementById('popup-image') as HTMLImageElement;
    const popupImageContainer = document.getElementById('popup-image-container') as HTMLElement;

    const gradient = typeGradientMap[pokemon.primaryType] || 'from-emerald-400 to-teal-500';

    popupName.textContent = pokemon.name;
    popupImage.src = pokemon.image;
    popupImageContainer.className = `bg-gradient-to-br ${gradient} p-8 rounded-2xl flex justify-center`;

    popup?.showModal();
}

// Affichage de tous les pokémons
async function displayAllPokemon() {
    const container = document.getElementById('pokemonContainer')!;
    container.innerHTML = 'Chargement...';

    const response = await fetch(`${API_URL}/pokemon?limit=150`);
    const data = await response.json();

    container.innerHTML = '';

    for (const pokemon of data.results) {
        const details = await getPokemonDetails(pokemon.name);
        if (details) {
            container.appendChild(createPokemonCard(details));
        }
    }
}

//Action de recherche
async function searchPokemon(searchText: string) {
    const container = document.getElementById('pokemonContainer')!;

    if (!searchText.trim()) {
        await displayAllPokemon();
        return;
    }

    container.innerHTML = 'Recherche...';
    const details = await getPokemonDetails(searchText);
    container.innerHTML = '';

    if (details) {
        container.appendChild(createPokemonCard(details));
    }
}

//Recherche barre de recherche
const searchInput = document.getElementById('searchInput') as HTMLInputElement;
document.getElementById('searchBtn')?.addEventListener('click', () => searchPokemon(searchInput.value));
searchInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchPokemon(searchInput.value);
});

displayAllPokemon();
