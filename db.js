const DB_NAME = 'CHAMPIPI';
const DB_VERSION = 3;
const STORE_NAME = 'champiStore';

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = (e) => reject(e.target.error);
    request.onsuccess = (e) => resolve(e.target.result);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { autoIncrement: true });
        // Index pour rechercher dans les descriptions par nom (ex : "FREQUENCE", "COMESTIBILITE", etc.)
        store.createIndex('descriptionNames', 'description', { multiEntry: true });
      }
    };
  });
}

function addMultipleData(dataArray) {
  return openDB().then(db => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    dataArray.forEach(item => store.add(item));
    return tx.complete;
  });
}

function searchInIndexedDB(searchTerm, searchField) {
  const request = indexedDB.open('myDatabase', 1);

  request.onsuccess = function(e) {
    const db = e.target.result;
    const transaction = db.transaction(['data'], 'readonly');
    const store = transaction.objectStore('data');

    // Choisir l'index en fonction du champ de recherche
    const index = store.index(searchField === 'description-name' ? 'description-name' : 'description-value');

    const results = [];
    
    // Ouvrir un curseur pour parcourir l'index et chercher les éléments qui contiennent le terme de recherche
    const cursorRequest = index.openCursor();
    
    cursorRequest.onsuccess = function(e) {
      const cursor = e.target.result;
      if (cursor) {
        const value = cursor.value;
        
        // Filtrer par terme de recherche (insensible à la casse)
        value.description.forEach(desc => {
          const descriptionName = desc['description-name'].toLowerCase();
          const descriptionValue = desc[Object.keys(desc)[0]].toLowerCase();

          // Vérifier si la valeur correspond au terme de recherche
          if (descriptionName.includes(searchTerm) || descriptionValue.includes(searchTerm)) {
            results.push(value);
          }
        });

        cursor.continue();
      } else {
        // Une fois que tous les résultats ont été parcourus, afficher les résultats
        displaySearchResults(results);
      }
    };

    cursorRequest.onerror = function() {
      console.error('Erreur lors de l\'ouverture du curseur.');
    };
  };

  request.onerror = function() {
    console.error('Erreur lors de l\'ouverture de la base de données.');
  };
}

function getAllData() {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.getAll();
      request.onsuccess = (e) => resolve(e.target.result);
      request.onerror = (e) => reject(e.target.error);
    });
  });
}