// Open or create database
const request = indexedDB.open("UserDB", 1);

// On DB upgrade or first open
request.onupgradeneeded = (event) => {
  const db = event.target.result;

  const store = db.createObjectStore("users", {
    keyPath: "id", // unique primary key
    autoIncrement: true,
  });

  // Add index on name for lookup
  store.createIndex("nameIndex", "name", { unique: false });

  console.log("DB setup complete");
};

// Form submit handler
document.getElementById("userForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const age = parseInt(document.getElementById("age").value);

  const user = { name, age };

  const dbRequest = indexedDB.open("UserDB", 1);

  dbRequest.onsuccess = (event) => {
    const db = event.target.result;
    const tx = db.transaction("users", "readwrite");
    const store = tx.objectStore("users");

    const addRequest = store.add(user);

    addRequest.onsuccess = () => {
      console.log("User added:", user);

      // Also try to retrieve it using index
      const index = store.index("nameIndex");
      const getRequest = index.get(name);
      getRequest.onsuccess = () => {
        console.log("Fetched by name index:", getRequest.result);
        setTimeout(() => {

            getAllUsers()
        }, 2000)
      };
    };

    addRequest.onerror = (e) => {
      console.error("Add error", e.target.error);
    };
  };

  dbRequest.onerror = (e) => {
    console.error("DB open error", e.target.error);
  };
});

function getAllUsers() {
    console.log("Getting all users")
    const userList = document.getElementById('user-list')
//   const request = indexedDB.open("UserDB", 1);

  request.onsuccess = (event) => {
    const db = event.target.result;
    const tx = db.transaction("users", "readonly");
    const store = tx.objectStore("users");

    const getAllRequest = store.getAll();

    getAllRequest.onsuccess = () => {
      console.log("All users:", getAllRequest.result);
      const users = getAllRequest.result;

      users.forEach(user => {
        const el = document.createElement('div')
        el.textContent = `Name: ${user.name} Age: ${user.age}`
        userList.appendChild(el)
      });

    };
  };
}

getAllUsers()




