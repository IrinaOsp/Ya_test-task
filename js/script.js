const tickerText = document.querySelectorAll(".ticker__text");
const text1 = "Шахматы двигают вперёд не только культуру, но и экономику!";
const text2 = "Дело помощи утопающим — дело рук самих утопающих!";
const text3 = "Лёд тронулся, господа присяжные заседатели!";

tickerText.forEach(
  (el) =>
    (el.innerHTML = text1.concat(
      '<span class="dot"></span>',
      text2,
      '<span class="dot"></span>',
      text3,
      '<span class="dot"></span>'
    ))
);

// PARTICIPANTS SLIDER

const participantsButtons = document.querySelectorAll(
  ".section-participants .carousel__button"
);
const participantsContainer = document.getElementById("participants");
const currentParticipant = document.querySelector(".carousel__counter-current");

const participantCard = document.querySelector(".participants__item");
let cardWidth = 0;
let containerLength = 0;
let cardsNumberToMove = 1;
let offset = 0;
let gap = 0;

participantsButtons.forEach((el) => {
  el.addEventListener("click", () => {
    if (el.classList.contains("left")) {
      participantsButtons[1].disabled = false;
      participantsContainer.style.right =
        parseInt(participantsContainer.style.right) - offset + "px";
      currentParticipant.innerHTML =
        parseInt(currentParticipant.innerHTML) - cardsNumberToMove;
      if (currentParticipant.innerHTML === cardsNumberToMove.toString()) {
        el.disabled = true;
      }
    } else {
      participantsButtons[0].disabled = false;
      participantsContainer.style.right =
        parseInt(participantsContainer.style.right) + offset + "px";
      currentParticipant.innerHTML =
        parseInt(currentParticipant.innerHTML) + cardsNumberToMove;
      if (currentParticipant.innerHTML === "6") {
        el.disabled = true;
      }
    }
  });
});

const setParams = () => {
  cardWidth = participantCard.clientWidth;
  containerLength = participantsContainer.offsetWidth;
  gap = (participantsContainer.offsetWidth - cardWidth * 6) / 5;
  if (window.innerWidth > 1362) {
    cardsNumberToMove = 3;
  } else if (window.innerWidth > 900 && window.innerWidth <= 1362) {
    cardsNumberToMove = 2;
  } else {
    cardsNumberToMove = 1;
  }
  currentParticipant.innerHTML = cardsNumberToMove.toString();
  offset = (cardWidth + gap) * cardsNumberToMove;
  participantsContainer.style.right = "0px";
  participantsButtons[0].disabled = true;
  participantsButtons[1].disabled = false;
};

window.addEventListener("resize", setParams);
window.addEventListener("load", setParams);

// PHASES SLIDER

const phasesButtons = document.querySelectorAll(
  ".phases__carousel-container .carousel__button"
);
const wrapper = document.querySelector(".phases__container-wrapper");
const currentPhaseIndicators = document.querySelectorAll(".slide__button");
const phasesContainer = document.getElementById("phases-slider");
phasesContainer.style.right = "0px";
const columnGap = 20;
let currentPhase = 0;
const maxPhase = 4;

phasesButtons.forEach((el) => {
  el.addEventListener("click", () => {
    if (el.classList.contains("left")) {
      phasesButtons[1].disabled = false;
      currentPhase--;
      phasesContainer.style.right =
        parseInt(phasesContainer.style.right) -
        wrapper.clientWidth -
        columnGap +
        "px";
      if (currentPhase <= 0) {
        el.disabled = true;
      }
    } else {
      phasesButtons[0].disabled = false;
      phasesContainer.style.right =
        parseInt(phasesContainer.style.right) +
        wrapper.clientWidth +
        columnGap +
        "px";
      currentPhase++;
      if (currentPhase === maxPhase) {
        el.disabled = true;
      }
    }
    currentPhaseIndicators.forEach((el) => {
      el.classList.remove("active");
    });
    currentPhaseIndicators[currentPhase].classList.add("active");
  });
});
