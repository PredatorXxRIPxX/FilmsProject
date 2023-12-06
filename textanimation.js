let animate = document.getElementById('animateit');
animate.style.fontSize = '50px';

let mytextDescription = ['Cinema', 'MoviezLand', 'Creators', 'HomeOfJoy'];
let index = 0;
let currentWord = mytextDescription[index];
let currentChar = 0;
let isTyping = true;

function typeWriter() {
    if (isTyping) {
        if (currentChar < currentWord.length) {
            animate.innerHTML += currentWord.charAt(currentChar);
            currentChar++;
            setTimeout(typeWriter, 100);
        } else {
            isTyping = false;
            setTimeout(eraseText, 1000); 
        }
    } else {
        if (currentChar >= 0) {
            let text = currentWord.substring(0, currentChar);
            animate.innerHTML = text;
            currentChar--;
            setTimeout(eraseText, 100);
        } else {
            isTyping = true;
            index = (index + 1) % mytextDescription.length;
            currentWord = mytextDescription[index];
            setTimeout(typeWriter, 500);
        }
    }
}

function eraseText() {
    typeWriter();
}

typeWriter();
