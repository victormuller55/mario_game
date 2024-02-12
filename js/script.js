const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const startButton = document.getElementById("startButton");
const marioMusic = document.getElementById('marioMusic');
const gameBoard = document.querySelector('.game-board');

let gameRunning = false;

const jump = () => {
  if (gameRunning) {
    mario.classList.add("jump");
    setTimeout(() => mario.classList.remove("jump"), 500);
  }
};

const resetGame = () => {
  mario.src = "./images/mario.gif";
  mario.style.width = "90px";
  mario.style.marginLeft = "0";
  gameRunning = false;
  startButton.style.display = 'block';
  marioMusic.pause();
  pipe.style.left = "70px";
  pipe.style.animation = "pipe-animation 1.5s infinite linear";
};

const endGame = () => {
  mario.src = "./images/game-over.png";
  mario.style.width = "42px";
  mario.style.marginLeft = "80px";
  gameRunning = false;
  startButton.style.display = 'block';
  marioMusic.pause();
  pipe.style.animation = "none"; // Pausa a animação do cano quando o jogo termina
};

const startGame = () => {
  if (!gameRunning) {
    gameRunning = true;
    marioMusic.play();
    gameBoard.classList.add('active');
    startButton.style.display = 'none';

    const loop = setInterval(() => {
      const position = pipe.offsetLeft;
      const marioPosition = +window
        .getComputedStyle(mario)
        .bottom.replace("px", "");

      if (position <= 120 && position > 0 && marioPosition < 110) {
        pipe.style.animation = "none";
        pipe.style.left = position + "px";
        mario.style.animation = "none";
        mario.style.bottom = marioPosition + "px";

        clearInterval(loop);
        endGame(); 
        setTimeout(resetGame, 2000); 
      }
    }, 10);
  }
};
document.addEventListener("keydown", jump);

startButton.addEventListener('click', () => {
  startGame();
});

