const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckbox = document.querySelectorAll("input[type=checkbox]");
const symbols = '`~<>,.:[{)*&^%$#@!;}([/*-+=-_/|\?=';

let password = "";
let passwordLength = 10;
let checkCount = 0;
// allCheckbox[0].checked;

handleSlider();
setindicator("#ccc");

//set password length 
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const mi_n = inputSlider.min;
    const ma_x = inputSlider.max;
    // console.log(mi_n , ma_x);
    inputSlider.style.backgroundSize = ((passwordLength - mi_n) * 100 / (ma_x - mi_n))+"%  100%"; 
    // inputSlider.style.backgroundColor = "rgb(13, 150, 15)" ; 
    
}

function setindicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;


}

function getRandomInteger(min,max){
    return Math.floor(Math.random() * (max-min)) + min;
}

function generateLowercase(){
    return String.fromCharCode(getRandomInteger(97,123));
}
function generateUppercase(){
    return String.fromCharCode(getRandomInteger(65,91));
}
function generateSymbol(){
    const randNum = getRandomInteger(0,symbols.length);
    return symbols.charAt(randNum);
}
function generateNumber(){
    const numRand = getRandomInteger(0,9);
    return numRand;
}

function calsStrength(){
    let check1 = false;
    let check2 = false;
    let check3 = false;
    let check4 = false;
    if(uppercaseCheck.checked) check1 = true;
    if(lowercaseCheck.checked) check2 = true;
    if(numberCheck.checked) check3 =true;
    if(symbolCheck.checked) check4 = true;

    // console.log(check1, check2,check3,check4);

    if(check1 && check2 && (check3||check4) && passwordLength >=8){
        setindicator("#d20505");
    
    }
    else if((check1||check2) && (check3||check4) && passwordLength >=6){
           setindicator("#ffff00"); 
    }
    else{
        setindicator("#58fb96d2");
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        // console.log("its done")
        copyMsg.innerText = "copied";
    }
    catch(e){
        copyMsg.innerText = "Failed";
    }
    // To make copy span visiba;
    copyMsg.classList.add("active");//active is class of css
    // copyMsg.style.opacity = 1;

    setTimeout(() => {
        // copyMsg.style.opacity = 0;
        copyMsg.classList.remove("active");
        
    },2000); 
}

// 1:00:00
function handleCheckBoxChange(){
    checkCount = 0;
    allCheckbox.forEach((checkbox) => {
        if(checkbox.checked)
            checkCount++;

        if(passwordLength < checkCount){
            passwordLength = checkCount;
            handleSlider();}
    });
}
allCheckbox.forEach((checkBox) =>{
    checkBox.addEventListener('change',handleCheckBoxChange);
})

inputSlider.addEventListener('input' ,(e) =>{
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click' , ()=>{
    // console.log("hi");
    if(passwordDisplay.value){
        // console.log(passwordDisplay.value);
        copyContent();
    }
})

generateBtn.addEventListener('click' , ()=>{
    if(checkCount <= 0) {
        password = "";
        passwordDisplay.value = password;
        return;}
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

    password = "";
    let arr = [];
    if(uppercaseCheck.checked){
        arr.push(generateUppercase);
        
    }

    if(lowercaseCheck.checked){
        arr.push(generateLowercase);
    }

    if(numberCheck.checked){
        arr.push(generateNumber);
    }
    if(symbolCheck.checked){
        arr.push(generateSymbol);
    }

    for(let i = 0; i < arr.length ; i++){
        password += arr[i]();
    }
    for(let i=0;i<passwordLength - arr.length ;i++){
        let randIndex = getRandomInteger(0,arr.length);
        password += arr[randIndex]();

    }

    password = shufflePassword(Array.from(password));
    passwordDisplay.value = password;
    calsStrength();
})

function shufflePassword(array){
        for(let i = array.length -1; i>0;i--){
            const j = Math.floor(Math.random()*(i+1));
            const temp = array[i];
            array[i]  = array[j];
            array[j] = temp;

        }
        let str = "";
        array.forEach((el) =>(str += el));
        return str;
}


 