class MemoryHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const header = document.createElement('header');
    header.setAttribute('class', 'header');

    this.startButton = document.createElement('button');
    this.startButton.textContent = 'Start';
    this.startButton.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('game-start', { bubbles: true, composed: true }));
    });

    this.scoreDisplay = document.createElement('div');
    this.scoreDisplay.setAttribute('class', 'score');
    this.scoreDisplay.textContent = 'Score: 0';

    header.appendChild(this.startButton);
    header.appendChild(this.scoreDisplay);

    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', './css/header.css');

    this.shadowRoot.appendChild(link);
    this.shadowRoot.appendChild(header);
  }

  updateScore(score) {
    this.scoreDisplay.textContent = `Score: ${score}`;
  }
}
customElements.define('memory-header', MemoryHeader);
