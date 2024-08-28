/* SOMMAIRE */
//  -- LIGNE 20 -- VARIABLES GLOBALES
//  -- LIGNE 78 -- GESTION DES CAROUSSELS
//  -- LIGNE 336 -- GESTION DE L'AFFICHAGE INITIAL DES PRODUITS
//  -- LIGNE 383 -- GESTION DE L'AFFICHAGE DES PRODUITS EN FONCTIONS DE LA CATEGORIE SELECTIONNEE DANS LE CAROUSSEL EN HAUT DE LA PAGE
//  -- LIGNE 461 -- GESTION DE LA NAVIGATION DANS L'OVERLAY
//  -- LIGNE 556 -- GESTION DE LA CONCEPTION D'UN MENU ET DE SON AJOUT AU PANIER ET A LA COMMANDE
//  -- LIGNE 693 -- GESTION DE LA SELECTION, DE LA TAILLE ET DE LA QUANTITE DES BOISSONS
//  -- LIGNE 799 -- GESTION DE LA SELECTION ET DES QUANTITES DES AUTRES EXTRAS
//  -- LIGNE 856 -- GESTION DE L'AJOUT DES BOISSONS ET DES AUTRES EXTRAS DANS LE PANIER ET LA COMMANDE (VARIABLE GLOBALE)
//  -- LIGNE 916 -- GESTION DE L'AFFICHAGE DE L'OVERLAY ET DE LA CONSTRUCTION DE LA VARIABLE GLOBALE "commande"
//  -- LIGNE 989 -- GESTION DE L'AFFICHAGE DU PRIX DE LA COMMANDE DANS LE PANIER ET DU CHOIX DE LIEU DE  CONSOMMATION
//  -- LIGNE 1021 -- FONCTION DE REINITIALISATION
//  -- LIGNE 1085 -- GERE L'AJOUT DE LA COMMANDE DANS LE LOCAL STORAGE ET CHANGEMENT DE PAGE
//  -- LIGNE 1110 -- FONCTION DE VERIF DES DROITS D'ACCES A LA PAGE
//  -- LIGNE 1133 -- GESTION DE L'AFFICHAGE DU PANIER EN RESPONSIVE


//  VARIABLES GLOBALES

// L'élément de l'overlay qui contient les différentes étapes de la commande.
let overlay = document.querySelector(".overlay")
// Le fond grisé derrière l'overlay
let fondGris = document.querySelector(".behind-overlay")
// Etape actuelle de la commande affichée dans l'overlay.
let currentEtape = 0
// Les boutons permettant de passer à l'étape suivante ou précédente dans l'overlay.
let overlayNextButtons = document.querySelectorAll(".next-step")
let overlayPrevButtons = document.querySelectorAll(".prev-step")
// Les boutons permettant de fermer l'overlay.
let closeButtons = document.querySelectorAll(".cross-btn")
// Le bouton permettant de finaliser la conception du menu dans l'overlay.
let finalButton = document.querySelector(".final-step")

// Tableau des phrases d'accroches au dessus des produits affichés à l'écran
let tabAccroche = {
    menus: "Un sandwich, une friture ou une salade et une boisson",
    boissons: "Une petite soif, sucrée, légère, rafraîchissante",
    burgers: "Savourez nos burgers, généreux et gourmands, avec du fromage fondant",
    frites: "Frites, potatoes, la pomme de terre dans tous ses états",
    encas: "Grignotez nos encas, parfaits pour une petite faim",
    wraps: "Découvrez nos wraps, frais et garnis de délicieuses saveurs",
    salades: "Légèreté et fraîcheur avec nos salades, composées au gré de vos envies",
    desserts: "Terminez sur une note sucrée avec nos desserts irrésistibles",
    sauces: "Rehaussez vos plats avec nos sauces, onctueuses et variées"
}

// // Objet contenant les détails de la commande en cours.
let commande = {
    prix: 0.00,
    menus: [],
    extras: [],
    location: localStorage.getItem("location"),
    numero:"",
}

// // Objet contenant les détails du menu en cours de conception.
let menu = {
    burger: "",
    size: "Maxi",
    accompagnement: "Frites",
    boisson: "Coca-cola",
    sauce: "Classic barbecue",
    prix: 0,
}
// Objet contenant les détails de la boisson ou de l'extra en cours de sélection
let extra = {
    nom: "",
    prix: 0,
    quantity: 1,
    cl: 30,
    type: "",
}





/*GESTION DES CAROUSSELS*/

/**
 * Rôle : Récupère les catégories en appelant "categories.json" puis crée et remplie le caroussel en haut de page
 * Retourne: Néant
 */
function getCategories() {
    fetch(`../datas/categories.json`)
    .then(res => {
        return res.json()
    })
    .then(rep => {
        fillCaroussel(rep)
        handleCategories()
    })
}
getCategories()

/**
 * Rôles : - Crée un caroussel pour les catégories en haut de la page 
 *         - Rempli le caroussel et ajoute la classe active sur le premier élément du caroussel
 * @param {Array} datas => un tableau d'objet "categories"
 * Retourne : Néant
 */
