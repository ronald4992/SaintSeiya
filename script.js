
   // script.js

// Imagen de respaldo si alguna falla
const FALLBACK_IMAGE = 'https://via.placeholder.com/600x400?text=Imagen+no+disponible';

// === Datos locales de caballeros ===
const knights = [
  // Bronce
  { id: 1, name: "Seiya", rank: "Bronce", constellation: "Pegaso", image: "https://ar.pinterest.com/pin/848084173574244038/", short_description: "Valiente caballero de Pegaso que lucha por Atena.", abilities: ["Meteoros de Pegaso", "Cometa de Pegaso"] },
  { id: 2, name: "Shiryu", rank: "Bronce", constellation: "Dragón", image: "https://cl.pinterest.com/pin/319685273547615118/", short_description: "Caballero del Dragón, leal y sabio.", abilities: ["Cólera del Dragón", "Último Dragón"] },
  { id: 3, name: "Hyoga", rank: "Bronce", constellation: "Cisne", image: "https://upload.wikimedia.org/wikipedia/en/3/32/Cygnus_Hyoga.png", short_description: "Guerrero del frío, nacido en Siberia.", abilities: ["Polvo de Diamantes", "Ataque Aurora"] },
  { id: 4, name: "Shun", rank: "Bronce", constellation: "Andrómeda", image: "https://upload.wikimedia.org/wikipedia/en/e/ef/Andromeda_Shun.png", short_description: "De gran corazón, lucha con sus cadenas de Andrómeda.", abilities: ["Cadena Nebular", "Torbellino Nebular"] },
  { id: 5, name: "Ikki", rank: "Bronce", constellation: "Fénix", image: "https://upload.wikimedia.org/wikipedia/en/1/1b/Phoenix_Ikki.png", short_description: "Hermano mayor de Shun, renace de sus cenizas.", abilities: ["Ave Fénix", "Ilusión Diabólica del Fénix"] },

  // Plata
  { id: 6, name: "Marin", rank: "Plata", constellation: "Águila", image: "https://upload.wikimedia.org/wikipedia/en/4/41/Marin_Eagle.png", short_description: "Maestra de Seiya, caballero de la constelación del Águila.", abilities: ["Golpe de Águila", "Ilusión Celeste"] },
  { id: 7, name: "Shaina", rank: "Plata", constellation: "Ofiuco", image: "https://upload.wikimedia.org/wikipedia/en/7/72/Shaina_Ophiuchus.png", short_description: "Guerrera temible, protectora del Santuario.", abilities: ["Garrote de Ofiuco", "Ataque de Serpiente"] },

  // Oro
  { id: 8, name: "Mu", rank: "Oro", constellation: "Aries", image: "https://upload.wikimedia.org/wikipedia/en/4/42/Mu_Aries.png", short_description: "Caballero de Aries, experto en reparación de armaduras.", abilities: ["Muro de Cristal", "Extinción de Luz Estelar"] },
  { id: 9, name: "Aldebarán", rank: "Oro", constellation: "Tauro", image: "https://upload.wikimedia.org/wikipedia/en/2/24/Aldebaran_Taurus.png", short_description: "Gigante noble y protector del Templo de Tauro.", abilities: ["Gran Cuerno", "Golpe de Toro"] },
  { id: 10, name: "Saga", rank: "Oro", constellation: "Géminis", image: "https://upload.wikimedia.org/wikipedia/en/4/4d/Gemini_Saga.png", short_description: "Caballero de Géminis, de doble personalidad.", abilities: ["Otra Dimensión", "Explosión de Galaxias"] },
  { id: 11, name: "Deathmask", rank: "Oro", constellation: "Cáncer", image: "https://upload.wikimedia.org/wikipedia/en/b/b3/Cancer_Deathmask.png", short_description: "Portador de las máscaras de las almas perdidas.", abilities: ["Ondas Infernales", "Puertas del Infierno"] },
  { id: 12, name: "Aioria", rank: "Oro", constellation: "Leo", image: "https://upload.wikimedia.org/wikipedia/en/7/7e/Leo_Aioria.png", short_description: "Caballero de Leo, valiente y de noble corazón.", abilities: ["Rayo Relámpago de Plasma", "Relámpago de León"] },
  { id: 13, name: "Shaka", rank: "Oro", constellation: "Virgo", image: "https://upload.wikimedia.org/wikipedia/en/4/41/Virgo_Shaka.png", short_description: "El hombre más cercano a Dios.", abilities: ["Tesoro del Cielo", "Khan"] },
  { id: 14, name: "Dohko", rank: "Oro", constellation: "Libra", image: "https://upload.wikimedia.org/wikipedia/en/3/39/Libra_Dohko.png", short_description: "El maestro anciano de Shiryu.", abilities: ["Colmillos de Dragón", "Escudo de Libra"] },
  { id: 15, name: "Milo", rank: "Oro", constellation: "Escorpio", image: "https://upload.wikimedia.org/wikipedia/en/6/61/Scorpio_Milo.png", short_description: "El escorpión de Atena, mortal con sus aguijones.", abilities: ["Aguja Escarlata", "Antares"] },
  { id: 16, name: "Aioros", rank: "Oro", constellation: "Sagitario", image: "https://upload.wikimedia.org/wikipedia/en/8/86/Sagittarius_Aioros.png", short_description: "Hermano de Aioria, salvó a Atena siendo bebé.", abilities: ["Flecha Dorada", "Tiro Celeste"] },
  { id: 17, name: "Shura", rank: "Oro", constellation: "Capricornio", image: "https://upload.wikimedia.org/wikipedia/en/e/e0/Capricorn_Shura.png", short_description: "Guerrero con la espada sagrada Excalibur.", abilities: ["Excalibur", "Salto del Capricornio"] },
  { id: 18, name: "Camus", rank: "Oro", constellation: "Acuario", image: "https://upload.wikimedia.org/wikipedia/en/b/b1/Aquarius_Camus.png", short_description: "Maestro de Hyoga, dueño del hielo eterno.", abilities: ["Ejecución de Aurora", "Polvo de Diamantes"] },
  { id: 19, name: "Afrodita", rank: "Oro", constellation: "Piscis", image: "https://upload.wikimedia.org/wikipedia/en/d/d6/Pisces_Aphrodite.png", short_description: "Caballero de gran belleza y poder mortal.", abilities: ["Rosas Diabólicas Reales", "Rosas Piraña"] },

  // Otros personajes extra (ej. Hades)
  { id: 20, name: "Hades", rank: "Dios", constellation: "Inframundo", image: "https://upload.wikimedia.org/wikipedia/en/4/4d/Hades_Saint_Seiya.png", short_description: "Dios del Inframundo, enemigo de Atena.", abilities: ["Oscuridad Absoluta", "Mundo de los Muertos"] },
  { id: 21, name: "Poseidón", rank: "Dios", constellation: "Océanos", image: "https://upload.wikimedia.org/wikipedia/en/0/04/Poseidon_Saint_Seiya.png", short_description: "Dios de los mares, señor de los océanos.", abilities: ["Tridente Divino", "Tormenta Oceánica"] },
  { id: 22, name: "Atena", rank: "Diosa", constellation: "Sabiduría", image: "https://upload.wikimedia.org/wikipedia/en/1/1e/Athena_Saint_Seiya.png", short_description: "Diosa protectora de la Tierra y de los caballeros.", abilities: ["Escudo de Atena", "Bendición Divina"] }
];

