let facil = document.getElementById("facil");
let medio = document.getElementById("medio");
let dificil = document.getElementById("dificil");

let consulta = localStorage.getItem("Histórico do Jogo do Cavalo");
let pacote = JSON.parse(consulta);

let blocoFacil = pacote.filter(resultado => resultado.nivel_jogado === 6);
let blocoMedio = pacote.filter(resultado => resultado.nivel_jogado === 7);
let blocoDificil = pacote.filter(resultado => resultado.nivel_jogado === 8);

for (let i = 0; i < blocoFacil.length; i++) {
    let item = document.createElement("div")
    let nome = document.createElement("p")

    nome.textContent = blocoFacil[i].nome_jogador

    item.appendChild(nome)

    facil.appendChild(item)
}