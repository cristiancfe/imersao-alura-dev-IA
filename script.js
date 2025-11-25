let cardContainer = document.querySelector(".card-container");
let dados = [];

async function carregarDados() {
	let resposta = await fetch("data.json");
	dados = await resposta.json();
	renderizarCards(dados);
}

async function iniciarBusca() {
	const termoBusca = document.querySelector("input[type='text']").value.toLowerCase();

	if (dados.length === 0) {
		let resposta = await fetch("data.json");
		dados = await resposta.json();
	}

	const dadosFiltrados = termoBusca
		? dados.filter(dado => {
				const nome = dado.nome.toLowerCase();
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
		${dado.imagem ? `<img src="${dado.imagem}" alt="Logo ${dado.nome}" class="card-image">` : ''}
		<h2>${dado.nome}</h2>
		<p>${dado.ano}</p>
		<p>${dado.descrição}</p>
		
		<a href="${dado.link}" target="_blank">Leia mais</a>
		`
		cardContainer.appendChild(article);
	}
}

const modoToggle = document.getElementById('modo-toggle');
const body = document.body;

modoToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('mode', 'light');
    } else {
        localStorage.setItem('mode', 'dark');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const savedMode = localStorage.getItem('mode');
    if (savedMode === 'light') {
        body.classList.add('light-mode');
    }

	const pageTitle = document.querySelector('h1').textContent;
	if (pageTitle === 'Linguagens de Programação') {
		carregarDados();
	}
});