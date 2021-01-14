import { Component, ViewChild, OnInit }		from '@angular/core';
import { RechercheAvanceeComponent }		from "../recherche-avancee/recherche-avancee.component";
import { ResultatComponent }				from "../resultat/resultat.component"
import { DonneesService }					from '../donnees.service';

@Component({
	selector: 'app-recherche',
	templateUrl: './recherche.component.html',
	styleUrls: ['./recherche.component.scss'],
	providers: [ResultatComponent]
})

export class RechercheComponent implements OnInit {
	@ViewChild(RechercheAvanceeComponent) child;
	constructor(private donnees: DonneesService){}
	ngOnInit(){}

	test						= '';
	tabl						= Array();					// Contenus du resultat brut.
	resultats					= false;					// Existence d'un résultat.
	resultatsNonNul 			= false;					// Existence d'un résultat contenant au moins un élément.
	resultatsMultiples			= false;					// Existence d'un résultat contenant au moins deux élément.
	collectionSize				= 0;						// Nbr de résultats.
	records						= Array();
	pageSize					= 10;						// Nombre de ligne dans la présentation en tableau par page.
	page						= 1;						// Page courante.
	dataZCP						= Object();					// Résultat dans un format JSON adapté au graphique en cercles concentriques zoomables.
	dataFDG 					= {							// Résultats dans un format JSON adapté au graphique en force directrice.
									nodes : Array(),
									links : Array()
								};
	affichageMenusZCP			= Array(false, false);		// Contrôle l'affichage/masquage des <select> supplémentaires du ZCP.
	collectionSizeInfAPageSize	= false;					// Indique si collectionSize est inférieur à pageSize.
	trisCourantTableau			= String('denomination');	// Indique le tris appliqué sur le tableau.
	trisCourantTableauInverse	= false;					// Indique si le tris appliqué sur le tableau est inversé.
	rechercheEnCours			= false;					// Indique si une recherche est en train d'être effectuée par l'utilisateur (contrôle la boucle de chargement).
	menusZCP					= Array(					// Valeur et Étiquette des <option> des <select> du ZCP.
									Array('denomination', 'Dénomination'),
									Array('codeCis', 'Code CIS'),
									Array('formePharmaceutique', 'Forme pharmaceutique'),
									Array('voiesAdministration', 'Voies d&rsquo;administration'),
									Array('statutAdministratif', 'Statut administratif de l&rsquo;AMM'),
									Array('typeProcedureAMM', 'Type de procédure AMM'),
									Array('etatDeCommercialisation', 'État de commercialisation'),
									Array('dateAMM', 'Date AMM'),
									Array('statutBdm', 'Statut Bdm'),
									Array('numeroAutorisationEuropeenne', 'Numéro d&rsquo;autorisation européenne'),
									Array('titulaire', 'Titulaire'),
									Array('surveillanceRenforcee', 'Surveillance renforcée')
								);
	menus						= Array(				// Valeurs et étiquettes des <th> du tableau.
									Array('denomination', 'Dénomination'),
									Array('codeCis', 'Code <abbr title="Code Identifiant de Spécialité" class="initialism">CIS</abbr>'),
									Array('formePharmaceutique', 'Forme pharmaceutique'),
									Array('voiesAdministration', 'Voies d&rsquo;administration'),
									Array('statutAdministratif', 'Statut administratif de l&rsquo;<a href="https://www.ansm.sante.fr/Activites/Autorisations-de-Mise-sur-le-Marche-AMM/L-AMM-et-le-parcours-du-medicament/(offset)/3" target="_blank"><abbr title="Autorisation de Mise sur le Marché" class="initialism">AMM</abbr></a>'),
									Array('typeProcedureAMM', 'Type de procédure de l&rsquo;<a href="https://www.ansm.sante.fr/Activites/Autorisations-de-Mise-sur-le-Marche-AMM/L-AMM-et-le-parcours-du-medicament/(offset)/3" target="_blank"><abbr title="Autorisation de Mise sur le Marché" class="initialism">AMM</abbr></a>'),
									Array('etatDeCommercialisation', 'État de commercialisation'),
									Array('dateAMM', 'Date de l&rsquo;<a href="https://www.ansm.sante.fr/Activites/Autorisations-de-Mise-sur-le-Marche-AMM/L-AMM-et-le-parcours-du-medicament/(offset)/3" target="_blank"><abbr title="Autorisation de Mise sur le Marché" class="initialism">AMM</abbr></a>'),
									Array('statutBdm', 'Statut Bdm'),
									Array('numeroAutorisationEuropeenne', 'Numéro d&rsquo;autorisation européenne'),
									Array('titulaire', 'Titulaire'),
									Array('surveillanceRenforcee', 'Surveillance renforcée')
								)
	isCollapsed			= false;						// Utilisé pour indiquer l'affichage de la recherche avancée.

