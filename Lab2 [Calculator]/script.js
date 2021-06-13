var input = "";
function ClearResult() {
    document.getElementById("result").value = "";
    input = "";
}
function InputChange(value) {
    input += value;
    document.getElementById("result").value = input;
}
function Calculate() {
    document.getElementById("result").value = eval(input);
    input = "";
}
