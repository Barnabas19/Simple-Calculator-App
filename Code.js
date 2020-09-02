let runningTotal = 0; //final answer after calculation(s)
let buffer = "0"; //value displayed on screen at any moment
let previousOperator = null; //most recent operator invoked
const screen = document.querySelector(".screen"); //screen object   

window.addEventListener("load", function(){
    screen.innerText = buffer;
});

//event delegation to bind event to all buttons
document.querySelector(".calc-buttons").addEventListener("click", 
function(event){
    buttonClick(event.target.innerText);
});

//Handling whatever button was clicked
function buttonClick(value){
    if(isNaN(parseInt(value))){
        handleSymbol(value);
    }
    else{
        handleNumber(value);
    }
    reDisplay();
}

//if a number was actually clicked
function handleNumber(value){
    if(buffer === "0"){
        buffer = value;
    }
    else{
        buffer += value;
    }
}

//if a symbol was actually clicked
function handleSymbol(value){
    switch(value){
        case "C":
            buffer = "0";
            runningTotal = 0;
            previousOperator = null;
            break;
         
        case "=":
            if(previousOperator === null){
                return; //don't do anything
            }    
            flushOperator(parseInt(buffer));
            previousOperator = null;
            buffer = ` ${runningTotal}`;
            runningTotal = 0;
            break;

        case "DEL":
            if(buffer.length === 1){
                buffer = "0";
            }
            else{
                buffer = buffer.substring(0, buffer.length-1);
            }
            break;

        default:
            handleMath(value);
            break;
    }
}

function reDisplay(){
    screen.innerText = buffer;
}

function handleMath(value){
    const intBuffer = parseInt(buffer);
    if(runningTotal === 0){
        runningTotal = intBuffer;
    }
    else{
        flushOperator(intBuffer);
    }

    previousOperator = value;
    buffer = "0";
}

function flushOperator(intBuffer){
    if(previousOperator === "+"){
        runningTotal += intBuffer;
    }
    else if(previousOperator === "-"){
        runningTotal -= intBuffer;
    }
    else if(previousOperator === "*"){
        runningTotal *= intBuffer;
    }
    else{
        runningTotal /= intBuffer;
    }
}