function fillCaroussel(datas) {
    // Initialisation du Caroussel
    let swiper = new Swiper(".mySwiper", {
        navigation: {
            nextEl: "next-btn",
            prevEl: "prev-btn",
        },
        breakpoints: {
            // Écrans entre 0 et 400px de large
            0: {
                slidesPerView: 1.6,
                spaceBetween: 10,
            },
            // Écrans >= 400px
            400: {
                slidesPerView: 2.3,
                spaceBetween: 10,
            },
            // Écrans >= 600px
            600: {
                slidesPerView: 3.2,
                spaceBetween: 10,
            },
            1000: {
                slidesPerView: 3.8,
                spaceBetween: 10,
            },
            1280:{
                slidesPerView: 5,
                spaceBetween: 10,
            },
            1400:{
                slidesPerView: 6,
                spaceBetween: 10,
            }
        },
    });
    // Evenements au clique pour naviguer dans le caroussel avec les flèches
    // Récupération des flèches
    let prevBtn = document.getElementById("prev-btn")
    let nextBtn = document.getElementById("next-btn")
    // Ajout des évènements au clique
    prevBtn.addEventListener("click", () => {
        swiper.slidePrev(); // Passe à la diapositive précédente
    })
    nextBtn.addEventListener("click", () => {
        swiper.slideNext(); // Passe à la diapositive suivante
    })
    // Récupération du caroussel
    let caroussel = document.querySelector(".caroussel-categorie")
    // Pour chaque catégorie
    datas.forEach(data => {
        // Mettre la première lettre du nom de la catégorie en majuscule
        let nameWithMaj = data.title.charAt(0).toUpperCase() + data.title.slice(1).toLowerCase()
        // Ajout d'une slide dans le carousel avec le nom de la catégorie et son illustration
        caroussel.innerHTML += `<div class="swiper-slide">
                                    <div class="categorie-box flexwrap flexcolumn justend align-center" id="${data.title}">
                                        <div class="caroussel-illustration"><img src="./assets/images/${data.image}" alt="Image représenatnt les ${data.title} de chez Wacdo" class="responsive-img"></div>
                                        <p>${nameWithMaj}</p>
                                    </div>
                                </div>`
    });
    // Ajout de la classe "active-categorie" sur la categorie des menus
    let menus = document.getElementById("menus")
    menus.classList.add("active-categorie")
}

/**
 * Rôle : récupère les produits et rempli le caroussel des boissons et celui des sauces dans l'overlay de conception d'un menu
 * Retourne : Néant
 */
function getBoissonsAndSauces() {
    // Initialisation du Caroussel
    fetch(`../datas/produits.json`)
        .then(res => {
            return res.json()
        })
        .then(rep => {
            // Remplissage du caroussel des boissons
            fillBoissonsCaroussel(rep.boissons)
            // Remplissage du caroussel des sauces
            fillSaucesCaroussel(rep.sauces)
            composeMenu()
            // addMenu()
        })
}
getBoissonsAndSauces()

/**
 * Rôle : - Crée un caroussel pour les boissons dans l'overlay concernant la conception d'un menu
 *        - Rempli le caroussel et ajoute la classe active sur le premier élément du caroussel
 * @param {Array} boissons => un tableau d'objets boisson
 * Retourne : Néant
 */
function fillBoissonsCaroussel(boissons) {
    // Initiialisation du caroussel
    let swiper = new Swiper(".overlayBoissonSwipper", {
        slidesPerView: 3.5,
        spaceBetween: 0,
        navigation: {
            nextEl: "overlay-boisson-next-btn",
            prevEl: "overlay-boisson-prev-btn",
        },
        breakpoints: {
            // Écrans entre 0 et 530px de large
            0: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            // Écrans >= 440px
            440: {
                slidesPerView: 1.3,
                spaceBetween: 10,
            },
            620: {
                slidesPerView: 1.5,
                spaceBetween: 10,
            },
            860: {
                slidesPerView: 2.1,
                spaceBetween: 10,
            },
            1080: {
                slidesPerView: 2.7,
                spaceBetween: 10,
            },
        },
    });

    // Evenements au clique pour naviguer dans le caroussel avec les flèches
    // Récupération des flèches
    let prevBtn = document.getElementById("overlay-boisson-prev-btn")
    let nextBtn = document.getElementById("overlay-boisson-next-btn")
    // Ajout des évènements au clique
    prevBtn.addEventListener("click", () => {
        swiper.slidePrev() // Passe à la diapositive précédente
    })
    nextBtn.addEventListener("click", () => {
        swiper.slideNext() // Passe à la diapositive suivante
    })
    // REcuperation du container de slide
    let slideContainer = document.querySelector(".overlay-caroussel-boissons")
    // Pour chaque boisson
    boissons.forEach(boisson => {
        // Ajoute un élément dans le container
        slideContainer.innerHTML += `<div class="swiper-slide">
                                        <div itemscope itemtype="http://schema.org/Product"  class="boisson flexwrap flexcolumn spacebetween align-center p8" id="boissons-${boisson.id}" data-boisson="${boisson.nom}">
                                            <div class="boisson-illustration"><img itemprop="image" src="./assets/images/${boisson.image}" alt="Image d'un gobelet de ${boisson.nom}" class="responsive-img"></div>
                                            <p itemprop="name">${boisson.nom}</p>
                                        </div>
                                    </div>`
    });

    // Ajout de la classe active sur la première boisson
    let slidesBoissons = document.querySelectorAll(".boisson")
    slidesBoissons[0].classList.add("active-element-boisson")
}

/**
 * Rôle : - Crée un caroussel pour les sauces dans l'overlay concernant la conception d'un menu
 *        - Rempli le caroussel et ajoute la classe active sur le premier élément du caroussel
 * @param {Array} sauces => un tableau d'objet "sauces"
 * Retourne : Néant
 */
