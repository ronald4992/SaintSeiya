// script.js

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

function getKnightsFromHTML() {
  return Array.from(cardsContainer.querySelectorAll('.card')).map(card => ({
    element: card,
    name: card.dataset.name,
    rank: card.dataset.rank,
    constellation: card.dataset.constellation,
    description: card.dataset.description,
    abilities: (card.dataset.abilities || "").split(",")
  }));
}

let knights = getKnightsFromHTML();

function renderFiltered() {
  const q = searchInput.value.toLowerCase().trim();
  const filter = filterSelect.value;
  const sort = sortSelect.value;

  let list = knights.filter(k => {
    const matchesName = k.name.toLowerCase().includes(q);
    const matchesConst = filter === "all" ? true : k.constellation === filter;
    return matchesName && matchesConst;
  });

  if (sort === 'name-asc') list.sort((a,b) => a.name.localeCompare(b.name));
  if (sort === 'name-desc') list.sort((a,b) => b.name.localeCompare(a.name));

  knights.forEach(k => k.element.style.display = 'none');
  list.forEach(k => k.element.style.display = '');
}

function openModal(k) {
  modal.setAttribute('aria-hidden', 'false');
  modalTitle.textContent = k.name;
  modalConst.textContent = `${k.rank} • Constelación: ${k.constellation}`;

  const bigAvatar = document.createElement('div');
  bigAvatar.className = 'big-avatar';
  bigAvatar.innerHTML = k.element.querySelector('img').outerHTML;

  const info = document.createElement('div');
  const p = document.createElement('p');
  p.textContent = k.description;
  const ul = document.createElement('ul');
  k.abilities.forEach(a => {
    const li = document.createElement('li');
    li.textContent = a;
    ul.appendChild(li);
  });

  info.appendChild(p);
  if (k.abilities[0]) {
    const strong = document.createElement('strong');
    strong.textContent = "Habilidades:";
    info.appendChild(strong);
    info.appendChild(ul);
  }

  modalBody.innerHTML = '';
  modalBody.appendChild(bigAvatar);
  modalBody.appendChild(info);

  modalClose.focus();
}

function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
}

searchInput.addEventListener('input', renderFiltered);
filterSelect.addEventListener('change', renderFiltered);
sortSelect.addEventListener('change', renderFiltered);

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
});

cardsContainer.addEventListener('click', e => {
  const card = e.target.closest('.card');
  if (!card) return;
  const k = knights.find(x => x.element === card);
  if (k) openModal(k);
});

renderFiltered();
