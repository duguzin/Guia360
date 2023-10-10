
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




let currentMateria = null;
let currentQuestionIndex = 0;
let numCorrect = 0;

function resetSimulado() {
  numCorrect = 0;
  const resultElement = document.getElementById('result');
  resultElement.style.display = 'none';
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function shuffleQuestionsAndAnswers(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    // Embaralhe as perguntas
    [array[i], array[j]] = [array[j], array[i]];

    // Embaralhe as respostas para cada pergunta
    array[i].options = shuffleArray(array[i].options);
  }
  return array;
}

let questions;  // Vamos armazenar as perguntas aqui após carregar do JSON

    // Função para carregar o JSON
    function loadJSON(callback) {
      const xhr = new XMLHttpRequest();
      xhr.overrideMimeType('application/json');
      xhr.open('GET', 'dados_simulados_enem.json', true);
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
        // Embaralhe as perguntas e suas respostas para a matéria atual
        questions[currentMateria] = shuffleQuestionsAndAnswers(questions[currentMateria]);


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
    const perguntasMateria = question.question

    modalText.innerHTML += `<span style="color: #003366;">${i + 1} - ${perguntasMateria}<br></span> Resposta correta: 
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

