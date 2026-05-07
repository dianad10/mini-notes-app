# Mini Notes App 💖

## Dicu Diana Madalina – SIMPRE, grupa 1145

Link video prezentare - https://youtu.be/VR3Aw5Qr_3w

Link aplicație publicată - https://chic-nougat-214fe4.netlify.app/

Repository GitHub - https://github.com/dianad10/mini-notes-app

1. Introducere

Mini Notes App este o aplicație web realizată pentru proiectul la disciplina Cloud Computing.

Aplicația permite utilizatorilor să își creeze cont, să se autentifice și să își gestioneze propriile notițe salvate în cloud.

Pentru realizarea aplicației au fost utilizate servicii cloud oferite de Firebase, iar aplicația a fost publicată online folosind platforma Netlify.

2. Descriere problemă

Aplicația a fost realizată pentru gestionarea rapidă a notițelor personale într-un mod simplu și accesibil online.

Utilizatorii pot:

- crea cont;
  
- autentifica în aplicație;
  
- adăuga notițe;
  
- edita notițe;
  
- șterge notițe;
  
- căuta notițe;
  
- utiliza dark mode.

Datele rămân salvate și după refresh datorită stocării în cloud.

3. Descriere API
   
https://console.firebase.google.com/u/1/project/mini-notes-app-996ce/firestore/databases/-default-/data/~2Fnotes~2F68gYILH4TQ6ZyTHtl2vn

Aplicația utilizează Firebase Authentication și Cloud Firestore prin intermediul Firebase SDK și API REST.

Firebase Authentication

Folosit pentru:

- creare cont;
  
- autentificare;
  
- logout;
  
- persistența sesiunii utilizatorului.
  
Cloud Firestore

Folosit pentru:

- salvarea notițelor în cloud;
  
- încărcarea notițelor;
  
- actualizarea și ștergerea datelor.
  
4. Flux de date

La deschiderea aplicației, utilizatorul poate crea un cont sau se poate autentifica folosind email și parolă.

După autentificare:

-> utilizatorul poate adăuga notițe;

->datele sunt salvate în Cloud Firestore;

->notițele sunt afișate automat în aplicație;

->datele rămân salvate după refresh.

Exemple request / response
Adăugare notiță
await addDoc(collection(db, "notes"), {
  text: noteInput.value,
  userId: currentUser.uid,
  favorite: false,
  date: new Date().toLocaleString("ro-RO")
});
Exemplu date salvate în Firestore
{
  "text": "Proiect Cloud Computing",
  "favorite": false,
  "date": "22.07.2025"
}
Metode HTTP utilizate
POST → creare date
GET → citire date
PUT → actualizare date
DELETE → ștergere date
Autentificare și autorizare

Autentificarea este realizată folosind Firebase Authentication pe bază de email și parolă.

5. Capturi ecran aplicație
Pagina de autentificare - <img width="1918" height="1020" alt="image" src="https://github.com/user-attachments/assets/f52e6bce-702b-47ec-bea2-ed4c8450c2f2" />
Dark mode - <img width="1918" height="1017" alt="image" src="https://github.com/user-attachments/assets/2e35b599-2b09-4d91-aeef-ca37abd7ef97" />
Notițe salvate în Firestore - <img width="1913" height="931" alt="image" src="https://github.com/user-attachments/assets/6c674fcc-4022-4ea1-999d-6f7ee8e84d31" />

6. Referințe
   
https://firebase.google.com/

https://developer.mozilla.org/

https://github.com/

https://www.netlify.com/
