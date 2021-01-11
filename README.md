# mediBD Sujet RC1

11810159 MATHIEU ALLARD-FRANCILLON<br/>
11811574 ALI MESSELMANI<br/>
11702268 WILLIAM ESCRIVA<br/>

# Objectif

Nous avions pour Objectif de créer un explorable interactif avec des données trouvés sur le net.

Nous avons choisis pour données celle fournis par la base de données publique des médicaments (http://base-donnees-publique.medicaments.gouv.fr/).

Afin de réaliser notre site nous utilisons le MEAN STACK<br/>
    -MONGODB, pour la base de donnée (back-end)<br/>
    -EXPRESS.JS, framework de NODE.JS<br/>
    -ANGULAR, framework de Javascript (front-end)<br/>
    -NODE.JS, Pour le serveur (middleware)<br/>


## Installation

Il est nécessaire de disposer de:<br/>
    -npm<br/>
    -nodejs<br/>
    -angular<br/>
    -mongodb<br/>
<br/>
Installation de nodejs:   `sudo apt-get install nodejs`<br/>
Installation de npm:   `sudo apt install npm`<br/>
Installation d'Angular:   `npm install -g @angular/cli`<br/>
Installation de MONGODB:   `sudo apt install mongodb`<br/>

Importation des données:<br/>
-`chmod +x import.sh`<br/>
-`./import.sh`<br/>
Il est important de n'effectuer le script qu'une seule fois ou des doublons seront introduit dans la base de donnée.<br/>
<br/>
Initialisation d'ANGULAR : `npm install` dans la racine du projet.<br/>
<br/>
Lancement du projet : `npm start` a la racine du projet et dans serveur-medibd<br/>
serveur-medibd met un certain temps avant de se lancer ceci est normal (environ 40sec)<br/>
<br/>
le serveur nodeJs se lance sur le port 3000, pour modifier allez dans `MediBd/server-medidb/bin/www` et modifier à la ligne 15 3000 par le port que vous souhaitez, puis modifier dans `MediBd/` la ligne 3 de proxyconfig.json avec le port correspondant.<br/>
<br/>
    
## Organisation

#### NODEJS+MONGODB
La partie NodeJS et MONGODB se situe dans server-medibd, et as été conçu par ESCRIVA William<br/>
     Dans server-medibd/routes/ vous trouverez un fichier api.js qui contient toutes les requêtes qui sont effectuer pour communiquer avec la base de données.<br/>
    Dans server-medibd/models/ vous trouverez les schémas des collections de la base de donnée.<br/>
    <br/>

#### Angular
La partie Angular concerne les autres fichiers autres que ceux contenu dans server-medibd.<br/>
    Dans src/app/ vous trouverez les components et service utiliser pour realiser le site.<br/>
    <br/>
Une représentation visuel des components et services du site:
- app-component<br/>
  - header
  - body<br/>
    -  recherche<br/>
      - recherche-avancee
      - resultats
        - zoomable-circle-packing
        - forced-directed-graph
    -  analyses<br/>
        - liste-labo<br/>
        - pie <br/>
        - stacked-bar<br/>
        - liste-medicament-labo<br/>
  - footer
- donnees.service.ts<br/>

Les parties header, footer, recherche, recherche-avancee, resultats ont été conçu par ALLARD MATHIEU.<br/>
La partie analyses et donnees.service.ts a été concu par ESCRIVA William.




