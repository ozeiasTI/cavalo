// Dados Iniciais
const instrucoes = document.getElementById("instrucoes");
const tabuleiro = document.getElementById("tabuleiro");
const mutar = document.getElementById("mutar");
const cor = "#50a798";

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

//Musica Menu
const musicaMenu = new Audio("songs/menu.mp3");
musicaMenu.loop = true;
musicaMenu.play();
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
    tabuleiro.style.gridTemplateColumns = `repeat(${valorTamanhoSelecionado}, 80px)`;
    tabuleiro.style.gridTemplateRows = `repeat(${valorTamanhoSelecionado}, 80px)`;
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

        espaco.id = i;

        espaco.addEventListener("click", () => {

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
                        //marcarplacar("Vitória");
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
                        //marcarplacar("Derrota");
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
                } else {
                    espaco.style.border = "2px solid #f5576c";
                    setTimeout(function () {
                        espaco.style.borderColor = "#bbb";
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

    function marcarplacar(statusJogo) {
        pass
    }
}

// Sons de jogo
function tocarMusica() {
    const musica = new Audio("songs/fundo.mp3");
    const slider = document.getElementById("volume");

    musica.loop = true;
    musica.play();

    slider.addEventListener("input", (e) => {
        musica.volume = e.target.value / 100;
    })
}

function sonMovimento() {
    const son = new Audio("songs/movimento.mp3");
    son.play();
}

