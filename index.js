console.log('Hola')

function guardar(){
    let texto = document.getElementById('textotext').value
    
    let inputValue = ({
        "texto": texto
    })

    let datos = JSON.parse(localStorage.getItem('valores')) ? JSON.parse(localStorage.getItem('valores')) : []
    console.log(inputValue)
    datos.push(inputValue)
    console.log(JSON.stringify(datos))
    localStorage.setItem('valores', JSON.stringify(datos))

    document.getElementById('textotext').value = ''

    render()
}

function render() {
    console.log(localStorage.getItem('valores'))

    let lista = document.getElementById('lista')
    lista.innerHTML = `
    <table>
    <thead>
    <th> Lista de Tareas: </th>
    <br>
    </thead>
    </table>
    `
    let datos = JSON.parse(localStorage.getItem('valores')) ? JSON.parse(localStorage.getItem('valores')) : []

    datos.forEach((element,index) => {
        lista.innerHTML += `
        <td style="width: 100%"> ${element.texto} </td>
        <td style="width: 100%"> <button onclick="borrar(${index})" class="btn btn-outline-success" style="min-width: 100%"> Completado </button> </td>
        <td style="width: 100%"> <button onclick="editar(${index})" class="btn btn-outline-secondary" style="min-width: 100%"> Editar </button> </td>
        `
    });

}

function borrar(position){
    let datos = JSON.parse(localStorage.getItem('valores')) ? JSON.parse(localStorage.getItem('valores')) : []
    console.log(datos.splice(position,1))
    console.log(JSON.stringify(datos))
    localStorage.setItem('valores', JSON.stringify(datos))
    render()
}


function editar(ps){
    let datos = JSON.parse(localStorage.getItem('valores')) ? JSON.parse(localStorage.getItem('valores')) : []
    for(let i = 0; i <= datos.length ; i++) {
        if( i == ps){
            document.getElementById('textotext').value = datos[i].texto   

            let nombre = datos[i].texto

            lista.innerHTML = `
            <td> ${nombre} </td>
            <td> <button onclick="reguardar(${i})" class="btn btn-warning" style="width:100%"> Guardar </button> </td>
            <td> <button onclick="salir(this)" class="btn btn-danger" style="width:100%"> Salir </button> </td>
            `
        }
    }

}

function reguardar(i){
    let datos = JSON.parse(localStorage.getItem('valores')) ? JSON.parse(localStorage.getItem('valores')) : []

    let reinput = ({
        "texto": document.getElementById('textotext').value
    })

    datos[i] = reinput
    console.log(datos[i])
    localStorage.setItem('valores', JSON.stringify(datos))

    document.getElementById('textotext').value = ``

    render()
}

function salir(e){
    e.parentElement.remove()
    render()
}

render()