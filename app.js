// Init Variables
let ignorerRecherche = false;
const filtres = [];
tousLesChampignons = window.champiData;
criteresRecherches = [];

let favoris = JSON.parse(localStorage.getItem("champiFavoris")) || [];

// Elements HTML
const critereSelect = document.getElementById('criteria');
const valeurRecherche = document.getElementById('searchField');
const boutonRecherche = document.getElementById('searchButton');
const criteriaList = document.getElementById('criteriaList');
const criteriaContainer = document.getElementById('filtresActifs');
const resetButton = document.getElementById('clearButton');

// Event Listeners
if (boutonRecherche) boutonRecherche.addEventListener('click', () => {miseAJourCritere(); });
if (resetButton) resetButton.addEventListener('click', () => {
  ignorerRecherche = false;  // Ignorer la recherche lors de la réinitialisation
  Object.keys(criteresRecherches).forEach(k => delete criteresRecherches[k]);  
  valeurRecherche.value = '';  // Réinitialiser le champ de recherche
  criteriaList.selectedIndex = 0;
  miseAJourCritere() // Recharger les données sans filtres

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

        const contenuText = critereCorrespondant && critereCorrespondant.termes.length > 0
              ? surlignerMotsProches(descriptionValue, critereCorrespondant.termes) 
              : descriptionValue;  // Vérifier si le critère correspond à la description

        if (critereCorrespondant != undefined) {
          descriptionItems += `<li><strong>${descriptionName} :</strong> ${contenuText}</li>`;
        }
        
      });

      head = document.createElement("h5");
      head.className = "col-10"
      head.innerHTML = champignon["list champi"];

      favIcon = document.createElement('img');
      favIcon.src = "./img/mushroom_unselected_32.png";
      favIcon.className = "favori-icon";
      favIcon.setAttribute("data-id", champignon["list champi"]);
      favIcon.addEventListener('click', (element) => {
        elem = element.target;
        const id = elem.getAttribute("data-id");
        let favoris = JSON.parse(localStorage.getItem("champiFavoris")) || [];

        if (favoris.includes(id)) {
          favoris = favoris.filter(f => f !== id);
          elem.src = "img/mushroom_unselected_32.png";
        } else {
          favoris.push(id);
          elem.src = "img/mushroom_selected_32.png";
        }

        localStorage.setItem("champiFavoris", JSON.stringify(favoris));
      });
      iconWrapper = document.createElement('div');
      iconWrapper.className = "col-2 text-end";
      iconWrapper.appendChild(favIcon);

      champiCard = document.createElement('div');
      champiCardHeader = document.createElement('div');
      champiCardHeader.className = 'card-header row';
      champiCardBody = document.createElement('div');
      champiCardBody.className = 'card-body';
      champiCardBody.appendChild(document.createTextNode(champignon["resume_concis"]));
      champiCard.className = 'card';
      champiCardHeader.appendChild(head);
      champiCardHeader.appendChild(iconWrapper);
      champiCard.appendChild(champiCardHeader);
      champiCard.appendChild(champiCardBody);
      li.appendChild(champiCard);

      /*if (descriptionItems != "") {
        champiCardBody.innerHTML += `
        <p><strong>Descriptions :</strong></p>  
        <ul>
          ${descriptionItems}
        </ul>`
      }*/
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

    //if (!criteresRecherches[cle]) {
      criteresRecherches[critereSelect.value] = { critere: critereSelect.value, termes: termeRech };  
   /* } else {
      termeRech.forEach(t => {
        if (!criteresRecherches[cle].termes.includes(t)) {
          criteresRecherches[cle].termes.push(t);
        }
      });
    } */
    
  modifierListeCritere();  
  appliquerRecherche();
  }
}

function modifierListeCritere() {
  criteriaList.innerHTML = '';
  
  if (Object.values(criteresRecherches).length == 0) {
      criteriaList.innerHTML = '<h4>Aucun Filtre Actif</h4>';
      return;
  }

  Object.values(criteresRecherches).forEach((critere, index) => {
    if (critere.termes.length > 0) {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.innerHTML = `
        <strong>${critere.critere} :</strong> ${critere.termes.join(", ")}
        <button class="btn-close"  onclick="supprimerCritere('${critere.critere}')"></button>
      `;
      criteriaList.appendChild(li);
    }
  });
}

function supprimerCritere(critere) {
  delete criteresRecherches[critere];  // Supprimer le critère de recherche
  modifierListeCritere();
  appliquerRecherche();
}