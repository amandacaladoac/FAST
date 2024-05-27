document.addEventListener("DOMContentLoaded", () => {
  const formContato = document.getElementById("formContato");
  const idContato = document.querySelector("[name='idContato']");
  const nomeContato = document.getElementById("nome");
  const telefoneContato = document.getElementById("telefone");
  const emailContato = document.getElementById("email");
  const interessesContato = document.getElementById("interesses");
  const listaContatos = document.getElementById("listaContatos");
  const cancelarEditButton = document.getElementById("cancelarEdit");

  let contatos = [];
  let editarContatoId = null;

  // Função para renderizar lista de contatos
  function renderizarContato() {
    listaContatos.innerHTML = "";
    contatos.forEach((contato) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${contato.nome}</td>
                <td>${contato.telefone}</td>
                <td>
                    <a href="mailto:${contato.email}">${contato.email}</a>
                </td>
                <td>
                    <ul>
                        ${contato.interesses
                          .split(",")
                          .map((interesse) => `<li>${interesse.trim()}</li>`)
                          .join("")}
                    </ul>
                </td>
                <td>
                    <button onclick="editarContato('${
                      contato.id
                    }')">Editar</button>
                    <button onclick="deletarContato('${
                      contato.id
                    }')">Excluir</button>
                </td>
            `;
      listaContatos.appendChild(row);
    });
  }

  // Função para enviar formulário
  formContato.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = nomeContato.value;
    const telefone = telefoneContato.value;
    const email = emailContato.value;
    const interesses = interessesContato.value;

    if (editarContatoId) {
      // Editar Contato
      const contato = contatos.find((c) => c.id === editarContatoId);
      contato.nome = nome;
      contato.telefone = telefone;
      contato.email = email;
      contato.interesses = interesses;
      editarContatoId = null;
      cancelarEditButton.classList.add("hidden");
    } else {
      // Adicionar novo contato
      const novoContato = {
        id: Date.now().toString(),
        nome,
        telefone,
        email,
        interesses,
      };
      contatos.push(novoContato);
    }
    formContato.reset();
    renderizarContato();
  });

  // Função para editar contato
  window.editarContato = function (id) {
    const contato = contatos.find((c) => c.id === id);
    if (contato) {
      editarContatoId = id;
      nomeContato.value = contato.nome;
      telefoneContato.value = contato.telefone;
      emailContato.value = contato.email;
      interessesContato.value = contato.interesses;
      cancelarEditButton.classList.remove("hidden");
    }
  };

  // Função para deletar contato
  window.deletarContato = function (id) {
    contatos = contatos.filter((c) => c.id !== id);
    renderizarContato();
  };

  // Função para cancelar edição
  cancelarEditButton.addEventListener("click", () => {
    editarContatoId = null;
    formContato.reset();
    cancelarEditButton.classList.add("hidden");
  });
});
