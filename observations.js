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