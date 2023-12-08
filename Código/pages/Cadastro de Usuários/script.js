function addCad() {
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const data = document.getElementById('data').value;
    const cpf = document.getElementById('cpf').value;
    const number = document.getElementById('number').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmpassword = document.getElementById('confirmpassword').value;

    if (password !== confirmpassword) {
        alert('As senhas não coincidem. Por favor, tente novamente.');
        return; // Evite o cadastro se as senhas não coincidirem.
    }

    const cad = {
        firstname,
        lastname,
        data,
        cpf,
        number,
        email,
        password,
        confirmpassword
    };

    let cadastro = JSON.parse(localStorage.getItem('cadastro')) || [];
    cadastro.push(cad);
    localStorage.setItem('cadastro', JSON.stringify(cadastro));

    // Exibe uma mensagem de sucesso
    alert('Cadastro realizado com sucesso!');
    document.getElementById('cad-form').reset();
  showdata();
}
function showdata(){
  var mostrar=JSON.parse(localStorage.getItem('cadastro') ) || []
  var html=``;

  mostrar.forEach((element,index)=> {
    html+=`nome:${element.firstname}<br>
    sobrenome:${element.lastname}<br>
    data de nascimento:${element.data}<br>
    cpf:${element.cpf}<br>
    telefone:${element.number}<br>
    email:${element.email}<br>

    <button onclick="deletedata(${index})" >deletar</button><br>
    <button onclick="editarItem(${index})">Editar</button><br>`

  });

  document.getElementById("itens").innerHTML=html;  
}

window.onload=showdata();

function deletedata(index){
var dados;
if(localStorage.getItem("cadastro")==null){
  dados=[];

}
else{
  dados=JSON.parse(localStorage.getItem("cadastro"))
}
  dados.splice(index,1);
  localStorage.setItem("cadastro",JSON.stringify(dados))

  showdata();
}

// Editar
function editarItem(index) {
  const cadastro = JSON.parse(localStorage.getItem('cadastro')) || [];

  if (index >= 0 && index < cadastro.length) {
    const itemParaEditar = cadastro[index];

    const novoNome = prompt("Novo nome:", itemParaEditar.firstname);
    const novoSobrenome = prompt("Novo sobrenome:", itemParaEditar.lastname);
    const novaData = prompt("Nova data:", itemParaEditar.data);
    const novoCpf = prompt("Novo CPF:", itemParaEditar.cpf);
    const novoNumero = prompt("Novo número:", itemParaEditar.number);
    const novoEmail = prompt("Novo email:", itemParaEditar.email);

    itemParaEditar.firstname = novoNome;
    itemParaEditar.lastname = novoSobrenome;
    itemParaEditar.data = novaData;
    itemParaEditar.cpf = novoCpf;
    itemParaEditar.number = novoNumero;
    itemParaEditar.email = novoEmail;


    localStorage.setItem('cadastro', JSON.stringify(cadastro));
    showdata();
  }
}
