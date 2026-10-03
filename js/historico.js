let dados = document.getElementById("dados");

let consulta = localStorage.getItem("Histórico do Jogo do Cavalo");
let pacote = JSON.parse(consulta);

if (pacote) {
    for (let i = pacote.length - 1; i >= 0; i--) {
        let item = document.createElement("div");
        item.classList.add("quadrado");

        let cabecalho = document.createElement("div");
        cabecalho.classList.add("cabecalho");

        let nome = document.createElement("h3");
        nome.textContent = pacote[i].nome_jogador;
        let dataehora = document.createElement("p");
        dataehora.textContent = pacote[i].data_jogo + " | " + pacote[i].hora_jogo;

        cabecalho.appendChild(nome);
        cabecalho.appendChild(dataehora);

        let main = document.createElement("div");
        main.classList.add("main");

        let pontos = document.createElement("p");
        pontos.textContent = "- Pontos: " + pacote[i].pontos;
        let tabuleiro = document.createElement("p");

        tabuleiro.textContent = "- Tabuleiro Selecionado: " + pacote[i].nivel_jogado;

        let footer = document.createElement("div");
        footer.classList.add("footer")

        let statusDoJogo = document.createElement("h4");
        statusDoJogo.textContent = pacote[i].status_jogo;

        if (pacote[i].status_jogo === "Derrota") {
            statusDoJogo.classList.add("derrota")
        } else {
            statusDoJogo.classList.add("vitoria")
        }

        let assistir = document.createElement("button");
        assistir.classList.add("play")
        assistir.id = i;
        assistir.textContent = "Assistir Partida";

        assistir.addEventListener("click", () => {
            alert("Função em Desenvolvimento!")
        })

        footer.appendChild(statusDoJogo);
        footer.appendChild(assistir);

        main.appendChild(pontos);
        main.appendChild(tabuleiro);
        main.appendChild(footer);

        item.appendChild(cabecalho);
        item.appendChild(main);

        dados.appendChild(item);
    }
} else {
    let paragrafo = document.createElement("p");
    paragrafo.textContent = "Você ainda não possui Histórico de Partidas.";

    dados.appendChild(paragrafo)
}