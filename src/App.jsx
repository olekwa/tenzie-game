import { useState, useRef, useEffect } from "react"
import Die from "./Die"
import { nanoid } from "nanoid";
import confetti from "canvas-confetti";


function App() {
const [dice, setDice] = useState(() => generateAllNewDice())
const buttonRef = useRef(null)


const gameWon = dice.every(die => die.isHeld) && 
    dice.every(die => die.value === dice[0].value)

  useEffect(() => {
    if (gameWon) {
      confetti({
        particleCount: 600,
        spread: 100,
        origin: { y: 0.6 },
    })

    setTimeout(() => {
      buttonRef.current?.focus()
    }, 0)
    }
  }, [gameWon])


function generateAllNewDice(){
  return new Array(10)
    .fill(0)
    .map(() => ({
      value: Math.ceil(Math.random() * 6), 
      isHeld: false,
      id: nanoid()
    }))
}


function holdDice(id){
  setDice(oldDice => oldDice.map(die => {
    return die.id === id ?
    {...die, isHeld: !die.isHeld} :
    die
  }))
}

function rollDice() {
  if (!gameWon) {
    setDice(oldDice => oldDice.map(die =>
      die.isHeld ?
        die :
        { ...die, value: Math.ceil(Math.random() * 6) }
    ))
  } else {
      setDice(generateAllNewDice())
  }
}

const diceElements = dice.map(dieObj => (
  <Die 
    key={dieObj.id} 
    value={dieObj.value}
    isHeld={dieObj.isHeld}
    hold={() => holdDice(dieObj.id)}
    />)
  )


  return ( 
    <main className="game-box">
      {/* {gameWon && <Confetti />} */}
      <div aria-live="polite" className="congrats-message">
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
      <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button onClick={rollDice} className="roll-dice">
        {gameWon ? 'New Game' : 'Roll'}
      </button>
    </main>
  );
}

export default App;