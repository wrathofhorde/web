'use strict'

window.addEventListener('load', () => {
  const bodyNode = document.querySelector('body');
  const aNodes = bodyNode.querySelectorAll('a');
  const article = document.querySelector('article');

  (function () {
    fetch('data_list').then((response)=>{
      response.text().then((text) => {
        const words = text.split(',');
        const olNode = document.querySelector('ol');
        const template = document.querySelector('template');

        olNode.innerHTML = '';

        for (let i = 0; i < words.length; ++i) {
          console.log(words[i]);
          let li = template.content.cloneNode(true);
          let a = li.querySelector('a');
          a.href = `#!${words[i].toLowerCase()}`;
          a.innerText = words[i];
          a.onclick = () => {
            fetchData(words[i].toLowerCase());
          }
          olNode.appendChild(li);
        }
      })
    });
  }());

  function fetchData(name) {
    fetch(`data_${name}`).then((response) => {
      response.text().then((text) => {
        article.innerHTML = text;
      })
    });
  }

  let title = document.querySelector('h3>a');
  title.onclick = () => {
    fetchData("welcome");
  }

  const hash = document.location.hash;
  if (hash) {
    fetchData(hash.substr(2));
  } else {
    fetchData("welcome");
  }

});