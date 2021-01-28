const numbers = document.querySelectorAll(".number")
const operators = document.querySelectorAll(".operator")
const display = document.getElementById('display');
const del = document.getElementById('delete');
const decimal = document.getElementById('n.')
const clear = document.getElementById('AC');
const equal = document.getElementById('equal');
const percentage = document.getElementById('n%');
const plusMinus = document.getElementById('n+/-');

let result = Number();
let displayValue = String();
let a;
let b;
let c;

numbers.forEach((number)=>number.addEventListener('click',(e)=> {
    storeValue(e);
    displayUpdate(e);
}));

operators.forEach((operator)=>operator.addEventListener('click',(e)=> {
    if (a == undefined) return;
    operate(a,b,c); 
    storeValue(e);
}))

del.addEventListener('click', ()=> {
    if (b == undefined) a = Number(a.toString().slice(0, -1));
    else b = Number(b.toString().slice(0, -1));
    displayUpdate();
})

decimal.addEventListener('click',()=> {
    if (b == undefined && !a.toString().includes('.')) a += ".";
    else if (b !== undefined && !b.toString().includes('.')) b += ".";
    displayUpdate();
})

equal.addEventListener('click',()=>operate(a,b,c))

percentage.addEventListener('click',()=> {
    if (b == undefined) a = a / 100;
    else b = (b * a) / 100;
})

plusMinus.addEventListener('click',()=> {
    if (a == undefined) return;
    else if (c == undefined) {
        a *= -1;
    }
    else if (c !== undefined) {
        b *= -1;
    }
    displayUpdate()
})

clear.addEventListener('click',()=> {
    display.textContent = "0";
    a = b = c = result = undefined;
})

function add() {
    return a + b;
}

function substract() {
    return a - b; 
} 

function multiply() {
    return a * b;
}

function divide() {
    if (b == 0) {
        a = b = c = undefined;        
        return 'Error'
    }    
    return a / b;
}

function operate() {
    if ((a && b && c) !== undefined) {
        switch(c) {
            case "+":
                result = add(a,b);
                break;
            case "-":
                result =substract(a,b);
                break;  
            case "*":
                result = multiply(a,b)
                break;
            case "/":
                result = divide(a,b)
                break;
        }
        result = Math.round(result*1000)/1000;
        a = result;
        b = undefined;
        displayUpdate();
    }
    return result;
}

function displayUpdate() { 
        if (b == undefined) display.textContent = a;
        else display.textContent = b;
}

function storeValue(e) {
    if (c == undefined && e.target.className == "number") { //1st operand
        if (a !== undefined) {
            a = Number(a + e.target.value);
        }
        else if (a == undefined) a = Number(e.target.value); 
    }
    else if (e.target.className == "operator") { //Operator
        c = e.target.value; 
    }
    else if (c !== undefined && e.target.className == "number") { //2nd operand
        if (b !== undefined) {
            b = Number(b + e.target.value);
        }
        else if (b == undefined) b = Number(e.target.value); 
    }
}