// Inits
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let interval = null;

let winAudio = new Audio('./sounds/winAudio.mp3');
let failAudio = new Audio('./sounds/failAudio.mp3');
// Link html document
let mostrarMovimientos = document.getElementById('movimientos');
let mostarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('tiempo');

// Random number generation
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(() => { return Math.random()-0.5});
console.log(numeros);

// Main function
function destapar(id) {

    if(!temporizador) {
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
   // console.log(tarjetasDestapadas);

    if(tarjetasDestapadas == 1) {
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        console.log(primerResultado);
        tarjeta1.innerHTML = `<img src="./images/${primerResultado}.png" alt="NOSE">`;
        tarjeta1.disabled = true;
    } else if(tarjetasDestapadas == 2) {
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="./images/${segundoResultado}.png" alt="">`;

        tarjeta2.disabled = true;
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
        if(primerResultado == segundoResultado) {
            tarjetasDestapadas = 0;
            aciertos++;
            mostarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            if(aciertos == 8) {
                console.log('YOU WIN');
                winAudio.play();
                clearInterval(interval);
            }

        } else {
            setTimeout(() => {
                tarjeta1.innerHTML = `<img src="./images/default.png" alt="">`;
                tarjeta2.innerHTML = `<img src="./images/default.png" alt="">`;
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 800);
        }
    }
}

function contarTiempo() {
    interval = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer == 0) {
            clearInterval(interval);
            bloquearTarjetas();
            failAudio.play();
        }
    }, 1000);
}

function bloquearTarjetas() {
    for(let i=0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        //tarjetaBloqueada.innerHTML = numeros[i];
        tarjetaBloqueada.innerHTML = `<img src="./images/${numeros[i]}.png" alt="">`
        tarjetaBloqueada.disabled = true;
    }
}
