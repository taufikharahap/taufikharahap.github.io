const dbPromised = idb.open("champions-league", 1, function(upgradeDb) {
    let teamsObjectStore = upgradeDb.createObjectStore("teams", {
      keyPath: "id"
    });
    teamsObjectStore.createIndex("name", "name", { unique: false });
  });

  function saveForLater(team) {
    dbPromised.then(function(db) {
        const tx = db.transaction("teams", "readwrite");
        const store = tx.objectStore("teams");
        console.log(team);
        store.put(team);
        return tx.complete;
      })
      .then(function() {
        console.log("team berhasil di simpan.");
      });
  }

  function deleteForLater(teamId) {
    return new Promise((resolve, reject) => {
        dbPromised.then(function(db) {
          const tx = db.transaction("teams", "readwrite");
          const store = tx.objectStore("teams");
          store.delete(teamId);
          return tx.complete;
        })
        .then(function() {
          console.log("team telah dihapus");
        });
    })
  }

  function getAll() {
    return new Promise(function(resolve, reject) {
      dbPromised.then(function(db) {
          const tx = db.transaction("teams", "readonly");
          const store = tx.objectStore("teams");
          return store.getAll();
        })
        .then(function(teams) {
          resolve(teams);
        });
    });
  }

  function getById(id) {
    return new Promise(function(resolve, reject) {
      dbPromised.then(function(db) {
          const tx = db.transaction("teams", "readonly");
          const store = tx.objectStore("teams");
          return store.get(parseInt(id));
        })
        .then(function(team) {
          resolve(team);
        });
    }); 
  }