	public appelRecherche(event): void {
		this.rechercheEnCours = true; // // Démarre la boucle de chargement.
		let test = this.test;
		const target = event.target;
		let query = {}; //objet de la requête

		//la recherche
		if (test !== ''){
			query = { ...query, research: test };
		}

		let queryForme = [];
		this.child.formes.map(
			forme => {
				if(forme.selected){
					queryForme.push(forme.value);
				}
			}
		);
		if(queryForme.length > 0){
			query = { ...query, formes: queryForme };
		}

		let queryVoies = [];
		this.child.voies.map(
			voie => {
				if(voie.selected){
					queryVoies.push(voie.value);
				}
			}
		);
		if(queryVoies.length > 0){
			query = { ...query, voies: queryVoies };
		}

		let queryAMM = [];
		this.child.AMM.map(
			amm => {
				if(amm.selected){
					queryVoies.push(amm.value);
				}
			}
		);
		if(queryAMM.length > 0){
			query = { ...query, AMMs: queryAMM };
		}

		query = {
			...query,
			autorisation: target.querySelector('input[name=autorisation]:checked').value,
			commercialise: target.querySelector('input[name=commercialise]:checked').value,
			surveillance: target.querySelector('input[name=surveillance]:checked').value
		};

		if(target.querySelector('#statut').value.length > 0){
			query = { ...query, statut: target.querySelector('#statut').value };
		}
		if(target.querySelector('#autorisation_euro').value.length > 0){
			query = { ...query, autorisation_euro: target.querySelector('#autorisation_euro').value };
		}
		if(target.querySelector('#titulaire').value.length > 0){
			query = { ...query, titulaire: target.querySelector('#titulaire').value };
		}

		var toto  = Object();
		
		// Traitement du résultat :
		this.donnees.getData(query).subscribe(
			data => {
				toto = data;								// Récupération des données dans un Object pour
				this.rechercheEnCours = false;				// Arrête la boucle de chargement.
				this.tabl = toto.value;						// accéder sans erreur de compilation à son membre .value.
				// Modifications adéquates des variables membres :
				this.resultats = true;
				this.collectionSize = this.tabl.length;
				this.majCollectionSizeInfAPageSize();
				this.trisTableau(this.trisCourantTableau);
				if(this.tabl.length>0){
					this.resultatsNonNul = true;
					if(this.tabl.length>1){
						this.resultatsMultiples = true;
					}
				}else{
					this.resultatsNonNul = false;
					this.resultatsMultiples = false;
				}
				// Conversion des données vers des formats JSON compatibles aux 2 diagrammes :
				this.resultatToZCP();
				this.resultatToFDG();
			}
		);
	}