function fillSaucesCaroussel(sauces) {
    let swiper = new Swiper(".overlaySauceSwipper", {
        slidesPerView: 3.5,
        spaceBetween: 0,
        navigation: {
            nextEl: "overlay-sauce-next-btn",
            prevEl: "overlay-sauce-prev-btn",
        },
        breakpoints: {
            // Écrans entre 0 et 530px de large
            0: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            // Écrans >= 440px
            440: {
                slidesPerView: 1.3,
                spaceBetween: 10,
            },
            620: {
                slidesPerView: 1.5,
                spaceBetween: 10,
            },
            860: {
                slidesPerView: 2.1,
                spaceBetween: 10,
            },
            1080: {
                slidesPerView: 2.7,
                spaceBetween: 10,
            },
        },
    });

    // Evenements au clique pour naviguer dans le caroussel avec les flèches
    // Récupération des flèches
    let prevBtn = document.getElementById("overlay-sauce-prev-btn")
    let nextBtn = document.getElementById("overlay-sauce-next-btn")
    // Ajout des évènements au clique
    prevBtn.addEventListener("click", () => {
        swiper.slidePrev(); // Passe à la diapositive précédente
    })
    nextBtn.addEventListener("click", () => {
        swiper.slideNext(); // Passe à la diapositive suivante
    })
    // REcuperation du container de slide
    let slideContainer = document.querySelector(".overlay-caroussel-sauces")
    sauces.forEach(sauce => {
        slideContainer.innerHTML += `<div class="swiper-slide">
                                        <div itemscope itemtype="http://schema.org/Product" class="sauce flexwrap flexcolumn spacebetween align-center p8" id="sauces-${sauce.id}" data-sauce="${sauce.nom}">
                                            <div class="sauce-illustration"><img itemprop="image" src="./assets/images/${sauce.image}" alt="Image représentant une sauce ${sauce.nom}" class="responsive-img"></div>
                                            <p itemprop="name">${sauce.nom}</p>
                                        </div>
                                    </div>`
    });

    // Ajout de la classe active sur la première sauce
    let slidesSauces = document.querySelectorAll(".sauce")
    slidesSauces[0].classList.add("active-element-sauce")
}










/*GESTION DE L'AFFICHAGE INITIAL DES PRODUITS*/

/**
 * Remplir le container gérant l'affichage du titre et des produits associé à la catégorie active
 * Retourne : Néant
 */
function getProducts() {
    // J'appelle la liste de mes produits
    fetch(`../datas/produits.json`)
        .then(res => {
            return res.json()
        })
        .then(rep => {
            // Affiche les produits pour la catégorie des menus car c'est la classe par defaut sélectionnée à l'affichage de la page
            afficheLesProduitsInit(rep)
        })
}
getProducts()

function afficheLesProduitsInit(data) {
    // Récupération des produits de la catégorie concernée
    let produits = data["menus"]
    // Récuperation du container où les produits doivent s'afficher
    let container = document.querySelector(".liste-produits-categorie")
    // Je vide le container
    container.innerHTML = ``
    // Pour chaque produit
    produits.forEach(produit => {
        // Je l'affiche dans le container
        container.innerHTML += `<div itemscope itemtype="http://schema.org/Product" class="card-produit p8 flexwrap justcenter align-center" id="menu-${produit.id}" data-nom="${produit.nom}" data-prix="${produit.prix}" data-image="${produit.image}">
                                    <div class="produit-img"><img itemprop="image" src="/assets/images${produit.image}" alt="Image représentant un ${produit.nom}" class="responsive-img"></div>
                                    <p itemprop="name" class="nom-produit w100 textcenter">${produit.nom}</p>
                                    <p itemprop="price" class="prix-produit w100 textcenter">${produit.prix.toFixed(2)} €</p>
                                </div>`
    });

    construitLaCommande()
}









/* GESTION DE L'AFFICHAGE DES PRODUITS EN FONCTIONS DE LA CATEGORIE SELECTIONNEE DANS LE CAROUSSEL EN HAUT DE LA PAGE*/

/**
 * Rôles : Au clique sur une catégorie dans le caroussel en haut de page : - Ajoute un indicateur visuel (bordure jaune épaisse) sur la catégorie sélectionnée
 *                                                                         - Affiche les produits de la catégories sélectionnée sur la page
 * Retourne : Néant
 */
function handleCategories() {
    // Récupération des éléments représentant les catégories dans le caroussel en haut de la page
    let categories = document.querySelectorAll(".categorie-box")

    // Pour chaque slide de catégorie
    categories.forEach(categorie => {
        // Récupération du nom de la catégorie
        let nomCategorie = categorie.id
        // Lorsque je clique dessus
        categorie.addEventListener("click", () => {
            // Récupération de la slide avec catégorie active
            let activeCategorie = document.querySelector(".active-categorie")
            // J'enlève la classe "active-categorie" à l'ancienne slide active
            activeCategorie.classList.remove("active-categorie")
            // J'ajoute la classe "active-categorie" à la slide sur laquelle j'ai cliqué
            categorie.classList.add("active-categorie")

            // J'appelle la liste de mes produits
            fetch(`../datas/produits.json`)
                .then(res => {
                    return res.json()
                })
                .then(rep => {
                    // Affichage des produits de la catégorie sélectionnée
                    afficheLesProduitsAuClique(rep, nomCategorie)
                })
        })
    });
}


