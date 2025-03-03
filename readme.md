# Projet de Site de Vaccination - Full Stack (Angular + Spring Boot)

## <u>Description</u>

Ce projet est une application web **Full Stack** développée en **Angular** pour le frontend et **Spring Boot** pour le backend.
Elle permet la **gestion des centres de vaccination** et la **réservation de créneaux** pour les utilisateurs.

## <u>Dépendances du projet</u>

Ce projet utilise certaines technologies.
Il est donc nécessaire d'avoir les dépendances suivantes : 
* Angular : `https://angular.fr/get_started/installation`
* Gradle 8 : `https://docs.gradle.org/current/userguide/installation.html`
* JDK 21 : `https://jdk.java.net/21/` 
* Node : `https://nodejs.org/en/`
* PostgreSQL : `https://www.postgresql.org/download/`

## <u>Mise en place du projet</u>

Pour pouvoir récuperer ce projet, il est nécessaire de cloner ce repo git.
La commande à effectuer est donc `git clone https://github.com/Lysandre23/ProjetFullStack.git`

## <u>Fonctionnalités</u>

### Accès Public

* Recherche des centres de vaccination dans une ville choisie
* Création de compte pour les patients et médecins (médecins, admins, super admins)
* Connexion pour les patients, médecins, administrateurs et super administrateurs

### Accès Spécifique selon le rôle

#### Patients

* Consultation de leurs réservations
* Prise de rendez-vous pour une vaccination

#### Médecins :

* Recherche d'un patient
* Validation d'une vaccination

#### Administrateurs :

* Gestion des médecins de leur centre
* Gestion des réservations de leur centre

#### Super Administrateurs :

* Gestion des centres de vaccination
* Gestion des administrateurs des centres
* Gestion des super administrateurs

## <u>Fonctionnement du projet</u>

### Front

Le front se trouve dans le dossier `./vaccination-app`
Afin d'être lancé, il faut exécuter la commande `ng serve` dans ce dossier

### back

Le back se trouve dans le dossier `./back`
Afin d'être lancé, il faut exécuter la commande `gradle run` dans ce dossier

## <u>Visualisation de la base de données</u>

![](/readme/schemadatabase.PNG?raw=true "Base de données").

## <u>Tests</u>

Les fichiers `rest` et `service` dans le back-end ont été testés dans différents fichiers correspondants.
