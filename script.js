// Sélectionne la grille
const grille = document.getElementById('grille');

// Crée la grille de jeu 20x20
const taille = 20;
let serpent = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let pomme = { x: 15, y: 15 };
let interval;
let score = 0;

// Générer la grille visuelle
for (let i = 0; i < taille * taille; i++) {
    const div = document.createElement('div');
    div.classList.add('case');
    grille.appendChild(div);
}

// Fonction pour placer des éléments (serpent/pomme) dans la grille
function mettreAJourGrille() {
    const cases = document.querySelectorAll('.case');
    cases.forEach(c => c.classList.remove('serpent', "pomme")) ; 

    // Place le serpent
    serpent.forEach(partie => {
        const index = partie.y * taille + partie.x;
        cases[index].classList.add('serpent');
    });

    // Place la pomme
    const indexPomme = pomme.y * taille + pomme.x;
    cases[indexPomme].classList.add('pomme');
}

// Démarrer le jeu
function demarrerJeu() {
    direction = { x: 0, y: -1 };  // Le serpent commence en montant
    serpent = [{ x: 10, y: 10 }];
    pomme = { x: Math.floor(Math.random() * taille), y: Math.floor(Math.random() * taille) };
    clearInterval(interval);
    interval = setInterval(deplacerSerpent, 200);
}

// Déplacer le serpent
function deplacerSerpent() {
    const tete = { x: serpent[0].x + direction.x, y: serpent[0].y + direction.y };

    // Vérifier les collisions avec les bords
    if (tete.x < 0 || tete.x >= taille || tete.y < 0 || tete.y >= taille || estCollisionSerpent(tete)) {
        alert('Game Over! Score: ' + score);
        score = 0;
        demarrerJeu();
        return;
    }

    // Ajouter la nouvelle tête du serpent
    serpent.unshift(tete);

    // Vérifier si le serpent mange une pomme
    if (tete.x === pomme.x && tete.y === pomme.y) {
        score++;
        pomme = { x: Math.floor(Math.random() * taille), y: Math.floor(Math.random() * taille) };
    } else {
        // Retirer la queue du serpent s'il ne mange pas de pomme
        serpent.pop();
    }

    mettreAJourGrille();
}

// Vérifier la collision avec le corps du serpent
function estCollisionSerpent(position) {
    return serpent.some(partie => partie.x === position.x && partie.y === position.y);
}

// Changer la direction selon les touches
document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

// Lancer le jeu au chargement
demarrerJeu();
