const emojis = [
    "😺",
    "😺",
    "🦝",
    "🦝",
    "🦊",
    "🦊",
    "🐶",
    "🐶",
    "🐵",
    "🐵",
    "🦁",
    "🦁",
    "🐯",
    "🐯",
    "🐮",
    "🐮",
];
let openCards = [];
let hits = 0;
let misses = 0;
let timer = 0;

function timerStart() {
    setInterval(() => {
        timer++;
        document.querySelector(".timer").innerHTML = timer;
    }, 1000);
}

timerStart();

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let shuffleEmojis = [...emojis];
shuffle(shuffleEmojis);

for (let i = 0; i < emojis.length; i++) {
    const box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
}

function handleClick() {
    if (this.classList.contains("boxOpen") || openCards.length === 2) return;

    this.classList.add("boxOpen");
    openCards.push(this);

    if (openCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
        document.querySelector(".hits").innerHTML = hits += 1;
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
        document.querySelector(".misses").innerHTML = misses += 1;
    }

    openCards = [];

    if (document.querySelectorAll(".boxMatch").length === emojis.length) {
        clearInterval(timerStart);
        alert("Você venceu!");
    }
}
