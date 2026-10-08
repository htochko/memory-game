class ScoreDialog extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.dialog = document.createElement('dialog');
    // add cross

    this.contentWrapper = document.createElement('div');
    this.contentWrapper.setAttribute('class', 'content');

    this.actionsWrapper = document.createElement('div');
    this.actionsWrapper.setAttribute('class', 'actions');
    
    this.closeButton = document.createElement('button');
    this.closeButton.setAttribute('class', 'secondary');
    this.closeButton.textContent = 'Close';
    this.closeButton.addEventListener('click', () => {
    this.dialog.close();
  });

    this.playButton = document.createElement('button');
    this.playButton.textContent = 'Play Again';
    this.playButton.addEventListener('click', () => {
    this.dialog.close();
    this.dispatchEvent(new CustomEvent('game-start', { bubbles: true, composed: true }));
  });

  this.actionsWrapper.appendChild(this.closeButton);
  this.actionsWrapper.appendChild(this.playButton);

  this.dialog.appendChild(this.contentWrapper);
  this.dialog.appendChild(this.actionsWrapper);

  const link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', 'css/dialog.css');

  this.shadowRoot.appendChild(link);
  this.shadowRoot.appendChild(this.dialog);
}

clearContent() {
  while (this.contentWrapper.firstChild) {
    this.contentWrapper.removeChild(this.contentWrapper.firstChild);
  }
}

show(title, contentData) {
  this.clearContent();

  switch (title) {
    case 'end':
      this.playButton.style.display = 'inline-block';
      const message = document.createElement('p');
      message.textContent = `Congratulations! Final Score: ${contentData}`;
      this.contentWrapper.appendChild(message);
      break;
    case 'leaderboard':
      this.playButton.style.display = 'none';
      title = document.createElement('h2');
      title.textContent = 'Leaderboard';
      this.contentWrapper.appendChild(title);
      
      const list = document.createElement('ul');
      if (contentData.length === 0) {
        const item = document.createElement('li');
        item.textContent = 'No scores recorded yet!';
        list.appendChild(item);
      } else {
        contentData.forEach((entry, idx) => {
          const item = document.createElement('li');
          item.textContent = `${idx + 1}. Score: ${entry.score} (${entry.date})`;
          list.appendChild(item);
        });
      }
      this.contentWrapper.appendChild(list);
      break;
  }

  this.dialog.showModal();
  }
}

customElements.define('score-dialog', ScoreDialog);