"use strict"

// guardo los inputs del formulario par recorrelo luego en la validacion
let formulario = document.querySelectorAll("input");
let mensaje = document.getElementById("mensaje"); // guardo el area de notas
let btnEnviar = document.getElementById("enviar"); // traigo el boton enviar
let datosGrabar = [];


// evento del boton enviar

btnEnviar.addEventListener("click", function (e) {
    e.preventDefault();

    // recorro los inputs para detectar alguno vacio o la nota está vacia para no hacer otro if
    for (let i = 0; i < formulario.length; i++) {

        if (formulario[i].value.trim().length == 0 || mensaje.value.trim().length == 0) {
            errorAlerta();
        } else {

            // valido que haya al menos un @ en el input correo
            // controlo que el telefono no tenga más de 10 caracteres
            if (!document.getElementById("email").value.includes("@") || document.getElementById("telefono").value.length > 10) {

                errorAlerta();
            }
        }
    }

    let j = formulario.length; // guardo la longitudel arreglo de inputs
    for (let i = 0; i < j; i++) {

        datosGrabar[i] = formulario[i].value.trim();

    }
    datosGrabar[j] = mensaje.value.trim();

    let blob = new Blob([datosGrabar], { type: "text/plain;charset=utf-8" }); //corchetes para que separe con ,

    saveAs(blob, `${formulario[0].value.trim()}.txt`); //de la libreria FileSaver  

    Swal.fire({
        icon: "sucess",
        title: `Muchas Gracias ${datosGrabar[0]}`,
        text: "En breve nos comunicaremos",

    });

});




// muestra alerta de campos vacios y los deja en blanco a todos
function errorAlerta() {

    Swal.fire({
        icon: "error",
        title: "Todos los campos deben respetar el formato o no estar vacios",

    });

    for (let j = 0; j < formulario.length; j++) {
        formulario[j].value = "";
    }

    mensaje.value = "";

}


