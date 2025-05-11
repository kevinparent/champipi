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
    } else {
      const filtres = tousLesChampignons.filter(champi => {
        return Object.values(criteresRecherches).every((critere) => {
          const champiDescription = champi.description || [];
          const champiCritere = champiDescription.find(desc => Object.keys(desc)[0] === critere.critere);
          const valeur = champiCritere ? Object.values(champiCritere)[0] : '';
  
           if (critere.critere === "division") {
              return champi.division === critere.termes[0];
            }

           let mots = [];

          if (critere.critere === "TOUT") {
            texteGlobal =  champi["list champi"] + " ";
            texteGlobal += champiDescription.map(d => Object.values(d)[0]).join(" ");
            mots = sansAccents(texteGlobal.toLowerCase()).split(/\W+/);
          } else {
            const champiCritere = champiDescription.find(desc => Object.keys(desc)[0] === critere.critere);
            const valeur = champiCritere ? Object.values(champiCritere)[0] : '';
            mots = sansAccents(valeur.toLowerCase()).split(/\W+/);
          }

           return critere.termes.every(ts => {
                const st = ts.split(' OU ').map(t => t.trim());

                return st.some(t => {
                  const estNegatif = t.startsWith("!");
                  const termeNettoye = estNegatif ? t.slice(1) : t; // Enlever le "!" du terme

                  const syno = trouverSynonymes(termeNettoye);

                  if (estNegatif) {
                    return syno.every(s => {
                      sMin = sansAccents(s.toLowerCase());
                      const tolMin = getTolerance(sMin.length);

                      return mots.every(val => {
                        mm = sansAccents(val.toLowerCase());
                        if (mm.startsWith(sMin)) return false; // Si le mot commence par le terme de recherche, il ne doit pas être présent
                        debutMot = mm.slice(0, sMin.length);
                        distance = distanceLevenshtein(debutMot, sMin);
                        memeInitiale = mm.charAt(0) === sMin.charAt(0);
                        return distance > tolMin || !memeInitiale; // Vérifier si la distance est supérieure à la tolérance ou si les initiales ne correspondent pas
                      });
                    });
                  } else {
                    return syno.some(s => { 
                      const sMin = sansAccents(s.toLowerCase());
                      const tolMin = getTolerance(sMin.length); 
                      return mots.some(val => {
                        return validerDonneeRecherche(sMin, tolMin, val)// Vérifier si le mot commence par le terme de recherche et si la distance est inférieure ou égale à la tolérance
                      });
                    });
                  }
                });
           });

          //return mots.some(val => {return distanceLevenshtein(val, critere.terme.toLowerCase()) <= getTolerance(critere.terme.length);}); // Vérifier si la valeur correspond au terme de recherche
        });
      });
      console.log("Recherches Champi = " + filtres.length);
      loadData(filtres);
    }  
  }

  function validerDonneeRecherche(termeMin, tolerenceMin, val) {
    motMin = sansAccents(val.toLowerCase());

    if (motMin.startsWith(termeMin)) return true;

    debutMot = motMin.slice(0, termeMin.length);
    distance = distanceLevenshtein(debutMot, termeMin);
    memeInitiale = motMin.charAt(0) === termeMin.charAt(0);

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
