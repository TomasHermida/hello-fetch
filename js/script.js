// cuando termine de cargar el documento poblamos la tabla
document.addEventListener("DOMContentLoaded", function() {
  fetchData();
});

// esta funcion carga la tabla apenas carga la pagina
// fetch() es el método nativo de los navegadores para hacer peticiones AJAX
// se usa con promesas ya que es asíncrono
function fetchData() {
  fetch('https://hello---database2.herokuapp.com/api/users')
    .then(res => res.json())
    .then(users => {
      populateTable(users);
    });
}

// esta funcion carga los usuarios en la tabla
// crea una fila en la tabla por cada elemento en el array users
function populateTable(users) {
  for (let user of users) {
    // borramos las propiedades que no queremos en la tabla
    delete user._id;
    delete user.__v;
    // agregamos la edad para la ultima columna
    let now = new Date();
    user.age = now.getFullYear() - new Date(user.birthday).getFullYear();
    // formateamos la fecha de cumpleaños
    let birthday = new Date(user.birthday);
    user.birthday = birthday.toLocaleDateString('es-AR');
    // creamos una fila
    let row  = document.createElement('tr');
    for (let key in user) {
      // agregamos una columna por cada propiedad
      let col = document.createElement('td');
      col.innerHTML = user[key];
      row.append(col);
    }
    // agregamos la fila al tbody y repetimos
    document.getElementById('tbody').append(row);
  }
}

// esta funcion carga un solo usuario en la tabla
function fetchUser() {
  let id = document.getElementById('userID').value;
  // si el id no es un numero terminamos
  if (isNaN(id)) return;
  fetch(`https://hello---database2.herokuapp.com/api/user/${id}`)
    .then(res => res.json())
    .then(user => {
      let users = [user];  // populateTable usa un array de objetos como argumento
      // si tenemos un usuario lo cargamos en la tabla
      if (users[0] !== null) {
        // reemplazamos el tbody por uno nuevo con el usuario que encontramos
        let oldTBody = document.getElementById('tbody');
        let newTBody = document.createElement('tbody');
        newTBody.id = 'tbody';
        oldTBody.replaceWith(newTBody);
        // cargamos la fila
        populateTable(users);
        // actualizamos la UI
        document.getElementById('table').hidden = false;
        document.getElementById('nores').innerHTML = '';
      } else {
        // si no hay usuario con ese ID mostramos un mensaje
        document.getElementById('table').hidden = true;
        document.getElementById('nores').innerHTML = 'No hay resultados';
      }
    });
}