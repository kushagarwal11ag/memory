"use strict";

const welcomeScreen = document.getElementById("welcome-screen");

const numberGame1 = document.getElementById("game-num-1");
const numberGame2 = document.getElementById("game-num-2");
const numberGame3 = document.getElementById("game-num-3");
const numberGamePlay = document.querySelector(".number-game");

const wordGame1 = document.getElementById("game-word-1");
const wordGame2 = document.getElementById("game-word-2");
const wordGamePlay = document.querySelector(".word-game");

const movieGame1 = document.getElementById("game-movie-1");
const movieGamePlay = document.querySelector(".movie-game");

const gameClear = document.querySelectorAll(".game-win");

const gameContainer = document.querySelectorAll("#game-container");
const nextLvl = document.querySelectorAll(".next-lvl");

const cards = document.querySelectorAll(".card-cover");
const movesElement = document.querySelectorAll(".moves");

let currentDifficultyLevel = 0;
let cardsRemaining = 0;
let movesPlayed = 0;
let cardsRevealed = 0;
let firstCardValue = 0;
let secondCardValue = 0;
let flippedElements = [];

numberGamePlay.addEventListener("click", () => {
	welcomeScreen.style.display = "none";
	numberGame1.style.display = "block";
	currentDifficultyLevel = 1;
	cardsRemaining = 12;
});

wordGamePlay.addEventListener("click", () => {
	welcomeScreen.style.display = "none";
	wordGame1.style.display = "block";
	currentDifficultyLevel = 4;
	cardsRemaining = 12;
});

movieGamePlay.addEventListener("click", () => {
	welcomeScreen.style.display = "none";
	movieGame1.style.display = "block";
	currentDifficultyLevel = 6;
	cardsRemaining = 12;
});

cards.forEach((button) => {
	button.addEventListener("click", flipCard);
});

function flipCard(event) {
	const button = event.currentTarget;

	let buttonFront = button.getAttribute("data-front") === "true";
	let cardValue = parseInt(button.getAttribute("data-cardValue"));
	movesPlayed++;
	movesElement.item(
		currentDifficultyLevel - 1
	).innerHTML = `Moves: ${movesPlayed}`;

	if (!buttonFront && cardsRevealed < 2) {
		cardsRevealed++;
		button.setAttribute("data-front", "true");
		button.classList.add("flipped");
		flippedElements.push(button);

		if (firstCardValue === 0) {
			firstCardValue = cardValue;
		} else {
			secondCardValue = cardValue;
		}

		if (cardsRevealed === 2) {
			cards.forEach((button) => {
				button.removeEventListener("click", flipCard);
			});
			if (firstCardValue === secondCardValue) {
				firstCardValue = 0;
				secondCardValue = 0;
				cardsRevealed = 0;
				setTimeout(() => {
					flippedElements[0].style.background = "transparent";
					flippedElements[0].querySelector(".back").remove();
					flippedElements[0].style.cursor = "default";
					flippedElements[0].disabled = true;

					flippedElements[1].style.background = "transparent";
					flippedElements[1].querySelector(".back").remove();
					flippedElements[1].style.cursor = "default";
					flippedElements[1].disabled = true;
					flippedElements = [];
				}, 1000);

				cardsRemaining -= 2;
				if (cardsRemaining === 0) {
					setTimeout(() => {
						gameContainer.item(currentDifficultyLevel - 1).style.display =
							"none";
						gameClear.item(currentDifficultyLevel - 1).style.display = "block";
					}, 1000);
					nextLvl
						.item(currentDifficultyLevel - 1)
						.addEventListener("click", nextLevel);
				}
			} else {
				firstCardValue = 0;
				secondCardValue = 0;
				setTimeout(revertFlippedCards, 1000);
			}
			setTimeout(() => {
				cards.forEach((button) => {
					button.addEventListener("click", flipCard);
				});
			}, 1000);
		}
	} else if (buttonFront) {
		if (secondCardValue === 0) firstCardValue = 0;
		cardsRevealed--;
		button.setAttribute("data-front", "false");
		button.classList.remove("flipped");
		const index = flippedElements.indexOf(button);
		if (index > -1) {
			flippedElements.splice(index, 1);
		}
	}
}

function revertFlippedCards() {
	if (flippedElements.length === 2) {
		flippedElements.forEach((button) => {
			button.setAttribute("data-front", "false");
			button.classList.remove("flipped");
		});
		cardsRevealed = 0;
		flippedElements = [];
	}
}

function nextLevel() {
	currentDifficultyLevel++;
	if (currentDifficultyLevel === 2) {
		numberGame1.style.display = "none";
		numberGame2.style.display = "block";
		cardsRemaining = 16;
	} else if (currentDifficultyLevel === 3) {
		numberGame2.style.display = "none";
		numberGame3.style.display = "block";
		cardsRemaining = 20;
	} else if (currentDifficultyLevel === 4) {
		numberGame3.style.display = "none";
		welcomeScreen.style.display = "block";
		currentDifficultyLevel = 0;
		cardsRemaining = 0;
	} else if (currentDifficultyLevel === 5) {
		wordGame1.style.display = "none";
		wordGame2.style.display = "block";
		cardsRemaining = 16;
	} else if (currentDifficultyLevel === 6) {
		wordGame2.style.display = "none";
		welcomeScreen.style.display = "block";
		currentDifficultyLevel = 0;
		cardsRemaining = 0;
	} else if (currentDifficultyLevel === 7) {
		movieGame1.style.display = "none";
		welcomeScreen.style.display = "block";
		currentDifficultyLevel = 0;
		cardsRemaining = 0;
	}
	movesPlayed = 0;
}
