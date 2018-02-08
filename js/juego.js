// Representación de la grilla. Cada nro representa a una pieza.
// El 9 es la posición vacía
var grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Acá; vamos a ir guardando la posición vacía
var posicionVacia = {
  fila:2,
  columna:2
};

// Esta función va a chequear si el Rompecabezas está; en la posición ganadora
function chequearSiGano(){
  // Traemos un array, donde almacenamos las piezas
var resultado = document.getElementById("juego").getElementsByClassName("pieza");
for (var i = 0; i <grilla.length; i++) {
var fila = grilla[i];

for (var y = 0; y < fila.length; y++) {
  var fichaResultado = resultado[fila[y] - 1].id;
  if (fichaResultado !== 'pieza' + fila[y]) {
    return false;
  }
 }
}
// IniciarReloj();
return true;

}


// la hacen los alumnos, pueden mostrar el cartel como prefieran. Pero es importante que usen
// esta función
function mostrarCartelGanador(){
  //alert('GANASTE GENIO');
  swal({
  title: 'FELICIDADES GANASTE',
  html: $('<div>')
    .addClass('some-class')
    .text('¡Armaste el Rompecabezas Correctamente!'),
  confirmButtonColor: '#9C27B0',
  confirmButtonText: "Cerrar",
  animation: false,
  customClass: 'animated tada'
  });
  ResetReloj();
}




// Intercambia posiciones grilla y en el DOM
function intercambiarPosiciones(fila1, columna1, fila2, columna2){
  //Actualizar LA GRILLA
  var filaPieza = grilla[fila1];
  var numero1 = filaPieza[columna1];
  var filaPieza2 = grilla[fila2];
  var numero2 = filaPieza2[columna2];
  grilla[fila1][columna1] = numero2;
  grilla[fila2][columna2] = numero1;

  //PARA ACTUALIZAR EL DOM
  //1.- Selecciono las piezas del DOM
  var pieza1 = document.getElementById('pieza'+ numero1);
  var pieza2 = document.getElementById('pieza'+ numero2);
  //2.- Selecciono al Padre
  var padre = pieza1.parentNode;
  //3.- Clono las Piezas
  var clone1 = pieza1.cloneNode(true);
  var clone2 = pieza2.cloneNode(true);

  //4.- Reemplazo las piezas en el padre
  padre.replaceChild(clone1, pieza2);
  padre.replaceChild(clone2, pieza1);
}

// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila,nuevaColumna){
  posicionVacia.fila = nuevaFila;
  posicionVacia.columna = nuevaColumna ;
}



// Para chequear si la posicón está dentro de la grilla.
// function posicionValida(fila, columna){
//   console.log(fila, columna);
//   if ((fila >= 0 && fila <= 2) && (columna >= 0 && columna <= 2)){
//       return true;
//   }else {
//     return false;
//   }
// }

function posicionValida(fila, columna){
  return ((fila >= 0 & columna >= 0) && (fila <= 2 & columna <= 2));
}




// Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando
// su posición con otro elemento
function moverEnDireccion(direccion){

  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Intercambia pieza blanca con la pieza que está arriba suyo
  if(direccion == 40){
    nuevaFilaPiezaVacia = posicionVacia.fila-1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;
  }
  // Intercambia pieza blanca con la pieza que está abajo suyo
  else if (direccion == 38) {
    nuevaFilaPiezaVacia = posicionVacia.fila+1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;

  }
  // Intercambia pieza blanca con la pieza que está a su izq
  else if (direccion == 39) {
    // Completar
    nuevaFilaPiezaVacia = posicionVacia.fila;
    nuevaColumnaPiezaVacia = posicionVacia.columna-1;

  }
  // Intercambia pieza blanca con la pieza que está a su der
  else if (direccion == 37) {
    // Completar
    nuevaFilaPiezaVacia = posicionVacia.fila;
    nuevaColumnaPiezaVacia = posicionVacia.columna+1;
  }

  // Se chequea si la nueva posición es válida, si lo es, se intercambia
  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
    intercambiarPosiciones(posicionVacia.fila, posicionVacia.columna,
    nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
  }

}



// Extras, ya vienen dadas
function mezclarPiezas(veces){
  if(veces <= 0){return;}
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function(){
    mezclarPiezas(veces-1);
  },100);
}

function capturarTeclas(){
  document.body.onkeydown = (function(evento) {
    if(evento.which == 40 || evento.which == 38 || evento.which == 39 || evento.which == 37){
      moverEnDireccion(evento.which);

      var gano = chequearSiGano();
      if(gano){
        setTimeout(function(){
          mostrarCartelGanador();
        },500);
      }
      evento.preventDefault();
    }
  })
}

function iniciar(){
  mezclarPiezas(5);
  capturarTeclas();
  ResetReloj();
  IniciarReloj();
  
  
}

// iniciar();
 

//Muetra el tiempo que transcurre desde que presiona INICIAR, hasta que el Jugador Completa el Rompezabezas
//http://codigoprogramacion.com/cursos/javascript/control-de-tiempo-usando-setinterval-practica-cronometro-en-javascript.html#.Wbgs0LIjHIV
var seg;
var min;
var reloj;


function ResetReloj(){
    clearInterval(reloj);
}

function IniciarReloj(){
    seg =0;
    min =0;
    s = document.getElementById("segundos");
    m = document.getElementById("minutos");

    reloj = setInterval(
        function(){
            if(seg==60){
                seg=0;
                min++;
                if (min<10) m.innerHTML ="0"+min;
                else m.innerHTML = min;

                if(min==60) min=0;
            }
            if (seg<10) s.innerHTML ="0"+seg;
            else s.innerHTML = seg;

            seg++;
        }
        ,1000);
}