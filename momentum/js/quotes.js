const quotes = [
  {
    quote: "It ain’t over till its over",
    author: "yogi Berra"
  },
  {
    quote: "Stay hungry. Stay foolish",
    author: "Steve Jobs"
  },
  {
    quote: "You go, we go",
    author: "Stephen McCaffrey"
  },
  {
    quote: "I'm your father",
    author: "Darth Vadar"
  },
  {
    quote: "Maybe. But not today.",
    author: "Indiana Jones"
  },
  {
    quote: "You stay alive, no matter what occurs! I will find you!",
    author: "Hawkeye"
  },
  {
    quote: "Keep your friends close and your enemies closer",
    author: "Vito Corleone"
  },
  {
    quote: "everybody ends up where they are.",
    author: "Carlito"
  },
  {
    quote: "Greed, for lack of a better word, is good.",
    author: "Gordon Gekko"
  },
  {
    quote: "Every solution to a problem creates new unsolved problems",
    author: "Karl Popper"
  },
];

const quote = document.querySelector('#quote span:first-child');
const author = document.querySelector('#quote span:last-child');
const todayQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todayQuote.quote;
author.innerText = todayQuote.author;

