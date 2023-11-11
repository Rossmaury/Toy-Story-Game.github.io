import React, { Component } from "react";
import "./App.css";

const characters = [
  "Buzz Lightyear",
  "Woody",
  "Jessie",
  "Rex",
  "Bo Peep",
  "Slink",
  "Hamm",
  "Aliens",
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      cards: this.shuffleCards([...characters, ...characters]),
      flippedIndices: [],
      matchedPairs: [],
      moves: 0,
      gameStarted: false,
      gameFinished: false,
      timer: 0,
    };
  }

  shuffleCards(array) {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  handleCardClick(index) {
    if (!this.state.gameStarted) {
      this.startGame();
    }

    if (this.state.flippedIndices.length === 2 || this.state.matchedPairs.includes(this.state.cards[index])) {
      return;
    }

    const flippedIndices = [...this.state.flippedIndices, index];
    const moves = this.state.moves + 1;
    this.setState({ flippedIndices, moves });

    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      if (this.state.cards[firstIndex] === this.state.cards[secondIndex]) {
        this.setState({
          matchedPairs: [...this.state.matchedPairs, this.state.cards[firstIndex]],
          flippedIndices: [],
        });
        if (this.state.matchedPairs.length === characters.length) {
          this.finishGame();
        }
      } else {
        setTimeout(() => {
          this.setState({ flippedIndices: [] });
        }, 1000);
      }
    }
  }

  startGame() {
    this.setState({ gameStarted: true });
    this.timer = setInterval(() => {
      this.setState({ timer: this.state.timer + 1 });
    }, 1000);
  }

  finishGame() {
    clearInterval(this.timer);
    this.setState({ gameFinished: true });
  }

  render() {
    const cards = this.state.cards.map((character, index) => {
      const isFlipped = this.state.flippedIndices.includes(index) || this.state.matchedPairs.includes(character);
      const isMatched = this.state.matchedPairs.includes(character);

      return (
        <div
          key={index}
          onClick={() => this.handleCardClick(index)}
          className={`card ${isFlipped ? "flipped" : ""} ${isMatched ? "matched" : ""}`}
        >
          <div className="card-inner">
            <div className={`card-front ${isFlipped ? "hidden" : ""}`}>Toy Story</div>
            <div className={`card-back ${isFlipped ? "" : "hidden"} ${isMatched ? "matched" : ""}`}>{character}</div>
          </div>
        </div>
      );
    });

    return (
      <div className="memory-game">
        <h1>Toy Story Memory Game</h1>
        <div className="game-info">
          <div>Moves: {this.state.moves}</div>
          <div>Timer: {this.state.timer} seconds</div>
        </div>
        <div className="card-container">{cards}</div>
        {this.state.gameFinished && <div className="game-over">Game Over!</div>}
      </div>
    );
  }
}

export default App;

