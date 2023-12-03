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

            
function filtrarPc(event) {
  var input = document.getElementById('inputBusca');
  var searchTerm = input.value.trim();

  // Verifica se o evento e a tecla Enter (código 13) estão disponíveis
  if (event && event.key === 'Enter' && searchTerm !== "") {
    // Redireciona para a página busca.html com o termo de pesquisa como parâmetro
    window.location.href = "busca.html?search=" + encodeURIComponent(searchTerm);
  }
}

function filtrar(event) {
  var input = document.getElementById('nav-input');
  var searchTerm = input.value.trim();

  // Verifica se o evento e a tecla Enter (código 13) estão disponíveis
  if (event && event.key === 'Enter' && searchTerm !== "") {
    // Redireciona para a página busca.html com o termo de pesquisa como parâmetro
    window.location.href = "busca.html?search=" + encodeURIComponent(searchTerm);
  }
}

function filtrarResul(event) {
  var input = document.getElementById('input-resultados');
  var searchTerm = input.value.trim();

  // Verifica se o evento e a tecla Enter (código 13) estão disponíveis
  if (event && event.key === 'Enter' && searchTerm !== "") {
    // Redireciona para a página busca.html com o termo de pesquisa como parâmetro
    window.location.href = "busca.html?search=" + encodeURIComponent(searchTerm);
  }
}

function mostrarBotao() {
  var inputResul = document.getElementById('input-resultados');
  var botaoLimparResul = document.getElementById('limpar-resultados');
  var input = document.getElementById('inputBusca');
  var botaoLimpar = document.getElementById('limpar');

  // Mostra o botão de limpar se o input não estiver vazio
  botaoLimparResul.style.display = inputResul.value.length > 0 ? 'inline-block' : 'none';
  botaoLimpar.style.display = input.value.length > 0 ? 'inline-block' : 'none';
}

function limparInput() {
  var inputResul = document.getElementById('input-resultados');
  var botaoLimparResul = document.getElementById('limpar-resultados');
  var input = document.getElementById('inputBusca');
  var botaoLimpar = document.getElementById('limpar');

  // Limpa o input e esconde o botão de limpar
  inputResul.value = '';
  botaoLimparResul.style.display = 'none';
  input.value = '';
  botaoLimpar.style.display = 'none';
}
  
  

  

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});
