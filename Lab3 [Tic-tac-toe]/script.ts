let message = document.querySelector("#message") as HTMLElement;
let restart = document.querySelector("#restart") as HTMLElement;
let winner = document.querySelector("#winner") as HTMLElement;

let game: Game;

Init();
StartGame();

function Init(): void {
	game = Game.Instance();
	restart.addEventListener("click", StartGame);
}

function StartGame(): void {
	game.NewGame(DisplayMessage);
	message.classList.add(HIDDEN_CLASS);
}

function DisplayMessage(text: string): void {
	message.classList.remove(HIDDEN_CLASS);
	winner.textContent = text;
}