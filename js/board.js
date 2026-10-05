class MemoryBoard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.grid = document.createElement('div');
    this.grid.setAttribute('class', 'grid');

    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', '../css/board.css');

    this.shadowRoot.appendChild(link);
    this.shadowRoot.appendChild(this.grid);
  }
}
customElements.define('memory-board', MemoryBoard);
