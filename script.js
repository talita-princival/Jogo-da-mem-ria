
const emojis = [
    "🐶", "🐱", "🦁", "🐸", "🐼",
    "🐵", "🦊", "🐰", "🐻", "🐯"
];

let cartas = [];
let primeiraCarta = null;
let segundaCarta = null;
let bloqueio = false;

let jogadorAtual = 1;
let pontos = [0, 0];
let paresEncontrados = 0;

const tabuleiro = document.getElementById("tabuleiro");

function iniciarJogo() {
    cartas = [...emojis, ...emojis];

    cartas.sort(() => Math.random() - 0.5);

    tabuleiro.innerHTML = "";

    cartas.forEach((emoji, indice) => {
        const carta = document.createElement("div");

        carta.classList.add("carta");
        carta.dataset.emoji = emoji;
        carta.dataset.indice = indice;
        carta.textContent = "❓";

        carta.addEventListener("click", () => virarCarta(carta));

        tabuleiro.appendChild(carta);
    });

    atualizarPlacar();
}

function virarCarta(carta) {
    if (
        bloqueio ||
        carta.classList.contains("revelada") ||
        carta.classList.contains("encontrada")
    ) {
        return;
    }

    carta.classList.add("revelada");
    carta.textContent = carta.dataset.emoji;

    if (primeiraCarta === null) {
        primeiraCarta = carta;
        return;
    }

    segundaCarta = carta;
    bloqueio = true;

    verificarPar();
}

function verificarPar() {
    const acertou =
        primeiraCarta.dataset.emoji === segundaCarta.dataset.emoji;

    if (acertou) {
        primeiraCarta.classList.add("encontrada");
        segundaCarta.classList.add("encontrada");

        pontos[jogadorAtual - 1]++;
        paresEncontrados++;

        atualizarPlacar();

        primeiraCarta = null;
        segundaCarta = null;
        bloqueio = false;

        if (paresEncontrados === 10) {
            finalizarJogo();
        }

    } else {
        setTimeout(() => {
            primeiraCarta.classList.remove("revelada");
            segundaCarta.classList.remove("revelada");

            primeiraCarta.textContent = "❓";
            segundaCarta.textContent = "❓";

            primeiraCarta = null;
            segundaCarta = null;

            trocarJogador();
            bloqueio = false;
        }, 1000);
    }
}

function trocarJogador() {
    jogadorAtual = jogadorAtual === 1 ? 2 : 1;
    atualizarPlacar();
}

function atualizarPlacar() {
    document.getElementById("pontos1").textContent = pontos[0];
    document.getElementById("pontos2").textContent = pontos[1];

    document.getElementById("turno").textContent =
        "Vez do Jogador " + jogadorAtual;

    document.getElementById("jogador1").classList.toggle(
        "ativo", jogadorAtual === 1
    );

    document.getElementById("jogador2").classList.toggle(
        "ativo", jogadorAtual === 2
    );
}

function finalizarJogo() {
    const mensagem = document.getElementById("mensagem");

    if (pontos[0] > pontos[1]) {
        mensagem.textContent = "🏆 Jogador 1 venceu!";
    } else if (pontos[1] > pontos[0]) {
        mensagem.textContent = "🏆 Jogador 2 venceu!";
    } else {
        mensagem.textContent = "🤝 Empate! Os dois venceram!";
    }

    document.getElementById("turno").textContent = "Fim de jogo!";
}

function reiniciarJogo() {
    primeiraCarta = null;
    segundaCarta = null;
    bloqueio = false;

    jogadorAtual = 1;
    pontos = [0, 0];
    paresEncontrados = 0;

    document.getElementById("mensagem").textContent = "";

    iniciarJogo();
}

iniciarJogo();
