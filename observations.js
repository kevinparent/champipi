document.body.addEventListener('observation-ajoutee', (e) => {
  console.log('Observation ajoutée :', e.detail);
  const nouvelle = {
        date: e.detail.date,
        notes: e.detail.note,
        localisation: {
          latitude: e.detail.localisation.split(",")[0],
          longitude: e.detail.localisation.split(",")[1]
        },
        fichierImg: e.detail.img
      }

      ajouterObservation(e.detail.champignon, nouvelle);
});


function ajouterObservation(nomChampi, observation) {
  const observations = JSON.parse(localStorage.getItem("observations")) || [];

    const index = observations.findIndex(o => o.champiId === nomChampi);

    if (index !== -1) {
      observations[index].observations.push(observation, observation.fichierImg);
    } else {
      observations.push({
        champiId: nomChampi,
        nom: nomChampi,
        observations: [observation]
      });
    }

    localStorage.setItem("observations", JSON.stringify(observations));

    if (localStorage.getItem("inaturalist_autoSync")) {
        envoyerObservation(nomChampi, observation);
    }

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

async function envoyerObservation(nomChampi, observation) {
  const token = localStorage.getItem("inaturalist_token");
  if (!token) {
    alert("Token iNaturalist manquant.");
    return;
  }

  const obs = observation;

  const body = {
    species_guess: nomChampi,
    description: obs.note || "Observation via Champipi",
    observed_on_string: obs.date || new Date().toISOString().split("T")[0],
    latitude: obs.localisation?.longitude,
    longitude: obs.localisation?.longitude,
    tag_list: "champipi"
  };

  const res = await fetch("https://api.inaturalist.org/v1/observations", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (res.ok) {
    alert("Observation envoyée !");
  } else {
    alert("Échec de l'envoi.");
  }
}