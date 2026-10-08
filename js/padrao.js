// Dados Iniciais
const instrucoes = document.getElementById("instrucoes");
const tabuleiro = document.getElementById("tabuleiro");
const mutar = document.getElementById("mutar");
let dicas = document.getElementById("dicas");
const cor = "#c5ed75";

function salvarDados() {
    let consulta = localStorage.getItem("Jogo do Cavalo");

    if (!consulta) {
        const dadosParaSalvar = {
            nomeDoJogador: "Usuário sem Nome",
            nivelDeJogo: 6,
            volumeDoJogo: 50
        }

        let pacote = JSON.stringify(dadosParaSalvar);

        localStorage.setItem("Jogo do Cavalo", pacote)
    }
}

salvarDados();

// Quadradinho de Dados
let quadradinho = document.querySelector(".quadradinho");
let escolhatabuleiro = document.getElementById("escolhatabuleiro");
let pontos = document.getElementById("pontos");

//Consulta Dados banco
let consulta = localStorage.getItem("Jogo do Cavalo");
let pacote = JSON.parse(consulta);

//Musica Menu
const musicaMenu = new Audio("songs/menu.mp3");
musicaMenu.loop = true;
musicaMenu.play();
musicaMenu.volume = pacote.volumeDoJogo / 100;
musicatocando = true;

mutar.addEventListener("click", () => {
    if (musicatocando) {
        musicaMenu.pause();
        musicatocando = false;
    } else {
        musicaMenu.play();
        musicatocando = true;
    }
})

