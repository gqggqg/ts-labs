let winType = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

enum Player {
	X = "X",
	O = "O",
}

let currentPlayer: Player;
let isWin: boolean;
let step: number;

let message = document.querySelector("#message") as HTMLElement; // HTMLDivElement
let restart = document.querySelector("#restart") as HTMLElement; // HTMLButtonElement
let winner = document.querySelector("#winner") as HTMLElement; // HTMLParagraphElement

let cells = document.querySelectorAll(".cell");

Init();
StartGame();

function Init() {
	
	cells.forEach((cell) => {
		cell.addEventListener("click", ClickCell);
	});

	restart.addEventListener("click", StartGame);
}

function StartGame() {
	
	step = 0;
	message.style.display = "none";
	currentPlayer = Player.X;
	
	cells.forEach((element) => {
		element.classList.remove(Player.X, Player.O, "no-hover");
	});
	
	AddPlayerMarkToCells();
}

function ClickCell() {

	this.classList.add(currentPlayer);
	step++;

	isWin = CheckWin();
	
	if (isWin) {
		message.style.display = "block";
		winner.innerHTML = "Игрок " + currentPlayer + " выиграл!";
		return;
	}

	if (step === 9) {
		message.style.display = "block";
		winner.innerHTML = "Ничья";
		return;
	}

	currentPlayer = currentPlayer === Player.X ? Player.O : Player.X;

	this.classList.add("no-hover");
	AddPlayerMarkToCells();
}

function CheckWin(): boolean {
	
	return winType.some((item) => {		
		if (cells[item[0]].classList.contains(currentPlayer) &&
			cells[item[1]].classList.contains(currentPlayer) &&
			cells[item[2]].classList.contains(currentPlayer)) {
			return true;
		}
	});
}

function AddPlayerMarkToCells() {

	cells.forEach((cell) => {
		cell.setAttribute("hover", currentPlayer);
	});
}