/**
 * Rôle : Récupère les produit en paramètre et les affiche à l'écran
 * @param {Array} data => un tableau d'objets "produits"
 * @param {String} nomCategorie => le nom de la catégorie
 * Retourne : Néant
 */
function afficheLesProduitsAuClique(data, nomCategorie) {
    // Récupération des produits de la catégorie concernée
    let produits = data[nomCategorie]
    // Récuperation du container où les produits doivent s'afficher
    let container = document.querySelector(".liste-produits-categorie")
    // Récuperation de la div affichant le titre et l'accroche pour la catégorie des produits affichés
    let divTitreAccroche = document.querySelector(".titre-categorie")
    // J'affiche le titre et l'accroche
    divTitreAccroche.innerHTML = `<h2>Nos ${nomCategorie}</h2>
                                <p>${tabAccroche[nomCategorie]}</p>`
    // Je vide le container
    container.innerHTML = ``
    // Pour chaque produit
    produits.forEach(produit => {
        // Je l'affiche dans le container
        container.innerHTML += `<div itemscope itemtype="http://schema.org/Product" class="card-produit p8 flexwrap justcenter align-center" id="${nomCategorie}-${produit.id}" data-nom="${produit.nom}" data-prix="${produit.prix}" data-image="${produit.image}">
                                    <div class="produit-img"><img itemprop="image" src="/assets/images${produit.image}" alt="Image représentant un ${produit.nom}" class="responsive-img"></div>
                                    <p itemprop="name" class="nom-produit w100 textcenter">${produit.nom}</p>
                                    <p itemprop="price" class="prix-produit w100 textcenter">${produit.prix.toFixed(2)} €</p>
                                </div>`
    });

    construitLaCommande()
}










/* GESTION DE LA NAVIGATION DANS L'OVERLAY */

/**
 * Rôle : Afficher une étape de l'overlay selon le nombre passé en paramètre
 * @param {Number} nombre => un nombre entier
 * Retourne : Néant
 */
function afficheProchaineEtape(nombre) {
    let overlayEtape = document.getElementById(`overlay-etape-${nombre}`)
    overlayEtape.classList.remove("d-none")
}

/**
 * Rôle : Cacher une étape de l'overlay selon le nombre passé en paramètre
 * @param {NUmber} nombre => un nombre entier
 * Retourne : Néant
 */
function cacheEtape(nombre) {
    let overlayEtape = document.getElementById(`overlay-etape-${nombre}`)
    overlayEtape.classList.add("d-none")
}

/**
 * Rôle : Ajouter des écouteur d'évènement sur les bouttons de l'overlay afin de naviguer dans ce dernier
 * Retourne : Néant
 */
function navigateOverlay(){

    // Ajout des ecouteurs d'évènement pour chaques bouttons
    // Pour chaque bouuttons "etape suivante"
    overlayNextButtons.forEach(button => {
        // Au clique
        button.addEventListener("click", () => {
            // On cache l'etape courante
            cacheEtape(currentEtape)
            // La prochaine etape devient l'étape courrante
            currentEtape += 1
            // Affiche la nouvelle etape courrante
            afficheProchaineEtape(currentEtape)
        })
    });
    
    // Pour chaque boutton "retour" (soit etape précédente)
    overlayPrevButtons.forEach(button => {
        // Au clique
        button.addEventListener("click", () => {
            // On cache l'etape courante
            cacheEtape(currentEtape)
            // L'étape précédente devient l'étape courrante
            currentEtape -= 1
            // Affiche la nouvelle etape courrante
            afficheProchaineEtape(currentEtape)
        })
    });
    
    // Pour chaque button servant à fermer l'overlay
    closeButtons.forEach(button => {
        // Au clique
        button.addEventListener("click", () => {
            // Cache l'overlay et son étape
            cacheEtape(currentEtape)
            overlay.classList.add("d-none")
            // Réinitialisation de l'étape
            currentEtape = 0
            // Faire disparaitre le fond gris
            fondGris.classList.add("d-none")
            // Réinitialisation du menu
            reinitAll()
        })
    });
    
    // Pour le boutton servant à finaliser la conception du menu
    finalButton.addEventListener("click", () => {
        // Cache l'overlay et son étape
        cacheEtape(currentEtape)
        overlay.classList.add("d-none")
        // Réinitialisation de l'étape
        currentEtape = 0
        // Faire disparaitre le fond gris
        fondGris.classList.add("d-none")
        // Ajout du menu dans le panier et la commande
        addMenu()
    })
}
navigateOverlay()










/* GESTION DE LA CONCEPTION D'UN MENU ET DE SON AJOUT AU PANIER ET A LA COMMANDE*/

/**
 * Rôle : Ajouter le nom du burger au menu
 * @param {String} nomMenu => le nom du menu
 * Retourne : Néant
 */
function chooseBurger(nomMenu) {
    // Dans nomMenu j'enlève les 5 premier caractère correspondant à "Menu " et je récupère le reste pour l'affecter au nom du burger dans la variable menu
    menu.burger = nomMenu.substring(5)
}

/**
 * Rôle : changer la taille du menu et ajuster le prix
 * @param {Object} menu => l'objet menu (variable globale)
 * @param {String} newSize => le nom de la taille du menu
 * Retourne : Néant
 */
