'use strict'

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
