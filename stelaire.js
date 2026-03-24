// Créer un bouton
const bouton = document.createElement('button');
bouton.textContent = 'Cliquez-moi';
bouton.id = 'monBouton';

// Ajouter un événement au bouton
bouton.addEventListener('click', function() {
    console.log('Bouton cliqué !');
});

// Ajouter le bouton au body
document.body.appendChild(bouton);