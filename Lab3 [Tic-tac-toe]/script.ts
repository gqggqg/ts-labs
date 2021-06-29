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

let table = [
	0, 0, 0,
	0, 0, 0,
	0, 0, 0,
];

enum Player {
	TEAM_X = "team-X",
	TEAM_O = "team-O",
}

const HIDDEN_CLASS: string = "hidden";
const NO_HOVER_CLASS: string = "no-hover";
const DRAW_MESSAGE: string = "Ничья! ;)";
const PARSE_INT_BASE: number = 10;

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
		cell.addEventListener("click", OnClickCell);
	});

	restart.addEventListener("click", StartGame);
}

function StartGame() {
	
	step = 0;
	ResetTable();
	currentPlayer = Player.TEAM_X;
	
	cells.forEach((element) => {
		element.classList.remove(Player.TEAM_X, Player.TEAM_O, NO_HOVER_CLASS);
	});
	
	message.classList.add(HIDDEN_CLASS);
	
	UpdateGameField();
}

function ResetTable(): void {
	for (let i = 0; i < table.length; i++) {
		table[i] = 0;
	}
}

function OnClickCell() {

	MarkOccupiedCell(this);
	step++;
	
	if (IsWin()) {
		DisplayMessage(`Игрок ${GetTeam()} выиграл!`);
		return;
	}

	if (step === 9) {
		DisplayMessage(DRAW_MESSAGE);
		return;
	}

	currentPlayer = currentPlayer === Player.TEAM_X ? Player.TEAM_O : Player.TEAM_X;
	UpdateGameField();
}

function MarkOccupiedCell(cell: HTMLDivElement): void {
	let cellNumber = parseInt(cell.dataset.number, PARSE_INT_BASE);
	if (isNaN(cellNumber)) {
		alert("Invalid parse!");
		return;
	}
	table[cellNumber] = currentPlayer == Player.TEAM_X ? 1 : 2;
	
	cell.classList.add(NO_HOVER_CLASS, currentPlayer);
}

function DisplayMessage(outputMessage: string): void {
	message.classList.remove(HIDDEN_CLASS);
	winner.textContent = outputMessage;
}

function IsWin(): boolean {
	
	return winType.some((item) => {
		if (table[item[0]] != 0 &&
			table[item[0]] == table[item[1]] &&
			table[item[1]] == table[item[2]]) {
			return true;
		}
	});
}

function UpdateGameField() {

	cells.forEach((cell) => {
		cell.setAttribute("hover-content", GetTeam());
	});
}

function GetTeam(): string {
	return currentPlayer.slice(-1);
}