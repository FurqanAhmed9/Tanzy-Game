import "./App.css";
import React from "react";
import Main from "./conponents/main";
import Die from "./conponents/die";
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

function App() {
  const [dices, setDices] = React.useState(setDiceNum());
  const [tanzies, setTanzies] = React.useState(false);
  const [counter, setCounter] = React.useState(0);
  
  React.useEffect(() => {
    if(tanzies)
    {
     console.log("You Won!");
    }
    setTanzies(()=>dices.every(value => value.isHeld)); 
  },[dices]);

  function setDiceNum() {
    let diceObj = [];

    for (let i = 0; i < 10; i++) {
      diceObj[i] = {
        number: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
      };
    }
    return diceObj;
  }

  function generateNewDie() {
    return { number: Math.floor(Math.random() * 6) + 1, isHeld: false, id:nanoid() };
  }

  function rollDice() {
    setDices((dices) =>
      dices.map(die => {
        return die.isHeld ? die : generateNewDie();
      }));
    setCounter((counter)=>counter+1);
  }

  const handleClick = (id) => {
    setDices((prevdices) =>
      prevdices.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  };

  function handleRestart()
  {
    setDices(setDiceNum());
    setCounter(0);
  }

  const diceElement = dices.map((die) => (
    <Die
      key={die.id}
      value={die.number}
      isHeld={die.isHeld}
      handleClick={() => handleClick(die.id)}
    />
  ));

  return (
    <div className="App">
      {tanzies && <Confetti/>}
      <Main />
      <label className="counter-label">Roll Counter: <input className="counter-input" value={counter} /></label>
      <div className="dices">{diceElement}</div>
      
      {tanzies ?
      <div>
      <h1>You Won!</h1>
      <button className="restart-button" onClick={handleRestart}>
        New Game
      </button>
      </div>
      :
      <button className="roll-button" onClick={rollDice}>
        Roll
      </button>
      }
    </div>
  );
}

export default App;
