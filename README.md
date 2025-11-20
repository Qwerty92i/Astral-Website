# Astral-Website

Cahier des charges – Projet Web : “Explorateur du Cosmos”:

Objectif :
Créer un site web sur lequel nous pouvons avoir les données de chaque planète, meteo de mars, photo de l’astre prise tous les jours par la nasa, décollage de chaque fusée de spacex, position exacte de l’iss avec le nombre d’humains dans l’espace actuellement, astéroïde etc.

Technologies à utiliser :
HTML : structure du site
CSS : mise en forme, animations
JavaScript : interactions, appels API


API(s) :
NASA API
Open Notify
SpaceX API

Structure du site web :

Accueil :
- Affichage de l’histoire de l'espace (premier astronaute, première fusée, satellite, technologie utilisé, dans quel condition…)
  
Système solaire : 
- Affichage du système solaire, si une planète cliquer alors un affichage sort et affiche la planète avec ces détails.
  
Onglet sur l’iss :
- Date de création, où il est en ce moment, combien il y a d’humain dedans etc..
  
Daily Astre :
- Photo de l’astre mise à jour par l’api de la nasa chaque jour
  
SpaceX :
- Api qui permet de savoir le décollage, l'atterrissage, launchpad des fusées etc
  
Quiz sur l’espace :
- Proposer des Quiz sur l’espace pour apporter des défis.
  
Forum :
- Pouvoir discuter entre fan d’espace (avec des modérateurs pouvant gérer l’espace de discussion) ces espaces de discussions seront composé de 2 salon, Le premier sera les informations avec les règles le second est l’endroit de discussion.
  
Connection :
- Permet de se connecter pour pouvoir accéder au forum et avoir un pseudo 


Détail du site web :
Pouvoir se connecter et s'inscrire
A chaque fin de page, ajouter un bouton retour à l'accueil
Arrière-plan sur chaque onglet. Sauf si prédéfinis par son sujet 
Chaque onglet parlera d’un sujet bien précis


![image alt](https://github.com/Qwerty92i/Astral-Website/blob/a950aa48b2fe935b76e4b9f1c71f5762bb106d12/Diagramme%20d'utilisation.jpg)

![image alt](https://github.com/Qwerty92i/Astral-Website/blob/85198a6c8dcf8c70d860915f43a428223078d41c/Diagramme%20de%20s%C3%A9quence.jpg)

![image alt](https://github.com/Qwerty92i/Astral-Website/blob/8e72ea81a16b9c826bb8b7715474f297ef57eeaa/Diagramme%20d'exigence.jpg)




https://api.spacexdata.com/v5/launches/latest
{
  "fairings": null,
  "links": {
    "patch": {
      "small": "https://images2.imgbox.com/eb/0f/Vev7xkUX_o.png",
      "large": "https://images2.imgbox.com/ab/79/Wyc9K7fv_o.png"
    },
    "reddit": {
      "campaign": "https://www.reddit.com/r/spacex/comments/fjf6rr/dm2_launch_campaign_thread/",
      "launch": "https://www.reddit.com/r/spacex/comments/glwz6n/rspacex_cctcap_demonstration_mission_2_general",
      "media": "https://www.reddit.com/r/spacex/comments/gp1gf5/rspacex_dm2_media_thread_photographer_contest/",
      "recovery": "https://www.reddit.com/r/spacex/comments/gu5gkd/cctcap_demonstration_mission_2_stage_1_recovery/"
    },
    "flickr": {
      "small": [],
      "original": [
        "https://live.staticflickr.com/65535/49927519643_b43c6d4c44_o.jpg",
        "https://live.staticflickr.com/65535/49927519588_8a39a3994f_o.jpg",
        "https://live.staticflickr.com/65535/49928343022_6fb33cbd9c_o.jpg",
        "https://live.staticflickr.com/65535/49934168858_cacb00d790_o.jpg",
        "https://live.staticflickr.com/65535/49934682271_fd6a31becc_o.jpg",
        "https://live.staticflickr.com/65535/49956109906_f88d815772_o.jpg",
        "https://live.staticflickr.com/65535/49956109706_cffa847208_o.jpg",
        "https://live.staticflickr.com/65535/49956109671_859b323ede_o.jpg",
        "https://live.staticflickr.com/65535/49955609618_4cca01d581_o.jpg",
        "https://live.staticflickr.com/65535/49956396622_975c116b71_o.jpg",
        "https://live.staticflickr.com/65535/49955609378_9b77e5c771_o.jpg",
        "https://live.staticflickr.com/65535/49956396262_ef41c1d9b0_o.jpg"
      ]
    },
    "presskit": "https://www.nasa.gov/sites/default/files/atoms/files/commercialcrew_press_kit.pdf",
    "webcast": "https://youtu.be/xY96v0OIcK4",
    "youtube_id": "xY96v0OIcK4",
    "article": "https://spaceflightnow.com/2020/05/30/nasa-astronauts-launch-from-us-soil-for-first-time-in-nine-years/",
    "wikipedia": "https://en.wikipedia.org/wiki/Crew_Dragon_Demo-2"
  },
  "static_fire_date_utc": "2020-05-22T17:39:00.000Z",
  "static_fire_date_unix": 1590169140,
  "tdb": false,
  "net": false,
  "window": 0,
  "rocket": "5e9d0d95eda69973a809d1ec",
  "success": true,
  "failures": [],
  "details": "SpaceX will launch the second demonstration mission of its Crew Dragon vehicle as part of NASA's Commercial Crew Transportation Capability Program (CCtCap), carrying two NASA astronauts to the International Space Station. Barring unexpected developments, this mission will be the first crewed flight to launch from the United States since the end of the Space Shuttle program in 2011. DM-2 demonstrates the Falcon 9 and Crew Dragon's ability to safely transport crew to the space station and back to Earth and it is the last major milestone for certification of Crew Dragon. Initially the mission duration was planned to be no longer than two weeks, however NASA has been considering an extension to as much as six weeks or three months. The astronauts have been undergoing additional training for the possible longer mission.",
  "crew": [
    "5ebf1b7323a9a60006e03a7b",
    "5ebf1a6e23a9a60006e03a7a"
  ],
  "ships": [
    "5ea6ed30080df4000697c913",
    "5ea6ed2f080df4000697c90b",
    "5ea6ed2f080df4000697c90c",
    "5ea6ed2e080df4000697c909",
    "5ea6ed2f080df4000697c90d"
  ],
  "capsules": [
    "5e9e2c5df359188aba3b2676"
  ],
  "payloads": [
    "5eb0e4d1b6c3bb0006eeb257"
  ],
  "launchpad": "5e9e4502f509094188566f88",
  "auto_update": true,
  "flight_number": 94,
  "name": "CCtCap Demo Mission 2",
  "date_utc": "2020-05-30T19:22:00.000Z",
  "date_unix": 1590866520,
  "date_local": "2020-05-30T15:22:00-04:00",
  "date_precision": "hour",
  "upcoming": false,
  "cores": [
    {
      "core": "5e9e28a7f3591817f23b2663",
      "flight": 1,
      "gridfins": true,
      "legs": true,
      "reused": false,
      "landing_attempt": true,
      "landing_success": true,
      "landing_type": "ASDS",
      "landpad": "5e9e3032383ecb6bb234e7ca"
    }
  ],
  "id": "5eb87d46ffd86e000604b388"
}

