'use strict'

/*
window.addEventListener('load', ()=> {
  const btnFetch = document.querySelector('#btn-fetch');

  btnFetch.onclick = () => {
    fetch('css').then(function (response) {
      response.text().then(function (text) {
        // alert(text);
        document.querySelector('article').innerHTML = text;
      })
    })
  }
});
*/



window.addEventListener('load', () => {
  const info = ['html', 'css', 'js'];
  const olNode = document.querySelector('ol');
  const aNodes = olNode.querySelectorAll('a');

  function fetchData(name) {
    const article = document.querySelector('article');
  
    console.log(name);
    fetch(name).then((response) => {
      response.text().then((text) => {
        article.innerHTML = text;
      })
    });
  }

  fetchData(info[0]);

  for (let i = 0; i < aNodes.length; ++i) {
    aNodes[i].onclick = () => {
      fetchData(info[i]);
    }
  }

  console.log(aNodes);

});