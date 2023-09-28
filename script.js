const toggleMenuOpen = () => document.body.classList.toggle("open");
const togglePesquisaOpen = () => document.body.classList.toggle("open-pesquisa");
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-button');
const resultElement = document.getElementById('result');
const questionNumberElement = document.getElementById('question-number');
const progressBar = document.getElementById('progress-bar');
const questions = [
  {
    question: "Qual é a capital do Brasil?",
    options: ["Brasília", "Rio de Janeiro", "São Paulo", "Belo Horizonte"],
    correctAnswer: "Brasília"
  },
  {
    question: "Qual é a capital da França?",
    options: ["Madri", "Paris", "Londres", "Berlim"],
    correctAnswer: "Paris"
  },
  {
    question: "Quanto é 1+1?",
    options: ["10000", "100000000", "2", "7"],
    correctAnswer: "2"
  },
  {
    question: "Qual é a capital do Japão?",
    options: ["Seul", "Pequim", "Tóquio", "Bangcoc"],
    correctAnswer: "Tóquio"
  }
];


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

let currentQuestionIndex = 0;
let numCorrect = 0;

function displayQuestion() {
  // Verificar se é a última pergunta
  if (currentQuestionIndex === questions.length - 1) {
    nextButton.textContent = 'Verificar Respostas';
  } else {
    nextButton.textContent = 'Próxima Pergunta';
  }

  const currentQuestion = questions[currentQuestionIndex];
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
  }

  questionNumberElement.textContent = `Pergunta ${currentQuestionIndex + 1} de ${questions.length}`;
  progressBar.value = ((currentQuestionIndex + 1) / questions.length) * 100;
}


function nextQuestion() {
  const userAnswer = document.querySelector('input[name="answer"]:checked');

  if (!userAnswer) {
    alert('Por favor, selecione uma resposta antes de avançar para a próxima pergunta.');
    return;
  }

  if (userAnswer.value === questions[currentQuestionIndex].correctAnswer) {
    numCorrect++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    displayResults();
  } else {
    displayQuestion();
  }
}


function displayResults() {
  const percentage = ((numCorrect / questions.length) * 100).toFixed(2);
  const resultText = `
    Você acertou ${numCorrect} pergunta(s) de ${questions.length}.<br>
    Porcentagem de acertos: ${percentage}%
  `;

  resultElement.innerHTML = resultText;

  if (numCorrect / questions.length >= 0.5) {
    resultElement.style.color = 'green';
  } else {
    resultElement.style.color = 'red';
  }
}


optionsElement.addEventListener('change', () => {
  nextButton.disabled = false;
});



// Mostrar a primeira pergunta quando a página carregar
displayQuestion();


  
  
  
  
  
  