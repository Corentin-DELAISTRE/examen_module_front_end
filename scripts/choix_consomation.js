/**
 * Rôle : - Récupère le choix de lieu de consommation de l'utilisateur et le stocker dans le local storage pour pouvoir acceder à cette donnée dans les autres pages du site
 *        - Puis navigue vers la page de composition de la commande
 */
function getChoix(){
    // Récupération des éléments permettant de choisir le lieu de consommation
    let choices = document.querySelectorAll('.choix-consomation')
    
    // Pour chaque choix
    choices.forEach(choice => {
        // Ajout d'un écouteur d'évènement au clique
        choice.addEventListener("click",(e)=>{
            // J'empêche la navigation vu que c'est un lien
            e.preventDefault()
            // Si l'utilisateur a choisi de consommer sur place
            if(choice.id == "sur-place"){
                // Ajout de ce choix dans le local storage pour pouvoir y accéder sur la page de composition de commande
                localStorage.setItem('location','Sur place')
            }else{
                localStorage.setItem('location','A emporter')
            }

            // Navigue vers la page de composition de la commande
            window.location.href = e.currentTarget.href
        })
    });
}
getChoix()