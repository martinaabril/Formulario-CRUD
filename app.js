// Declaración de variables
let listaInscripciones = []
let indiceEdicion = null

const campoNombrePersona = document.getElementById('nombrePersona')
const campoActividadSeleccionada = document.getElementById('actividadSeleccionada')
const botonGuardar = document.getElementById('botonGuardar')
const cuerpoTablaInscripciones = document.getElementById('cuerpoTablaInscripciones')

botonGuardar.addEventListener('click', guardarInscripcion)


// función principal
function guardarInscripcion() {
    //leer datos del formulario
    const nombrePersona = campoNombrePersona.value.trim()
    const actividadSeleccionada = campoActividadSeleccionada.value
    const turnoMarcado = document.querySelector("input[name='turnoActividad']:checked")

    //validarlos
    if (nombrePersona === "" || actividadSeleccionada === "" || !turnoMarcado) {
        alert('Todos los campos son obligatorios')
        return
    }

    //crear el objeto que guardamos
    const turnoSeleccionado = turnoMarcado.value

    const nuevaInscripcion = {
        nombre: nombrePersona,
        actividad: actividadSeleccionada,
        turno: turnoSeleccionado
    }

    // C de CRUD
    // listaInscripciones.push(nuevaInscripcion)

    if(indiceEdicion === null){
        listaInscripciones.push(nuevaInscripcion)
    } else {
        listaInscripciones[indiceEdicion] = nuevaInscripcion
        indiceEdicion = null
        botonGuardar.textContent = "Añadir inscripción"
        botonGuardar.classList.remove('btn-warning')
        botonGuardar.classList.add('btn-info')
    }

    limpiarFormulario()
    mostrarInscripciones()
}

//R de read
function mostrarInscripciones() {
    cuerpoTablaInscripciones.innerHTML = ""

    listaInscripciones.forEach((inscripcion, indice) => {
        cuerpoTablaInscripciones.innerHTML += `
            <tr>
                <td>${inscripcion.nombre}</td>
                <td>${inscripcion.actividad}</td>
                <td>${inscripcion.turno}</td>
                <td>
                    <button class="btn btn-warning" onclick="editarInscripciones(${indice})">Editar</button>
                    <button class="btn btn-danger" onclick="borrarInscripcion(${indice})">Borrar</button>
                </td>
            </tr>
        `
    })
}


//Limpiar el formulario
function limpiarFormulario() {
    campoNombrePersona.value = ""
    campoActividadSeleccionada.value = ""
    document.querySelectorAll("input[name='turnoActividad']").forEach(radio => {
        radio.checked = false
    })
}

//Borrar
function borrarInscripcion(indice){
    listaInscripciones.splice(indice,1)
    mostrarInscripciones()
}

// U de CRUD - Edición

function editarInscripciones(indice) {
    const inscripcion = listaInscripciones[indice]

    campoNombrePersona.value = inscripcion.nombre
    campoActividadSeleccionada.value = inscripcion.actividad

    const radioTurno = document.querySelector(`input[name="turnoActividad"][value="${inscripcion.turno}"]`)

    if (radioTurno) {
        radioTurno.checked = true
    }

    indiceEdicion = indice

    botonGuardar.textContent = 'Guardar cambios'
    botonGuardar.classList.remove('btn-info')
    botonGuardar.classList.add('btn-warning')
}

// D de Delete
function borrarInscripcion(indice){
    if(confirm("¿Estás seguro de que quieres borrar esta inscripción?")) {
        listaInscripciones.splice(indice, 1)
        mostrarInscripciones()
    }
}

function limpiarFormulario() {
    campoNombrePersona.value = ""
    campoActividadSeleccionada.value = ""
    document.querySelectorAll("input[name='turnoActividad']").forEach(radio => {
        radio.checked = false
    })
    indiceEdicion = null
    botonGuardar.innerText = "Añadir inscripción"
    botonGuardar.classList.replace("btn-warning", "btn-info")
}   