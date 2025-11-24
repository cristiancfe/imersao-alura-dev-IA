let cardContainer = document.querySelector(".card-container");
let dados = [];
async function iniciarBusca() {
	const termoBusca = document.querySelector("input[type='text']").value.toLowerCase();

	if (dados.length === 0) {
		let resposta = await fetch("data.json");
		dados = await resposta.json();
	}

	const dadosFiltrados = termoBusca
		? dados.filter(dado => {
				const nome = dado.nome.toLowerCase();
				const descricao = dado.descrição.toLowerCase();
				return nome.includes(termoBusca);
			})
		: dados;

	renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
	cardContainer.innerHTML = '';
	for (let dado of dados) {
		let article = document.createElement("article");
		article.classList.add("card");
		article.innerHTML = `
		<h2>${dado.nome}</h2>
		<p>${dado.ano}</p>
		<p>${dado.descrição}</p>
		
		<a href="${dado.link}" target="_blank">Leia mais</a>
		`
		cardContainer.appendChild(article);
	}
}
