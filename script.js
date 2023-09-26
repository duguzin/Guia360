const toggleMenuOpen = () => document.body.classList.toggle("open");

function pesquisarPalavra() {
    const palavraPesquisada = document.getElementById('input-postagens').value.toLowerCase();
    const elementosTexto = document.querySelectorAll('*:not(script):not(style)');
  
    let palavraEncontrada = false;
  
    for (const elemento of elementosTexto) {
      const conteudo = elemento.textContent.toLowerCase();
      if (conteudo.includes(palavraPesquisada)) {
        // Encontrou a palavra, então rola suavemente até o elemento
        elemento.scrollIntoView({ behavior: 'smooth', block: 'center' });
        palavraEncontrada = true;
        break;
      }
    }
  
    if (!palavraEncontrada) {
      // Se a palavra não foi encontrada, exibe um alerta
      alert('Palavra não encontrada.');
    }
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const btnPesquisar = document.getElementById('btn-pesquisar');
    const inputPesquisa = document.getElementById('input-postagens');
  
    btnPesquisar.addEventListener('click', pesquisarPalavra);
    inputPesquisa.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        pesquisarPalavra();
      }
    });
  });
  
  
  
  
  
  