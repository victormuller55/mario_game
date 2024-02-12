const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const bush = document.querySelector(".bush");
const cloud = document.querySelector(".clouds");
const montain = document.querySelector(".montain");

const startButton = document.getElementById("startButton");

const marioMusic = document.getElementById("marioMusic");
const deathSound = document.getElementById("deathSound");
const jumpSound = document.getElementById("jumpSound");

const gameBoard = document.querySelector(".game-board");

let gameRunning = false;


const jump = () => {
  if (gameRunning) {
    console.log("Mario Pulou");

    jumpSound.play();
    mario.classList.add("jump");
    setTimeout(() => mario.classList.remove("jump"), 500);
    setTimeout(() => jumpSound.pause(), 800);
  }
};

const resetGame = () => {
  console.log("Resetou o jogo");

  mario.removeAttribute("style");
  pipe.removeAttribute("style");
  bush.removeAttribute("style");
  cloud.removeAttribute("style");
  montain.removeAttribute("style");

  gameRunning = false;
  startButton.style.display = "block";

  mario.src = "./images/mario.gif";
  mario.style.width = "90px";
  mario.style.marginLeft = "0";
  mario.style.bottom = "40px";
  marioMusic.pause();
};

const endGame = () => {
  console.log("Parou o jogo");

  gameBoard.classList.remove("active");
  bush.classList.remove("active");

  deathSound.play();
  mario.src = "./images/game-over.png";
  mario.style.width = "35px";
  mario.style.marginLeft = "80px";
  gameRunning = false;
  setTimeout(() => (startButton.style.display = "block"), 3700);
  marioMusic.pause();
  pipe.style.animation = "none";
  setTimeout(() => deathSound.pause(), 3700);
};

const startGame = () => {
  console.log("Game Started");

  if (!gameRunning) {
    pipe.style.left = "none";

    gameRunning = true;
    startButton.style.display = "none";

    marioMusic.play();

    gameBoard.classList.add("active");
    bush.classList.add("active");

    const loop = setInterval(() => {
      const pipePositionLeft = pipe.offsetLeft;
      const positionBushLeft = bush.offsetLeft;
      const positionCloudLeft = cloud.offsetLeft;
      const positionMontainLeft = montain.offsetLeft;

      const marioPositionBottom = +window
        .getComputedStyle(mario)
        .bottom.replace("px", "");

      if (
        pipePositionLeft <= 120 &&
        pipePositionLeft > 40 &&
        marioPositionBottom < 130
      ) {
        bush.style.animation = "none";
        bush.style.left = positionBushLeft + "px";

        pipe.style.animation = "none";
        pipe.style.left = pipePositionLeft + "px";

        mario.style.animation = "none";
        mario.style.bottom = marioPositionBottom + "px";

        cloud.style.animation = "none";
        cloud.style.left = positionCloudLeft + "px";

        montain.style.animation = "none";
        montain.style.left = positionMontainLeft + "px";

        clearInterval(loop);
        endGame();
        setTimeout(resetGame, 4000);
      }
    }, 10);
  }
};

document.addEventListener("keydown", jump);

startButton.addEventListener("click", () => startGame());
