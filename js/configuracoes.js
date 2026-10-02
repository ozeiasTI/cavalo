function voltar(){
    window.location.href = "../index.html";
}

let nome = document.getElementById("nome");
let nivel = document.getElementById("nivel");

const retorno = localStorage.getItem("Jogo do Cavalo");
const dadosSalvos = JSON.parse(retorno);

nome.value = dadosSalvos.nomeDoJogador;

function salvar(){
    nome = nome.value;
    nivel = nivel.value;

    let jogoDoCavalo = {
        nomeDoJogador : nome,
        nivelDeJogo : nivel
    }

    let pacote = JSON.stringify(jogoDoCavalo);

    localStorage.setItem("Jogo do Cavalo", pacote);

    alert("Dados Salvos na Memória!");
    window.location.href = "../index.html";
}