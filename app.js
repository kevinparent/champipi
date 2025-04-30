// Init Variables
let ignorerRecherche = false;
const filtres = [];
tousLesChampignons = [];
criteresRecherches = [];

// Elements HTML
const critereSelect = document.getElementById('criteria');
const valeurRecherche = document.getElementById('searchField');
const boutonRecherche = document.getElementById('searchButton');
const criteriaList = document.getElementById('criteriaList');
const criteriaContainer = document.getElementById('filtresActifs');
const resetButton = document.getElementById('clearButton');

// Event Listeners
boutonRecherche.addEventListener('click', () => {miseAJourCritere(); });
resetButton.addEventListener('click', () => {
  ignorerRecherche = true;  // Ignorer la recherche lors de la réinitialisation
  Object.keys(criteresRecherches).forEach(k => delete criteresRecherches[k]);  
  miseAJourCritere() // Recharger les données sans filtres
  setTimeout(() => {
    ignorerRecherche = false;  // Réinitialiser le flag après un court délai
  }, 100);
});



function remplirMenuCritere(champignons) {
  const select = document.getElementById('criteria');
  const criteres = new Map();

  champignons.forEach(champi => {
    champi.description.forEach(desc => {
      criteres.set(Object.keys(desc)[0], desc["description-name"], );  // Ajouter le critère à l'ensemble
    });
  });

  const criteresArray = Array.from(criteres).sort();

  criteresArray.forEach(critere => {
    const option = document.createElement('option');
    option.value = critere[0];
    option.textContent = critere[1];
    select.appendChild(option);
  });
}



function afficherChampignon(champignon) {
  const li = document.createElement('li');

      // Map pour parcourir les descriptions
      let descriptionItems = "";
      
      champignon.description.forEach(desc => {
        // Récupérer la clé dynamique de description
        const descriptionName = desc['description-name'];
        // Accéder à la valeur en utilisant la clé dynamique
        const descriptionValue = desc[Object.keys(desc)[0]];

        const critereCorrespondant = Object.values(criteresRecherches).find(critere => critere.critere === Object.keys(desc)[0]);

        const contenuText = critereCorrespondant
              ? surlignerMotsProches(descriptionValue, critereCorrespondant.termes) 
              : descriptionValue;  // Vérifier si le critère correspond à la description

        if (critereCorrespondant != undefined) {
          descriptionItems += `<li><strong>${descriptionName} :</strong> ${contenuText}</li>`;
        }
        
      });

      li.innerHTML = `
        <h3>${champignon["list champi"]}</h3>
        <p><strong>Titre :</strong> ${champignon.champiTitre}</p>   
      `;

      if (descriptionItems != "") {
        li.innerHTML += `
        <p><strong>Descriptions :</strong></p>  
        <ul>
          ${descriptionItems}
        </ul>`
      }
      return li;
}

function surlignerMotsProches(texte, termeRecherche) {
  const mots = texte.split(/(\W+)/); // préserve ponctuation et séparateurs

  return mots
    .map(mot => {
      const motMin = mot.toLowerCase();
      const isProche = termeRecherche.some(ter => {
        return distanceLevenshtein(motMin, ter.toLowerCase()) <= getTolerance(ter.length);
      });
      return isProche ? `<strong>${mot}</strong>` : mot;
    })
    .join('');
}


function miseAJourCritere() {
  if (!ignorerRecherche) {
    const cle = critereSelect.value;
    const termeRech = valeurRecherche.value
    .split(",")
    .map(t  => t.trim())    
    .filter(t => t.length > 0); // Filtrer les termes vides

    if (!criteresRecherches[cle]) {
      criteresRecherches[critereSelect.value] = { critere: critereSelect.value, termes: termeRech };  
    } else {
      termeRech.forEach(t => {
        if (!criteresRecherches[cle].termes.includes(t)) {
          criteresRecherches[cle].termes.push(t);
        }
      });
    } 
    
  modifierListeCritere();  
  appliquerRecherche();
  }
}

function modifierListeCritere() {
  criteriaContainer.innerHTML = '';
  
  if (Object.values(criteresRecherches).length == 0) {
      criteriaContainer.innerHTML = 'Aucun Filtre Actif';
      return;
  }

  Object.values(criteresRecherches).forEach((critere, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${critere.critere} :</strong> ${critere.termes.join(", ")}
      <button class="remove" onclick="supprimerCritere('${critere.critere}')">X</button>
    `;
    criteriaContainer.appendChild(li);
  });
}

function supprimerCritere(critere) {
  delete criteresRecherches[critere];  // Supprimer le critère de recherche
  modifierListeCritere();
  appliquerRecherche();
}


window.addEventListener('load', () => {
  loadInitialDataIfNeeded();
  modifierListeCritere();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(() => console.log('Service Worker enregistré.'))
      .catch(err => console.error('Erreur Service Worker :', err));
  }
});