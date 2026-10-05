import './header.js';
import './dialog.js';
import './board.js';

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
    link.setAttribute('href', '../css/app.css');

    this.shadowRoot.appendChild(link);
    this.shadowRoot.appendChild(wrapper);
  }
}
customElements.define('memory-game-app', MemoryGameApp);

document.addEventListener('DOMContentLoaded', () => {
  const app = document.createElement('memory-game-app');
  document.body.appendChild(app);
});
