// Write your code here.
import './index.css'

const WinOrLoseCard = props => {
  const {isWon, score, onClickPlayAgain} = props
  const imgUrl = isWon
    ? 'https://assets.ccbp.in/frontend/react-js/won-game-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/lose-game-img.png'

  const gameStatus = isWon ? 'You Won' : 'You Lose'
  const scoreLabel = isWon ? 'Best Score' : 'Score'
  return (
    <div className="win-lose-container">
      <div className="score-container">
        <h1 className="game-status">{gameStatus}</h1>
        <p className="your-score-status">{scoreLabel}</p>
        <p className="your-score">{score}/12</p>
        <button
          className="play-again-btn"
          type="button"
          onClick={onClickPlayAgain}
        >
          Play Again
        </button>
      </div>
      <div className="image-container">
        <img src={imgUrl} className="win-lose-image" alt="win or lose" />
      </div>
    </div>
  )
}

export default WinOrLoseCard
