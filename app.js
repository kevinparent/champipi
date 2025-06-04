// Init Variables
let ignorerRecherche = false;
const filtres = [];
tousLesChampignons = getDataEncrypted();
criteresRecherches = [];
criteresSelect = new Map();

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
const searchButtonCritere = document.getElementById('searchButtonCritere');
const resetButton = document.getElementById('clearButton');

// Event Listeners
if (boutonRecherche) boutonRecherche.addEventListener('click', () => {miseAJourCritere(); });
if (searchButtonCritere) searchButtonCritere.addEventListener('click', () => {ajouterCritereDepuisFormulaire();});
if (resetButton) resetButton.addEventListener('click', () => {
  ignorerRecherche = false;  // Ignorer la recherche lors de la réinitialisation
  Object.keys(criteresRecherches).forEach(k => delete criteresRecherches[k]);  
  valeurRecherche.value = '';  // Réinitialiser le champ de recherche
  criteriaList.selectedIndex = 0;
  miseAJourCritere() // Recharger les données sans filtres

});

function ajouterCritereDepuisFormulaire() {
  const cle = document.getElementById("criteria").value;
  const texte = document.getElementById("valeurRecherche").value.trim();

  if (!cle || !texte) return;

  const termes = texte
    .split(/\bET\b/i)
    .map(b => b.trim())
    .flatMap(etBloc => etBloc.split(/\bOU\b/i).map(t => t.trim()))
    .filter(Boolean);

  criteresRecherches[cle] = {
    critere: cle,
    termes: termes
  };

  appliquerRecherche();
  modifierListeCritere(); // Mise à jour des filtres affichés
}




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

function remplirMenuCritere(champignons) {
  const select = document.getElementById('criteria');

  champignons.forEach(champi => {
    champi.description.forEach(desc => {
      criteresSelect.set(Object.keys(desc)[0], desc["description-name"], );  // Ajouter le critère à l'ensemble
    });
  });

  const criteresArray = Array.from(criteresSelect).sort();

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
      
      champiImgOverlay = document.createElement('div');
      champiImgOverlay.className = 'card-img-overlay';
      champiImgOverlayAuthor = document.createElement('h5');
      champiImgOverlayAuthor.className = 'card-title';
      champiImgOverlayAuthor.innerHTML = "Crédit photo : " + champignon["auteur"];
      if (champignon["image"] != "./img/icon.jpg") champiCard.appendChild(champiImg);  
      if (champignon["auteur"]) {
        champiImgOverlay.appendChild(champiImgOverlayAuthor);
      }
      
      champiCard.appendChild(champiImgOverlay);
      //champiCardHeader = document.createElement('div');
      //champiCardHeader.className = 'card-header col-xs-12';
      champiCardBody = document.createElement('div');
      champiCardBody.className = 'card-body';
      champiCardBodyTitle = document.createElement('h3');
      champiCardBodyTitle.className = 'card-title';
      nomChampiLatin = champignon["champiTitre"] ? champignon["champiTitre"].substring(0, champignon["champiTitre"].indexOf("/")) : "";
      groupeTaxo = getGroupeTaxo(champignon["champiTitre"]);
      groupeDivision = champignon["division"] ? champignon["division"] : "";
      champiCardBodyTitle.innerHTML = champignon["list champi"] + "<small style='font-size: 8pt'> (" + nomChampiLatin + " / " + groupeTaxo +" ) <br /> Division : "+ groupeDivision +" </small>  ";  
      champiCardBody.appendChild(champiCardBodyTitle);
      champiCardBody.appendChild(iconWrapper);
      champiCardBodyText = document.createElement('p');
      champiCardBodyText.className = 'card-text';
      const resumeComplet = champignon["resume_concis"];
      const resumeMaxLength = 120;
      const isLong = resumeComplet.length > resumeMaxLength;
      const resumeTronque = resumeComplet.slice(0, resumeMaxLength);

      const resumeId = `resume-${Math.random().toString(36).substring(2, 10)}`;
      const boutonId = `btn-${resumeId}`;

      champiCardBodyText.innerHTML = `
        <div class="resume-wrapper" id="${resumeId}" style="max-height: 5em; overflow: hidden; transition: max-height 0.5s ease;">
          ${resumeTronque}${isLong ? "..." : ""}
        </div>
        ${isLong ? `<button id="${boutonId}" class="btn btn-sm btn-link p-0" onclick="toggleResume('${resumeId}', '${boutonId}', \`${resumeComplet.replace(/`/g, '\\`')}\`, \`${resumeTronque.replace(/`/g, '\\`')}\`)">[plus]</button>` : ""}
      `;

      observationButton = document.createElement('button');
      observationButton.innerHTML = "Ajouter une observation";
      observationButton.className = 'button btn btn-primary btnObservation champi-btn';
      observationButton.setWidth = "100%";
      observationButton.addEventListener('click', () => {
        modale = document.createElement('observation-modal');
        modale.setAttribute("champName", champignon["list champi"]);
        document.body.appendChild(modale)
      });
   


      mycoButton = document.createElement('a');
      mycoButton.innerHTML = "En savoir plus";
      mycoButton.className = 'button btn btn-info champi-btn-myco';
      mycoButton.href = champignon["list champi-href"];
      mycoButton.target = "_blank";
      mycoButton.rel = "noopener noreferrer";

      champiCardBody.appendChild(champiCardBodyText);

      buttonGroupChamp = document.createElement('div');
      buttonGroupChamp.className = 'btn-group-vertical col-12';
      buttonGroupChamp.appendChild(observationButton);
      if (window.navigator.onLine) buttonGroupChamp.appendChild(mycoButton);

      champiCardBody.appendChild(buttonGroupChamp);

      champiCard.className = 'card champi-card';

      champiCard.appendChild(champiCardBody);
      li.appendChild(champiCard);

      return li;
}

