
"use strict"
// armo los arreglos trayendolos del localStorage

let arrayProductos = localStorage.getItem('productos');
let arrayPrecios = localStorage.getItem('precios');
let arrayStock = localStorage.getItem('stock');
let carritoCantidad = localStorage.getItem('carrito');
let arrayOfertas = localStorage.getItem(`ofertas`)

arrayProductos = JSON.parse(arrayProductos);
arrayPrecios = JSON.parse(arrayPrecios);
arrayStock = JSON.parse(arrayStock);
carritoCantidad = JSON.parse(carritoCantidad);
arrayOfertas = JSON.parse(arrayOfertas);

let costoTotal = 0; // variable que acumula el importe de lo compra

let divCarrito = document.getElementById("detalleCompra");
let tabla = document.createElement("table");
let fila = document.createElement("tr");

// armo encabezado de la tabla
armarEncabezado("Producto", "Precio", "cantidad", "Total");

// armarFila(col1, col2, col3, col4);

let producto = "";
let precio = 0;

// creo la tabla con los areglos
for (let i = 0; i < carritoCantidad.length; i++) {

    if (carritoCantidad[i] > 0) {

        // veo si tiene oferta

        if (arrayOfertas[i] != 0) {
            // calculo precio y sumo -XX% al nombre del producto
            producto = `${arrayProductos[i]} - ${arrayOfertas[i]}% `
            precio = (arrayPrecios[i] * (1 - arrayOfertas[i] / 100)).toFixed(2);
        } else {

            producto = arrayProductos[i];
            precio = arrayPrecios[i];
        }
        // armo cada fila de la tabla
        armarFila(producto, precio, carritoCantidad[i], precio * carritoCantidad[i]);
        costoTotal += precio * carritoCantidad[i]; // sumo el total de la compra
    }

}

divCarrito.appendChild(tabla);

// creo el p que informa el importe total de la compra
let pImporteTotal = document.getElementById("importeTotal");
pImporteTotal.setAttribute("class", "#importeTotal");
let pTotal = document.createTextNode(`$${costoTotal.toFixed(2)}`);
pImporteTotal.appendChild(pTotal);

// funcion armar fila de celdas
function armarFila(col1, col2, col3, col4) {

    let fila = document.createElement("tr");

    let Td1 = document.createElement("td");
    let Td2 = document.createElement("td");
    let Td3 = document.createElement("td");
    let Td4 = document.createElement("td");


    let textProducto = document.createTextNode(col1);
    let textPrecio = document.createTextNode(` $ ${col2}`);
    let textcantidad = document.createTextNode(col3);
    let textTotal = document.createTextNode(` $ ${col4.toFixed(2)}`);

    Td1.appendChild(textProducto);
    fila.appendChild(Td1);

    Td2.appendChild(textPrecio);
    fila.appendChild(Td2);

    Td3.appendChild(textcantidad);
    fila.appendChild(Td3);

    Td4.appendChild(textTotal);
    fila.appendChild(Td4);

    tabla.appendChild(fila);

}

function armarEncabezado(col1, col2, col3, col4) {

    let Th1 = document.createElement("th");
    let Th2 = document.createElement("th");
    let Th3 = document.createElement("th");
    let Th4 = document.createElement("th");


    let textProducto = document.createTextNode(col1);
    let textPrecio = document.createTextNode(col2);
    let textcantidad = document.createTextNode(col3);
    let textTotal = document.createTextNode(col4);

    Th1.appendChild(textProducto);
    fila.appendChild(Th1);

    Th2.appendChild(textPrecio);
    fila.appendChild(Th2);

    Th3.appendChild(textcantidad);
    fila.appendChild(Th3);

    Th4.appendChild(textTotal);
    fila.appendChild(Th4);

    tabla.appendChild(fila);

}


let btnPagar = document.getElementById("pagar"); // traigo el boton enviar

// evento del boton enviar

btnPagar.addEventListener("click", function (e) {
    //e.preventDefault();
    //console.log("**************")
    Swal.fire({
        icon: "success",
        title: "Su compra ha sido confirmada?",
        showDenyButton: true,
        confirmButtonText: "Volver a Comprar",
        denyButtonText: `Ir a Inicio`

    }).then((result) => {

        if (result.isConfirmed) {

            location.href = "comprar.html";
        } else if (result.isDenied) {

            location.href = "index.html";

        }
    });

});