	resultatToZCP(appelSelecteur=0): void{ // Renvois les données dans un format JSON adapté au graphique en cercles concentriques zoomables.
		let longeurMinNom		= 5;	// Longueur minimum des noms affichées.
		let minGrandeFratrie	= 30;	// Valeur à partir de laquelle les noms d'une fratrie doivent être raccourcis pour la lisibilité. 
		let maxCarNom			= 10;	// Maximum de caractères dans un nom de fils nullipare.

		// Chargement des critéres de tris des <select>.
		let criteres = Array();
		if(document.getElementById('critere1') != null){
			criteres[0] = (<HTMLInputElement>document.getElementById('critere1')).value;
		}
		if(document.getElementById('critere2') != null){
			criteres[1] = (<HTMLInputElement>document.getElementById('critere2')).value;
		}
		if(document.getElementById('critere3') != null){
			criteres[2] = (<HTMLInputElement>document.getElementById('critere3')).value;
		}
		// Copie des données retournées par la requête pour éviter les effets de bord.
		let data = this.tabl;
		// Création de la racine des données JSON qui seront renvoyées.
		let retour = {
			"name" : "médicaments",
			"children" : []
		};

		if(criteres[0] != 0 && criteres.length>0){
			// Interractions entre les deux premiers <select> lors de la sélction d'un choix sur ceux-ci.
			if(criteres[0] === criteres[1]){ // Mà0 du deuxième <select> si le choix du premier change pour l'identique du second.
				this.affichageMenusZCP[0]=false;
				criteres[1]=0;
				setTimeout(() => {
					this.affichageMenusZCP[0]=true;
				}, 125);
			}else if(this.affichageMenusZCP[0] === true && appelSelecteur != 1){ // Maintient du selected sur le deuxième <select> lors d'un changement de choix sur le premier.
				let indexSelection2 = (<HTMLSelectElement>document.getElementById('critere2')).selectedIndex;
				this.affichageMenusZCP[0]=false;
				setTimeout(() => {
					this.affichageMenusZCP[0]=true;
					setTimeout(() => {
						(<HTMLSelectElement>document.getElementById('critere2').childNodes[indexSelection2]).setAttribute('selected', '');
					}, 125);
				}, 125);
			}else{ // Affichage du deuxième <select> lors de la sélection d'un choix sur le premier.
				this.affichageMenusZCP[0]=true;
			}
			setTimeout(() => { // Disabled sur le second <select> le choix sélectionné sur le premier.
				let optionsSelect2 = document.getElementById('critere2').childNodes;
				(<HTMLSelectElement>optionsSelect2[(<HTMLSelectElement>document.getElementById('critere1')).selectedIndex]).setAttribute('disabled', '');
			}, 500);

			// Interractions du troisième <select> avec les 2 premiers.
			if(this.affichageMenusZCP[1] && (criteres[0] === criteres[2] || criteres[1] === criteres[2]) && criteres[1]!=0){ // Mà0 du troisième <select> si le choix d'un des 2 premiers change pour l'identique du second.
				this.affichageMenusZCP[1]=false;
				criteres[2]=0;
				setTimeout(() => {
					this.affichageMenusZCP[1]=true;
				}, 125);
			}else if(this.affichageMenusZCP[1] === true && appelSelecteur != 2 && criteres[1]!=0){ // Maintient du selected sur le deuxième <select> lors d'un changement de choix sur le premier.
				let indexSelection3 = (<HTMLSelectElement>document.getElementById('critere3')).selectedIndex;
				this.affichageMenusZCP[1]=false;
				setTimeout(() => {
					this.affichageMenusZCP[1]=true;
					setTimeout(() => {
						(<HTMLSelectElement>document.getElementById('critere3').childNodes[indexSelection3]).setAttribute('selected', '');
					}, 125);
				}, 125);
			}else if(criteres[1] != 0 && criteres[1] != undefined){ // Affichage du troisième <select> lors de la sélection d'un choix sur le premier.
				this.affichageMenusZCP[1]=true;
			}
			if(criteres[1]==0 || criteres[1]==undefined){ // Masquage du troisième <select> lors d'un choix non définis sur le pécédent.
				this.affichageMenusZCP[1]=false;
			}
			setTimeout(() => { // Disabled sur le troisième <select> des choix sélectionnés sur les 2 premiers.
				if(document.getElementById('critere3')!=null){ // Patch d'une erreur dans la console.
					let optionsSelect2 = document.getElementById('critere3').childNodes;
					(<HTMLSelectElement>optionsSelect2[(<HTMLSelectElement>document.getElementById('critere1')).selectedIndex]).setAttribute('disabled', '');
					(<HTMLSelectElement>optionsSelect2[(<HTMLSelectElement>document.getElementById('critere2')).selectedIndex]).setAttribute('disabled', '');
				}
			}, 500);

			// Traitement des données
			do{
				// Ajout des des petits-enfant de la racine
				let retourEnfant = {
					"name" : this.formatNameCercle(data[0][criteres[0]], criteres[0]),
					"children" : [],
					"childrenTemp" : []
				};
				let aSupprimer = Array();
				for(let i=0; i<data.length; i++){
					if(data[i][criteres[0]]===data[0][criteres[0]] && data[i][criteres[0]] != undefined){
						if(data[i][criteres[1]]==undefined){
							data[i][criteres[1]]='';
						}
						if(data[i][criteres[2]]==undefined){
							data[i][criteres[2]]='';
						}
						retourEnfant.children.push({"name" : data[i].denomination, "value" : data[i].codeCis, "critere1" : data[i][criteres[1]], "critere2" : data[i][criteres[2]]});
						aSupprimer.push(i);
					}else if(data[i][criteres[0]]==undefined){ // Mise en fratrie des élèment ne possédant pas le critère.
						data[i][criteres[0]]="";
					}
				}
				// Supression des données déjà ajoutées
				let dataTemp = Array();
				for(let i=0; i<data.length; i++){
					if(!aSupprimer.includes(i)){
						dataTemp.push(data[i]);
					}
				}
				// Raccourcissement des noms trops long si la fratrie est trop grande pour la clarté de lecture.
				if(retourEnfant.children.length>minGrandeFratrie && criteres[1]==undefined){
					for(let i=0; i<retourEnfant.children.length; i++){
						if(retourEnfant.children[i].name.search(' ')<longeurMinNom){ // Pas de raccourcissement de moins de 5 caractères.
							retourEnfant.children[i].name = retourEnfant.children[i].name.slice(0, longeurMinNom);
						}else{
							retourEnfant.children[i].name = retourEnfant.children[i].name.slice(0, retourEnfant.children[i].name.search(' '));
						}
					}
				}else if(criteres[1]==undefined){
					for(let i=0; i<retourEnfant.children.length; i++){
						retourEnfant.children[i].name = retourEnfant.children[i].name.slice(0, maxCarNom);
					}
				}

				// Traitement de niveau 2
				if(criteres[1]!=undefined && criteres[1]!= 0 && retourEnfant.children[0]['critere1']!=undefined){
					do{
						let retourPetitEnfant = {
							"name" : this.formatNameCercle(retourEnfant.children[0]['critere1'], criteres[1]),
							"children" : [],
							"childrenTemp" : []
						}
						let aSupprimer2 = Array();
						for(let i=0; i<retourEnfant.children.length; i++){
							if(retourEnfant.children[i]['critere1']===retourEnfant.children[0]['critere1'] && retourEnfant.children[i]['critere1'] != undefined){ 
								retourPetitEnfant.children.push({"name" : retourEnfant.children[i]['name'], "value" : retourEnfant.children[i]['value'], "critere2" : retourEnfant.children[i]['critere2']});
								aSupprimer2.push(i);
							}else if(retourEnfant.children[i]['critere1']==undefined){ // Mise en fratrie des élèment ne possédant pas le critère.
								retourEnfant.children[i]['critere1']="";
							}
						}
						// Supression des données déjà ajoutées
						let dataTemp2 = Array();
						for(let i=0; i<retourEnfant.children.length; i++){
							if(!aSupprimer2.includes(i)){
								dataTemp2.push(retourEnfant.children[i]);
							}
						}
						retourEnfant.children = dataTemp2;
						// Raccourcissement des noms trops long si la fratrie est trop grande pour la clarté de lecture.
						if(retourPetitEnfant.children.length>minGrandeFratrie && criteres[2]==undefined){
							for(let i=0; i<retourPetitEnfant.children.length; i++){
								if(retourPetitEnfant.children[i].name.search(' ')<longeurMinNom){ // Pas de raccourcissement de moins de 5 caractères.
									retourPetitEnfant.children[i].name = retourPetitEnfant.children[i].name.slice(0, longeurMinNom);
								}else{
									retourPetitEnfant.children[i].name = retourPetitEnfant.children[i].name.slice(0, retourPetitEnfant.children[i].name.search(' '));
								}
							}
						}else if(criteres[2]==undefined){
							for(let i=0; i<retourPetitEnfant.children.length; i++){
								retourPetitEnfant.children[i].name = retourPetitEnfant.children[i].name.slice(0, maxCarNom);
							}
						}

						// Traitement de niveau 3
						if(criteres[2]!=undefined && criteres[2]!= 0 && retourPetitEnfant.children[0]!=undefined && retourPetitEnfant.children[0]['critere2'] != undefined){
							
							do{
								let retourArrierePetitEnfant = {
									"name" : this.formatNameCercle(retourPetitEnfant.children[0]['critere2'], criteres[2]),
									"children" : []
								};
								let aSupprimer3 = Array();
								for(let i=0; i<retourPetitEnfant.children.length; i++){
									if(retourPetitEnfant.children[i]['critere2'] != undefined && retourPetitEnfant.children[i]['critere2']===retourPetitEnfant.children[0]['critere2']){ 
										retourArrierePetitEnfant.children.push({"name" : retourPetitEnfant.children[i]['name'], "value" : retourPetitEnfant.children[i]['value']});
										aSupprimer3.push(i);
									}else if(retourPetitEnfant.children[i]['critere2']==undefined){ // Mise en fratrie des élèment ne possédant pas le critère.
										retourPetitEnfant.children[i]['critere2']="";
									}
								}
								// Supression des données déjà ajoutées
								let dataTemp3 = Array();
								for(let i=0; i<retourPetitEnfant.children.length; i++){
									if(!aSupprimer3.includes(i)){
										dataTemp3.push(retourPetitEnfant.children[i]);
									}
								}
								retourPetitEnfant.children = dataTemp3;
								// Raccourcissement des noms trops long si la fratrie est trop grande pour la clarté de lecture.
								if(retourArrierePetitEnfant.children.length>minGrandeFratrie && criteres[3]==undefined){
									for(let i=0; i<retourArrierePetitEnfant.children.length; i++){
										if(retourArrierePetitEnfant.children[i].name.search(' ')<longeurMinNom){ // Pas de raccourcissement de moins de 5 caractères.
											retourArrierePetitEnfant.children[i].name = retourArrierePetitEnfant.children[i].name.slice(0, longeurMinNom);
										}else{
											retourArrierePetitEnfant.children[i].name = retourArrierePetitEnfant.children[i].name.slice(0, retourArrierePetitEnfant.children[i].name.search(' '));
										}
									}
								}else if(criteres[3]==undefined){
									for(let i=0; i<retourArrierePetitEnfant.children.length; i++){
										retourArrierePetitEnfant.children[i].name = retourArrierePetitEnfant.children[i].name.slice(0, maxCarNom);
									}
								}
								retourPetitEnfant.childrenTemp.push(retourArrierePetitEnfant);

							}while(retourPetitEnfant.children.length>0);
							for(let i=0; i<retourPetitEnfant.childrenTemp.length; i++){
								retourPetitEnfant.children.push(retourPetitEnfant.childrenTemp[i]);
							}
						}
						retourEnfant.childrenTemp.push(retourPetitEnfant);
					}while(retourEnfant.children.length>0);
					for(let i=0; i<retourEnfant.childrenTemp.length; i++){
						retourEnfant.children.push(retourEnfant.childrenTemp[i]);
					}
				}
				data = dataTemp;
				retour.children.push(retourEnfant);
			}while(data.length>0);
		}else{ // Masquage des 2 derniers <select> si le premier n'est pas utilisé.
			this.affichageMenusZCP[0]=false;
			this.affichageMenusZCP[1]=false;
		}

		// Ajout des enfants nullipares à la racine
		for(let i=0; i<data.length; i++){
			let name = String(data[i].denomination);
			let ajout;
			// Raccourcissement des noms trops long si la fratrie est trop grande pour la clarté de lecture.
			if(name.search(' ')<longeurMinNom){ // Pas de raccourcissement de moins de 5 caractères.
				ajout =  {"name" : name.slice(0, longeurMinNom), "value" : data[i].codeCis}
			}else{
				ajout =  {"name" : name.slice(0, name.search(' ')), "value" : data[i].codeCis}
			}
			retour.children.push(ajout);
		}
		this.dataZCP = retour;
	}

