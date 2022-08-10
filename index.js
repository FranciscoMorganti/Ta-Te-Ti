const casillasTateti= document.querySelectorAll('.tateti__casilla');
const contadorTateti= document.querySelector('.tateti__contador');
const configurarJugadores= document.querySelectorAll('.tateti__perfil-jugador');
const nombreJugadores= document.querySelectorAll('.tateti__perfil-jugador > h2');
const fichaJugadores= document.querySelectorAll('.tateti__perfil-jugador > p');
const modalConfiguracionJugadores= document.querySelector('.tateti__configuracion-jugadores');
const cerrarConfiguracionJugadores= document.querySelector('.tateti__configuracion-cerrar');
const configuracionOk= document.querySelector('.tateti__configuracion-ok');
const inputNombre= document.querySelector('.tateti__input-nombre');
const contenedorConfiguracion= document.querySelector('.tateti__contenedor-configuracion');
const nombreConfiguracion= document.querySelector('.tateti__contenedor-configuracion > h2');
const seleccionarColorLabel= document.querySelector('.tateti__seleccionar-color');
const seleccionarFicha= document.querySelector('.tateti__select-ficha');
const opcionesFichas= document.querySelectorAll('.tateti__select-ficha > option');
const seleccionarColor= document.getElementById('configuracion-color');
const rootStyles= document.documentElement.style;
const fichasJugador1= document.querySelector('.tateti__jugador-1-fichas');
const fichasJugador2= document.querySelector('.tateti__jugador-2-fichas');
const indicadorTurno= document.querySelector('.tateti__main > h1')
const iniciarPartida= document.querySelector('.tateti__iniciar-partida');
const reiniciarPartida= document.querySelector('.tateti__reiniciar-partida');
const alerts= document.querySelectorAll('.tateti__alerts > p');
const contenedorModalGanador= document.querySelector('.tateti__contenedor-modal-ganador');
const modalGanador= document.querySelector('.tateti__modal-ganador');
const iconoGanador= document.querySelector('.tateti__icono-ganador');
const textoGanador= document.querySelectorAll('.tateti__texto-ganador > h2, .tateti__texto-ganador > h3, .tateti__texto-ganador > h4');
const jugarDeNuevo= document.querySelector('.tateti__texto-ganador > h5');
const cambioDeTema= document.querySelector('.tateti__cambio-de-tema');

let nombreJugador1= 'Jugador 1';
let nombreJugador2= 'Jugador 2';
let fichaJugador1= 'X';
let fichaJugador2= 'O';
let colorJugador1= '#000';
let colorJugador2= '#000';
let esTurnoDelJugador1;
let esPosibleIniciarPartida;
let partidaIniciada= false;
let proximoValorX= true;
let cambiandoFicha= false;
let configurandoJugador1= true;
let alertUsado= false;
let temaOscuroActivado= false;
let fichaSeleccionada;
let movimientosPosibles= {
    0: [1,3,4],
    1: [0,2,4],
    2: [1,5,4],
    3: [0,6,4],
    5: [2,8,4],
    6: [3,7,4],
    7: [6,8,4],
    8: [5,7,4]
}
let contador= 0;
let ganador;
let perdedor;
let colorGanador;
let tablero= [];

let nombreJugador1Ingresado;
let nombreJugador2Ingresado;
let fichasConfiguradas;

cambioDeTema.addEventListener('click', () => {
    if(!temaOscuroActivado){
        cambioDeTema.innerHTML= '<ion-icon name="sunny-outline"></ion-icon>';   
        temaOscuroActivado= !temaOscuroActivado;
        rootStyles.setProperty('--colorPrincipal', '#222');
        rootStyles.setProperty('--colorSecundario', '#fff');
        rootStyles.setProperty('--colorPorDefectoPerfiles', '#fff');
    } else if(temaOscuroActivado){
        cambioDeTema.innerHTML= '<ion-icon name="moon-outline"></ion-icon>';
        temaOscuroActivado= !temaOscuroActivado;     
        rootStyles.setProperty('--colorPrincipal', '#ccc');
        rootStyles.setProperty('--colorSecundario', '#000');
        rootStyles.setProperty('--colorPorDefectoPerfiles', '#000');
    }
});

