class Originator {
	private _state: string;
	
	constructor(state: string) {
		this._state = state;
	}
	
	public Save(): IMomento {
		return new Momento(this._state);
	}
	
	public Restore(momento: IMomento) {
		this._state = (momento as Momento).GetState();
	}
	
	public ChangeState(state: string) {
		this._state = state;
	}
	
	public PrintState() {
		console.log(this._state);
	}
}

interface IMomento {
	
}

class Momento implements IMomento {
	private readonly _state: string;
	
	constructor(state: string) {
		this._state = state;
	}
	
	public GetState(): string {
		return this._state;
	}
}

class Carataker {
	private _momento: IMomento;
	
	public SetMomento(momento: IMomento) {
		this._momento = momento;
	}
	
	public GetMomento(): IMomento {
		return this._momento;
	}
}

let originator: Originator = new Originator("first state");
originator.PrintState();

let carataker: Carataker = new Carataker();
carataker.SetMomento(originator.Save());

originator.ChangeState("second state");
originator.PrintState();

originator.Restore(carataker.GetMomento());
originator.PrintState();
