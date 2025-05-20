class ObservationModal extends HTMLElement {
    
  connectedCallback() {
    const champignons = (window.champiData || []).map(item => item["list champi"]).sort();
    const options = champignons.map(nom => `<option value="${nom}">${nom}</option>`).join('');

    const dateNow = new Date().toISOString().split('T')[0];
    this.innerHTML = `
      <style>
        .modal-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal {
          background: white;
          border-radius: 15px;
          padding: 1.5rem;
          width: 90%;
          max-width: 400px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          position: relative;
        }
        .modal h2 {
          margin-top: 0;
        }
        .modal input,
        .modal textarea {
          width: 100%;
          padding: 0.6rem;
          margin-bottom: 1rem;
          border-radius: 10px;
          border: 1px solid #ccc;
          font-family: inherit;
        }
        .modal button {
          padding: 0.6rem 1.2rem;
          border-radius: 25px;
          border: none;
          background-color: #88B378;
          color: white;
          font-weight: bold;
          cursor: pointer;
        }
        .modal .close {
          position: absolute;
          top: 10px;
          right: 15px;
          font-size: 1.4rem;
          background: none;
          border: none;
          cursor: pointer;
        }
      </style>
      <div class="modal-backdrop">
        <div class="modal">
          <button class="close" title="Fermer">&times;</button>
          <h2>Ajouter une observation</h2>
          <label for="champignon">Choisir le champignon observé</label>
          <select id="champignon" required>            
            ${options}
          </select>
          <label for="date>Choisir une date d'observation</label>
          <input type="date" id="date" />
          <input type="text" id="localisation" placeholder="Localisation" disabled />
          <textarea id="note" rows="3" placeholder="Note optionnelle..."></textarea>
          <button id="valider">Valider</button>
        </div>
      </div>
    `;

    this.querySelector('.close').addEventListener('click', () => this.remove());
    this.querySelector('#valider').addEventListener('click', () => this.submit());
    this.querySelector('#date').value = dateNow;

    // Détection automatique de la position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const loc = `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
        this.querySelector('#localisation').value = loc;
      }, err => {
        this.querySelector('#localisation').value = 'Localisation indisponible';
      });
    }
  }

  submit() {
    const champignon = this.querySelector('#champignon').value;
    const date = this.querySelector('#date').value;
    const localisation = this.querySelector('#localisation').value;
    const note = this.querySelector('#note').value;

    const observation = { champignon, date, localisation, note };
    this.dispatchEvent(new CustomEvent('observation-ajoutee', {
      detail: observation,
      bubbles: true
    }));
    this.remove();
  }
}

customElements.define('observation-modal', ObservationModal);