// === Referencias DOM ===
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

// === Pre-carga y fallback de imágenes ===
function preloadAllImages() {
  knights.forEach(k => {
    const pre = new Image();
    pre.src = k.image;
    pre.onerror = () => {
      console.warn(`Imagen no disponible para ${k.name}: ${k.image}`);
      k.image = FALLBACK_IMAGE;
    };
  });
}

function createImgElement(src, alt) {
  const img = document.createElement('img');
  img.alt = alt || '';
  img.loading = 'lazy';
  img.src = src;
  img.onerror = () => {
    console.warn(`Fallo al cargar imagen en <img>: ${src}`);
    img.onerror = null;
    img.src = FALLBACK_IMAGE;
  };
  return img;
}

// === Render y lógica (igual que antes) ===
function init() {
  preloadAllImages();
  populateFilterOptions();
  renderCards(knights);
  attachEventListeners();
}

function populateFilterOptions() {
  const constellations = Array.from(new Set(knights.map(k => k.constellation))).sort();
  filterSelect.innerHTML = '<option value="all">Todas las constelaciones</option>';
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

    const avatarWrap = document.createElement('div');
    avatarWrap.className = 'avatar';
    avatarWrap.appendChild(createImgElement(k.image, k.name));

    const body = document.createElement('div');
    body.className = 'card-body';
    const h3 = document.createElement('h3');
    h3.textContent = k.name;
    const p = document.createElement('p');
    p.className = 'muted';
    p.textContent = k.short_description || '';
    const badge = document.createElement('div');
    badge.className = 'badge';
    badge.textContent = `${k.rank} — ${k.constellation}`;

    body.appendChild(h3);
    body.appendChild(p);
    body.appendChild(badge);

    card.appendChild(avatarWrap);
    card.appendChild(body);

    card.addEventListener('click', () => openModal(k));
    card.addEventListener('keydown', e => { if (e.key === 'Enter') openModal(k); });

    cardsContainer.appendChild(card);
  }
}

function openModal(k) {
  modal.setAttribute('aria-hidden', 'false');
  modalTitle.textContent = k.name;
  modalConst.textContent = `${k.rank} • Constelación: ${k.constellation}`;

  const bigAvatarDiv = document.createElement('div');
  bigAvatarDiv.className = 'big-avatar';
  bigAvatarDiv.appendChild(createImgElement(k.image, k.name));

  const infoDiv = document.createElement('div');
  const shortP = document.createElement('p');
  shortP.textContent = k.short_description || '';
  const spacer = document.createElement('div');
  spacer.style.height = '8px';
  const statLabel = document.createElement('div');
  statLabel.className = 'stat';
  statLabel.innerHTML = '<strong>Habilidades:</strong>';
  const ul = document.createElement('ul');
  (k.abilities || []).forEach(a => {
    const li = document.createElement('li');
    li.textContent = a;
    ul.appendChild(li);
  });
  const tagsDiv = document.createElement('div');
  tagsDiv.className = 'tags';
  const idBadge = document.createElement('span');
  idBadge.className = 'badge';
  idBadge.textContent = `ID:${k.id}`;
  tagsDiv.appendChild(idBadge);

  infoDiv.appendChild(shortP);
  infoDiv.appendChild(spacer);
  infoDiv.appendChild(statLabel);
  infoDiv.appendChild(ul);
  infoDiv.appendChild(tagsDiv);

  modalBody.innerHTML = '';
  modalBody.appendChild(bigAvatarDiv);
  modalBody.appendChild(infoDiv);

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

init();


