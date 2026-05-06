import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDvye-HYLig7LsGB79WNl1MhZnGRQ0czX0",
  authDomain: "mini-notes-app-996ce.firebaseapp.com",
  projectId: "mini-notes-app-996ce",
  storageBucket: "mini-notes-app-996ce.firebasestorage.app",
  messagingSenderId: "657129726872",
  appId: "1:657129726872:web:6b18cc0e2b8cbec1cc81ed",
  measurementId: "G-17WXJX10MB"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const addNoteBtn = document.getElementById("addNoteBtn");
const darkModeBtn = document.getElementById("darkModeBtn");

const email = document.getElementById("email");
const password = document.getElementById("password");

const noteInput = document.getElementById("noteInput");
const notesDiv = document.getElementById("notes");

const userEmail = document.getElementById("userEmail");

const loginSection = document.getElementById("loginSection");
const appSection = document.getElementById("appSection");

const searchInput = document.getElementById("searchInput");

let currentUser = null;

// REGISTER
registerBtn.addEventListener("click", async () => {

  try {

    await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    alert("Cont creat!");

  } catch (error) {

    alert(error.message);

  }

});

// LOGIN
loginBtn.addEventListener("click", async () => {

  try {

    await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

  } catch (error) {

    alert(error.message);

  }

});

// LOGOUT
logoutBtn.addEventListener("click", async () => {

  await signOut(auth);

});

// AUTH STATE
onAuthStateChanged(auth, (user) => {

  if (user) {

    currentUser = user;

    loginSection.style.display = "none";

    appSection.style.display = "block";

    userEmail.innerText = "Logată ca: " + user.email;

    loadNotes();

  } else {

    currentUser = null;

    loginSection.style.display = "block";

    appSection.style.display = "none";

    notesDiv.innerHTML = "";

  }

});

// ADD NOTE
addNoteBtn.addEventListener("click", async () => {

  if (noteInput.value === "") return;

  await addDoc(collection(db, "notes"), {

    text: noteInput.value,

    userId: currentUser.uid,

    favorite: false,

    date: new Date().toLocaleString("ro-RO")

  });

  noteInput.value = "";

  loadNotes();

});

// LOAD NOTES
async function loadNotes() {

  notesDiv.innerHTML = "";

  const q = query(
    collection(db, "notes"),
    where("userId", "==", currentUser.uid)
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((docSnap) => {

    const noteData = docSnap.data();

    const note = document.createElement("div");

    note.classList.add("note");

    if (noteData.favorite) {
      note.style.border = "2px solid gold";
      note.style.background = "#fff7d6";
    }

    note.innerHTML = `
      <div class="note-text">${noteData.text}</div>

      <div class="note-date">${noteData.date}</div>

      <button class="favoriteBtn">
        ${noteData.favorite ? "⭐ Favorită" : "☆ Favorite"}
      </button>

      <button class="editBtn">✏️ Edit</button>

      <button class="deleteBtn">Șterge</button>
    `;

    const deleteBtn = note.querySelector(".deleteBtn");

    const favoriteBtn = note.querySelector(".favoriteBtn");

    const editBtn = note.querySelector(".editBtn");

    // DELETE
    deleteBtn.addEventListener("click", async () => {

      await deleteDoc(doc(db, "notes", docSnap.id));

      loadNotes();

    });

    // FAVORITE
    favoriteBtn.addEventListener("click", async () => {

      await updateDoc(doc(db, "notes", docSnap.id), {
        favorite: !noteData.favorite
      });

      loadNotes();

    });

    // EDIT
    editBtn.addEventListener("click", async () => {

      const newText = prompt(
        "Editează notița:",
        noteData.text
      );

      if (newText === null || newText.trim() === "") return;

      await updateDoc(doc(db, "notes", docSnap.id), {
        text: newText
      });

      loadNotes();

    });

    notesDiv.appendChild(note);

  });

}

// SEARCH LIVE
searchInput.addEventListener("input", () => {

  const allNotes = document.querySelectorAll(".note");

  const searchText = searchInput.value.toLowerCase();

  allNotes.forEach((note) => {

    const text = note.innerText.toLowerCase();

    if (text.includes(searchText)) {

      note.style.display = "block";

    } else {

      note.style.display = "none";

    }

  });

});

// DARK MODE
darkModeBtn.addEventListener("click", () => {

  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {

    darkModeBtn.innerText = "☀️ Light Mode";

  } else {

    darkModeBtn.innerText = "🌙 Dark Mode";

  }

});