function changeMenuSize(menu, newSize) {
    // Si la nouvelle taille choisie est différente de la taille actuelle
    if (menu.size !== newSize) {
        // Si l'utilisateur à choisi la taille normal
        if (newSize === "normal") {
            // Le prix du menu baisse de 1€
            menu.prix = (parseFloat(menu.prix) - 1.00).toFixed(2);

        // Sinon si l'utilisateur à choisi la taille maxi
        } else if (newSize === "maxi") {
            // LE prix du menu augmente de 1€
            menu.prix = (parseFloat(menu.prix) + 1.00).toFixed(2);
        }
        
        // Met à jour la taille actuelle
        menu.size = newSize;
    }
}

/**
 * Rôle : composer le menu selon les choix et ajoute un indicateur visuel sur les éléments sélectionnés
 * Retourne : Néant
 */
function composeMenu() {

    // Recuperation des éléments concernant le choix de la taille
    let tailles = document.querySelectorAll(".taille-menu")
    // Pour chaque choix de taille
    tailles.forEach(taille => {
        // Au clique
        taille.addEventListener("click", () => {
            // Recuperation de la taille sélectionnée
            let activeTaille = document.querySelector(".active-element-taille")
            // J'enlève la sélection sur la taille sélectionnée
            activeTaille.classList.remove("active-element-taille")
            // La taille sur laquelle j'ai cliqué devient celle sélectionnée
            taille.classList.add("active-element-taille")
            // Je change la valeur de la taille du menu et le prix du menu (Si taille normale j'enlève 1€ - si taille maxi j'ajoute 1€)
            changeMenuSize(menu, taille.getAttribute('data-taille'))
        })
    });
    
    // Gestion du choix de l'accompagnement
    // Recuperation des éléments concernant le choix de l'accompagnement
    let accompagnements = document.querySelectorAll(".accompagnement-menu")
    // Meme principe que pour les tailles juste avant
    accompagnements.forEach(accompagnement => {
        accompagnement.addEventListener("click", () => {
            let activeAccompagnement = document.querySelector(".active-element-accompagnement")
            activeAccompagnement.classList.remove("active-element-accompagnement")
            accompagnement.classList.add("active-element-accompagnement")
            // Assignation de l'accompagnement
            menu.accompagnement = accompagnement.getAttribute('data-accompagnement')
        })
    })

    // Gestion du choix de la boisson
    let boissons = document.querySelectorAll(".boisson")
    boissons.forEach(boisson => {
        boisson.addEventListener("click", () => {
            let activeBoisson = document.querySelector(".active-element-boisson")
            activeBoisson.classList.remove("active-element-boisson")
            boisson.classList.add("active-element-boisson")
            menu.boisson = boisson.getAttribute("data-boisson")
        })
    });
    
    // Gestion du choix de la sauce
    let sauces = document.querySelectorAll(".sauce")
    sauces.forEach(sauce => {
        sauce.addEventListener("click", () => {
            let activeSauce = document.querySelector(".active-element-sauce")
            activeSauce.classList.remove("active-element-sauce")
            sauce.classList.add("active-element-sauce")
            menu.sauce = sauce.getAttribute("data-sauce")
        })
    });
}

/**
 * Rôle : Ajouter le menu composé dans le panier(visuel) et dans la commande(variable globale)
 */
function addMenu() {
    // Récupération de la zone d'affichage du panier
    let panier = document.querySelector(".contenu-commande")

    // Ajout du menu dans la commande
    commande.menus.push(menu)
    // Ajout du prix du menu dans la commande
    commande.prix = parseFloat(commande.prix) + parseFloat(menu.prix)
    // Affiche le prix de la commande dans le panier
    affichePrixCommande()

    // Ajout du menu dans le panier
    panier.innerHTML += `<div itemscope itemtype="http://schema.org/OrderItem" class="elt-commande flexwrap w100">
        <div class="flexwrap spacebetween w100">
        <h3 itemprop="name" class="w80">1 menu ${menu.size} Best Of ${menu.burger}</h3>
        <div class="trashbox"><img src="./assets/images/background_et_icones/trash.png" alt="Icone représentant une poubelle"></div>
        </div>
        <ul class="ml32">
        <li>${menu.accompagnement}</li>
        <li>${menu.boisson}</li>
        <li>${menu.sauce}</li>
        </ul>
        </div>`
    // Récupération et réinitialisaion les éléments sélectionné
    reinitAll()
    // })
}










/* GESTION DE LA SELECTION, DE LA TAILLE ET DE LA QUANTITE DES BOISSONS*/

/**
 * Rôle : Afficher les images en rapport avec la boisson sélectionnée dans l'overlay permettant de choisir sa taille et sa quantité
 * @param {String} produitImage => le nom de l'image de la boisson
 * @param {String} altImage => le nom de la boisson
 * Retourne : Néant
 */
function afficheBoissonsOverlay(produitImage,altImage){
    // Récupération des balises images dans l'overlay
    let images = document.querySelectorAll(".boisson-extra-image")
    // Pour chaque image
    images.forEach(image => {
        // Assignation de la source
        image.src = "/assets/images" + produitImage
        image.alt = `Image représentant un gobelet de ${altImage}`
    });
}

/**
 * Rôle : Changer la taille de la boisson et ajuster son prix en conséquence
 * @param {Object} boisson => un objet boisson (correspondant à la variable globale "extra")
 * @param {String} newBoissonSize => la taille de la boisson ("petite" ou "grande" correspondant à 30cl ou 50cl)
 */