cerrarConfiguracionJugadores.addEventListener('click', () => {
    modalConfiguracionJugadores.style.visibility= 'hidden';
});

configuracionOk.addEventListener('click', () =>{
    modalConfiguracionJugadores.style.visibility= 'hidden';
});

configurarJugadores.forEach((jugador, i) => {
    jugador.addEventListener('click', () =>{
        modalConfiguracionJugadores.style.visibility= 'visible';
        if(i === 0){
            nombreConfiguracion.innerHTML= nombreJugador1;
            rootStyles.setProperty('--colorConfiguracion', colorJugador1);
            configurandoJugador1= true;
            escribirNombre();
            opcionesFichas[0].innerHTML= 'X';
            opcionesFichas[0].value= 'X';
            opcionesFichas[1].innerHTML= 'O';
            opcionesFichas[1].value= 'O';
        } else if(i === 1){
            nombreConfiguracion.innerHTML= nombreJugador2;
            rootStyles.setProperty('--colorConfiguracion', colorJugador2);
            configurandoJugador1= false;
            escribirNombre();
            opcionesFichas[0].innerHTML= 'O';
            opcionesFichas[0].value= 'O';
            opcionesFichas[1].innerHTML= 'X';
            opcionesFichas[1].value= 'X';
        }
    })
});

function escribirNombre(){
    inputNombre.addEventListener('keyup', () => {
        if(configurandoJugador1){
            nombreJugador1= inputNombre.value;
            nombreJugadores[0].innerHTML= nombreJugador1;
            nombreConfiguracion.innerHTML= nombreJugador1;
            nombreJugador1Ingresado= true;
        }else if(!configurandoJugador1){
            nombreJugador2= inputNombre.value;
            nombreJugadores[1].innerHTML= nombreJugador2;
            nombreConfiguracion.innerHTML= nombreJugador2;
            nombreJugador2Ingresado= true;
        }
    });
    inputNombre.value= '';
}

seleccionarFicha.addEventListener('click', () => {
    if(configurandoJugador1){
        if(fichaJugador2 === seleccionarFicha.value){
            if(seleccionarFicha.value === 'X'){
                fichaJugador2= 'O';
                fichasJugador2.innerHTML= '<p>O</p><p>O</p><p>O</p>';
            } else{
                fichaJugador2= 'X';
                fichasJugador2.innerHTML= '<p>X</p><p>X</p><p>X</p>';
            }
            fichaJugadores[1].innerHTML= fichaJugador2;
        }
        fichaJugador1= seleccionarFicha.value;
        fichaJugadores[0].innerHTML= fichaJugador1;
        fichasJugador1.innerHTML= `<p>${seleccionarFicha.value}</p><p>${seleccionarFicha.value}</p><p>${seleccionarFicha.value}</p>`;
    } else if(!configurandoJugador1){
        if(fichaJugador1 === seleccionarFicha.value){
            if(seleccionarFicha.value === 'X'){
                fichaJugador1= 'O';
                fichasJugador1.innerHTML= '<p>O</p><p>O</p><p>O</p>';
            } else{
                fichaJugador1= 'X';
                fichasJugador1.innerHTML= '<p>X</p><p>X</p><p>X</p>';
            }
            fichaJugadores[0].innerHTML= fichaJugador1;
        }
        fichaJugador2= seleccionarFicha.value;
        fichaJugadores[1].innerHTML= fichaJugador2;
        fichasJugador2.innerHTML= `<p>${seleccionarFicha.value}</p><p>${seleccionarFicha.value}</p><p>${seleccionarFicha.value}</p>`;
    }
    fichasConfiguradas= true;
});

