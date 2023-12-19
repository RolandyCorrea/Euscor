function generarCodigo() {
    let codigoActual = localStorage.getItem('codigoCompra') || 0;

    codigoActual++;
    
    let nuevoCodigo = 'EUSCOR-BC-' + ('0000' + codigoActual).slice(-4);

    localStorage.setItem('codigoCompra', codigoActual);

    return nuevoCodigo;
}

// Ejemplo de cómo usar la función para obtener un código único
let codigoCompra = generarCodigo();
console.log('Código de compra:', codigoCompra);
//Manejo de Card con costos
document.addEventListener('DOMContentLoaded', function () {
    function validarFormulario() {
        var formulario = document.getElementById('formulario');

        var camposCompletos = true;

        formulario.querySelectorAll('input[required], select[required]').forEach(function (elemento) {
            if (!elemento.value) {
                camposCompletos = false;
            }
        });

        return camposCompletos;
    }
    

    var dniInput = document.getElementById('dni');
    var nombreCompletoInput = document.getElementById('nombrecompleto');
    var personasSelect = document.getElementById('personas');
    var tipoTransporteSelect = document.getElementById('tipoTransporte');
    var horarioSelect = document.getElementById('horario');
    var emailInput = document.getElementById('email');
    var telefonoInput = document.getElementById('telefono');

    var nombresCompletosSpan = document.querySelector('.cardnombres');
    var dniSpan = document.querySelector('.carddni');
    var transporteSpan = document.querySelector('.cardtransporte');
    var horaSpan = document.querySelector('.cardhora');
    var correoElectronicoSpan = document.querySelector('.cardcorreo');
    var telefonoSpan = document.querySelector('.cardtelefono');
    var npersonas = document.querySelector('.npersonas');

    
    var modalnombres = document.querySelector('.modalnombres');
    var modaldni = document.querySelector('.modaldni');
    var modaltransporte = document.querySelector('.modaltransporte');
    var modalhora = document.querySelector('.modalhora');
    var modalnpersonas = document.querySelector('.modalnpersonas');
    var modaltotalpagar = document.querySelector('.modaltotalpagar');
    var modalcodigocompra = document.querySelector('.modalcodigocompra');

    var formulario = document.getElementById('formulario');
    var comprarButton = document.querySelector('.botoncomprar');
    var pagarButton = document.querySelector('.botonpagar');

    comprarButton.addEventListener('click', function (event) {
        if (!validarFormulario()) {
            alert('Por favor, complete todos los campos obligatorios antes de pre-comprar.');
            event.preventDefault(); 
            return;
        }

        nombresCompletosSpan.textContent = nombreCompletoInput.value;
        npersonas.textContent = personasSelect.value;
        dniSpan.textContent = dniInput.value;
        transporteSpan.textContent = tipoTransporteSelect.value;
        horaSpan.textContent = horarioSelect.value;
        correoElectronicoSpan.textContent = emailInput.value;
        telefonoSpan.textContent = telefonoInput.value;
        var tipoTransporte = tipoTransporteSelect.value;
        var numPersonas = parseInt(personasSelect.value);
        var subtotal;
        switch (tipoTransporte) {
            case 'bus':
                subtotal = 20.5 * numPersonas;
                break;
            case 'minibus':
                subtotal = 7 * numPersonas;
                break;
            case 'custer':
                subtotal = 4.5 * numPersonas;
                break;
            default:
                subtotal = 0;
        }
        var igv = subtotal * 0.18;
        var totalPagar = subtotal + igv;
        var cardSubtotalSpan = document.querySelector('.cardsubtotal');
        var cardIgvSpan = document.querySelector('.cardigv');
        var cardTotalPagarSpan = document.querySelector('.totalapagar');

        cardSubtotalSpan.textContent = subtotal.toFixed(1); 
        cardIgvSpan.textContent = igv.toFixed(1); 
        cardTotalPagarSpan.textContent = totalPagar.toFixed(1);


        formulario.reset();

    });
    pagarButton.addEventListener('click', function (event) {
        event.preventDefault();
        var cardTotalPagarSpan = document.querySelector('.totalapagar');
        var codigoCompra = generarCodigo();
    
        // Asignar valores a los campos de entrada deshabilitados
        document.querySelector('input.modalnombres').value = nombresCompletosSpan.textContent;
        document.querySelector('input.modaldni').value = dniSpan.textContent;
        document.querySelector('input.modaltransporte').value = transporteSpan.textContent;
        document.querySelector('input.modalhora').value = horaSpan.textContent;
        document.querySelector('input.modaltotalpagar').value = cardTotalPagarSpan.textContent;
        document.querySelector('input.modalcodigocompra').value = codigoCompra;
        document.querySelector('input.modalnpersonas').value = npersonas.textContent;

    });
});


// SELECT DINAMIGO
    var tipoTransporteSelect = document.getElementById("tipoTransporte");
    var horarioSelect = document.getElementById("horario");

    var horariosPorTransporte = {
        bus: ["8:00 AM", "12:00 PM", "4:00 PM"],
        minibus: ["6:00 AM", "9:00 AM", "1:00 PM", "4:00 PM", "8:00 PM"],
        custer: ["10:00 AM","11:00 AM","12:00 AM","1:00 PM", "2:00 PM","3:00 PM","4:00 PM","5:00 PM", "6:00 PM","7:00 PM","8:00 PM"]
    };

    function actualizarHorarios() {
        horarioSelect.innerHTML = '<option selected disabled>Elige un Horario</option>';

        var tipoTransporte = tipoTransporteSelect.value;

        var horarios = horariosPorTransporte[tipoTransporte];

        horarios.forEach(function (hora) {
            var option = document.createElement("option");
            option.value = hora;
            option.text = hora;
            horarioSelect.appendChild(option);
        });
    }

    tipoTransporteSelect.addEventListener("change", actualizarHorarios);

    actualizarHorarios();