function changeBoissonSize(boisson, newBoissonSize) {
    // Ne change que si la nouvelle taille est différente de la taille actuelle
    if (boisson.size !== newBoissonSize) {
        // Ajuste le prix selon la nouvelle taille
        if (newBoissonSize === "petite") {
            // Si on passe de maxi à normal
            boisson.prix = (parseFloat(boisson.prix) - 0.50).toFixed(2);
            boisson.cl = 30
        } else if (newBoissonSize === "grande") {
            // Si on passe de normal à maxi
            boisson.prix = (parseFloat(boisson.prix) + 0.50).toFixed(2);
            boisson.cl = 50
        }
        
        // Met à jour la taille actuelle
        boisson.size = newBoissonSize;
    }
}

/**
 * Rôle : Permet de choisir la quantité de boisson voulue
 * Retourne : Néant
 */
function addQuantityBoisson() {
    // Récuperation des boutons gérant la quantité de la boisson sélectionné
    let addOneBtn = document.querySelector(".plus-btn-boisson")
    let removeOneBtn = document.querySelector(".moins-btn-boisson")
    // Recuperation du compteur pour les boissons
    let counter = document.querySelector(".counter-boisson")
    
    // Ajout des ecouteurs d'évènements au clique
    addOneBtn.addEventListener("click", () => {
        // Ajouter 1 à la quantité de boisson sélectionné
        extra.quantity = parseInt(extra.quantity) + 1
        // Affiche le compteur
        counter.innerText = extra.quantity
    })
    
    removeOneBtn.addEventListener("click", () => {
        // Si la quantité est supérieure à 1
        if (parseInt(extra.quantity) >= 2) {
            // Enleve 1 à la quantité de boisson sélectionné
            extra.quantity = parseInt(extra.quantity) - 1
            // Affiche le compteur
            counter.innerText = extra.quantity
        }
    })
}
addQuantityBoisson()

/**
 * Rôle permet de sélectionner la taille de la boisson sélectionnée (30cl ou 50cl)
 * Retourne : Néant
 */
function chooseBoissonSize() {
    // Récupération des éléments permettant de choisir la taille de la boisson
    let taillesBoisson = document.querySelectorAll(".boisson-extra")
    
    // Ajout d'ecouteurs d'évènement pour chaque élément permettant de choisir la taille
    taillesBoisson.forEach(boisson => {
        // Au clique
        boisson.addEventListener("click", () => {
            // Recuperation de la taille de boisson active
            let tailleBoissonActive = document.querySelector(".active-boisson-extra")
            // L'ancien choix n'est plus actif
            tailleBoissonActive.classList.remove("active-boisson-extra")
            // Le choix sur lequel j'ai cliqué devient actif
            boisson.classList.add("active-boisson-extra")
            changeBoissonSize(extra, boisson.getAttribute("data-taille"))
        })
    })
}
chooseBoissonSize()









/*GESTION DE LA SELECTION ET DES QUANTITES DES AUTRES EXTRAS*/

/**
 * Rôle : Afficher les images en rapport avec le produit sélectionnée dans l'overlay permettant de choisir sa quantité
 * @param {String} produitImage => le nom de l'image du produit
 * @param {*} produitName => le nom du produit
 * Retourne : Néant
 */
function afficheExtraOverlay(produitImage, produitName) {
    // Récupération des balises images dans l'overlay
    let image = document.querySelector(".extra-image")
    // Changement de la source
    image.src = "/assets/images" + produitImage
    image.alt = `Image représentant un(e) ${produitName}`
    let name = document.querySelector(".extra-name")
    name.innerText = produitName
}

/**
 * Rôle : Permet de choisir la quantité du produit sélectionné
 * Retourne : Néant
 */
function addQuantityExtra() {
    // Récuperation des boutons gérant la quantité du produit sélectionné
    let addOneBtn = document.querySelector(".plus-btn-extra")
    let removeOneBtn = document.querySelector(".moins-btn-extra")
    // Recuperation du compteur pour les extras
    let counter = document.querySelector(".counter-extra")
    
    // Ajout des ecouteurs d'évènements au clique
    addOneBtn.addEventListener("click", () => {
        // Ajouter 1 à la quantité de l'extra sélectionné
        extra.quantity = parseInt(extra.quantity) + 1
        // Affiche le compteur
        counter.innerText = extra.quantity
    })
    
    removeOneBtn.addEventListener("click", () => {
        // Si la quantité est supérieure à 1
        if (parseInt(extra.quantity) >= 2) {
            // Enleve 1 à la quantité de l'extra sélectionné
            extra.quantity = parseInt(extra.quantity) - 1
            // Affiche le compteur
            counter.innerText = extra.quantity
        }
    })
}
addQuantityExtra()









/* GESTION DE L'AJOUT DES BOISSONS ET DES AUTRES EXTRAS DANS LE PANIER ET LA COMMANDE (VARIABLE GLOBALE) */

/**
 * Rôle : Ajouter la quantité du produit sélectionné (variable globale "extra") au panier(visuel) et à la commande (variable globale)
 *        Cette fonction est utilisée pour l'ajout des boissons et des autres produits (sauf menu)
 * Retourne : Néant
 */
