function agendar() {
  let nome = document.getElementById("nome").value;
  let horario = document.getElementById("horario").value;

  // validação
  if (nome === "" || horario === "") {
    document.getElementById("mensagem").innerText = "Preencha tudo!";
    return;
  }

  // regra de horário
  let hora = parseInt(horario.split(":")[0]);

  if (hora >= 18) {
    document.getElementById("mensagem").innerText = "Estamos fechados!";
    return;
  }

  // salvar
  let agendamento = {
    nome: nome,
    horario: horario
  };

  let lista = JSON.parse(localStorage.getItem("agendamentos")) || [];

  lista.push(agendamento);

  localStorage.setItem("agendamentos", JSON.stringify(lista));

  mostrarAgendamentos();

  // WhatsApp (FINAL)
  let telefone = "5565993379779";

  let mensagem = `Olá, meu nome é ${nome} e gostaria de agendar um horário às ${horario}`;

  let url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

  window.location.href = url;
}

function mostrarAgendamentos() {
  let lista = JSON.parse(localStorage.getItem("agendamentos")) || [];

  let ul = document.getElementById("lista");
  ul.innerHTML = "";

  lista.forEach(function(item, index) {
    let li = document.createElement("li");

    li.innerText = item.nome + " - " + item.horario;

    let botao = document.createElement("button");
    botao.innerText = "Excluir";

    botao.onclick = function() {
      lista.splice(index, 1);
      localStorage.setItem("agendamentos", JSON.stringify(lista));
      mostrarAgendamentos();
    };

    li.appendChild(botao);
    ul.appendChild(li);
  });
}

mostrarAgendamentos();

if (!localStorage.getItem("limpo")) {
  localStorage.clear();
  localStorage.setItem("limpo", "true");
}