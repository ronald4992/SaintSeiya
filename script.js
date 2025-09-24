const knights = [
  {
    id: 'seiya',
    name: 'Seiya',
    constellation: 'Pegasus',
    rank: 'Bronze',
    short: 'El protagonista. Espíritu combativo y corazón valiente.',
    abilities: ['Meteoros de Pegaso', 'Pegasus Rolling Crush', 'Constellation Drive'],
    image: 'https://upload.wikimedia.org/wikipedia/en/3/34/Pegasus_Seiya.png'
  },
  {
    id: 'shiryu',
    name: 'Shiryu',
    constellation: 'Dragon',
    rank: 'Bronze',
    short: 'Calmado y fuerte, maestro del poder del dragón.',
    abilities: ['Dragon Shield', 'Rozan Shoryu Ha'],
    image: 'https://upload.wikimedia.org/wikipedia/en/1/1a/Dragon_Shiryu.png'
  },
  {
    id: 'hyoga',
    name: 'Hyoga',
    constellation: 'Cygnus',
    rank: 'Bronze',
    short: 'Controla el hielo. Muy comprometido con sus ideales.',
    abilities: ['Diamond Dust', 'Aurora Thunder Warrior'],
    image: 'https://upload.wikimedia.org/wikipedia/en/6/64/Cygnus_Hyoga.png'
  },
  {
    id: 'shun',
    name: 'Shun',
    constellation: 'Andromeda',
    rank: 'Bronze',
    short: 'Pacífico y sensible. Sus cadenas son su arma defensiva.',
    abilities: ['Chains of Andromeda', 'Nebula Chain'],
    image: 'https://upload.wikimedia.org/wikipedia/en/d/da/Andromeda_Shun.png'
  },
  {
    id: 'ikki',
    name: 'Ikki',
    constellation: 'Phoenix',
    rank: 'Bronze',
    short: 'Fiero y solitario. Renace de sus cenizas.',
    abilities: ['Phoenix Illusion Fist', 'Ho Yoku Ten Sho'],
    image: 'https://upload.wikimedia.org/wikipedia/en/8/8a/Phoenix_Ikki.png'
  }
];

const cardsContainer = document.getElementById('cards');
const searchInput = document.getElementById('search');
const filterSelect = document.getElementById('filter');
const sortSelect = document.getElementById('sort');

const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalConst = document.getElementById('modal-constellation');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');
const modalBackdrop = document.getElementById('modal-backdrop');

function init() {
  populateFilterOptions();
  renderCards(knights);
  attachEventListeners();
}

function populateFilterOptions() {
  const constellations = [...new Set(knights.map(k => k.constellation))].sort();
  for (const c of constellations) {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    filterSelect.appendChild(opt);
  }
}

function renderCards(list) {
  cardsContainer.innerHTML = '';
  if (!list.length) {
    cardsContainer.innerHTML = `<p style="color:rgba(246,247,251,0.7)">No hay caballeros que coincidan.</p>`;
    return;
  }
  for (const k of list) {
    const card = document.createElement('article');
    card.className = 'card';
    card.tabIndex = 0;
    card.setAttribute('data-id', k.id);

    card.innerHTML = `
      <div class="avatar"><img src="${k.image}" alt="${k.name}"></div>
      <div class="card-body">
        <h3>${k.name}</h3>
        <p class="muted">${k.short}</p>
        <div class="badge">${k.rank} — ${k.constellation}</div>
      </div>
    `;
    card.addEventListener('click', () => openModal(k));
    card.addEventListener('keydown', e => { if (e.key === 'Enter') openModal(k); });
    cardsContainer.appendChild(card);
  }
}

function openModal(k) {
  modal.setAttribute('aria-hidden', 'false');
  modalTitle.textContent = k.name;
  modalConst.textContent = `${k.rank} • Constelación: ${k.constellation}`;
  modalBody.innerHTML = `
    <div class="big-avatar"><img src="${k.image}" alt="${k.name}"></div>
    <div>
      <p>${k.short}</p>
      <div style="height:8px"></div>
      <div class="stat"><strong>Habilidades:</strong></div>
      <ul>${k.abilities.map(a => `<li>${a}</li>`).join('')}</ul>
      <div style="height:8px"></div>
      <div class="tags"><span class="badge">ID:${k.id}</span></div>
    </div>
  `;
  modalClose.focus();
}

function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
  modalTitle.textContent = '';
  modalBody.innerHTML = '';
}

function applyFilters() {
  const q = searchInput.value.trim().toLowerCase();
  const filter = filterSelect.value;
  const sort = sortSelect.value;

  let result = knights.filter(k => {
    const matchName = k.name.toLowerCase().includes(q);
    const matchConst = filter === 'all' ? true : k.constellation === filter;
    return matchName && matchConst;
  });

  if (sort === 'name-asc') result.sort((a,b) => a.name.localeCompare(b.name));
  if (sort === 'name-desc') result.sort((a,b) => b.name.localeCompare(a.name));

  renderCards(result);
}

function attachEventListeners() {
  searchInput.addEventListener('input', applyFilters);
  filterSelect.addEventListener('change', applyFilters);
  sortSelect.addEventListener('change', applyFilters);
  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
  });
}

init();