// Função Raiz, START do jogo
function iniciar() {
    //Aplicaçõs iniciais
    let consultaBanco = localStorage.getItem("Jogo do Cavalo");
    let pacote = JSON.parse(consultaBanco);

    const valorTamanhoSelecionado = pacote.nivelDeJogo;

    quadradinho.style.display = "block";
    instrucoes.style.display = "none";
    tabuleiro.style.display = "grid";
    tabuleiro.style.gridTemplateColumns = `repeat(${valorTamanhoSelecionado}, minmax(0, 1fr))`;
    tabuleiro.style.gridTemplateRows = `repeat(${valorTamanhoSelecionado}, minmax(0, 1fr))`;
    escolhatabuleiro.textContent = valorTamanhoSelecionado;

    musicaMenu.pause();
    tocarMusica()

    const tamanho = valorTamanhoSelecionado * valorTamanhoSelecionado;
    let linhas = [];
    let contador = 0;

    for (let i = 0; i < valorTamanhoSelecionado; i++) {
        let linha = [];
        for (let j = 0; j < valorTamanhoSelecionado; j++) {
            linha.push(contador);
            contador++;
        }
        linhas.push(linha);
    }

    let arrayPossibilidades = [];
    let historico = [];
    let jogadas = 0;

    for (let i = 0; i < tamanho; i++) {
        let espaco = document.createElement("div");

        espaco.classList.add("celula");
        espaco.classList.add(Math.floor(i / valorTamanhoSelecionado) % 2 === i % valorTamanhoSelecionado % 2 ? "casa-clara" : "casa-escura");

        espaco.id = i;

        espaco.addEventListener("click", () => {
            //Dicas
            for (let i = 0; i < tamanho; i++) {
                let ajustarBorda = document.getElementById(i);
                ajustarBorda.style.border = "2px solid transparent";
                ajustarBorda.style.boxShadow = "none";
            }

            let img = document.createElement('img');
            img.src = "img/cavalo.png";
            img.style.width = "60px";

            if (arrayPossibilidades.length === 0) {
                espaco.style.backgroundColor = cor;
                arrayPossibilidades = formulaSecreta(i);
                jogadas++;
                historico.push(i);

                sonMovimento();

                pontos.textContent = jogadas;

                espaco.appendChild(img);
                //Dicas
                let Array_C = [];
                for (let i = 0; i < arrayPossibilidades.length; i++) {
                    let encontrado = false;

                    for (let j = 0; j < historico.length; j++) {
                        if (arrayPossibilidades[i] === historico[j]) {
                            encontrado = true;
                            break;
                        }
                    }
                    if (encontrado === false) {
                        Array_C.push(arrayPossibilidades[i])
                    }
                }
                if (dicas.checked == true) {
                    for (let i = 0; i < Array_C.length; i++) {
                        let elementoPintar = document.getElementById(Array_C[i]);
                        elementoPintar.style.border = "2px solid #ee765f";
                        elementoPintar.style.boxShadow = "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset";
                    }
                }

            } else {
                let seTem = arrayPossibilidades.includes(i);

                if (seTem) {
                    let seHistorico = historico.includes(i);

                    if (seHistorico) {
                        return;
                    }

                    sonMovimento();

                    espaco.style.backgroundColor = cor;
                    arrayPossibilidades = formulaSecreta(i);

                    let Imagem = document.getElementById(historico[historico.length - 1]);

                    Imagem.innerHTML = ""

                    jogadas++;
                    historico.push(i);

                    pontos.textContent = jogadas;

                    espaco.appendChild(img);

                    let vitoria = verificarVitoria();
                    if (vitoria) {
                        marcarplacar("Vitória", historico);
                        let fundo = document.getElementById("fundo");
                        let fundotexto = document.getElementById("fundotexto");

                        fundo.style.display = "flex";

                        let imagem = document.createElement("img");
                        imagem.src = "img/vitoria.png";
                        imagem.style.width = "200px";
                        fundotexto.appendChild(imagem);

                        let botaoreiniciar = document.createElement("button");
                        botaoreiniciar.textContent = "Reiniciar";

                        fundotexto.appendChild(botaoreiniciar);

                        botaoreiniciar.addEventListener("click", () => {
                            window.location.reload();
                        })
                    }

                    let derrota = verificarDerrota();
                    if (derrota == true) {
                        marcarplacar("Derrota", historico);
                        let fundo = document.getElementById("fundo");
                        let fundotexto = document.getElementById("fundotexto");

                        fundo.style.display = "flex";

                        let imagem = document.createElement("img");
                        imagem.src = "img/derrota.png";
                        imagem.style.width = "200px";
                        fundotexto.appendChild(imagem);

                        let botaoreiniciar = document.createElement("button");
                        botaoreiniciar.textContent = "Reiniciar";

                        fundotexto.appendChild(botaoreiniciar);

                        botaoreiniciar.addEventListener("click", () => {
                            window.location.reload();
                        })
                    }

                    //Dicas
                    let Array_C = [];
                    for (let i = 0; i < arrayPossibilidades.length; i++) {
                        let encontrado = false;

                        for (let j = 0; j < historico.length; j++) {
                            if (arrayPossibilidades[i] === historico[j]) {
                                encontrado = true;
                                break;
                            }
                        }
                        if (encontrado === false) {
                            Array_C.push(arrayPossibilidades[i])
                        }
                    }
                    if (dicas.checked == true) {
                        for (let i = 0; i < Array_C.length; i++) {
                            let elementoPintar = document.getElementById(Array_C[i]);
                            elementoPintar.style.border = "2px solid #ee765f";
                            elementoPintar.style.boxShadow = "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset";
                        }
                    }
                } else {
                    espaco.style.border = "3px solid #f5576c";
                    setTimeout(function () {
                        espaco.style.borderColor = "transparent";
                    }, 500)

                }
            }

        })

        tabuleiro.appendChild(espaco);
    }

    function formulaSecreta(numeroclicado) {

        let x = numeroclicado;

        let possibilidades = [];

        for (let i = 0; i < linhas.length; i++) {
            let combinacao = linhas[i];
            let posicao = combinacao.indexOf(x);

            switch (posicao) {
                case 0:
                    numero_2 = (x + 1) - (valorTamanhoSelecionado * 2);
                    numero_4 = (x + 2) - valorTamanhoSelecionado;
                    numero_6 = (x + 2) + valorTamanhoSelecionado;
                    numero_8 = (x + 1) + (valorTamanhoSelecionado * 2);
                    possibilidades.push(numero_2, numero_4, numero_6, numero_8);
                    break;
                case 1:
                    numero_1 = (x - 1) - (valorTamanhoSelecionado * 2);
                    numero_2 = (x + 1) - (valorTamanhoSelecionado * 2);
                    numero_4 = (x + 2) - valorTamanhoSelecionado;
                    numero_6 = (x + 2) + valorTamanhoSelecionado;
                    numero_7 = (x - 1) + (valorTamanhoSelecionado * 2);
                    numero_8 = (x + 1) + (valorTamanhoSelecionado * 2);
                    possibilidades.push(numero_1, numero_2, numero_4, numero_6, numero_7, numero_8);
                    break;
                case 2:
                case 3:
                    numero_1 = (x - 1) - (valorTamanhoSelecionado * 2);
                    numero_2 = (x + 1) - (valorTamanhoSelecionado * 2);
                    numero_3 = (x - 2) - valorTamanhoSelecionado;
                    numero_4 = (x + 2) - valorTamanhoSelecionado;
                    numero_5 = (x - 2) + valorTamanhoSelecionado;
                    numero_6 = (x + 2) + valorTamanhoSelecionado;
                    numero_7 = (x - 1) + (valorTamanhoSelecionado * 2);
                    numero_8 = (x + 1) + (valorTamanhoSelecionado * 2);
                    possibilidades.push(numero_1, numero_2, numero_3, numero_4, numero_5, numero_6, numero_7, numero_8);
                    break;
                case 4:
                    if (valorTamanhoSelecionado === 6) {
                        numero_1 = (x - 1) - (valorTamanhoSelecionado * 2);
                        numero_2 = (x + 1) - (valorTamanhoSelecionado * 2);
                        numero_3 = (x - 2) - valorTamanhoSelecionado;
                        numero_5 = (x - 2) + valorTamanhoSelecionado;
                        numero_7 = (x - 1) + (valorTamanhoSelecionado * 2);
                        numero_8 = (x + 1) + (valorTamanhoSelecionado * 2);
                        possibilidades.push(numero_1, numero_2, numero_3, numero_5, numero_7, numero_8);
                    } else {
                        numero_1 = (x - 1) - (valorTamanhoSelecionado * 2);
                        numero_2 = (x + 1) - (valorTamanhoSelecionado * 2);
                        numero_3 = (x - 2) - valorTamanhoSelecionado;
                        numero_4 = (x + 2) - valorTamanhoSelecionado;
                        numero_5 = (x - 2) + valorTamanhoSelecionado;
                        numero_6 = (x + 2) + valorTamanhoSelecionado;
                        numero_7 = (x - 1) + (valorTamanhoSelecionado * 2);
                        numero_8 = (x + 1) + (valorTamanhoSelecionado * 2);
                        possibilidades.push(numero_1, numero_2, numero_3, numero_4, numero_5, numero_6, numero_7, numero_8);
                    }
                    break;
                case 5:
                    if (valorTamanhoSelecionado === 6) {
                        numero_1 = (x - 1) - (valorTamanhoSelecionado * 2);
                        numero_3 = (x - 2) - valorTamanhoSelecionado;
                        numero_5 = (x - 2) + valorTamanhoSelecionado;
                        numero_7 = (x - 1) + (valorTamanhoSelecionado * 2);
                        possibilidades.push(numero_1, numero_3, numero_5, numero_7);
                    } else if (valorTamanhoSelecionado === 7) {
                        numero_1 = (x - 1) - (valorTamanhoSelecionado * 2);
                        numero_2 = (x + 1) - (valorTamanhoSelecionado * 2);
                        numero_3 = (x - 2) - valorTamanhoSelecionado;
                        numero_5 = (x - 2) + valorTamanhoSelecionado;
                        numero_7 = (x - 1) + (valorTamanhoSelecionado * 2);
                        numero_8 = (x + 1) + (valorTamanhoSelecionado * 2);
                        possibilidades.push(numero_1, numero_2, numero_3, numero_5, numero_7, numero_8);
                    } else {
                        numero_1 = (x - 1) - (valorTamanhoSelecionado * 2);
                        numero_2 = (x + 1) - (valorTamanhoSelecionado * 2);
                        numero_3 = (x - 2) - valorTamanhoSelecionado;
                        numero_4 = (x + 2) - valorTamanhoSelecionado;
                        numero_5 = (x - 2) + valorTamanhoSelecionado;
                        numero_6 = (x + 2) + valorTamanhoSelecionado;
                        numero_7 = (x - 1) + (valorTamanhoSelecionado * 2);
                        numero_8 = (x + 1) + (valorTamanhoSelecionado * 2);
                        possibilidades.push(numero_1, numero_2, numero_3, numero_4, numero_5, numero_6, numero_7, numero_8);
                    }
                    break;
                case 6:
                    if (valorTamanhoSelecionado === 7) {
                        numero_1 = (x - 1) - (valorTamanhoSelecionado * 2);
                        numero_3 = (x - 2) - valorTamanhoSelecionado;
                        numero_5 = (x - 2) + valorTamanhoSelecionado;
                        numero_7 = (x - 1) + (valorTamanhoSelecionado * 2);
                        possibilidades.push(numero_1, numero_3, numero_5, numero_7);
                    } else {
                        numero_1 = (x - 1) - (valorTamanhoSelecionado * 2);
                        numero_2 = (x + 1) - (valorTamanhoSelecionado * 2);
                        numero_3 = (x - 2) - valorTamanhoSelecionado;
                        numero_5 = (x - 2) + valorTamanhoSelecionado;
                        numero_7 = (x - 1) + (valorTamanhoSelecionado * 2);
                        numero_8 = (x + 1) + (valorTamanhoSelecionado * 2);
                        possibilidades.push(numero_1, numero_2, numero_3, numero_5, numero_7, numero_8);
                    }
                    break;
                case 7:
                    numero_1 = (x - 1) - (valorTamanhoSelecionado * 2);
                    numero_3 = (x - 2) - valorTamanhoSelecionado;
                    numero_5 = (x - 2) + valorTamanhoSelecionado;
                    numero_7 = (x - 1) + (valorTamanhoSelecionado * 2);
                    possibilidades.push(numero_1, numero_3, numero_5, numero_7);
                    break;
            }
        }

        let retorno = [];

        for (let i = 0; i < possibilidades.length; i++) {
            if (possibilidades[i] >= 0 && possibilidades[i] <= (tamanho - 1)) {
                retorno.push(possibilidades[i]);
            }
        }

        return retorno;

    }

    function verificarVitoria() {
        if (jogadas === tamanho) {
            return true
        }
    }

    function verificarDerrota() {
        for (let i = 0; i < arrayPossibilidades.length; i++) {
            let comparacao = historico.includes(arrayPossibilidades[i]);

            if (!comparacao) {
                return false;
            }

        }
        if (jogadas < tamanho) {
            return true;
        }
    }

    function marcarplacar(statusJogo, historico) {
        let Data = new Date()
        let dia = Data.getDate();
        let mes = Data.getMonth();
        let ano = Data.getFullYear();

        let segundos = Data.getSeconds();
        let minutos = Data.getMinutes();
        let hora = Data.getHours();


        let nome = pacote.nomeDoJogador;
        let nivel = pacote.nivelDeJogo;

        let dado = {
            nome_jogador: nome,
            nivel_jogado: nivel,
            data_jogo: `${dia}/${mes}/${ano}`,
            hora_jogo: `${hora}:${minutos}:${segundos}`,
            status_jogo: statusJogo,
            pontos: jogadas,
            raio_x: historico
        }

        let consulta = localStorage.getItem("Histórico do Jogo do Cavalo");

        if (!consulta) {
            let dados = [];
            dados.push(dado)
            let empacotar = JSON.stringify(dados);
            localStorage.setItem("Histórico do Jogo do Cavalo", empacotar);
        } else {
            let resultado = JSON.parse(consulta);
            let dados = resultado;
            dados.push(dado)
            let empacotar = JSON.stringify(dados);
            localStorage.setItem("Histórico do Jogo do Cavalo", empacotar);
        }

    }
}

// Sons de jogo
function tocarMusica() {
    const musica = new Audio("songs/fundo.mp3");

    musica.loop = true;
    musica.play();
    musica.volume = pacote.volumeDoJogo / 100;
}

function sonMovimento() {
    const son = new Audio("songs/movimento.mp3");
    son.volume = pacote.volumeDoJogo / 100;
    son.play();

}

