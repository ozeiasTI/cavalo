function voltar() {
    window.location.href = "../index.html";
}
function historico() {
    window.location.href = "historico.html";
}

function apagar() {
    localStorage.removeItem("Histórico do Jogo do Cavalo");
    alert("Todo o Histórico foi apagado!")
}

let nome = document.getElementById("nome");
let nivel = document.getElementById("nivel");
let slider = document.getElementById("volume");

const musica = new Audio("../songs/menu.mp3");

const retorno = localStorage.getItem("Jogo do Cavalo");
const dadosSalvos = JSON.parse(retorno);

nome.value = dadosSalvos.nomeDoJogador;
nivel.value = dadosSalvos.nivelDeJogo;
slider.value = dadosSalvos.volumeDoJogo;

function salvar() {
    nome = nome.value;
    nivel = parseInt(nivel.value);
    volume = musica.volume;

    let jogoDoCavalo = {
        nomeDoJogador: nome,
        nivelDeJogo: nivel,
        volumeDoJogo: volume * 100,
    }

    let pacote = JSON.stringify(jogoDoCavalo);

    localStorage.setItem("Jogo do Cavalo", pacote);

    alert("Dados Salvos na Memória!");
    window.location.href = "../index.html";
}

function tocarMusica() {
    musica.loop = true;
    musica.play();
    musica.volume = dadosSalvos.volumeDoJogo / 100

    slider.addEventListener("input", (e) => {
        musica.volume = e.target.value / 100;
    })
}

tocarMusica()