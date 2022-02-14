// Electron window

const data = require("./public/menu");
var comidas = data.comidas;

const { ipcMain } = require("electron")

  const ipc = window.require('electron').ipcRenderer;
   function Recargar(){
    ipc.send('RecargarRegistros');  
   };
   function dividir(){
    ipc.send('dividirRegistros');  
   };

// Data base code

var Datastore = require('nedb');


let bd = new Datastore({
    filename: 'db/ordenes.db',
     autoload: true
    });

function agregarOrden(fecha, hora, nombres, apellidos, orden, total){
    var pedido = {
        fecha: fecha,
        hora: hora,
        nombres: nombres,
        apellidos: apellidos,
        orden: orden,
        total : total,
    };

    bd.insert(pedido, function(error, nuevoObjeto){

    });
};
function obtenerOrdenes(operacion) {
    bd.find({}, function(err, ordenes){
        if(ordenes){
            operacion(ordenes);
        }
        if (err) {
            console.error(err);
            process.exit(0);
        }
    });
};


function eliminarOrden (id) {
    bd.remove({_id: id},  {}, function(error, numeroRegistrosEliminados){

    });
};

// end data base

//set option notify
var option = 
{
    animation : true,
    autohide : true,
    delay : 2000
};


let comidaSeleccionada;
var indice = 1;

const btnHam = document.getElementById('hamburguesa');
const btnTor = document.getElementById('torta');
const btnHD = document.getElementById('hotdog');   

var inputOrden = document.getElementById('orden');

var total = document.getElementById('total');
let totalnumero = 0;





    function AgregarHamburguesa() {
        comidaSeleccionada = comidas.find(item => item.id == 1);
        inputOrden.value += indice;
        inputOrden.value += comidaSeleccionada.value;
        totalnumero = totalnumero + 20;
        indice = indice + 1;
        total.innerHTML = totalnumero;
    };
    
    function AgregarTorta() {
        comidaSeleccionada = comidas.find(item => item.id == 2);
        inputOrden.value += indice;
        inputOrden.value += comidaSeleccionada.value;
        totalnumero = totalnumero + 25;
        indice = indice + 1;
        total.innerHTML = totalnumero;
    };
    
    function AgregarHotDog() {
        comidaSeleccionada = comidas.find(item => item.id == 3);
        inputOrden.value += indice;
        inputOrden.value += comidaSeleccionada.value;
        totalnumero = totalnumero + 30;
        indice = indice + 1;
        total.innerHTML = totalnumero;
    };


var hoy = new Date();
class GestorOrdenes {
    constructor() {
        this.frmNuevoRegistro = document.getElementById('frmNuevoRegistro');

        this.registros = document.getElementById('registros');


        this.fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
        this.hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        this.nombres = document.getElementById('nombres');
        this.apellidos = document.getElementById('apellidos');
        this.orden = document.getElementById('orden');
        this.boton = document.getElementById('reiniciar');
        this.total;


        this.btnCrearRegistro = document.getElementById('btnCrearRegistro'); 

        this.cargarRegistrosOrden();
        this.agregarEventListeners();
    }

    generarNotificacion(){
            var toastHTMLElement = document.getElementById( 'EpicToast' );
            var toastElement = new bootstrap.Toast( toastHTMLElement, option );
            toastElement.show( );
    }
    
    reiniciarForm() {
        indice = 1;
        totalnumero = 0;
        total.innerHTML = totalnumero;
        inputOrden.value = ""
    };


    agregarEventListeners() {
        this.frmNuevoRegistro.addEventListener('submit', this.crearRegistroOrden.bind(this));
        this.frmNuevoRegistro.addEventListener('submit', this.generarNotificacion);
        this.frmNuevoRegistro.addEventListener('submit', this.reiniciarForm);
     
    }


    crearRegistroOrden(evento) {
        evento.preventDefault();

        agregarOrden(this.fecha,this.hora,this.nombres.value, this.apellidos.value, this.orden.value, totalnumero);

        this.nombres.value = '';
        this.apellidos.value = '';
        this.orden.value = '';
        totalnumero = '';

        this.cargarRegistrosOrden();
        Recargar();
        generarNotificacion();

    }

    generarHtmlRegistroOrden(orden){
        return `<tr>
            <td><p class="text-light">${orden.fecha}</td>
            <td><p class="text-light">${orden.hora}</td>
            <td><p class="text-light">${orden.nombres}</td>
            <td><p class="text-light">${orden.apellidos}</td>
            <td><p class="text-light">${orden.orden}</td>
            <td><p class="text-light">${orden.total}</td>
            <td><input type="button" class="btn btn-danger btn-sm" onclick="gestorOrdenes.eliminarRegistroOrden('${orden._id}');" value="Eliminar"></td>
        </tr>
        `;
    }

    cargarRegistrosOrden() {
        obtenerOrdenes((ordenes) => {
            let html = ordenes.map(this.generarHtmlRegistroOrden).join('');

            this.registros.innerHTML = html;
        });
    }

    eliminarRegistroOrden(id) {
        eliminarOrden(id);

        this.cargarRegistrosOrden();
    }
}



let gestorOrdenes = new GestorOrdenes();