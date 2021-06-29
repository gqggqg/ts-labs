enum Player {
	TEAM_X = "team-X",
	TEAM_O = "team-O",
}
	
enum FieldMark {
	NONE = 0,
	TEAM_X = 1,
	TEAM_O = 2,
}

class Game {
	
	private static instance: Game;
	
	private readonly winType = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	private currentPlayer: Player = Player.TEAM_X;
	private step: number = 0;			
	private cells = document.querySelectorAll(".cell");
	private table = [
		0, 0, 0,
		0, 0, 0,
		0, 0, 0,
	];
	
	private displayMessage: (string) => void;
	
	private constructor() {	
		this.cells.forEach((cell) => {
			cell.addEventListener("click", (event: MouseEvent) => { 
				this.OnClickHandler(event.target as HTMLElement); 
			});
		})
	}
	
	public static Instance(): Game {
		if (!Game.instance) {
			Game.instance = new Game();
		}
		return Game.instance;
	}
	
	public NewGame(callback: (string) => void): void {
		this.displayMessage = callback;
		
		this.step = 0;
		this.currentPlayer = Player.TEAM_X;
		
		this.ResetTable();
		this.ResetCells();
		
		this.UpdateGameField();
	}
	
	public OnClickHandler(element: HTMLElement): void {	
		
		element.classList.add(NO_HOVER_CLASS, this.currentPlayer);	
		
		let index = parseInt(element.dataset.index, PARSE_INT_BASE);
		if (isNaN(index)) {
			alert("Invalid parse!");
			return;
		}
		
		this.table[index] = 
			this.currentPlayer == Player.TEAM_X 
			? FieldMark.TEAM_X
			: FieldMark.TEAM_O;
	
		this.step++;
	
		if (this.HasWinner()) {
			this.displayMessage(`Игрок ${this.GetTeam()} выиграл!`);
		}

		if (this.step == 9) {
			this.displayMessage(DRAW_MESSAGE);
		}

		this.currentPlayer = 
			this.currentPlayer == Player.TEAM_X 
			? Player.TEAM_O 
			: Player.TEAM_X;
			
		this.UpdateGameField();
	}
	
	private HasWinner(): boolean {
		return this.winType.some((item) => {
			if (this.table[item[0]] != FieldMark.NONE &&
				this.table[item[0]] == this.table[item[1]] &&
				this.table[item[1]] == this.table[item[2]]) {
				return true;
			}
		});
	}
	
	private ResetTable(): void {
		for (let i = 0; i < this.table.length; i++) {
			this.table[i] = 0;
		}
	}
	
	private ResetCells(): void {
		this.cells.forEach((cell) => {
			cell.classList.remove(Player.TEAM_X, Player.TEAM_O, NO_HOVER_CLASS);
		});
	}
	
	private UpdateGameField(): void {
		this.cells.forEach((cell) => {
			cell.setAttribute(HOVER_CONTENT_ATTR, this.GetTeam());
		});
	}
	
	private GetTeam(): string {
		return this.currentPlayer.slice(-1);
	}
}