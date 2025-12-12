let result = document.querySelector("#result");
let chance = document.querySelector("#chance");
let user = document.querySelector("#user");
let playBtn = document.querySelector("#play");
let resetBtn = document.querySelector("#reset");
let imgBox = document.querySelector("#gameImg");
let container = document.querySelector(".container");
let mainBtn = document.querySelector(".main");
let startBtn = document.querySelector("#startBtn");
let gameoverScreen = document.querySelector("#gameoverScreen");
let gameoverAnswer = document.querySelector("#gameoverAnswer");
let gameoverRestart = document.querySelector("#gameoverRestart");
let bingoScreen = document.querySelector("#bingoScreen");
let bingoAnswer = document.querySelector("#bingoAnswer");
let bingoRestart = document.querySelector("#bingoRestart");
let chances = 5;
let computerNum;

// 별 생성
function createStars() {
  const wrap = document.querySelector(".wrap");
  for (let i = 0; i < 50; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 3 + "s";
    wrap.appendChild(star);
  }
}

createStars();

// 게임 시작
startBtn.addEventListener("click", function () {
  mainBtn.classList.add("moved");
  setTimeout(() => {
    container.classList.add("show");
  }, 500);
});

function randomNum() {
  computerNum = Math.floor(Math.random() * 100 + 1);
  console.log("정답:", computerNum);
}

randomNum();

function play() {
  let userNum = Number(user.value);
  console.log("입력값:", userNum);

  if (userNum < 1 || userNum > 100) {
    result.textContent = "1~100까지 맞춰보세요";
    return;
  }
  // 중복x
  if (user.dataset.lastInput === String(userNum)) {
    result.textContent = "다른 숫자를 입력하세요!";
    return;
  }
  user.dataset.lastInput = userNum;

  if (computerNum > userNum) {
    result.textContent = "⬆️ UP!";
    imgBox.src = "img/up.gif";
  } else if (computerNum < userNum) {
    result.textContent = "⬇️ DOWN!";
    imgBox.src = "img/down.gif";
  } else if (computerNum == userNum) {
    result.textContent = "🎉 BINGO!";
    imgBox.src = "img/bingo.gif";
    playBtn.disabled = true;

    // 빙고 화면 표시
    setTimeout(() => {
      bingoAnswer.textContent = computerNum;
      bingoScreen.classList.add("show");
    }, 1000);
    return;
  }

  chances--;
  console.log("남은 찬스:", chances);

  // 하트 제거 애니메이션
  const hearts = document.querySelectorAll(".heart");
  if (chances >= 0 && chances < 5) {
    hearts[chances].classList.add("lost");
  }

  // 게임오버 체크
  if (chances < 1) {
    console.log("게임오버!");
    playBtn.disabled = true;

    // 게임오버 화면 표시
    setTimeout(() => {
      gameoverAnswer.textContent = computerNum;
      gameoverScreen.classList.add("show");
      console.log("게임오버 화면 표시됨");
    }, 1000);
  }
}

// 엔터키로 play
user.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    play();
  }
});

// 시작 버튼
playBtn.addEventListener("click", play);

// 포커스시 입력값 초기화
user.addEventListener("focus", () => {
  user.value = "";
});

// 재시작
function reset() {
  console.log("reset");
  user.value = "";
  user.dataset.lastInput = "";
  result.textContent = "UP / DOWN / BINGO";
  imgBox.src = "img/ready.gif";
  chances = 5;

  // 하트 복구
  chance.innerHTML = `
        <span class="heart">❤️</span>
        <span class="heart">❤️</span>
        <span class="heart">❤️</span>
        <span class="heart">❤️</span>
        <span class="heart">❤️</span>
      `;

  playBtn.disabled = false;

  // 화면 숨기기
  gameoverScreen.classList.remove("show");
  bingoScreen.classList.remove("show");
  randomNum();
}
bingoRestart.addEventListener("click", function () {
  bingoScreen.classList.remove("show");
  reset();
});
resetBtn.addEventListener("click", reset);

// 게임오버 화면에서 재시작
gameoverRestart.addEventListener("click", function () {
  gameoverScreen.classList.remove("show");
  reset();
});
