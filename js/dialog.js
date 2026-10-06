class ScoreDialog extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.dialog = document.createElement('div');
  
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', './css/dialog.css');

    this.shadowRoot.appendChild(link);
    this.shadowRoot.appendChild(this.dialog);
  }

  show(score) {
    this.message.textContent = `Congratulations! Final Score: ${score}`;
    this.dialog.showModal();
  }
}
customElements.define('score-dialog', ScoreDialog);
