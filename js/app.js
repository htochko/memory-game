import './header.js';
import './dialog.js';
import './board.js';

const cardData = ['asset-1', 'asset-2', 'asset-3', 'asset-4', 'asset-5', 'asset-6', 'asset-7', 'asset-8'];

class MemoryGameApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.score = 0;
    this.firstCard = null;
    this.lockBoard = false;
    this.matchedPairs = 0;

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'app-container');

    this.header = document.createElement('memory-header');
    this.board = document.createElement('memory-board');
    this.dialog = document.createElement('score-dialog');

    wrapper.appendChild(this.header);
    wrapper.appendChild(this.board);
    wrapper.appendChild(this.dialog);

    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', 'css/app.css');

    this.shadowRoot.appendChild(link);
    this.shadowRoot.appendChild(wrapper);
    
    // add event listeners
    this.addEventListener('game-start', () => this.startGame());
    this.addEventListener('card-click', (e) => this.handleCardClick(e.detail));

    this.startGame();
  }

  startGame() {
    this.score = 0;
    this.matchedPairs = 0;
    this.firstCard = null;
    this.lockBoard = false;
    this.header.updateScore(this.score);
    const cardValues = [...cardData, ...cardData].sort(() => Math.random() - 0.5);

    this.board.initBoard(cardValues);
  }

  handleCardClick({ index, value, element }) {
    if (this.lockBoard) return;
    if (element === this.firstCard?.element) return;
    if (element.classList.contains('matched') || element.classList.contains('flipped')) return;

    element.classList.add('flipped');

    if (!this.firstCard) {
      this.firstCard = { index, value, element };
      return;
    }

    const secondCard = { index, value, element };
    this.score++;
    this.header.updateScore(this.score);

    if (this.firstCard.value === secondCard.value) {
      this.firstCard.element.classList.add('matched');
      secondCard.element.classList.add('matched');
      this.matchedPairs++;
      this.firstCard = null;

      if (this.matchedPairs === 8) {
        this.dialog.show(this.score);
      }
    } else {
      this.lockBoard = true;
      const cachedFirst = this.firstCard.element;
      const cachedSecond = secondCard.element;

      setTimeout(() => {
        cachedFirst.classList.remove('flipped');
        cachedSecond.classList.remove('flipped');
        this.firstCard = null;
        this.lockBoard = false;
      }, 750);
    }
  }
}

customElements.define('memory-game-app', MemoryGameApp);

document.addEventListener('DOMContentLoaded', () => {
  const app = document.createElement('memory-game-app');
  document.body.appendChild(app);
});
