document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('lists-container')) {
    loadUserLists();
  }
  if (document.getElementById('create-list-form')) {
    document.getElementById('create-list-form').addEventListener('submit', handleCreateList);
} });

async function loadUserLists() {
  const listsContainer = document.getElementById('lists-container');
  listsContainer.innerHTML = '<p class="text-gray-400">Carregando suas listas...</p>';

  const result = await api.get('/lists');

  if (result.success && result.data.length > 0) {
    listsContainer.innerHTML = '';
    result.data.forEach(list => {
      const listCard = createListCard(list);
      listsContainer.appendChild(listCard);
    });
  } else if (result.success) {
    listsContainer.innerHTML = '<p class="text-center text-gray-400">Você ainda não tem nenhuma lista. <a href="criar-lista.html" class="text-[#4B88E8] hover:underline">Crie uma agora!</a></p>';
  } else {
    listsContainer.innerHTML = `<p class="text-red-400">Erro ao carregar listas: ${result.message}</p>`;
} }

function createListCard(list) {
  const listCard = document.createElement('div');
  listCard.className = 'bg-[#1B1E29] p-6 rounded-xl shadow-lg flex items-center justify-between';
  listCard.innerHTML = `
    <div>
        <h3 class="text-2xl font-semibold text-gray-100">${list.name}</h3>
        <p class="text-gray-400 mt-1">${list.description || 'Sem descrição.'}</p>
        <span class="text-sm text-gray-500">${list.isPublic ? 'Pública' : 'Privada'}</span>
    </div>
    <div class="flex space-x-4">
        <a href="detalhes-lista.html?id=${list.id}" class="text-[#4B88E8] hover:underline">Ver</a>
        <button data-list-id="${list.id}" class="delete-list-btn text-red-400 hover:underline">Excluir</button>
    </div>
  `;

  const deleteBtn = listCard.querySelector('.delete-list-btn');
  deleteBtn.addEventListener('click', () => handleDeleteList(list.id));

  return listCard;
}

async function handleCreateList(event) {
  event.preventDefault();

  const name = document.getElementById('list-name').value;
  const description = document.getElementById('list-description').value;
  const isPublic = document.getElementById('is-public').checked;

  const result = await api.post('/lists', { name, description, isPublic });

  if (result.success) {
    alert('Lista criada com sucesso!');
    window.location.href = 'minhas-listas.html';
  } else {
    alert(`Erro ao criar lista: ${result.message}`);
} }

async function handleDeleteList(listId) {
  if (!confirm('Tem certeza de que deseja excluir esta lista?')) {
    return;
  }

  const result = await api.delete(`/lists/${listId}`);

  if (result.success) {
    alert('Lista excluída com sucesso.');
    loadUserLists();
  } else {
    alert(`Erro ao excluir a lista: ${result.message}`);
} }