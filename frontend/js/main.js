document.addEventListener("DOMContentLoaded", () => {
  loadCatalog("MOVIE", "filmes-container");
  loadCatalog("SERIES", "series-container");
});

async function loadCatalog(mediaType, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const mediaList = await fetchMedia(mediaType);

  if (mediaList.length > 0) {
    container.innerHTML = "";
  }

  mediaList.forEach((media) => {
    const card = createMediaCard(media);
    container.innerHTML += card;
}); }

function createMediaCard(media) {
  const year = new Date(media.releaseDate).getFullYear();
  return `
        <a href="#" class="flex-none w-56 block bg-[#1B1E29] rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 group">
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