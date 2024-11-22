const balanco = document.getElementById("balanco");
const dinheiro_mais = document.getElementById("dinheiro-mais");
const dinheiro_menos = document.getElementById("dinheiro-menos");
const lista = document.getElementById("lista");
const formulario = document.getElementById("formulario");
const texto = document.getElementById("texto");
const quantidade = document.getElementById("quantidade");

//Salva Transações no Armazem Local
const transacoesArmazemLocal = JSON.parse(localStorage.getItem("transacoes"));
let transacoes = localStorage.getItem("transacoes") !== null ? transacoesArmazemLocal : [];

//Adiciona Transações ao DOM da lista
function adicionarTransacaoDOM(transacao) {
  //Define Sinal
  const sinal = transacao.quantidade < 0 ? "-" : "+";
  const item = document.createElement("li");
  //Adiciona uma classe baseada no valor
  item.classList.add(transacao.quantidade > 0 ? "menos" : "mais");
  //Criar elemento
  item.innerHTML = `${transacao.texto} <span>R$${Math.abs(
    transacao.quantidade
  ).toFixed(2)}
  </span> <button class="botao-apagar" onclick="removerTransacao(${
    transacao.id
  })">x</button>`;
  //Adiciona o elemento a lista
  lista.appendChild(item);
}

//Atualiza valores das transações
function atualizarValores() {
  const quantidades = transacoes.map((transacao) => transacao.quantidade);

  const total = quantidades
    .reduce((soma, item) => (soma += item), 0)
    .toFixed(2);
  const ganhos = quantidades
    .filter((item) => item > 0)
    .reduce((soma, item) => (soma += item), 0)
    .toFixed(2);
  const despesas = quantidades
    .filter((item) => item < 0)
    .reduce((soma, item) => (soma -= item), 0)
    .toFixed(2);

  balanco.innerText = `R$${total}`;
  dinheiro_mais.innerText = ` R$${ganhos}`;
  dinheiro_menos.innerText = `R$${despesas}`;
}

//Remove Transacão da lista
function removerTransacao(id) {
  transacoes = transacoes.filter((transacao) => transacao.id !== id);

  atualizarArmazemLocal();
  inicializar();
}

//Atualiza transações no Armazém Local
function atualizarArmazemLocal() {
  localStorage.setItem("transacoes", JSON.stringify(transacoes));
}

function inicializar() {
  lista.innerHTML = "";

  transacoes.forEach(adicionarTransacaoDOM);
  atualizarValores();
}
inicializar();

//Adicionar transações
formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const novoTexto = texto.value.trim();
  const novaQuantidade = Number(quantidade.value);

  if (novoTexto && !isNaN(novaQuantidade)) {
    const transacao = {
      id: Date.now(),
      texto: novoTexto,
      quantidade: novaQuantidade,
    };

    transacoes.push(transacao);
    adicionarTransacaoDOM(transacao);

    atualizarValores();
    atualizarArmazemLocal();

    formulario.reset();
  }
});
