const toggleMenuOpen = () => document.body.classList.toggle("open");
const togglePesquisaOpen = () => document.body.classList.toggle("open-pesquisa");
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


let currentMateria = null;
let currentQuestionIndex = 0;
let numCorrect = 0;

function resetSimulado() {
  numCorrect = 0;
  const resultElement = document.getElementById('result');
  resultElement.style.display = 'none';
}

let questions;  // Vamos armazenar as perguntas aqui após carregar do JSON

    // Função para carregar o JSON
    function loadJSON(callback) {
      const xhr = new XMLHttpRequest();
      xhr.overrideMimeType('application/json');
      xhr.open('GET', 'dados_simulados.json', true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          callback(JSON.parse(xhr.responseText));
        }
      };
      xhr.send(null);
    }

    function openSimulado(materia) {
      currentMateria = materia;
      currentQuestionIndex = 0;
      resetSimulado();
    
      loadJSON(function(response) {
        questions = response;
        displayMateriaName(); // Adiciona a exibição do nome da matéria
        displayQuestion();
        document.getElementById('simulado-container').style.display = 'block';
        document.getElementById('progress-bar').style.display = 'block';
    
        const optionsTexts = document.querySelectorAll('#options li');
        optionsTexts.forEach((optionText, index) => {
          // Adiciona evento de clique para o texto
          optionText.addEventListener('click', () => {
            const input = optionText.querySelector('input[type="radio"]');
            if (input) {
              input.click();
            }
          });
    
          // Adiciona evento de clique para o input
          const input = optionText.querySelector('input[type="radio"]');
          input.addEventListener('click', () => {
            input.click();
          });
        });
    
        // Rolar a página para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
    

function displayMateriaName() {
  const materiaNome = questions[currentMateria].materia_nome;
  const materiaNameElement = document.getElementById('materia-name');
  materiaNameElement.textContent = `Matéria: ${materiaNome}`;
}


function displayQuestion() {
  const currentQuestion = questions[currentMateria][currentQuestionIndex];
  const questionElement = document.getElementById('question');
  const optionsElement = document.getElementById('options');
  const questionNumberElement = document.getElementById('question-number');
  const progressBar = document.getElementById('progress-bar');
  const nextButton = document.getElementById('next-button');

  // Verificar se é a última pergunta
  if (currentQuestionIndex === questions[currentMateria].length - 1) {
    nextButton.textContent = 'Verificar Respostas';
  } else {
    nextButton.textContent = 'Próxima Pergunta';
  }

  questionElement.textContent = currentQuestion.question;

  optionsElement.innerHTML = '';

  for (let i = 0; i < currentQuestion.options.length; i++) {
    const li = document.createElement('li');
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'answer';
    input.value = currentQuestion.options[i];
    li.appendChild(input);
    li.appendChild(document.createTextNode(currentQuestion.options[i]));
    optionsElement.appendChild(li);

    // Adiciona evento de clique para o texto
    li.addEventListener('click', () => {
      const input = li.querySelector('input[type="radio"]');
      if (input) {
        input.click();
      }
    });

    // Adiciona evento de clique para o input
    input.addEventListener('click', () => {
      input.click();
    });
  }

  questionNumberElement.textContent = `Pergunta ${currentQuestionIndex + 1} de ${questions[currentMateria].length}`;
  progressBar.value = ((currentQuestionIndex + 1) / questions[currentMateria].length) * 100;
}

function nextQuestion() {
  const userAnswer = document.querySelector('input[name="answer"]:checked');

  if (!userAnswer) {
    alert('Por favor, selecione uma resposta antes de avançar para a próxima pergunta.');
    return;
  }

  if (userAnswer.value === questions[currentMateria][currentQuestionIndex].correctAnswer) {
    numCorrect++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex === questions[currentMateria].length) {
    displayResults();
  } else {
    displayQuestion();
  }
}

function hideGabaritoButton() {
  const gabaritoButton = document.getElementById('buttons-modal');
  gabaritoButton.style.display = 'none';
}

function showGabarito() {
  const modalText = document.getElementById('modal-text');
  modalText.innerHTML += '<br><br><strong>Gabarito:</strong><br>';

  for (let i = 0; i < questions[currentMateria].length; i++) {
    const question = questions[currentMateria][i];
    const respostaCorreta = question.correctAnswer;

    modalText.innerHTML += `<span style="color: #003366;">Pergunta ${i + 1}<br></span> Resposta correta: 
      <span style="color: green;">${respostaCorreta}</span><br>`;
  }

  hideGabaritoButton(); // Oculta o botão "Ver Gabarito"
}

function tryAgain() {
  closeModal(); // Feche o modal
  openSimulado(currentMateria); // Chame a função para tentar o simulado novamente

  const gabaritoButton = document.getElementById('buttons-modal');
  gabaritoButton.style.display = 'inline-block'; // Mostra o botão "Ver Gabarito" novamente
}


function displayResults() {
  const totalQuestions = questions[currentMateria].length;
  const percentage = ((numCorrect / totalQuestions) * 100).toFixed(2);
  let resultText = `
    Você acertou ${numCorrect} pergunta(s) de ${totalQuestions}.<br>
    Porcentagem de acertos: ${percentage}%
  `;

  const modalText = document.getElementById('modal-text');
  const buttonContainer = document.getElementById('modal-buttons');

  // Adiciona a classe de estilo dependendo da porcentagem de acertos
  if (percentage < 50) {
    resultText = `<span style="color: red;">${resultText}</span>`;
    modalText.innerHTML = resultText;
  } else {
    resultText = `<span style="color: green;">${resultText}</span>`;
    modalText.innerHTML = resultText;
  }

  // Adicionando os botões
  buttonContainer.innerHTML = `
    <button id="buttons-modal" onclick="showGabarito()">Ver Gabarito</button>
    <button id="buttons-modal" onclick="tryAgain()">Tente De Novo</button>
  `;

  // Esconder a seção do simulado
  const simuladoContainer = document.getElementById('simulado-container');
  simuladoContainer.style.display = 'none';

  const modal = document.getElementById('modal');
  modal.style.display = 'block';
}



function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';

  // Exibir os cards de matérias
  const cardsSimulado = document.querySelector('.section-menu-simulados');
  cardsSimulado.style.display = 'flex';
}

window.onclick = function(event) {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    modal.style.display = 'none';

    // Exibir os cards de matérias
    const cardsSimulado = document.querySelector('.section-menu-simulados');
    cardsSimulado.style.display = 'flex';
  }
}

const optionsElement = document.getElementById('options');
optionsElement.addEventListener('change', () => {
  const nextButton = document.getElementById('next-button');
  nextButton.disabled = false;
});