	formatNameCercle(nom: string, critere: string): string{ // Renvoie un nom de cercle lisible par un utilisateur à partir de la donnée brute.
		nom = String(nom); // Pour éviter l'appel de la méthode .indexOf sur un Number.
		let nomFormatte;
		if(nom.indexOf(';') != -1){ // Présentation française des listes.
			nomFormatte = nom.split(';').join(', ');
			nomFormatte = nomFormatte.replace(/[,]([^,]+$)/, ' et $1');

		}else{
			nomFormatte = nom;
		}
		return nomFormatte;
	}

	majPageSize(): void{ // Met à jour le nombre de ligne de tableau.
		this.pageSize = (<number>(<unknown>(<HTMLInputElement>document.getElementById('inlineFormCustomSelectPref')).value));
		this.majCollectionSizeInfAPageSize();
	}

	majCollectionSizeInfAPageSize(): void{ // Met à jour collectionSizeInfAPageSize.
		if(this.collectionSize < this.pageSize){
			this.collectionSizeInfAPageSize = true;
		}else{
			this.collectionSizeInfAPageSize = false;
		}
	}

	trisTableau(index: string): void{ // Tris le tableau de résultats selon l'index passé en paramètre.
		if(index==this.trisCourantTableau && this.trisCourantTableauInverse == false){
			this.tabl.reverse();
			this.trisCourantTableauInverse = true;
		}else if(index==this.trisCourantTableau){
			this.tabl.reverse();
			this.trisCourantTableauInverse = false;
		}else{
			this.trisCourantTableauInverse = true;
			this.trisCourantTableau = index;
			this.tabl.sort(
				function(a, b){
					if(index=='dateAMM'){
						let dateStr = a[index].split('/');
						let dateStr2 = b[index].split('/');
						return Date.parse(dateStr[2] + '-' + dateStr[1] + '-' + dateStr[0]) - Date.parse(dateStr2[2] + '-' + dateStr2[1] + '-' + dateStr2[0]);
					}else if(typeof a[index] === 'number'){
						return a[index] - b[index];
					}else{
						return a[index].localeCompare(b[index]);
					}
					
				}
			)
		}
	}

