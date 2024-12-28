/* 
Quick Tip 

- Use the below function in the EmojiGame Component to shuffle the emojisList every time when an emoji is clicked.

const shuffledEmojisList = () => {
  const {emojisList} = this.props
  return emojisList.sort(() => Math.random() - 0.5)
}

*/

// Write your code here.
import {Component} from 'react'

import NavBar from '../NavBar'
import EmojiCard from '../EmojiCard'
import WinOrLoseCard from '../WinOrLoseCard'

import './index.css'

class EmojiGame extends Component {
  state = {
    clickedEmojisList: [],
    isGameInProgress: true,
    topScore: 0,
  }

  resetGame = () => {
    this.setState({clickedEmojisList: [], isGameInProgress: true})
  }

  renderScoreCard = () => {
    const {emojisList} = this.props
    const {clickedEmojisList} = this.state
    const isWon = clickedEmojisList.length === emojisList.length
    return (
      <WinOrLoseCard
        isWon={isWon}
        score={clickedEmojisList.length}
        onClickPlayAgain={this.resetGame}
      />
    )
  }

  finishGameAndTopScore = currentScore => {
    const {topScore} = this.state
    let newTopScore = topScore
    if (currentScore > newTopScore) {
      newTopScore = currentScore
    }
    this.setState({topScore: newTopScore, isGameInProgress: false})
  }

  clickEmoji = id => {
    const {emojisList} = this.props
    const {clickedEmojisList} = this.state
    const isEmojiClicked = clickedEmojisList.includes(id)
    const clickedEmojiLength = clickedEmojisList.length

    if (isEmojiClicked) {
      this.finishGameAndTopScore(clickedEmojiLength)
    } else {
      if (clickedEmojiLength === emojisList.length - 1) {
        this.finishGameAndTopScore(emojisList.length)
      }
      this.setState(prevState => ({
        clickedEmojisList: [...prevState.clickedEmojisList, id],
      }))
    }
  }

  getShuffledEmojisList = () => {
    const {emojisList} = this.props
    return emojisList.sort(() => Math.random() - 0.5)
  }

  renderEmojiLists = () => {
    const shuffledEmojisList = this.getShuffledEmojisList()

    return (
      <ul className="emoji-lists">
        {shuffledEmojisList.map(eachEmoji => (
          <EmojiCard
            key={eachEmoji.id}
            emojiDetails={eachEmoji}
            clickEmoji={this.clickEmoji}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {clickedEmojisList, isGameInProgress, topScore} = this.state
    return (
      <div className="emoji-game-container">
        <NavBar
          topScore={topScore}
          isGameInProgress={isGameInProgress}
          currentScore={clickedEmojisList.length}
        />
        <div className="emoji-body-container">
          {isGameInProgress ? this.renderEmojiLists() : this.renderScoreCard()}
        </div>
      </div>
    )
  }
}

export default EmojiGame
