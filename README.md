*Plateforme web de petites annonces permettant aux utilisateurs de publier, consulter et gérer des annonces en ligne.

**Maquettage et wireframe ici :

https://www.figma.com/design/usWLCf602VN3Ye2b5gvUDV/Untitled?node-id=0-1&m=dev&t=qUWnrvnHJhMmeU4y-1

*Stack technique:

Front: React + TailwindCSS
Back: Node.js + Express
BDD: mySQL

*Arborescence théorique:

├── frontend/
 ├── accueil
 ├── détails nnonces
 ├── création compte
 ├── édition
 ├── login
 ├── création d'une annonce
 ├── dashboard
 ├── Liste annonces
 └── recherche

├── backend/

│ ├── routes/
│ ├── controllers/ 
│ ├── models/
│ ├── middleware/ 
│ ├── validations/
│ ├── config/
    └── db.js
├── app.js
├── .env 
└── .gitignore