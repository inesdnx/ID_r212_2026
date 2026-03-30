
// Exercice 1 - données -> affichage == afficher les projets sous forme de cartes dans le conteneur projets-liste

const projets = [
	{ id: 1, titre: "Portfolio", description: "Mon site personnel responsive.", tags: ["HTML", "CSS"] },
	{ id: 2, titre: "Blog tech", description: "Articles sur le développement web.", tags: ["JS", "API"] },
	{ id: 3, titre: "App météo", description: "Application de météo en temps réel.", tags: ["JS", "API"] },
	{ id: 4, titre: "Refonte asso", description: "Nouveau site pour une association.", tags: ["HTML", "CSS", "Figma"] },
	{ id: 5, titre: "Mini-jeu", description: "Jeu de mémoire en JavaScript.", tags: ["JS", "DOM"] },
];

const conteneur = document.querySelector('#projets-liste');

function afficherProjets(listeProjets) {
	conteneur.innerHTML = ''; // Vider le conteneur

	listeProjets.forEach((projet) => {
		const carte = document.createElement('article');
		carte.classList.add('carte');

		carte.innerHTML = `
        <h3>${projet.titre}</h3>
        <p>${projet.description}</p>
        <div class="tags">
            ${projet.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <button class="btn-supprimer" data-id="${projet.id}">Supprimer</button>
        `;
		// ajout du bouton dans la partie HTML pour que le bouton apparaisse dans chaque carte 
		conteneur.append(carte);

	});

	document.querySelectorAll('.btn-supprimer').forEach((btn) => { // fonction détection du clic 
		btn.addEventListener('click', () => {
			const id = Number(btn.dataset.id);
			const index = projets.findIndex(p => p.id === id); // supprimer les données
			projets.splice(index, 1);
			afficherProjets(projets); // mettre à jour l'affichage
			sauvegarder();
		});
	});
}

// Affichage initial
afficherProjets(projets);

// Exercice 2 - Filtrage interactif == filtrer les projets en fonction du tag cliqué

const boutonsFiltres = document.querySelectorAll('.filtre');

boutonsFiltres.forEach((btn) => {
	btn.addEventListener('click', () => {
		// 1. Mettre à jour le bouton actif
		document.querySelector('.filtre.active').classList.remove('active');
		btn.classList.add('active');

		// 2. Filtrer les données
		const tag = btn.dataset.tag;
		if (tag === 'tous') {
			afficherProjets(projets);
		} else {
			const projetsFiltres = projets.filter(p => p.tags.includes(tag));
			afficherProjets(projetsFiltres);
		}
		
		selectTri.addEventListener('change', () => { // écouter le changement
			const valeur = selectTri.value;
			if (valeur === 'az') { // trier
				projets.sort((a, b) => a.titre.localeCompare(b.titre));
			} else {
				projets.sort((a, b) => b.titre.localeCompare(a.titre));
			}
			afficherProjets(projets); // réafficher
		});
	});
	
});

// Exercice 3 - Ajout dynamique == ajouter un projet au tableau et mettre à jour l'affichage

const form = document.querySelector('#form-ajout');

form.addEventListener('submit', (event) => {
	event.preventDefault(); // Empêcher le rechargement de la page

	const titre = document.querySelector('#input-titre').value.trim();
	const description = document.querySelector('#input-desc').value.trim();
	const tagsTexte = document.querySelector('#input-tags').value.trim();

	if (!titre || !description) return; // Ne rien faire si vide

	const nouveauProjet = {
		id: projets.length + 1,
		titre: titre,
		description: description,
		tags: tagsTexte ? tagsTexte.split(',').map(t => t.trim()) : [],
	};

	projets.push(nouveauProjet);
	sauvegarder(); // ajouter avec l'exercice 4 pour sauvegarder dès qu'on ajoute un projet
	afficherProjets(projets);
	form.reset(); // Vider le formulaire
});

// Exercice 4 - Persistance localStorage 

// Sauvegarder

function sauvegarder() {
	localStorage.setItem('projets', JSON.stringify(projets));
}

// Charger au démarrage

function charger() {
	const donnees = localStorage.getItem('projets');
	if (donnees) {
		// Remplacer le contenu du tableau (sans réassigner la variable)
		projets.length = 0;
		JSON.parse(donnees).forEach(p => projets.push(p));
	}
}

// Au chargement de la page
charger();
afficherProjets(projets);