seleccionarColor.addEventListener('input', () => {
    contenedorConfiguracion.style.border= '4px solid var(--colorConfiguracion)';
    cerrarConfiguracionJugadores.style.color= 'var(--colorConfiguracion)';
    nombreConfiguracion.style.color= 'var(--colorConfiguracion)';
    inputNombre.style.borderBottom= '2px solid var(--colorConfiguracion)';
    seleccionarFicha.style.color= 'var(--colorConfiguracion)';
    seleccionarColorLabel.style.color= 'var(--colorConfiguracion)';
    configuracionOk.style.backgroundColor= 'var(--colorConfiguracion)';
    if (configurandoJugador1){
        configurarJugadores[0].style.color= 'var(--colorJugador1)';
        colorJugador1= seleccionarColor.value;
        rootStyles.setProperty('--colorConfiguracion', colorJugador1);
        rootStyles.setProperty('--colorJugador1', colorJugador1);
    } else if(!configurandoJugador1){
        configurarJugadores[1].style.color= 'var(--colorJugador2)';
        colorJugador2= seleccionarColor.value;
        rootStyles.setProperty('--colorConfiguracion', colorJugador2);
        rootStyles.setProperty('--colorJugador2', colorJugador2);
    }
});

iniciarPartida.addEventListener('click', () => {
    nombreJugador1Ingresado && nombreJugador2Ingresado && fichasConfiguradas? esPosibleIniciarPartida= true : '';
    if(esPosibleIniciarPartida){
        if(!partidaIniciada){
            comenzarJuego();
        }
    } else{
        alertUsado? alerts[2].style.animation= 'alert 2s linear 1' : alerts[2].style.animation= 'alert2 2s linear 1';
        alertUsado= !alertUsado;
    }
});

reiniciarPartida.addEventListener('click', () => {
    reiniciarJuego();
});

function reiniciarJuego(){
    fichasJugador1.innerHTML= '<p>O</p><p>O</p><p>O</p>';
    fichasJugador2.innerHTML= '<p>O</p><p>O</p><p>O</p>';
    casillasTateti.forEach(casilla => casilla.innerHTML= '');
    tablero= [];
    comenzarJuego();
}

function comenzarJuego(){
    let numeroRandom= Math.floor((Math.random() * 10) + 1);
    numeroRandom >= 1 && numeroRandom <= 5? esTurnoDelJugador1= true : esTurnoDelJugador1= false;
    esTurnoDelJugador1? indicadorTurno.innerHTML= `Turno de ${nombreJugador1}` : indicadorTurno.innerHTML= `Turno de ${nombreJugador2}`;
    indicadorTurno.style.visibility= 'visible';
    fichasJugador1.style.visibility= 'visible';
    fichasJugador2.style.visibility= 'visible';
    partidaIniciada= true;
    contador= 0;
}

casillasTateti.forEach((casilla, i) => {
    casilla.addEventListener('click', () => {
        if(partidaIniciada){
            if(cambiandoFicha){
                if(tablero.filter(espacio => espacio === 'X' || espacio === 'O').length === 6){
                    moverFicha(fichaSeleccionada, casilla, i);
                }
            } else if(casilla.innerHTML !== ''){
                if(tablero.filter(espacio => espacio === 'X' || espacio === 'O').length === 6){
                    if(casilla.innerHTML === fichaJugador1){
                        if(esTurnoDelJugador1){
                            fichaSeleccionada= i;
                            cambiandoFicha= !cambiandoFicha;
                        } else{
                            alerts[0].innerHTML= `Es el turno de ${nombreJugador2}`;
                            alertUsado? alerts[0].style.animation= 'alert 2s linear 1' : alerts[0].style.animation= 'alert2 2s linear 1';
                            alertUsado = !alertUsado;
                        }
                    } else if(casilla.innerHTML === fichaJugador2){
                        if(!esTurnoDelJugador1){
                            fichaSeleccionada= i;
                            cambiandoFicha= !cambiandoFicha;
                        } else{
                            alerts[0].innerHTML= `Es el turno de ${nombreJugador1}`;
                            alertUsado? alerts[0].style.animation= 'alert 2s linear 1' : alerts[0].style.animation= 'alert2 2s linear 1';
                            alertUsado = !alertUsado;
                        }
                    }
                }
            } else if(tablero.filter(espacio => espacio === 'X' || espacio === 'O').length < 6){
                ponerFicha(casilla, i);
                eliminarFichasIniciales();
            }
            comprobarGanador();
        } else{
            alertUsado? alerts[1].style.animation= 'alert 2s linear 1' : alerts[1].style.animation= 'alert2 2s linear 1';
            alertUsado= !alertUsado;
        }
    });
});