function afficherResumeComplet(spanId, fullText, btn) {
  const span = document.getElementById(spanId);
  if (span) span.textContent = fullText;
  if (btn) btn.remove();
}

function toggleResume(resumeId, boutonId, fullText, shortText) {
  const resumeEl = document.getElementById(resumeId);
  const btn = document.getElementById(boutonId);

  const isCollapsed = btn.textContent === "[plus]";

  resumeEl.innerHTML = isCollapsed ? fullText : shortText + "...";
  resumeEl.style.maxHeight = isCollapsed ? "1000px" : "5em"; // transition visible
  btn.textContent = isCollapsed ? "[moins]" : "[plus]";
}


function getImageSrc(champignon) {
  if (champignon["image"] != "./img/icon.jpg") return champignon["image"];

  if (champignon["division"] != "Inconnue") return "./img/" + champignon["division"].toLowerCase() + ".png";

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

  miseAJourCritere();
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

function miseAJourCritere(filtreString) {
  if (ignorerRecherche) return;


  document.getElementById("filtresActifs").style.display = "none";
  document.getElementsByClassName("resultContainer")[0].style.display = "none";

  const saisie = filtreString ? filtreString : valeurRecherche.value.trim();

  // Réinitialiser les anciens critères uniquement si on détecte des blocs
  const nouvellesRecherches = {};

  const blocs = saisie
    .split(",")
    .map(b => b.trim())
    .filter(b => b.length > 0);

  for (const bloc of blocs) {
    const mots = bloc.split(/\s+/);
    if (mots.length === 0) continue;

    const premierMot = mots[0];
    const critereDetecte = trouverCritereCorrespondant(premierMot);

    const regex = new RegExp(`^${premierMot}\\s+`, 'i'); // début du bloc + espace
    const reste = bloc.replace(regex, '').trim();

    if (critereDetecte && mots.length > 1) {
      const sousBlocs = reste.split(/\bET\b/i).map(t => t.trim()).filter(Boolean);
      let termes = [];
      for (const sous of sousBlocs) {
        const ouGroupes = sous.split(/\bOU\b/i).map(t => t.trim()).filter(Boolean);
        if (ouGroupes.length > 1) {
          termes.push(ouGroupes.join(" ou "));
        } else if (ouGroupes.length === 1) {
          termes.push(ouGroupes[0]);
        }
      }
      
      if (termes.length > 0) {
        nouvellesRecherches[critereDetecte] = {
          critere: critereDetecte,
          termes: termes
        };
      }
    } else {
      // Aucun critère reconnu → on utilise le critère sélectionné
      const cle = "TOUT";
      
      const texte = critereDetecte ? reste : bloc; // si aucun critère, on prend tout le bloc
      const sousBlocs = texte.split(/\bET\b/i).map(t => t.trim()).filter(Boolean);
      let termes = [];

      for (const sous of sousBlocs) {
        const ouGroupes = sous.split(/\bOU\b/i).map(t => t.trim()).filter(Boolean);
        if (ouGroupes.length > 1) {
          termes.push(ouGroupes.join(" ou "));
        } else if (ouGroupes.length === 1) {
          termes.push(ouGroupes[0]);
        }
      }


      if (termes.length > 0) {
        if (!nouvellesRecherches[cle]) {
          nouvellesRecherches[cle] = { critere: cle, termes: [] };
        }
        nouvellesRecherches[cle].termes.push(...termes);
      }
    }
  }

  for (const cle in nouvellesRecherches) {
    criteresRecherches[cle] = nouvellesRecherches[cle];
  }

  if (Object.values(criteresRecherches).length > 0) {
    document.getElementById("filtresActifs").style.display = "block";
    document.getElementsByClassName("resultContainer")[0].style.display = "block";
  }

  modifierListeCritere();
  appliquerRecherche();
}

function trouverCritereCorrespondant(mot) {
  const motNet = sansAccents(mot).toLowerCase();

  // 1. Match exact direct
  for (const cle of criteresSelect.keys()) {
    const cleNet = sansAccents(cle).toLowerCase();
    if (motNet === cleNet) return cle;
  }

  // 2. Si pas de match exact, chercher une correspondance unique avec distance faible
  let meilleurCritere = null;
  let distanceMin = Infinity;

  for (const cle of criteresSelect.keys()) {
    const cleNet = sansAccents(cle).toLowerCase();
    const d = distanceLevenshtein(motNet, cleNet);

    if (d < distanceMin && d <= 1) {
      meilleurCritere = cle;
      distanceMin = d;
    }
  }

  return meilleurCritere; // peut être null si rien trouvé
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
      li.className = 'list-group-item card';
      li.innerHTML = `
        <strong>${critere.critere} :</strong> ${critere.termes.join(", ")}
        <button class="btn-close"  onclick="supprimerCritere('${critere.critere}')">X</button>
      `;
      criteriaList.appendChild(li);
    }
  });
}

