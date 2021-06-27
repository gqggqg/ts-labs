var input: string = "";

function ClearResult(): void {
	(<HTMLInputElement>document.getElementById("result")).value = "";
	input = "";
}

function InputChange(value: string): void {
	input += value;
	(<HTMLInputElement>document.getElementById("result")).value = input;
}

function Calculate(): void {
	(<HTMLInputElement>document.getElementById("result")).value = window.eval(input);
	input = "";
}