	resultatToFDG(): void{ // Renvois les données dans un format JSON adapté au graphique en force dirigé.
		this.dataFDG = {
			nodes : Array(),
			links : Array()
		};
		let familles = [[]];
		let formes = Array();
		let voies = Array();
		let numeroFamille = 0;

		// Établissement des points pour chaque médicament.
		for(let i=0; i<this.tabl.length; i++){
			let numeroFamilleCourante;
			if(formes.indexOf(this.tabl[i].formePharmaceutique)!=-1){
				let rangForme = formes.indexOf(this.tabl[i].formePharmaceutique)
				if(voies.indexOf(this.tabl[i].voiesAdministration)!=1){
					numeroFamilleCourante = familles[rangForme][voies.indexOf(this.tabl[i].voiesAdministration)];
				}else{
					let rangVoies = voies.push(this.tabl[i].voiesAdministration);
					numeroFamilleCourante = numeroFamille++;
					familles[rangForme][rangVoies-1] = numeroFamilleCourante;
				}
			}else{
				numeroFamilleCourante = numeroFamille++;
				let rangForme = formes.push(this.tabl[i].formePharmaceutique);
				if(voies.indexOf(this.tabl[i].voiesAdministration)!=1){
					familles[rangForme-1] = Array();
					familles[rangForme-1][voies.indexOf(this.tabl[i].voiesAdministration)] = numeroFamilleCourante;
				}else{
					let rangVoies = voies.push(this.tabl[i].voiesAdministration);
					familles[rangForme-1] = Array();
					familles[rangForme-1][rangVoies-1] = numeroFamilleCourante;
				}
			}
			this.dataFDG.nodes.push({id: this.tabl[i].denomination, group: numeroFamilleCourante, dateAMM: this.tabl[i].dateAMM});
		}

		// Établissement des liens entre les points.
		this.dataFDG.nodes.sort(
			function(a, b){
				let dateStr = a.dateAMM.split('/');
				let dateStr2 = b.dateAMM.split('/');
				return Date.parse(dateStr[2] + '-' + dateStr[1] + '-' + dateStr[0]) - Date.parse(dateStr2[2] + '-' + dateStr2[1] + '-' + dateStr2[0]);
			}
		)
		for(let i=0; i<this.dataFDG.nodes.length; i++){
			if(this.dataFDG.nodes[i+1]!=undefined){
				this.dataFDG.links.push({source: this.dataFDG.nodes[i].id, target: this.dataFDG.nodes[i+1].id, value: this.dataFDG.nodes[i].group});
			}
		}
		let dejaPasse = Array();
		for(let i=0; i<this.dataFDG.nodes.length; i++){
			if(dejaPasse.indexOf(i)==-1){
				for(let j=1; j<this.dataFDG.nodes.length; j++){
					if(this.dataFDG.nodes[i].group==this.dataFDG.nodes[j].group && dejaPasse.indexOf(j)==-1){
						this.dataFDG.links.push({source: this.dataFDG.nodes[i].id, target: this.dataFDG.nodes[j].id, value: this.dataFDG.nodes[i].group});
						dejaPasse.push(j);
						dejaPasse.push(i);
					}
				}
			}
		}
	}
}