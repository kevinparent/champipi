class ChampipiNav extends HTMLElement {
  connectedCallback() {
    const page = location.pathname.split('/').pop().split('.')[0];
    this.innerHTML = `
      <style>
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 75px;
          background-color: #F5F3E7;
          display: flex;
          justify-content: space-around;
          align-items: center;
          box-shadow: 0 -2px 8px rgba(0,0,0,0.1);
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
          z-index: 999;
        }
        .nav-item {
          color: #3F6634;
          font-size: 1.2rem;
          text-align: center;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          font-weight: bold;
        }
        .nav-item span {
          font-size: 0.7rem;
        }
        .nav-item.active {
          color: #88B378;
        }
      </style>
      <nav class="bottom-nav">
        <a href="index.html" class="nav-item ${page === 'index' ? 'active' : ''}" data-page="index">🏠<span>Acceuil</span></a>
        <a href="recherche.html" class="nav-item ${page === 'identification' ? 'active' : ''}" data-page="identification">🔍<span>Recherche</span></a>
        <a href="observations.html" class="nav-item ${page === 'observations' ? 'active' : ''}" data-page="observations">🗺️<span>Observations</span></a>
        <a href="favoris.html" class="nav-item ${page === 'favoris' ? 'active' : ''}" data-page="favoris">⭐<span>Favoris</span></a>
        <a href="aide.html" class="nav-item ${page === 'aide' ? 'active' : ''}" data-page="aide">❓<span>Aide</span></a>
        <a href="synonymes.html" class="nav-item ${page === 'synonymes' ? 'active' : ''}" data-page="synonymes">🔄<span>Synonymes</span></a>
      </nav>
    `;
  }
}

customElements.define('champipi-nav', ChampipiNav);