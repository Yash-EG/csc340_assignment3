const API_BASE = '/antiheroes';
const grid = document.getElementById('characters-grid');
const searchInput = document.getElementById('search');
const universeFilter = document.getElementById('universe-filter');
let searchTimeout;

// Map known character names (lowercase keywords) to local images
const IMAGE_MAP = [
  { keywords: ['johnny silverhand', 'johnny'],  src: 'images/johnny.jpg' },
  { keywords: ['joel miller', 'joel'],           src: 'images/joel.jpg' },
  { keywords: ['arthur morgan', 'arthur'],       src: 'images/aurthermorgan.jpeg' },
  { keywords: ['geralt', 'witcher'],             src: 'images/witcher.jpg' },
  { keywords: ['kratos'],                        src: 'images/kratos.jpg' },
];
const PLACEHOLDER_IMG = 'images/V.jpg';

function getImage(antihero) {
  if (antihero.imageUrl) return antihero.imageUrl;
  const lower = (antihero.name || '').toLowerCase();
  for (const entry of IMAGE_MAP) {
    if (entry.keywords.some(k => lower.includes(k))) return entry.src;
  }
  return PLACEHOLDER_IMG;
}

function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderCards(antiheroes) {
  if (!antiheroes || antiheroes.length === 0) {
    grid.innerHTML = '<p class="text-gray-400 col-span-5 text-center py-16 text-lg">No characters found.</p>';
    return;
  }
  grid.innerHTML = antiheroes.map(a => `
    <div class="bg-white/10 backdrop-blur-md border-b-2 border-white/20 text-gray-100 relative p-4 overflow-hidden rounded-2xl flex flex-col hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300"
      style="flex: 0 0 calc(20% - 0.8rem); min-height: 80vh;">
      <img src="${getImage(a)}" alt="${escapeHtml(a.name)}" class="h-full w-full object-cover rounded-2xl grow">
      <div class="p-4 absolute bottom-4 left-4 right-4 rounded-2xl bg-gradient-to-t from-black to-transparent hover:bg-black/60">
        <h3 class="text-4xl font-bold">${escapeHtml(a.name)}</h3>
        <p class="text-gray-300 text-xl hover:text-yellow-400">Universe: ${escapeHtml(a.universe)}</p>
        <p class="text-gray-400 text-xl hover:text-cyan-400">Weapon: ${escapeHtml(a.weapon)}</p>
        <p class="text-gray-500 text-xl hover:text-yellow-300">${escapeHtml(a.description)}</p>
        <a href="details.html?id=${a.characterId}" class="text-blue-500 text-lg hover:underline">View Details</a>
      </div>
    </div>
  `).join('');

  updateArrows();
}

async function fetchAndRender(url) {
  grid.innerHTML = '<p class="text-gray-400 col-span-5 text-center py-16 text-lg">Loading characters...</p>';
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Server returned ${res.status}`);
    const data = await res.json();
    renderCards(data);
  } catch (err) {
    grid.innerHTML = `<p class="text-red-400 col-span-5 text-center py-16">Error loading characters: ${escapeHtml(err.message)}</p>`;
  }
}

async function loadAllAndPopulateFilter() {
  try {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error(`Server returned ${res.status}`);
    const data = await res.json();

    // Populate universe filter dropdown
    const universes = [...new Set(data.map(a => a.universe).filter(Boolean))].sort();
    universeFilter.innerHTML = '<option value="">All Universes</option>' +
      universes.map(u => `<option value="${escapeHtml(u)}">${escapeHtml(u)}</option>`).join('');

    renderCards(data);
  } catch (err) {
    grid.innerHTML = `<p class="text-red-400 col-span-5 text-center py-16">Error loading characters: ${escapeHtml(err.message)}</p>`;
  }
}

searchInput.addEventListener('input', (e) => {
  clearTimeout(searchTimeout);
  const query = e.target.value.trim();

  // Reset universe filter when searching by name
  universeFilter.value = '';

  if (!query) {
    loadAllAndPopulateFilter();
    return;
  }

  searchTimeout = setTimeout(() => {
    fetchAndRender(`${API_BASE}/search?name=${encodeURIComponent(query)}`);
  }, 300);
});

universeFilter.addEventListener('change', (e) => {
  const universe = e.target.value.trim();

  // Reset name search when filtering by universe
  searchInput.value = '';

  if (!universe) {
    loadAllAndPopulateFilter();
    return;
  }

  fetchAndRender(`${API_BASE}/universe/${encodeURIComponent(universe)}`);
});

// Carousel scroll
function scrollCards(direction) {
  const cardWidth = grid.clientWidth / 5;
  grid.scrollBy({ left: direction * (cardWidth + 16), behavior: 'smooth' });
  setTimeout(updateArrows, 400);
}

function updateArrows() {
  const leftBtn  = document.getElementById('arrow-left');
  const rightBtn = document.getElementById('arrow-right');
  const atStart  = grid.scrollLeft <= 0;
  const atEnd    = grid.scrollLeft >= grid.scrollWidth - grid.clientWidth - 1;

  leftBtn.style.opacity       = atStart ? '0' : '1';
  leftBtn.style.pointerEvents = atStart ? 'none' : 'auto';
  rightBtn.style.opacity       = atEnd ? '0' : '1';
  rightBtn.style.pointerEvents = atEnd ? 'none' : 'auto';
}

grid.addEventListener('scroll', updateArrows);

// Initial load
loadAllAndPopulateFilter();
