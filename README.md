# P6-Construisez une API sécurisée pour une application d'avis gastronomiques
Prérequis : 
- Environnement Node.js
- Angular CLI
- Installer le package 'mangoose'
- Installer 'nodemon'

Téléchargez le frontend depuis openclassroom en cliquant sur le lien du repo suivant, et suivez les instructions : https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6


Puis executer cette commande pour lancer le serveur du frontend :

```shell
ng serve
```

Pour le côté back-end, se placer dans le dossier "backend" et exécuter :

Cloner ce repository backend actuel ⬇️
Ajouter un fichier de configuration nommé ".env" à la racine du backend. A l'intérieur, 5 variables d'environnement "secrètes" seront définies:
MONGODB_PATH = 'lien_vers_la_base_de_données_mongoDB'
TOKEN_KEY = 'clé_secrète_pour_crypter_les_tokens'
EMAIL_KEY = 'clé_secrète_pour_crypter_les_emails'
COOKIE_KEY = 'clé_secrète_pou_la_session'
AUTHORIZED_ORIGIN = 'http://localhost:4200'

Lancer le backend : 

Dans un autre terminal, accéder au dossier du backend
Installer les dépendances: npm install
Lancer nodemon server

```shell
nodemon server.js
```

Le frontend est accessible à l'adresse http://localhost:4200
Pour des tests spécifiques (avec postman par exemple), le backend répond à l'adresse: http://localhost:3000 (attention: authentification requise pour toutes les routes /api/sauces/)



