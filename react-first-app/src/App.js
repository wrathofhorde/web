import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <h1>Coins! ({coins.length})</h1>
      {loading ? <strong>Loading...</strong> : null}
      <ul>
        {coins.map((coin, index) => (
          <li key={index}>
            {coin.name} ({coin.symbol}): ${coin.quotes.USD.price}
          </li>
        ))}
      </ul>
    </div>
  );
  // const [toDo, settoDo] = useState("");
  // const [toDos, settoDos] = useState([]);
  // const onSubmit = (event) => {
  //   event.preventDefault();
  //   if (toDo.length === 0) return;
  //   settoDos((current) => [toDo, ...current]);
  //   settoDo("");
  // };
  // const onChange = (event) => settoDo(event.target.value);
  // return (
  //   <div className="App">
  //     <h1>My ToDo! ({toDos.length})</h1>
  //     <form onSubmit={onSubmit}>
  //       <input
  //         onChange={onChange}
  //         type="text"
  //         placeholder="Write a todo"
  //         value={toDo}
  //       />
  //       <button>Add</button>
  //     </form>
  //     <hr />
  //     <ul>
  //       {toDos.map((item, index) => (
  //         <li key={index}>{item}</li>
  //       ))}
  //     </ul>
  //   </div>
  // );
}

export default App;
