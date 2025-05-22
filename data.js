function loadData(filtres) {
    elementCount = document.getElementById('searchResultCount');
    if (filtres == undefined) {
      dataList = getAllData();  // Récupérer toutes les données
      elementCount.innerHTML = `Nombre de résultats : ${dataList.length}`;  // Afficher le nombre de résultats
      tousLesChampignons = dataList;  // Stocker les données dans la variable globale
      remplirMenuCritere(dataList);  // Remplir le menu déroulant avec les critères de recherche
      const list = document.getElementById('searchResults');
      list.innerHTML = '';
      dataList.forEach(item => {
        list.appendChild(afficherChampignon(item));  // Afficher chaque champignon dans la liste
      });
    } else {
      const list = document.getElementById('searchResults');
      list.innerHTML = '';
      elementCount.innerHTML = `Nombre de résultats : ${filtres.length}`;  // Afficher le nombre de résultats
      filtres.forEach(item => {
        list.appendChild(afficherChampignon(item));  // Afficher chaque champignon dans la liste
  
      });
    }
  }

  function getAllData() {
  return [...window.champiData].sort((a, b) => {
      const nomA = a["list champi"]?.toLowerCase() || "";
      const nomB = b["list champi"]?.toLowerCase() || "";
      return nomA.localeCompare(nomB);
    });
}

function sansAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

  function saveData() {
    const input = document.getElementById('dataInput');
    const value = input.value.trim();
    if (value) {
      addData(value).then(() => {
        input.value = '';
        loadData();
      });
    }
  }

  function trouverSynonymes(tm) {
    tm = sansAccents(tm.toLowerCase());
    for (const groupe of dictionnaireSynonymes) {
      if (groupe.includes(tm)) {
        return groupe;
      }
    }
    return [tm];
  }

  function appliquerRecherche() {
  if (Object.values(criteresRecherches).length == 0) {
    loadData();
    return;
  }

  const filtres = tousLesChampignons.filter(champi => {
    const champiDescription = champi.description || [];

    return Object.values(criteresRecherches).every((critere) => {
      const estCritereExclu = critere.critere.startsWith("!");
      const critereNom = estCritereExclu ? critere.critere.slice(1) : critere.critere;

      // Cas spécial : exclusion de critère (!Chapeau)
      const champiCritere = champiDescription.find(desc => Object.keys(desc)[0] === critereNom);
      if (estCritereExclu) return !champiCritere;

      // Cas spécial : division
      if (critereNom === "division") {
        return critere.termes[0] !== "" ? champi.division === critere.termes[0] : true;
      }

      let mots = [];
      if (critereNom === "TOUT") {
        let texteGlobal = (champi["list champi"] || "") + " ";
        texteGlobal += champiDescription.map(d => Object.values(d)[0]).join(" ");
        mots = sansAccents(texteGlobal.toLowerCase()).split(/\W+/);

         // ✅ Ajout : exclure fiches contenant certains critères (ex: !Chapeau)
        const exclusions = critere.termes.filter(t => t.startsWith("!")).map(t => t.slice(1).toLowerCase());
        const contientCritere = champiDescription.map(d => Object.keys(d)[0].toLowerCase());
        if (exclusions.some(c => contientCritere.includes(sansAccents(c)))) {
          return false; // fiche exclue si elle contient un des critères mentionnés par !Nom
        }
      } else {
        const valeur = champiCritere ? Object.values(champiCritere)[0] : '';
        mots = sansAccents(valeur.toLowerCase()).split(/\W+/);
      }

      return critere.termes.every(ts => {
        const sousTermes = ts.split(' ou ').map(t => t.trim());

        return sousTermes.some(t => {
          const estNegatif = t.startsWith("!");
          const termeNettoye = estNegatif ? t.slice(1) : t;
          const syno = trouverSynonymes(termeNettoye);

          if (estNegatif) {
            return syno.every(s => {
              const sMin = sansAccents(s.toLowerCase());
              const tolMin = getTolerance(sMin.length);

              return mots.every(val => {
                const mm = sansAccents(val.toLowerCase());
                if (mm.startsWith(sMin)) return false;
                const debutMot = mm.slice(0, sMin.length);
                const distance = distanceLevenshtein(debutMot, sMin);
                const memeInitiale = mm.charAt(0) === sMin.charAt(0);
                return distance > tolMin || !memeInitiale;
              });
            });
          } else {
            return syno.some(s => {
              const sMin = sansAccents(s.toLowerCase());
              const tolMin = getTolerance(sMin.length);
              return mots.some(val => validerDonneeRecherche(sMin, tolMin, val));
            });
          }
        });
      });
    });
  });

  console.log("Recherches Champi = " + filtres.length);
  loadData(filtres);
}

function validerDonneeRecherche(termeMin, tolerenceMin, val) {
  const motMin = sansAccents(val.toLowerCase());
  if (motMin.startsWith(termeMin)) return true;

  const debutMot = motMin.slice(0, termeMin.length);
  const distance = distanceLevenshtein(debutMot, termeMin);
  const memeInitiale = motMin.charAt(0) === termeMin.charAt(0);

  return memeInitiale && distance <= tolerenceMin;
}

  
  function getTolerance(a) {
      tolerance = 1;
  
      if (a > 10) tolerance = 3;
      else if (a > 7) tolerance = 2;
      else if (a > 4) tolerance = 1;	
  
      return tolerance;
  }
  
  function distanceLevenshtein(a, b) {
    const matrix = [];
  
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
  
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // suppression
          );
        }
      }
    }
  
    return matrix[b.length][a.length];
  }
  
  function loadInitialDataIfNeeded() {
    data = getAllData();
    if (data.length === 0 && window.champiData) {
      addMultipleData(window.champiData).then(() => {
        console.log("Données initiales chargées.");
        loadData();  // Charger les données après l'ajout
      
      });
    } else {
      console.log("Données déjà présentes, pas besoin de charger les données initiales.");
      loadData();  // Charger les données existantes
    }
}
