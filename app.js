// Init Variables
let ignorerRecherche = false;
const filtres = [];
tousLesChampignons = window.champiData;
criteresRecherches = [];

let favoris = JSON.parse(localStorage.getItem("champiFavoris")) || [];

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Empêche l'affichage automatique de la bannière
  e.preventDefault();
  deferredPrompt = e;

  // Affiche ton bouton manuellement (dans le menu)
  document.getElementById("installBtn").style.display = "inline-block";
});

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

function installerApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt(); // Affiche la boîte native
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Utilisateur a accepté l’installation');
      } else {
        console.log('Utilisateur a refusé l’installation');
      }
      deferredPrompt = null;
    });
  }
}

function retirerObs(nom, observationASupprimer) {
      const observations = JSON.parse(localStorage.getItem("observations")) || [];
      const updatedObservations = observations.map(item => {
        if (nom === item.nom) {
           const nouvellesObservations = item.observations.filter(obs =>
            obs.date !== observationASupprimer.date ||
            obs.notes !== observationASupprimer.notes ||
            obs.localisation.latitude !== observationASupprimer.localisation.latitude ||
            obs.localisation.longitude !== observationASupprimer.localisation.longitude
          );

          return {
            ...item,
            observations: nouvellesObservations
          };
        }
        return item;
      }).filter(item => item.observations.length > 0);

      localStorage.setItem("observations", JSON.stringify(updatedObservations));
      chargerObservations();
    }

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
  li.className = 'list-group-item champi-item col-lg-4 col-md-6 col-xs-12';
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
      champiImg = document.createElement('img');
      champiImg.setAttribute("loading", "lazy");
      champiImg.src = getImageSrc(champignon);
      champiImg.className = 'card-img-top champi-img';
      champiCard.appendChild(champiImg);
      //champiCardHeader = document.createElement('div');
      //champiCardHeader.className = 'card-header col-xs-12';
      champiCardBody = document.createElement('div');
      champiCardBody.className = 'card-body';
      champiCardBodyTitle = document.createElement('h5');
      champiCardBodyTitle.className = 'card-title';
      nomChampiLatin = champignon["champiTitre"] ? champignon["champiTitre"].substring(0, champignon["champiTitre"].indexOf("/")) : "";
      groupeTaxo = getGroupeTaxo(champignon["champiTitre"]);
      groupeDivision = champignon["division"] ? champignon["division"] : "";
      champiCardBodyTitle.innerHTML = champignon["list champi"] + "<small style='font-size: 0.5em'> (" + nomChampiLatin + " / " + groupeTaxo +" ) <br /> Division : "+ groupeDivision +" </small>  ";  
      champiCardBody.appendChild(champiCardBodyTitle);
      champiCardBodyText = document.createElement('p');
      champiCardBodyText.className = 'card-text';
      champiCardBodyText.innerHTML = champignon["resume_concis"]

      observationButton = document.createElement('button');
      observationButton.innerHTML = "Ajouter une observation";
      observationButton.className = 'btn btn-primary btnObservation champi-btn';
      observationButton.setWidth = "100%";
      observationButton.addEventListener('click', () => {
        ouvrirModaleObservation(champignon);
      });
   


      mycoButton = document.createElement('a');
      mycoButton.innerHTML = "En savoir plus";
      mycoButton.className = 'btn btn-info champi-btn float-end';
      mycoButton.href = champignon["list champi-href"]

      champiCardBody.appendChild(champiCardBodyText);

      buttonGroupChamp = document.createElement('div');
      buttonGroupChamp.className = 'btn-group-vertical col-12';
      buttonGroupChamp.appendChild(observationButton);
      if (window.navigator.onLine) buttonGroupChamp.appendChild(mycoButton);

      champiCardBody.appendChild(buttonGroupChamp);

      champiCard.className = 'card champi-card';
      champiCardBody.appendChild(favIcon);
      /*headerWrapper = document.createElement('div');
      headerWrapper.className = 'row';
      headerWrapper.appendChild(head);
      headerWrapper.appendChild(iconWrapper);
      champiCardHeader.appendChild(headerWrapper);*/
      //champiCard.appendChild(champiCardHeader);
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

function getImageSrc(champignon) {
  if (champignon["image"] != "./img/icon.jpg") return champignon["image"];

  if (champignon["division"] != "Inconnue") return "./img/" + champignon["division"] + ".png";

  return "./img/icon.jpg";
}

function getGroupeTaxo(champiTitre) {
  if (!champiTitre) return "";
 const match = champiTitre.match(/Groupe\s*:\s*([^:]+)/);

if (match) {
  const groupe = match[1].trim();
  return groupe;
} else {
  console.log("Groupe non trouvé");
  return "";
}
}

function filtrerParDivision() {
  const divisionChoisie = document.getElementById("filtre-division").value;

  if (divisionChoisie || divisionChoisie === "") {
    criteresRecherches["division"] = {
      critere: "division",
      termes: [divisionChoisie]
    };
  } else {
    delete criteresRecherches["division"];
  }

  appliquerRecherche();
}

function initialiserFiltreDivisions(data) {
  const select = document.getElementById("filtre-division");
  const divisions = [...new Set(data.map(champi => champi.division).filter(Boolean))].sort();

  for (const division of divisions) {
    const option = document.createElement("option");
    option.value = division;
    option.textContent = division;
    select.appendChild(option);
  }
}

function ouvrirModaleObservation(champignon) {
  const myModal = document.getElementById('myModal');
  const champiNom = document.getElementById('modalChampiNom');
  const champiNotes = document.getElementById('modalObservationNotes');
  const champiDate = document.getElementById('modalObservationDate');

  champiNom.innerHTML = champignon["list champi"];
  /*champiNotes.value = ""; // Réinitialiser le champ de notes
  champiDate.innerHTML = new Date().toLocaleString(); // Date actuelle
  champiLocalisation.innerHTML = "En attente de localisation...";*/
  myModal.style.display = "block"; // Afficher la modale
  // Fermer la modale si l'utilisateur clique en dehors d'elle
  window.onclick = function(event) {
    if (event.target == myModal) {
      myModal.style.display = "none";
    }
  };

 const ajouterBtn = document.getElementById('ajouterObservationBtn');
  ajouterBtn.onclick = function() {
    navigator.geolocation.getCurrentPosition(position => {
      const nouvelle = {
        date: champiDate.value,
        notes: champiNotes.value,
        localisation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      }

      ajouterObservation(champignon, nouvelle);
      myModal.style.display = "none"; // Fermer la modale après ajout
    });
    
  };
}

function ajouterObservation(champi, observation) {
  const observations = JSON.parse(localStorage.getItem("observations")) || [];

    const champiId = champi["list champi"];
    const index = observations.findIndex(o => o.champiId === champiId);

    if (index !== -1) {
      observations[index].observations.push(observation);
    } else {
      observations.push({
        champiId: champiId,
        nom: champi["list champi"],
        observations: [observation]
      });
    }

    localStorage.setItem("observations", JSON.stringify(observations));
    alert("Observation ajoutée !");
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