import axios from 'axios'
import React from 'react'
import ComputerCard from './game/ComputerCard'
import PlayerCard from './game/PlayerCard'
import Spinner from './Spinner'

function randomIndexes(length) {
  const array = []
  while (array.length < 3) {
    const index = Math.floor(Math.random() * length)
    if (!array.includes(index)) array.push(index)
  }
  return array
}

function calculateRandomCard(array, superHeros) {
  const newNumber = false
  while (!newNumber) {
    const number = Math.floor(Math.random() * superHeros.length)
    if (!array.includes(number)) return number
  }
}

function claculateWinner(player, computer) {
  if (player === computer) return 'Draw'
  else if (player > computer) return 'Win'
  else return 'Lose'
}

function SuperHeroGame() {
  const [superHeros, setSuperHeros] = React.useState(null)
  const [randomCardIndex, setRandomCardIndex] = React.useState([])
  const [randomIndex, setRandomIndex] = React.useState(null)
  const [gameStarted, setGameStarted] = React.useState(false)
  const [selection, setSelection] = React.useState(null)
  const [winner, setWinner] = React.useState(null)
  const [count, setCount] = React.useState(0)
  const [gameOver, setGameOver] = React.useState(false)

  const cardsAdded = (randomCardIndex.length > 0)

  if (randomCardIndex && !randomIndex && superHeros) {
    setRandomIndex(calculateRandomCard(randomCardIndex, superHeros))
  }

  if (selection && gameStarted && !winner) {
    setWinner(claculateWinner(superHeros[randomCardIndex[randomCardIndex.length - 1]].powerstats[selection], superHeros[randomIndex].powerstats[selection]))
  }
  const remainingCards = []

  if (randomCardIndex) {
    let indexcount = 0
    while (remainingCards.length < randomCardIndex.length - 1) {
      remainingCards.push(superHeros[randomCardIndex[indexcount]])
      indexcount++
    }
  }
  if (!localStorage.getItem('highscore')) localStorage.setItem('highscore', 0)
  const highscore = localStorage.getItem('highscore')

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('https://akabab.github.io/superhero-api/api/all.json')
        setSuperHeros(response.data)
        setRandomCardIndex(randomIndexes(response.data.length))
      } catch (error) {
        console.log(error)
      }
    }
    setTimeout(getData, 1000)
  }, [])

  const handleNewCard = () => {
    if (winner === 'Lose') {
      randomCardIndex.pop()
      if (randomCardIndex.length === 0) {
        setGameOver(true)
        if (count > highscore) {
          localStorage.setItem('highscore', count)
        }
      }
      setRandomCardIndex(randomCardIndex)
    } else if (winner === 'Win') {
      setCount(count + 1)
    }
    if (winner !== 'Lose' && superHeros[randomCardIndex[randomCardIndex.length - 1]].powerstats[selection] === 100 && randomCardIndex.length !== 0) {
      randomCardIndex[randomCardIndex.length - 1] = calculateRandomCard(randomCardIndex, superHeros)
      setRandomCardIndex(randomCardIndex)
    }
    setRandomIndex(calculateRandomCard(randomCardIndex, superHeros))
    setSelection(null)
    setWinner(null)
  }

  const handlePlayAgain = () => {
    setGameStarted(false)
    setRandomCardIndex(randomIndexes(superHeros.length))
    setSelection(false)
    setCount(0)
    setGameOver(false)
  }

  return (
    <div className='content'>
      {superHeros && cardsAdded ?
        <div className='gameMain'>
          <div className='cardsToCompare'>
            {!gameOver && <div className='playerCard'><PlayerCard {...superHeros[randomCardIndex[randomCardIndex.length - 1]]} setSelection={setSelection} setGameStarted={setGameStarted} selection={selection} /></div>}

            <div className='whoWin'>
              <>
                {!gameStarted &&
                  <div className='instuctions'>
                    <p > Select which stat you think is higher than the other card.<br /><br />You are given three random cards to see how far you can go.<br /> <br />If you select a stat that is 100 your card will be replaced so it isn&apos;t too easy.</p>
                  </div>}
              </>
              {selection && !gameOver &&
                <div className='winText'>
                  <h3 className='resultText'>{winner}</h3>
                  <hr />
                  <h4>{selection[0].toUpperCase() + selection.slice(1)}</h4>
                  <p>{superHeros[randomCardIndex[randomCardIndex.length - 1]].powerstats[selection]} VS {superHeros[randomIndex].powerstats[selection]}</p>
                  <button onClick={handleNewCard}>Next Card</button>
                </div>
              }
              <div className='results'>
                <ul>
                  <li className='scores'>Current Score: {count}</li>
                  <li className='scores'>High Score: {highscore}</li>
                </ul>
              </div>
              <div className='remaining'>
                <h4>Remaining Cards:</h4>
                <ul>
                  {remainingCards.map(hero => {
                    return <li key={hero.id}><span>{hero.name}:</span><img src={hero.images.xs} alt={hero.name} /></li>
                  })}
                </ul>
              </div>
            </div>

            {!gameOver && <div className='computerCard'><ComputerCard {...superHeros[randomIndex]} selection={selection} /></div>}
          </div>
        </div>
        : <>
          { !gameOver && <Spinner /> }
          {gameOver && <div className='gameOver'>
            <h3 className= "animate__animated animate__bounce">Game Over!</h3>
            <p className= "animate__animated animate__bounce">Final Score: {count}</p>
            <button onClick={handlePlayAgain} className= "animate__animated animate__bounce">Play Again?</button>
          </div>}
        </>
      }
    </div >
  )

}

export default SuperHeroGame