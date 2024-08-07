"use strict"

const arrayPrecios = [1000, 2856, 2370, 960.62, 7000, 1190.50, 1250, 1700, 2200, 2784, 899, 3620, 9100, 2332, 1200, 2400, 3600, 1385, 2015, 1539, 1370, 1370, 1875, 900, 1788, 1309, 2215, 5797, 1650];
const arrayProductos = ["aceite maiz arcor botella 900 ml", "acelga congelada granja del sol 500g", "acelga congelada lucchetti 450g", "agua mineral sin gas villa del sur 2 25", "arroz con leche clasico tregar 180 grm", "arroz con leche con canela tregar 180 grm", "arroz preparado sabor cheddar lucchetti 240 grm", "arroz preparado sabor tomatado lucchetti 240 grm", "arvejas congeladas granja del sol 300g", "arvejas secas arcor 300 grm", "bizcochuelo vainilla arcor paq 500 grm", "bocadito de pollo lucchetti paq 800 grm", "bombon surtidosselec arcor cja 2286 grm", "brahma cerveza 1 litro", "brocoli congelado granja del sol 400g", "brownies sabor chocolate arcor 425 grm", "budin marmolado arcor fwp 215 grm", "cabellos de angel lucchetti     paquete 500 gr", "oblea xl chocolinas cofler fwp 45 grm", "chocolate milk arcor fwp 12 grm", "caramelos rellenos miel arcor paq 140 grm", "choclos  granja del bsa 300 grm", "chocolate arcor con leche tab 25 grm", "chocolate con leche y mani arcor fwp 95 grm", "crema de leche la paulina 200cc", "crema leche doble ilolay 350 grm", "cremoso fraccionado tregar xkg 1 kgm", "dulce leche clasico sancor pot 400 grm", "fideos spaghetti rina 500g"];
let arrayStock = [5, 8, 0, 10, 3, 5, 3, 3, 2, 5, 0, 2, 1, 4, 6, 4, 3, 5, 5, 6, 4, 5, 4, 3, 5, 2, 3, 4, 5, 5];
let arrayOfertas = [10, 15, 0, 0, 20, 0, 0, 15, 0, 0, 0, 0, 15, 20, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let boton = [];
let carritoCantidad = [];
let costoTotal = 0; // variable que acumula el importe de lo compra
let itemsComprados = 0; // acumula la cantidad de productos comprados

let arrayPopUp = []; // junto todas las ofertas en un arreglo para que el popup cicle con ellas
let indice = 0; // puntero del arreglo

// oferta para oferta solo se ejecute en index
const oferta = document.getElementsByClassName("historia");

if (oferta.length == 1) {document.addEventListener("DOMContentLoaded", verOfertas)}

for (let i = 0; i < arrayOfertas.length; i++) {

    if (arrayOfertas[i] != 0) {
        arrayPopUp[indice] = i;
        indice++;
    }
}

/* ********** Estrutura de la Tarjeta  *************
 <div class="card">
            <div class="imgCard">
                <img src="./Productos/Imagenes/aceite maiz arcor botella 900 ml.jpg" alt="..." </img>
            </div>
            <div class="botones">
                <p class="precio"> Precio $10000 </p>
                <p class="stock"> Stock: 8 </p>
                <input type="number" name="" id="" placeholder="Ingrese ctidad">
                <button> Comprar </button>

            </div>

            <p class = "pieTarjeta">aceite maiz arcor botella 900 ml</p>

        </div> 
    ********************************************************    */

let contenedor = document.getElementById("contenedorCompra");

//console.log(arrayPrecios.length);
/* *************************************************************** */

// genero tantas tarjetas como elementos hay en el arreglo
for (let i = 0; i < arrayPrecios.length; i++) {

    generaDivCard(arrayProductos[i], arrayPrecios[i], arrayStock[i], i, arrayOfertas[i]);
}

/* *************************************************************** */

// selecciono todos lo botones e inputs de la pagina
const todosLosBotones = document.querySelectorAll("button");
const todosLosInputs = document.querySelectorAll("input");


// se agrega addEventListener a todos los botones creados y se les asigna un indice coincidente con la posicion del arerglo
for (let i = 0; i < arrayPrecios.length; i++) {

    todosLosBotones[i].addEventListener("click", function (e) {

        // se instacia el indice del boton presionado
        let indice = e.target.id;
        //  idem con los inputs       
        let inputs = parseInt(todosLosInputs[indice]);

        // comparo lo seleccionado contra el stock y si es mayor muestro alerta
        if (todosLosInputs[indice].value > arrayStock[indice] || todosLosInputs[indice].value <= 0) {
            (todosLosInputs[indice].value < 0)

            Swal.fire({
                icon: "error",
                title: `El stock máximo disponible de ${ arrayProductos[indice]} es ${arrayStock[indice]}. Y has seleccionado ${todosLosInputs[indice].value}. `,

            });


            todosLosInputs[indice].value = 0; // reseteo el input
        } else {

            // actualizo el stock
            arrayStock[indice] -= parseInt(todosLosInputs[indice].value);
            //se genera un arreglo con las cantidades selecciondas
            carritoCantidad[indice] = parseInt(todosLosInputs[indice].value);// guardo la cantidad seleccionada para el carrito
            //console.log(carritoCantidad[indice]);
            // selecciono el p que muestra stock y lo actualizo

            if (arrayStock[indice] == 0) {
                // si stock es 0 no permito que se seleccione nuevamente
                let pSelecionado = document.getElementById(`st${indice}`);
                pSelecionado.setAttribute("value", "0");
                pSelecionado.setAttribute("class", "stock_cero");
                pSelecionado.replaceChildren("Sin Stock");
                todosLosInputs[indice].setAttribute("disabled", "disabled");
                todosLosBotones[indice].setAttribute("disabled", "disabled");

            }

            itemsComprados++;
            costoTotal += arrayPrecios[indice] * parseInt(todosLosInputs[indice].value);
            // usamos una de las opciones de la libreri que se nos sugerío para mostrar un alerta


            Swal.fire({
                title: `Has seleccionado ${itemsComprados} productos con un costo Total de $ ${costoTotal}.`,
                //text: "You won't be able to revert this!",
                //icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "Seguir Comprando",
                confirmButtonText: "Finalizar Compra"
            }).then((result) => {
                if (result.isConfirmed) {

                    almacenoVariables();

                    location.href = "carrito.html";
                }
            });

            // actualizo stock y reseteo input
            let pSelecionado = document.getElementById(`st${indice}`);
            pSelecionado.replaceChildren(`Stock: ${arrayStock[indice]}`);
            todosLosInputs[indice].value = 0;

        }
    });
}


function almacenoVariables() {

    //guardo los arreglos en localStorage
    localStorage.setItem('productos', JSON.stringify(arrayProductos));
    localStorage.setItem('precios', JSON.stringify(arrayPrecios));
    localStorage.setItem('stock', JSON.stringify(arrayStock));
    localStorage.setItem('carrito', JSON.stringify(carritoCantidad));
    localStorage.setItem('ofertas', JSON.stringify(arrayOfertas));


}

// funcion par generar la tarjeta de producto
function generaDivCard(producto, precio, stock, i, oferta) {

    // creo el div que instanciara la tarjeta
    let divCard = document.createElement("div");
    // divCard.setAttribute("class", "card_oferta")

    // si oferta es distinto de 0 sumo un fondo a la tarjeta cambiando la clase
    if (oferta != 0) {
        divCard.setAttribute("class", "card_oferta");
        precio = (precio * (1 - oferta / 100)).toFixed(2); //calculo el precio en oferta
    } else { divCard.setAttribute("class", "card"); }

    // creo el div que contendrá la imagen
    let divImgCard = document.createElement("div");
    divImgCard.setAttribute("class", "imgCard");

    // creo el elemento imagen
    let imagen = document.createElement("img");
    imagen.setAttribute("src", `./Productos/Imagenes/${producto}.jpg`);
    imagen.setAttribute("alt", "imagen");

    // pongo la imagen dentro del div
    divImgCard.appendChild(imagen);


    // creo el div que cntendrá los botones
    let divBotones = document.createElement("div");
    divBotones.setAttribute("class", "botones");

    // creo el p que informa precio
    let pPrecio = document.createElement("p");
    pPrecio.setAttribute("class", "precio");
    let precioP = document.createTextNode(`Precio: $${precio}`);
    pPrecio.appendChild(precioP);

    // creo el p que informa stock existente y lo condiciono a que sea distinto de 0

    let pBotones = document.createElement("p");

    if (stock == 0) {

        pBotones.setAttribute("class", "stock_cero");
        let textP = document.createTextNode("Sin Stock")
        pBotones.appendChild(textP);
    } else {

        pBotones.setAttribute("class", "stock");
        pBotones.setAttribute("id", `st${i}`);
        let textP = document.createTextNode(`Stock: ${stock}`)
        pBotones.appendChild(textP);

    }


    // creo el input de tipo number 
    let inputBotones = document.createElement("input");
    inputBotones.setAttribute("type", "number");

    inputBotones.setAttribute("id", `in${i}`);
    inputBotones.setAttribute("placeholder", "Ctdad");
    // saco la condicion de max = Stock para cumplir con la 
    //consigna de mostrar alerta si se selecciona cantidad mayor al stock existente
    inputBotones.setAttribute("value", "0");
    inputBotones.setAttribute("min", "0");

    // creo el boton comprar
    let btnBotones = document.createElement("button");
    btnBotones.setAttribute("id", `${i}`);
    let textBotones = document.createTextNode("Comprar");
    btnBotones.appendChild(textBotones);

    // si stock es 0 deshabilito la entrada y boton
    if (stock == 0) {
        inputBotones.setAttribute("value", "0");
        inputBotones.setAttribute("disabled", "disabled");
        btnBotones.setAttribute("disabled", "disabled");

    }

    // pongo los elementos del div Botones
    divBotones.appendChild(pPrecio);
    divBotones.appendChild(pBotones);
    divBotones.appendChild(inputBotones);
    divBotones.appendChild(btnBotones);


    // creo el p de la tarjeta
    let pTarjeta = document.createElement("p");
    pTarjeta.setAttribute("class", "pieTarjeta");
    let pTexto = document.createTextNode(`${producto}`);
    pTarjeta.appendChild(pTexto);

    // armo el div Card general
    divCard.appendChild(divImgCard);
    divCard.appendChild(divBotones);
    divCard.appendChild(pTarjeta);

    // ingreso todo al connedor general
    contenedor.appendChild(divCard);
}

 function verOfertas() {

    let puntero = Math.floor(Math.random() * arrayPopUp.length); // puntero al producto de oferta distinto en cada entrada

    let indice = arrayPopUp[puntero]

    //console.log(indice);


    Swal.fire({
        title: `Oferta ${arrayOfertas[indice]}% !!!    $ ${(arrayPrecios[indice] * (1 - arrayOfertas[indice] / 100)).toFixed(2)}`,
        text: `${arrayProductos[indice]}`,
        imageUrl: `./Productos/Imagenes/${arrayProductos[indice]}.jpg`,
        color: "#38d59e",
        confirmButtonColor: "#38d59e",
        imageWidth: 300,
        imageHeight: 300,
        imageAlt: "Custom image"
    });

} 








