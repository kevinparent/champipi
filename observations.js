document.body.addEventListener('observation-ajoutee', (e) => {
  console.log('Observation ajoutée :', e.detail);
  const nouvelle = {
        date: e.detail.date,
        notes: e.detail.note,
        localisation: {
          latitude: e.detail.localisation.split(",")[0],
          longitude: e.detail.localisation.split(",")[1]
        }
      }

      ajouterObservation(e.detail.champignon, nouvelle);
});


function ajouterObservation(nomChampi, observation) {
  const observations = JSON.parse(localStorage.getItem("observations")) || [];

    const index = observations.findIndex(o => o.champiId === nomChampi);

    if (index !== -1) {
      observations[index].observations.push(observation);
    } else {
      observations.push({
        champiId: nomChampi,
        nom: nomChampi,
        observations: [observation]
      });
    }

    localStorage.setItem("observations", JSON.stringify(observations));
    alert("Observation ajoutée !");
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

function exporterObservations() {
  const observations = JSON.parse(localStorage.getItem("observations")) || [];

  const jsonStr = JSON.stringify(observations, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const fichier = new File([blob], "observations.json", { type: "application/json" });

  // Essai de partage
  if (navigator.canShare && navigator.canShare({ files: [fichier] })) {
    navigator.share({
      title: "Mes observations Champipi",
      text: "Voici mes observations de champignons.",
      files: [fichier]
    }).then(() => {
      console.log("Partage réussi !");
    }).catch((err) => {
      console.error("Erreur de partage :", err);
      telechargerFichier(blob, "observations.json");
    });
  } else {
    // Fallback : téléchargement direct
    telechargerFichier(blob, "observations.json");
  }
}

function telechargerFichier(blob, nomFichier) {
  const url = URL.createObjectURL(blob);
  const lien = document.createElement("a");
  lien.href = url;
  lien.download = nomFichier;
  document.body.appendChild(lien);
  lien.click();
  document.body.removeChild(lien);
  URL.revokeObjectURL(url);
}

    // Gestion de l'import
document.getElementById("importFile").addEventListener("change", async (event) => {
  const observations = JSON.parse(localStorage.getItem("observations")) || [];
  const file = event.target.files[0];
  if (!file) return;

  const text = await file.text();
  let nouvellesObs;

  try {
    nouvellesObs = JSON.parse(text);
  } catch (e) {
    alert("Fichier invalide !");
    return;
  }

  let ajoutées = 0;

  for (const champi of nouvellesObs) {
  const champiNom = champi.nom || champi.champiId;

  for (const obs of champi.observations || []) {
    const observationAplat = {
      champignon: champiNom,
      date: obs.date,
      localisation: obs.localisation,
      note: obs.notes
    };

    const estDupliquée = observations.some(o =>
      o.champignon === observationAplat.champignon &&
      o.localisation?.latitude === observationAplat.localisation?.latitude &&
      o.localisation?.longitude === observationAplat.localisation?.longitude
    );

    if (!estDupliquée) {
      ajouterObservation(observationAplat.champignon, observationAplat);
      observations.push(observationAplat);
      ajoutées++;
    }
  }
}

  if (ajoutées > 0) {
    chargerObservations(); // rafraîchit la page
    alert(`${ajoutées} nouvelle(s) observation(s) ajoutée(s).`);
  } else {
    alert("Aucune nouvelle observation ajoutée (doublons ignorés).");
  }

  event.target.value = ""; // reset du champ
});