function ponerFicha(casilla, i){
    if(esTurnoDelJugador1){
        esTurnoDelJugador1= !esTurnoDelJugador1;
        casilla.innerHTML= fichaJugador1;
        casilla.style.color= colorJugador1;
        tablero[i]= fichaJugador1;
        indicadorTurno.innerHTML= `Turno de ${nombreJugador2}`;
    } else if(!esTurnoDelJugador1){
        esTurnoDelJugador1= !esTurnoDelJugador1;
        casilla.innerHTML= fichaJugador2;
        casilla.style.color= colorJugador2;
        tablero[i]= fichaJugador2;
        indicadorTurno.innerHTML= `Turno de ${nombreJugador1}`;
    }    
    contador += 1;
    contadorTateti.innerHTML= contador;
}

function moverFicha(fichaSeleccionada, casilla, i){
    cambiandoFicha= !cambiandoFicha;
    let casillaPosible1;
    let casillaPosible2;
    let casillaPosible3;
    if(fichaSeleccionada === 4 && casillasTateti[i].innerHTML === ''){
        ponerFicha(casilla, i);
        casillasTateti[fichaSeleccionada].innerHTML= '';
        tablero[fichaSeleccionada]= '';
        contador += 1;
    } else if(fichaSeleccionada !== 4){
        tablero[movimientosPosibles[fichaSeleccionada][0]] !== 'X' && tablero[movimientosPosibles[fichaSeleccionada][0]] !== 'O'? casillaPosible1= movimientosPosibles[fichaSeleccionada][0] : casillaPosible1= undefined; 
        tablero[movimientosPosibles[fichaSeleccionada][1]] !== 'X' && tablero[movimientosPosibles[fichaSeleccionada][1]] !== 'O'? casillaPosible2= movimientosPosibles[fichaSeleccionada][1] : casillaPosible2= undefined; 
        tablero[movimientosPosibles[fichaSeleccionada][2]] !== 'X' && tablero[movimientosPosibles[fichaSeleccionada][2]] !== 'O'? casillaPosible3= movimientosPosibles[fichaSeleccionada][2] : casillaPosible3= undefined;
    }
    if (i === casillaPosible1 || i === casillaPosible2 || i === casillaPosible3) {
        ponerFicha(casilla, i);
        casillasTateti[fichaSeleccionada].innerHTML= '';
        tablero[fichaSeleccionada]= '';
    }
    contadorTateti.innerHTML= contador;
}

function eliminarFichasIniciales(){
    if(!esTurnoDelJugador1){
        tableroFiltrado= tablero.filter(espacio => espacio == fichaJugador1);
        tableroFiltrado.length === 1? fichasJugador1.innerHTML= `<p>${fichaJugador1}</p><p>${fichaJugador1}</p>` : ''; 
        tableroFiltrado.length === 2? fichasJugador1.innerHTML= `<p>${fichaJugador1}</p>` : ''; 
        tableroFiltrado.length === 3? fichasJugador1.innerHTML= '' : ''; 
    } else if(esTurnoDelJugador1){
        tableroFiltrado= tablero.filter(espacio => espacio == fichaJugador2);
        tableroFiltrado.length === 1? fichasJugador2.innerHTML= `<p>${fichaJugador2}</p><p>${fichaJugador2}</p>` : ''; 
        tableroFiltrado.length === 2? fichasJugador2.innerHTML= `<p>${fichaJugador2}</p>` : ''; 
        tableroFiltrado.length === 3? fichasJugador2.innerHTML= '' : ''; 
    }
}

