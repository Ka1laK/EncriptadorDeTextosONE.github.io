const input = document.querySelector("#input");
const copy = document.getElementById("copiar");

document.querySelector("#encriptar").addEventListener("click", () => {
    if (input.value.trim() === '') {
        alert('Por favor, ingrese texto en el campo');
    } else {
        encriptar("encriptar");
    }
});

document.querySelector("#desencriptar").addEventListener("click", () => {
    if (input.value.trim() === '') {
        alert('Por favor, ingrese texto en el campo');
    } else {
        encriptar("desencriptar");
    }
});

document.querySelector("#copiar").addEventListener("click", () => { copiarEncriptado() });

function Limpiando_Input() {
    formatearOutput();
    let inputLimpio;
    inputLimpio = input.value.replaceAll('á', 'a');
    inputLimpio = inputLimpio.replaceAll('é', 'e');
    inputLimpio = inputLimpio.replaceAll('í', 'i');
    inputLimpio = inputLimpio.replaceAll('ó', 'o');
    inputLimpio = inputLimpio.replaceAll('ú', 'u');
    inputLimpio = inputLimpio.replaceAll('ñ', 'n');

    return inputLimpio;
}

function formatearOutput() {
    const output = document.getElementById("output");
    const outputContainer = document.querySelector(".output");
    if (input.value === "") {
        output.setAttribute("class", "output-empty");
        output.value = "";
        document.querySelectorAll(".output>h3, .output>p").forEach(el => el.removeAttribute("hidden"));
        document.getElementById("copiar").setAttribute("hidden", "");
    } else {
        output.removeAttribute("class");
        document.querySelectorAll(".output>h3, .output>p").forEach(el => el.setAttribute('hidden', ''));
        document.getElementById("copiar").removeAttribute("hidden");
    }
}

function encriptar(string) {
    const inputLimpio = Limpiando_Input();
    const cambio = {
        a: "ai",
        e: "enter",
        i: "imes",
        o: "ober",
        u: "ufat"
    };

    if (string === "encriptar") {
        let arreglo_string = [];
        for (let i = 0; i < inputLimpio.length; i++) {
            if (cambio.hasOwnProperty(inputLimpio[i])) {
                arreglo_string.push(cambio[inputLimpio[i]]);
            } else {
                arreglo_string.push(inputLimpio[i]);
            }
        }
        document.getElementById("output").value = arreglo_string.join('');
    } else if (string === "desencriptar") {
        const desencriptar = Object.values(cambio);
        let palabra_nueva = inputLimpio;
        for (let i = 0; i < desencriptar.length; i++) {
            palabra_nueva = palabra_nueva.replaceAll(desencriptar[i], desencriptar[i][0]);
        }
        document.getElementById("output").value = palabra_nueva;
    }
}

function copiarEncriptado() {
    let copy = document.querySelector("#output").value;
    navigator.clipboard.writeText(copy).then(() => {
        document.getElementById("input").value = copy;
        document.getElementById("output").value = "";
    });
}

const limpiarBoton = document.querySelector('#limpiar');
const entradaTexto = document.querySelector('#input');

limpiarBoton.addEventListener('click', () => {
    entradaTexto.value = '';
    formatearOutput();
});