function supprimerCritere(critere) {
  if (critere.critere == "division") {
    document.getElementById("filtre-division").selectedIndex = 0;
    document.getElementById("filtre-division").value = ""; // Réinitialiser le filtre de division
  } 
  delete criteresRecherches[critere];
    // Supprimer le critère de recherche
  modifierListeCritere();
  appliquerRecherche();
}

function closeThis() {
  document.getElementById("resultatsPhoto").innerHTML = "";
}

/**document.getElementById("photoInput").addEventListener("change", function(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = async function () {
    const base64Image = reader.result.split(',')[1];

  // ✅ Affiche le spinner
    document.getElementById("spinnerPhoto").style.display = "block";
    document.getElementById("resultatsPhoto").innerHTML = "";

    // Appel à ton backend hébergé (ex: Render)
    const response = await fetch("https://champipi-be.onrender.com/analyser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ image: base64Image })
    });

    const data = await response.json();
    document.getElementById("spinnerPhoto").style.display = "none";

    document.getElementById("resultatsPhoto").innerHTML = `
      <div class="alert alert-info">
        <button type="button" class="btn-close float-end" aria-label="Close"></button>
        <h3><small>Les informations ici sont à titre indicatives et doivent servir UNIQUEMENT à vous guider dans votre recherche. 
            Vous devez toujours valider votre identification par vous même</small></h3>
        <strong>Suggestions de mots-clés :</strong><br>
        ${data.description.replace(/\n/g, "<br>")}
      </div>`;  
  };

  reader.readAsDataURL(file);
});**/

