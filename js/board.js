class MemoryBoard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.grid = document.createElement('div');
    this.grid.setAttribute('class', 'grid');

    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', 'css/board.css');

    this.shadowRoot.appendChild(link);
    this.shadowRoot.appendChild(this.grid);
  }

  initBoard(values) {
    while (this.grid.firstChild) {
      this.grid.removeChild(this.grid.firstChild);
    }

    values.forEach((val, index) => {
      const card = document.createElement('button');
      card.setAttribute('class', 'card');
      card.dataset.value = val;
      card.dataset.index = index;
      var cardImg = document.createElement("img");
      cardImg.setAttribute('src', `asset/${val}.png`);
      cardImg.setAttribute('alt', 'card');
      card.appendChild(cardImg);

      card.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('card-click', {
          detail: { index, value: val, element: card },
          bubbles: true,
          composed: true
        }));
      });

      this.grid.appendChild(card);
    });
  }
}
customElements.define('memory-board', MemoryBoard);