function addExtra() {
    // Récupération des bouttons permettant d'ajouter l'extra / la boisson au panier
    let addBtns = document.querySelectorAll(".add-extra")
    // Récupération de la zone d'affichage du panier
    let panier = document.querySelector(".contenu-commande")
    // Ajout d'un ecouteur d'évènement pour chaque boutton
    addBtns.forEach(addBtn => {
        addBtn.addEventListener("click", () => {
            // Si c'est une/des boissons
            if (extra.type == "boisson") {
                // Ajout dans le panier avec indication de la taille
                panier.innerHTML += `<div itemtype="http://schema.org/OrderItem" class="elt-commande flexwrap spacebetween w100">
                                        <h3 itemprop="name" class="w80">${extra.quantity} ${extra.nom} ${extra.cl}Cl</h3>
                                        <div class="trashbox"><img src="./assets/images/background_et_icones/trash.png" alt="Icone représentant une poubelle"></div>
                                    </div>`
            }

            // Sinon
            else {
                // Ajout dans le panier
                panier.innerHTML += `<div itemtype="http://schema.org/OrderItem" class="elt-commande flexwrap spacebetween w100">
                                        <h3 itemprop="name" class="w80">${extra.quantity} ${extra.nom}</h3>
                                        <div class="trashbox"><img src="./assets/images/background_et_icones/trash.png" alt="Icone représentant une poubelle"></div>
                                    </div>`
            }
            // Ajout du prix de l'extra/boisson dans la commande (quantité multiplié par prix unitaire)
            commande.prix = (parseFloat(commande.prix) + (parseInt(extra.quantity) * parseFloat(extra.prix))).toFixed(2)
            // Affiche le prix dans le panier
            affichePrixCommande()
            // Ajout de l'extra dans la variable commande
            commande.extras.push(extra)
            // Cache l'overlay et son étape
            cacheEtape(currentEtape)
            overlay.classList.add("d-none")
            // Faire disparaitre le fond gris
            fondGris.classList.add("d-none")
            // Réinitialisation de l'étape
            currentEtape = 0
            // Reinitialisation de la variable extra et de la boisson sélectionnée
            reinitAll()
        })
    })
}
addExtra()









/* GESTION DE L'AFFICHAGE DE L'OVERLAY ET DE LA CONSTRUCTION DE LA VARIABLE GLOBALE "commande" */

/**
 * Rôle : Gérer l'affichage de l'overlay et assigner certaines infos du produit sélectionné (nom,prix,type) à la variable globale "commande"
 * Retourne : Néant
 */
function construitLaCommande() {
    // Récupération des cartes produits
    let cardProduits = document.querySelectorAll(".card-produit")
    
    // Pour chaque carte
    cardProduits.forEach(card => {
        // Lorsque je clique dessus
        card.addEventListener("click", () => {
            // Si c'est un menu
            if (card.id.includes("menu")) {
                // J'affiche l'overlay
                overlay.classList.remove('d-none')
                // J'affiche la première étape
                currentEtape += 1
                afficheProchaineEtape(currentEtape)
                // Affiche le fond gris
                fondGris.classList.remove("d-none")
                // Ajoute le nom du burger à la variable menu
                chooseBurger(card.getAttribute("data-nom"))
                // Ajoute le prix au menu +1€ car la taille sélectionnée par défaut est "maxi" ce qui incrémente le prix de l'accompagnement et de la boisson de 0.50€
                menu.prix = (parseFloat(card.getAttribute("data-prix")) + 1.00).toFixed(2)
                
            // Si c'est une boisson
            } else if (card.id.includes("boissons")) {
                // J'affiche l'overlay
                overlay.classList.remove('d-none')
                // Affiche l'étape concernant uniquement les boissons
                currentEtape = 5
                afficheProchaineEtape(currentEtape)
                // Affiche le fond gris
                fondGris.classList.remove("d-none")
                // Affiche les images de la boisson dans l'overlay
                afficheBoissonsOverlay(card.getAttribute("data-image"),card.getAttribute("data-nom"))
                // Assigne le nom et le prix de le boisson à la variable "extra" ainsi que le type "boison"
                extra.nom = card.getAttribute("data-nom")
                extra.prix = parseFloat(card.getAttribute("data-prix")).toFixed(2)
                extra.type = "boisson"
                
            // Si c'est un autre extra
            } else {
                // J'affiche l'overlay
                overlay.classList.remove('d-none')
                // Affiche l'étape concernant uniquement les autres extras
                currentEtape = 6
                afficheProchaineEtape(currentEtape)
                // Affiche le fond gris
                fondGris.classList.remove("d-none")
                // Affiche l'image de l'extra dans l'overlay
                afficheExtraOverlay(card.getAttribute("data-image"), card.getAttribute("data-nom"))
                // Assignation des infos du produit à la variable extra
                extra.nom = card.getAttribute("data-nom")
                extra.prix = parseFloat(card.getAttribute("data-prix")).toFixed(2)
                extra.cl = 0
            }
            
        })
    });
}









/* GESTION DE L'AFFICHAGE DU PRIX DE LA COMMANDE DANS LE PANIER ET DU CHOIX DE LIEU DE  CONSOMMATION*/

/**
 * Rôle : Afficher le prix total de la commande dans le panier
 * Retourne : Néant
 */
function affichePrixCommande() {
    // Récupération de l'élément du panier affichant le prix
    let prixTotal = document.querySelector(".prix-panier")
    // Affichage du prix de la commande dans l'élément
    prixTotal.innerHTML = `${parseFloat(commande.prix).toFixed(2)} €`
}
affichePrixCommande()

/**
 * Rôle : Affiche le lieu de consommation dans le panier
 * REtourne : Néant
 */
function afficheLieuConsommation(){
    // Récupération de l'élément affichant le lieu de consommation dans le panier
    let lieuConso = document.querySelector(".choix-conso")
    // Affichage du choix dans l'élément
    lieuConso.innerHTML = localStorage.getItem("location") + " : <b>326</b>"
}
afficheLieuConsommation()







/* FONCTION DE REINITIALISATION */

