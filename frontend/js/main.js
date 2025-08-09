document.addEventListener("DOMContentLoaded", () => {
  if (typeof api !== 'undefined') {
    loadCatalog("MOVIE", "filmes-container");
    loadCatalog("SERIES", "series-container");
  } else {
    console.error("O objeto 'api' não foi encontrado. Verifique se o script api.js foi carregado corretamente.");
} });

async function loadCatalog(mediaType, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const result = await api.get(`/media?type=${mediaType}`);

  if (result.success && result.data.length > 0) {
    container.innerHTML = "";
    result.data.forEach((media) => {
      const card = createMediaCard(media);
      container.insertAdjacentHTML('beforeend', card);
    });
  } else if (result.success) {
    container.innerHTML = `<p class="text-gray-400">Nenhuma mídia do tipo ${mediaType.toLowerCase()} encontrada.</p>`;
  } else {
    container.innerHTML = `<p class="text-red-500">Falha ao carregar o catálogo. Tente novamente mais tarde.</p>`;
} }

function createMediaCard(media) {
  const year = new Date(media.releaseDate).getFullYear();
  return `
        <a href="detalhes.html?id=${media.id}" class="flex-none w-56 block bg-[#1B1E29] rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 group">
            <div class="relative pb-[150%]">
                <img src="${media.posterUrl}" alt="${media.title}" class="absolute inset-0 w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300">
            </div>
            <div class="p-4 text-center">
                <h2 class="text-lg font-semibold text-gray-200 group-hover:text-[#4B88E8] transition-colors duration-300">
                    ${media.title}
                </h2>
                <p class="text-gray-400 mt-1">${year}</p>
            </div>
        </a>
    `;
}