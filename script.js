const API_BASE = 'https://api.ejemplo.com';  // reemplaza con la URL real de la API

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

let knights = [];  // se llenará desde la API

async function init() {
  try {
    knights = await fetchKnights();
    populateFilterOptions();
    renderCards(knights);
    attachEventListeners();
  } catch (err) {
    console.error('Error cargando datos:', err);
    cardsContainer.innerHTML = `<p style="color:rgba(246,247,251,0.7)">No se pudo cargar la lista.</p>`;
  }
}

async function fetchKnights() {
  const resp = await fetch(`${API_BASE}/knights`);
  if (!resp.ok) throw new Error('Error en la respuesta de la API');
  const data = await resp.json();
  return data;
}

async function fetchKnightById(id) {
  const resp = await fetch(`${API_BASE}/knights/${id}`);
  if (!resp.ok) throw new Error('Error al obtener detalle');
  const data = await resp.json();
  return data;
}

function populateFilterOptions() {
  const constellations = Array.from(new Set(knights.map(k => k.constellation))).sort();
  for (const c of constellations) {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    filterSelect.appendChild(opt);
  }
}

function renderCards(list) {
  cardsContainer.innerHTML = '';
  if (list.length === 0) {
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
        <p class="muted">${k.short_description || ''}</p>
        <div class="badge">${k.rank} — ${k.constellation}</div>
      </div>
    `;
    card.addEventListener('click', () => openModalById(k.id));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter') openModalById(k.id);
    });
    cardsContainer.appendChild(card);
  }
}

async function openModalById(id) {
  try {
    const k = await fetchKnightById(id);
    openModal(k);
  } catch (err) {
    console.error('Error cargar detalle:', err);
  }
}

function openModal(k) {
  modal.setAttribute('aria-hidden', 'false');
  modalTitle.textContent = k.name;
  modalConst.textContent = `${k.rank} • Constelación: ${k.constellation}`;
  modalBody.innerHTML = `
    <div class="big-avatar"><img src="${k.image}" alt="${k.name}"></div>
    <div>
      <p>${k.short_description || ''}</p>
      <div style="height:8px"></div>
      <div class="stat"><strong>Habilidades:</strong></div>
      <ul>${(k.abilities || []).map(a => `<li>${a}</li>`).join('')}</ul>
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

  if (sort === 'name-asc') result.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === 'name-desc') result.sort((a, b) => b.name.localeCompare(a.name));

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

// iniciar
init();