/**
 * Rôle : - Rétabli les sélections par défaut dans l'overlay
 *        - Réinitialise les compteurs de quantitée
 *        - Réinitialise les variables globales "menu" et "extra"
 * Retourne : Néant
 */
function reinitAll() {
    // On récupère tous les éléments ayant la classe active et on leur enlève
    let activeTaille = document.querySelector(".active-element-taille")
    activeTaille.classList.remove("active-element-taille")
    let activeAccompagnement = document.querySelector(".active-element-accompagnement")
    activeAccompagnement.classList.remove("active-element-accompagnement")
    let activeBoisson = document.querySelector(".active-element-boisson")
    activeBoisson.classList.remove("active-element-boisson")
    let activeSauce = document.querySelector(".active-element-sauce")
    activeSauce.classList.remove("active-element-sauce")
    let tailleBoissonActive = document.querySelector(".active-boisson-extra")
    tailleBoissonActive.classList.remove("active-boisson-extra")
    
    // On Initialise la classe active sur les éléments voulu
    // Taille du menu
    let tailles = document.querySelectorAll(".taille-menu")
    tailles[0].classList.add("active-element-taille")
    // Accompagnement du menu
    let accompagnements = document.querySelectorAll(".accompagnement-menu")
    accompagnements[0].classList.add("active-element-accompagnement")
    // Boisson du menu
    let slidesBoissons = document.querySelectorAll(".boisson")
    slidesBoissons[0].classList.add("active-element-boisson")
    // Sauce du menu
    let slidesSauces = document.querySelectorAll(".sauce")
    slidesSauces[0].classList.add("active-element-sauce")
    // Boissons en extra
    let taillesBoisson = document.querySelectorAll(".boisson-extra")
    taillesBoisson[0].classList.add("active-boisson-extra")
    // Compteurs affiché lors de la sélection de la quantité
    let counterBoisson = document.querySelector(".counter-boisson")
    counterBoisson.innerText = 1
    
    let counterExtra = document.querySelector(".counter-extra")
    counterExtra.innerText = 1
    
    
    // Réinitialisation du menu
    menu = {
        burger: "",
        size: "maxi",
        accompagnement: "frites",
        boisson: "coca-cola",
        sauce: "classic barbecue",
        prix: 0,
    }
    // Reinitialisation de l'extra
    extra = {
        nom: "",
        prix: 0,
        quantity: 1,
        cl: 30,
        type: "",
    }
}

/* AJOUT DE LA COMMANDE DANS LE LOCAL STORAGE ET CHANGEMENT DE PAGE  */

/**
 * Rôle : Stocker la commande dans le local storage et change de page
 * Retourne : Néant
 */
function stockeCommande(){
    // Récuperation du boutton pour payer
    let payButton = document.querySelector(".pay-button")
    // Ajout d'un écouteur d'évènement au clique
    payButton.addEventListener("click",(e)=>{
        // J'attends avant de naviguer
        e.preventDefault()
        // Si j'ai des produits dans ma commande
        if(commande.prix > 0){
            // Ajout de la commande au local storage
            localStorage.setItem("commande",JSON.stringify(commande))
            // Navigue à la page pour rentrer le numéro de commande/chevalet
            window.location.href = e.currentTarget.href
        }
    })
}
stockeCommande()


/* FONCTION DE VERIF DES DROITS D'ACCES A LA PAGE */

/**
 * Rôle : Vérifie si l'utilisateur à bien fait une commande avant d'arriver sur cette page. Si ce n'est pas le cas le renvoie sur la page de composition de la commande.
 * Retourne : Néant
 */
function verifDroits(){
    // Si je n'ai pas de commande préparée
    if(commande.location == null){
        // JE renvoie à la page de composition de la commande
        window.location.href = "/index.html"
    }
}
verifDroits()









/* GESTION DE L'AFFICHAGE DU PANIER EN RESPONSIVE */

/**
 * Rôle : afficher/cacher le panier selon les interactions
 * Retourne : Néant
 */
function affichePanier(){
    // récupération de l'élément affichant le panier
    let afficheBtn = document.querySelector(".responsive-panier-button")
    // Lors du changement de taille de la fenêtre
    window.addEventListener("resize",affichePanierButton)

    // Récupération de l'élément cachant le panier
    let cacheBtn = document.querySelector(".responsive-panier-close-btn")
    // Récupération du panier
    let panier = document.querySelector(".panier")

    // Ajout des évènements au clique
    // Pour afficher le panier
    afficheBtn.addEventListener("click",()=>{
        // Affiche le panier
        panier.style.transform = "translateY(-100vh)"
        // Affiche le bouton qui permet de cacher le panier
        setTimeout(()=>{cacheBtn.classList.remove("d-none")},600)
        
    })

    // Pour cacher le panier
    cacheBtn.addEventListener("click",()=>{
        // Cache le panier
        panier.style.transform = "translateY(100vh)"
        // Cache le bouton qui permet de cacher le panier
        cacheBtn.classList.add("d-none") 
    })
}
affichePanier()

/**
 * Rôle : Si la fenêtre fais plus de 860px alors l'élément permettant d'afficher le panier n'apparait pas et inversement
 * Retourne : Néant
 */
function affichePanierButton(){
    let afficheBtn = document.querySelector(".responsive-panier-button")
    
    if(window.innerWidth > 860){
        afficheBtn.classList.add("d-none")
    }else{
        afficheBtn.classList.remove("d-none")
    }
}
affichePanierButton()