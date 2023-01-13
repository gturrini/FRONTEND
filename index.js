const createURL = 'http://acALB-1895247277.eu-west-2.elb.amazonaws.com/api/create.php';
const readAllURL = 'http://acALB-1895247277.eu-west-2.elb.amazonaws.com/api/read_all.php';
const readSingleURL = 'http://acALB-1895247277.eu-west-2.elb.amazonaws.com/api/read_single.php';
const updateURL = 'http://acALB-1895247277.eu-west-2.elb.amazonaws.com/api/update.php';
const deleteURL = 'http://acALB-1895247277.eu-west-2.elb.amazonaws.com/api/delete.php';

function loadTable() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", readAllURL);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var trHTML = '';
      const objects = JSON.parse(this.responseText).body;
      for (let object of objects) {
        trHTML += '<tr>';
        trHTML += '<td>' + object['id'] + '</td>';
        trHTML += '<td>' + object['name'] + '</td>';
        trHTML += '<td>' + object['email'] + '</td>';
        trHTML += '<td>' + object['age'] + '</td>';
        trHTML += '<td>' + object['designation'] + '</td>';
        trHTML += '<td>' + object['created'] + '</td>';
        trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(' + object['id'] + ')">Edit</button>';
        trHTML += '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' + object['id'] + ')">Del</button></td>';
        trHTML += "</tr>";
      }
      document.getElementById("mytable").innerHTML = trHTML;
    }
  };
}

loadTable();

function showUserCreateBox() {
  Swal.fire({
    title: 'Create user',
    html:
      '<input id="id" type="hidden">' +
      '<input id="name" class="swal2-input" placeholder="Name">' +
      '<input id="email" class="swal2-input" placeholder="Email">' +
      '<input id="age" class="swal2-input" placeholder="Age">' +
      '<input id="designation" class="swal2-input" placeholder="Designation">' +
      '<input id="created" class="swal2-input" placeholder="Created">',
    focusConfirm: false,
    preConfirm: () => {
      userCreate();
    }
  })
}

function userCreate() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const age = document.getElementById("age").value;
  const designation = document.getElementById("designation").value;
  const created = document.getElementById("created").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", createURL);
  xhttp.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
  xhttp.send(JSON.stringify({
    "name": name, "email": email, "age": age, "designation": designation, "created": created
  }));
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(JSON.parse(objects)['message']);
      loadTable();
    }
  };
}

function showUserEditBox(id) {
  console.log(id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", readSingleURL + '/?id=' + id);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      const user = objects['user'];
      Swal.fire({
        title: 'Edit User',
        html:
          '<input id="id" type="hidden" value=' + objects['id'] + '>' +
          '<input id="name" class="swal2-input" placeholder="Name" value="' + objects['name'] + '">' +
          '<input id="email" class="swal2-input" placeholder="Email" value="' + objects['email'] + '">' +
          '<input id="age" class="swal2-input" placeholder="Age" value="' + objects['age'] + '">' +
          '<input id="designation" class="swal2-input" placeholder="Designation" value="' + objects['designation'] + '">' +
          '<input id="created" class="swal2-input" placeholder="Created" value="' + objects['created'] + '">',
        focusConfirm: false,
        preConfirm: () => {
          userEdit();
        }
      })
    }
  };
}

function userEdit() {
  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const age = document.getElementById("age").value;
  const designation = document.getElementById("designation").value;
  const created = document.getElementById("created").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", updateURL);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({
    "id": id, "name": name, "email": email, "age": age, "designation": designation, "created": created
  }));
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(JSON.parse(objects)['message']);
      loadTable();
    }
  };
}

function userDelete(id) {
  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", deleteURL);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({
    "id": id
  }));
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(JSON.parse(objects)['message']);
      loadTable();
    }
  };
}
