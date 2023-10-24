const toggleMenuOpen = () => document.body.classList.toggle("open");
const togglePesquisaOpen = () => document.body.classList.toggle("open-pesquisa");
const toggleMenuApostilaOpen = () => document.body.classList.toggle("open-apostila");
const questionElement = document.getElementById('question');
const nextButton = document.getElementById('next-button');
const resultElement = document.getElementById('result');
const questionNumberElement = document.getElementById('question-number');
const progressBar = document.getElementById('progress-bar');

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 400) {
    document.getElementById("btnVoltarTopo").classList.add("show");
  } else {
    document.getElementById("btnVoltarTopo").classList.remove("show");
  }
}

function voltarAoTopo() {
  document.body.scrollTop = 0; // Para navegadores que suportam o scrollTop
  document.documentElement.scrollTop = 0; // Para navegadores modernos
}

fetch('api.json')
.then(res => res.json())
.then((json) => {
    console.log(json);
    const ul = document.getElementById('lista-titulos');
    const ulPc = document.getElementById('lista-titulos-pc');
    json.forEach((titulo) => {
        const lista = `
        <a href="${titulo.link}">
         <!-- <img width="50"
            src="${titulo.image}"> --!>
         <span class="titulo-name">${titulo.title}</span>
        </a>
        `
        const li = document.createElement("li");
        const liPc = document.createElement("li");
        li.innerHTML = `${lista}`;
        liPc.innerHTML = `${lista}`
        ul.appendChild(li);
        ulPc.appendChild(liPc);
    })
})
            
let isListVisible = false;

// Função para mostrar a lista de títulos
function mostrarLista() {
  const ul = document.getElementById('lista-titulos');
  const ulPc = document.getElementById('lista-titulos-pc');
  ul.style.display = 'block';
  ulPc.style.display = 'block';
  isListVisible = true;
}

// Função para ocultar a lista de títulos
function ocultarLista() {
  const ul = document.getElementById('lista-titulos');
  const ulPc = document.getElementById('lista-titulos-pc');
  ul.style.display = 'none';
  ulPc.style.display = 'none';
  isListVisible = false;
}

// Função chamada quando o usuário clica no input
function onFocusInput() {
  if (!isListVisible) {
    mostrarLista();
  }
}

// Função chamada quando o usuário clica fora do input ou na lista
function onClickOutside(event) {
  const input = document.getElementById('nav-input');
  const inputPc = document.getElementById('inputBusca');
  if (!input.contains(event.target) && isListVisible &&
   !inputPc.contains(event.target) && isListVisible) {
    ocultarLista();
  }
 
}

document.getElementById('nav-input').addEventListener('focus', onFocusInput);
document.getElementById('inputBusca').addEventListener('focus', onFocusInput);
document.addEventListener('click', onClickOutside);


function filtrar() {
  var input,
      filter,
      ul,
      li,
      a,
      i,
      span,
      txtValue,
      count = 0

  // Puxar Elementos HTML
  input = document.getElementById('nav-input');
  ul = document.getElementById('lista-titulos');

  //Filtro
  filter = input.value.toUpperCase();

  //Puxar Li's
  li = ul.getElementsByTagName("li");

  //Percorre pels Li's
  for (i = 0; i < li.length; i++) {
      //Puxa a Tag A
      a = li[i].getElementsByTagName("a")[0];
      //Puxa os textos da Tag A
      txtValue = a.textContent || a.innerText;
      //Verifica o que o Usuário Digitou
      if (txtValue.toUpperCase().indexOf(filter) > -1) {

          li[i].style.display = "";

          count++

          span = li[i].querySelector(".titulo-name");
  
          if (span) {
              span.innerHTML = txtValue.replace(new RegExp(filter, "gi"), (match) => {
                  return "<strong>" + match + "</strong>";
              })
          }
      } else {
          li[i].style.display = "none";
      }
  }
  
//Verifica se tem Itens na Lista
   if (filter ===""){ 
 ul.style.display = "none";
 } else { 
 ul.style.display = "block";
 }

}

function filtrarPc() {
  var input,
      filter,
      ul,
      li,
      a,
      i,
      span,
      txtValue,
      count = 0

  // Puxar Elementos HTML
  input = document.getElementById('inputBusca');
  ul = document.getElementById('lista-titulos-pc');

  //Filtro
  filter = input.value.toUpperCase();

  //Puxar Li's
  li = ul.getElementsByTagName("li");

  //Percorre pels Li's
  for (i = 0; i < li.length; i++) {
      //Puxa a Tag A
      a = li[i].getElementsByTagName("a")[0];
      //Puxa os textos da Tag A
      txtValue = a.textContent || a.innerText;
      //Verifica o que o Usuário Digitou
      if (txtValue.toUpperCase().indexOf(filter) > -1) {

          li[i].style.display = "";

          count++

          span = li[i].querySelector(".titulo-name");
  
          if (span) {
              span.innerHTML = txtValue.replace(new RegExp(filter, "gi"), (match) => {
                  return "<strong>" + match + "</strong>";
              })
          }
      } else {
          li[i].style.display = "none";
      }
  }
  
//Verifica se tem Itens na Lista
   if (filter ===""){ 
 ul.style.display = "none";
 } else { 
 ul.style.display = "block";
 }

}


