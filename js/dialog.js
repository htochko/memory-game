class ScoreDialog extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.dialog = document.createElement('dialog');
    
    const contentWrapper = document.createElement('div');
    contentWrapper.setAttribute('class', 'content');

    // Ensure it's attached to 'this' so show() can access it
    this.message = document.createElement('p');
    this.message.textContent = 'Game Over! Your final score: 0';

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Play Again';
    closeButton.addEventListener('click', () => {
      this.dialog.close();
      this.dispatchEvent(new CustomEvent('start-game', { bubbles: true, composed: true }));
    });

    contentWrapper.appendChild(this.message);
    contentWrapper.appendChild(closeButton);
    this.dialog.appendChild(contentWrapper);

    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', 'css/dialog.css');

    this.shadowRoot.appendChild(link);
    this.shadowRoot.appendChild(this.dialog);
  }

  show(score) {
    this.message.textContent = `Congratulations! Final Score: ${score}`;
    this.dialog.showModal();
  }
}

customElements.define('score-dialog', ScoreDialog);