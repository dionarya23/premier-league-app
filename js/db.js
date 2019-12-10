var dbPromised = idb.open("premier-league", 1, function(upgradeDb) {
  upgradeDb.createObjectStore("teams", { keyPath: 'teamsId'});
});

function saveForLater(teams) {
  return new Promise((resolve, reject) => {
    dbPromised.then(db => {
          const transaction = db.transaction("teams", `readwrite`);
          transaction.objectStore("teams").put(teams);
          return transaction;
      }).then(transaction => {
          if (transaction.complete) {
              resolve(true)
          } else {
              reject(new Error(transaction.onerror))
          }
      })
  })
}

function getAll() {
      return new Promise((resolve, reject) => {
        dbPromised.then(db => {
            const transaction = db.transaction("teams", `readonly`);
            return transaction.objectStore("teams").getAll();
        }).then(data => {
            if (data !== undefined) {
                resolve(data)
            } else {
                resolve([])
            }
        })
    })
}

function getById(teamsId) {
  return new Promise((resolve, reject) => {
    dbPromised.then(db => {
      const transaction = db.transaction("teams", 'readonly')
      return transaction.objectStore("teams").get(parseInt(teamsId))
    }).then(data => {
       if (data !== undefined) {
         resolve(data)
       } else {
         reject(new Error("Favorite Error"))
       }
    })
  })
}

function removeById(teamsId) {
  return new Promise((resolve, reject) => {
    dbPromised.then(db => {
        const transaction = db.transaction("teams", `readwrite`);
        transaction.objectStore("teams").delete(teamsId);
        return transaction;
    }).then(transaction => {
        if (transaction.complete) {
            resolve(true)
        } else {
            reject(new Error(transaction.onerror))
        }
    })
})
} 