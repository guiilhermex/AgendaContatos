const API_CONTATO = 'https://localhost:7110/api/Contato';
const API_GRUPO = 'https://localhost:7110/api/Grupos';

// Usuário logado fixo (ajuste depois conforme login real)
const usuarioId = 1;

const dataBody = document.getElementById('data');
const groupBody = document.getElementById('groupData');
const form = document.getElementById('myForm');
const groupForm = document.getElementById('createGroupForm');

let editingContatoId = null;
let editingGrupoId = null;

console.log("Script carregado");

async function carregarContatos() {
  console.log("Carregando contatos...");
  try {
    const res = await fetch(API_CONTATO);
    const contatosJson = await res.json();
    const contatos = Array.isArray(contatosJson) ? contatosJson : (contatosJson.$values || []);

    const contatosFiltrados = contatos.filter(c => c.usuarioId === usuarioId);

    dataBody.innerHTML = '';
    contatosFiltrados.forEach(({ id, nome, email, telefone, grupo }) => {
      dataBody.innerHTML += `
        <tr>
          <td>${nome}</td>
          <td>${email}</td>
          <td>${telefone || ''}</td>
          <td>${grupo?.nome || ''}</td>
          <td>
            <button class="btn btn-info btn-sm" onclick="visualizarContato(${id})">Ver</button>
            <button class="btn btn-warning btn-sm" onclick="editarContato(${id})">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="excluirContato(${id})">Excluir</button>
          </td>
        </tr>
      `;
    });
  } catch (erro) {
    console.error("Erro ao carregar contatos:", erro);
    alert("Erro ao carregar contatos. Veja o console.");
  }
}

async function carregarGrupos() {
  console.log("Carregando grupos...");
  try {
    const resGrupos = await fetch(API_GRUPO);
    const gruposJson = await resGrupos.json();
    const grupos = Array.isArray(gruposJson) ? gruposJson : (gruposJson.$values || []);

    groupBody.innerHTML = '';
    grupos.forEach(({ id, nome }) => {
      groupBody.innerHTML += `
        <tr>
          <td>${nome}</td>
          <td>
            <button class="btn btn-warning btn-sm" onclick="editarGrupo(${id}, '${nome}')">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="excluirGrupo(${id})">Excluir</button>
          </td>
        </tr>
      `;
    });
  } catch (erro) {
    console.error("Erro ao carregar grupos:", erro);
    alert("Erro ao carregar grupos. Veja o console.");
  }
}

async function visualizarContato(id) {
  try {
    const res = await fetch(`${API_CONTATO}/${id}`);
    const contato = await res.json();
    document.getElementById('showName').value = contato.nome;
    document.getElementById('showEmail').value = contato.email;
    document.getElementById('showPhone').value = contato.telefone || '';
    document.getElementById('showPost').value = contato.grupo?.nome || '';
    new bootstrap.Modal(document.getElementById('readData')).show();
  } catch (erro) {
    console.error("Erro ao visualizar contato:", erro);
    alert("Erro ao visualizar contato.");
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nome = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefone = document.getElementById('phone').value.trim();
  const grupoNome = document.getElementById('group').value.trim();

  const contato = {
    nome,
    email,
    telefone,
    grupo: { nome: grupoNome },
    usuarioId
  };

  const method = editingContatoId ? 'PUT' : 'POST';
  const url = editingContatoId ? `${API_CONTATO}/${editingContatoId}` : API_CONTATO;

  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contato),
    });

    if (!res.ok) throw new Error(await res.text());

    editingContatoId = null;
    form.reset();
    bootstrap.Modal.getInstance(document.getElementById('userForm')).hide();
    carregarContatos();
    carregarGrupos();
  } catch (erro) {
    console.error("Erro ao salvar contato:", erro);
    alert(`Erro ao salvar contato: ${erro.message}`);
  }
});

groupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nome = document.getElementById('newGroupName').value.trim();
  const grupo = { nome };

  const method = editingGrupoId ? 'PUT' : 'POST';
  const url = editingGrupoId ? `${API_GRUPO}/${editingGrupoId}` : API_GRUPO;

  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(grupo),
    });

    if (!res.ok) throw new Error(await res.text());

    editingGrupoId = null;
    groupForm.reset();
    bootstrap.Modal.getInstance(document.getElementById('groupForm')).hide();
    carregarGrupos();
  } catch (erro) {
    console.error("Erro ao salvar grupo:", erro);
    alert(`Erro ao salvar grupo: ${erro.message}`);
  }
});

async function excluirContato(id) {
  const confirmed = confirm("Tem certeza que deseja excluir este contato?");
  if (!confirmed) return;

  try {
    const res = await fetch(`${API_CONTATO}/remover/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(await res.text());
    carregarContatos();
    carregarGrupos();
  } catch (erro) {
    console.error("Erro ao excluir contato:", erro);
    alert(`Erro ao excluir contato: ${erro.message}`);
  }
}

async function excluirGrupo(id) {
  try {
    const res = await fetch(`${API_GRUPO}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(await res.text());
    carregarGrupos();
    carregarContatos();
  } catch (erro) {
    console.error("Erro ao excluir grupo:", erro);
    alert(`Erro ao excluir grupo: ${erro.message}`);
  }
}

function editarContato(id) {
  fetch(`${API_CONTATO}/${id}`)
    .then(res => res.json())
    .then(contato => {
      document.getElementById('name').value = contato.nome;
      document.getElementById('email').value = contato.email;
      document.getElementById('phone').value = contato.telefone || '';
      document.getElementById('group').value = contato.grupo?.nome || '';
      editingContatoId = id;
      new bootstrap.Modal(document.getElementById('userForm')).show();
    })
    .catch(erro => {
      console.error("Erro ao editar contato:", erro);
      alert("Erro ao carregar dados do contato.");
    });
}

function editarGrupo(id, nome) {
  document.getElementById('newGroupName').value = nome;
  editingGrupoId = id;
  new bootstrap.Modal(document.getElementById('groupForm')).show();
}

// Carrega tudo ao iniciar
carregarContatos();
carregarGrupos();
