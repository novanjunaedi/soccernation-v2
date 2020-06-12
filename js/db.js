var dbPromised = idb.open("soccernationDB", 1, function(upgradeDb) {
  var teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  teamsObjectStore.createIndex("name", "name", {
    unique: false
  });
});

function saveFavTeam(teams) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      console.log(teams);
      store.put(teams);
      return tx.complete;
    })
    .then(function() {
      console.log("Team favorit berhasil di simpan.");
    });
}

function deleteFavTeam(teams){
  dbPromised
    .then(function(db) {
      var tx = db.transaction('teams', 'readwrite');
      var store = tx.objectStore('teams');
 
      store.delete(teams.id);
      return tx.complete;
  }).then(function() {
        console.log('Team berhasil dihapus.');
      }).catch(function() {
        console.log('Team gagal dihapus.')
      })
}

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function(teams) {
        resolve(teams);
      });
  });
}

function getAllByTeamName(name) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("teams", "readonly");
      var store = tx.objectStore("teams");
      var nameIndex = store.index("name");
      var range = IDBKeyRange.bound(name, name + "\uffff");
      return nameIndex.getAll(range);
    })
    .then(function(teams) {
      console.log(teams);
    });
}

function getById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.get(id);
      })
      .then(function(teams) {
        resolve(teams);
      });
  });
}

