const toggleMenuOpen = () => document.body.classList.toggle("open");
const togglePesquisaOpen = () => document.body.classList.toggle("open-pesquisa");


fetch('api.json')
.then(res => res.json())
.then((json) => {
    console.log(json);
    const ul = document.getElementById('lista-titulos');
    const ulPc = document.getElementById('lista-titulos-pc');
    json.forEach((titulo) => {
        const lista = `
        <a href="#">
         <img width="50"
            src="${titulo.image}">
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

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    document.getElementById("btnVoltarTopo").classList.add("show");
  } else {
    document.getElementById("btnVoltarTopo").classList.remove("show");
  }
}

function voltarAoTopo() {
  document.body.scrollTop = 0; // Para navegadores que suportam o scrollTop
  document.documentElement.scrollTop = 0; // Para navegadores modernos
}


  
  
  
  
  
  