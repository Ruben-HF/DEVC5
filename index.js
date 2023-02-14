console.log('Hola')

//TODO LIST

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
        <td style="width: 100%"> <button onclick="editar(${index})" class="btn btn-outline-secondary" style="min-width: 100%"> Editar </button> </td>
        <td style="width: 100%"> <button onclick="borrar(${index})" class="btn btn-outline-success" style="min-width: 100%"> Completado </button> </td>
        
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
            <td> <button onclick="salir(this)" class=" btn btn-outline-danger" style="width:100%"> Salir </button> </td>
            <td> <button onclick="reguardar(${i})" class="btn btn-warning" style="width:100%"> Guardar </button> </td>
            
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


//NOTAS

// Get references to elements
const notesList = document.querySelector('#notes-list');
const noteTitleInput = document.querySelector('#note-title-input');
const noteTextInput = document.querySelector('#note-text-input');
const saveBtn = document.querySelector('#save-btn');

// Load any existing notes from local storage
const notes = JSON.parse(localStorage.getItem('notes')) || [];

// Render the notes list
function renderNotesList() {
  notesList.innerHTML = '';
  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    const noteEl = document.createElement('div');
    noteEl.classList.add('note');
    noteEl.innerHTML = `
      <div class="note-title">${note.title}</div>
      <div class="note-actions">
        <button class="delete-btn btn btn-outline-danger" style="width: 45%;">Eliminar</button>
        <button class="edit-btn btn btn-outline-success" style="width: 45%;">Visualizar</button>
        
      </div>
    `;
    notesList.appendChild(noteEl);
  }
}

// Save the notes to local storage
function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Handle the save button click
saveBtn.addEventListener('click', function() {
  notes.push({
    title: noteTitleInput.value,
    text: noteTextInput.value
  });
  noteTitleInput.value = '';
  noteTextInput.value = '';
  renderNotesList();
  saveNotes();
});

// Handle the edit button click
notesList.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-btn')) {
    // Get the note index
    const noteEl = event.target.parentElement.parentElement;
    const noteIndex = Array.from(notesList.children).indexOf(noteEl);
    // Load the note into the input fields
    const note = notes[noteIndex];
    noteTitleInput.value = note.title;
    noteTextInput.value = note.text;
    // Change the text of the edit button to "Guardar"
    event.target.textContent = 'Guardar';
    event.target.classList.remove("btn-outline-success");
    event.target.classList.add("btn-warning");
    // Disable the save button
    saveBtn.disabled = true;
    saveBtn.style.display = "none";
    // Add a new click event listener to the save button
    event.target.addEventListener('click', function() {
    // Update the note with the new values
    notes[noteIndex].title = noteTitleInput.value;
    notes[noteIndex].text = noteTextInput.value;
    // Reset the input fields
    noteTitleInput.value = '';
    noteTextInput.value = '';
    // Render the updated notes list
    renderNotesList();
    saveNotes();
    // Enable the save button
    saveBtn.disabled = false;
    saveBtn.style.display = "block";
    });
    }
});
    

// Handle the delete button click
notesList.addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-btn')) {
    const noteEl = event.target.parentElement.parentElement;
    const noteIndex = Array.from(notesList.children).indexOf(noteEl);
    notes.splice(noteIndex, 1);
    renderNotesList();
    saveNotes();
  }
});

// Render the notes list for the first time
renderNotesList();


//CONTADOR

const counterEl = document.getElementById("counter");
const incrementBtn = document.getElementById("increment");
const resetBtn = document.getElementById("reset");
      
let count = 0;
      
incrementBtn.addEventListener("click", function() {
    count++;
    counterEl.innerHTML = count;
});
      
resetBtn.addEventListener("click", function() {
    count = 0;
    counterEl.innerHTML = count;
});
