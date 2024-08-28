// Récupération de la commande
let commande = JSON.parse(localStorage.getItem("commande"));

/**
 * Rôle : Vérifie si le nombre passé en paramètre correspond à trois chiffres entier
 * @param {Number} num => un nombre
 * @returns true ou false
 */
function verifNumero(num){
    // Déclaration d'une expression régulière contrôler que la valeur de num est bien 3 chiffre consécutifs
    let regex = /^\d{3}$/

    if(regex.test(num)){
        return true
    }else{
        return false
    }
}

// Récupération du boutton qui enregistre le numéro de commande et envoie la commande
let sendBtn = document.querySelector(".envoi-commande")

// Ajout d'un écouteur d'évènement au clique
sendBtn.addEventListener("click",(e)=>{

    // J'empeche la navigation
    e.preventDefault()

    // Récupération de la valeur du numéro renseigné dans l'input
    let numCommande = document.getElementById("num-commande").value

    // Si le numéro renseigné est valide
    if(verifNumero(numCommande)){
        // Affecter le numéro de commande et j'envoie la commande à l'api
        commande.numero = numCommande
        envoieCommande()
        // Vider le local storage et changement de page
        localStorage.clear()
        window.location.href = e.currentTarget.href
    }
    // Sinon si le numéro n'est pas valide
    else{
        // Code pour afficher l'erreur à l'utilisateur
    }
})

/**
 * Rôle bloque l'envoie du formulaire lorsqu'on appuie sur la touche entrée
 * Retourne : Néant
 */
function blockSubmit(){
    // Récuperation du formulaire 
    let form = document.getElementById("num-commande-form")
    // Ajout d'un évènement à la soumission
    form.addEventListener("submit",(e)=>{
        // Bloque l'envoi
        e.preventDefault()
    })
}
blockSubmit()

/**
 * Rôle : envoie la commande sous format JSON à l'API
 * Retourne : néant
 */
function envoieCommande() {
    let commandeJSON = JSON.stringify(commande)

    // Envoyer la commande à l'API fictive
    fetch('https://api-fictive.com/commande', {
        // La méthode POST pour envoyer des données
        method: 'POST',
        // Indiquer que les données sont en JSON
        headers: {
            'Content-Type': 'application/json' 
        },
        // Les données JSON à envoyer
        body: commandeJSON 
    })
}

/**
 * Rôle : Vérifie si l'utilisateur à bien fait une commande avant d'arriver sur cette page. Si ce n'est pas le cas le renvoie sur la page de composition de la commande.
 * Retourne : Néant
 */
function verifDroits(){
    // Si je n'ai pas de commande préparée
    if(commande == null){
        // JE renvoie à la page de composition de la commande
        window.location.href = "/composition.html"
    }
}
verifDroits()