function comprobarGanador(){
    if(tablero[0] === 'X' && tablero[1] === 'X' && tablero[2] === 'X' ||
       tablero[3] === 'X' && tablero[4] === 'X' && tablero[5] === 'X' ||
       tablero[6] === 'X' && tablero[7] === 'X' && tablero[8] === 'X' ||
       tablero[0] === 'X' && tablero[3] === 'X' && tablero[6] === 'X' ||
       tablero[1] === 'X' && tablero[4] === 'X' && tablero[7] === 'X' ||
       tablero[2] === 'X' && tablero[5] === 'X' && tablero[8] === 'X' ||
       tablero[0] === 'X' && tablero[4] === 'X' && tablero[8] === 'X' ||
       tablero[2] === 'X' && tablero[4] === 'X' && tablero[6] === 'X'){
        fichaJugador1 === 'X'? ganador= nombreJugador1 : ganador= nombreJugador2;
        fichaJugador1 === 'X'? colorGanador= colorJugador1 : colorGanador= colorJugador2;
        fichaJugador1 === 'O'? perdedor= nombreJugador1 : perdedor= nombreJugador2;
        mostrarModalGanador(ganador, colorGanador, nombreJugador2);
    } else if(tablero[0] === 'O' && tablero[1] === 'O' && tablero[2] === 'O' ||
              tablero[3] === 'O' && tablero[4] === 'O' && tablero[5] === 'O' ||
              tablero[6] === 'O' && tablero[7] === 'O' && tablero[8] === 'O' ||
              tablero[0] === 'O' && tablero[3] === 'O' && tablero[6] === 'O' ||
              tablero[1] === 'O' && tablero[4] === 'O' && tablero[7] === 'O' ||
              tablero[2] === 'O' && tablero[5] === 'O' && tablero[8] === 'O' ||
              tablero[0] === 'O' && tablero[4] === 'O' && tablero[8] === 'O' ||
              tablero[2] === 'O' && tablero[4] === 'O' && tablero[6] === 'O'){
        fichaJugador1 === 'O'? ganador= nombreJugador1 : ganador= nombreJugador2;
        fichaJugador1 === 'O'? colorGanador= colorJugador1 : colorGanador= colorJugador2;
        fichaJugador1 === 'X'? perdedor= nombreJugador1 : perdedor= nombreJugador2;
        mostrarModalGanador(ganador, colorGanador, nombreJugador1);
    }
}

function mostrarModalGanador(nombreJugador, colorJugador, nombreOtroJugador){
    contenedorModalGanador.style.visibility= 'visible';
    modalGanador.style.visibility= 'visible';
    modalGanador.style.marginTop= '0vh';    
    modalGanador.style.border= `4px solid ${colorJugador}`;
    iconoGanador.style.color= colorJugador;
    textoGanador.forEach(texto => texto.style.color= colorJugador);
    textoGanador[0].innerHTML= `¡Gana ${nombreJugador}!`;
    textoGanador[1].innerHTML= `Ha vencido a ${nombreOtroJugador}<br>en tan solo:`;
    textoGanador[2].innerHTML= `${contador}<br>movimientos`;
}

jugarDeNuevo.addEventListener('click', () => {
    reiniciarJuego();
    contenedorModalGanador.style.visibility= 'hidden';
    modalGanador.style.visibility= 'hidden';
    modalGanador.style.marginTop= '150vh';  
});
