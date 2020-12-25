import { Component, ViewChild, OnInit } from '@angular/core';
import { RechercheAvanceeComponent } from "../recherche-avancee/recherche-avancee.component";
import { ResultatComponent } from "../resultat/resultat.component"
import { DonneesService } from '../donnees.service';

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

	test				= '';
	tabl				= []; // Contenus du resultat
	resultats			= false; // Existence d'un résultat
	resultatsNonNul 	= false; // Existence d'un résultat contenant au moins un élément
	resultatsMultiples	= false; // Existence d'un résultat contenant au moins deux élément
	collectionSize		= 0;
	records				= [];
	pageSize			= 10;
	page				= 1;



	isCollapsed			= false;

	public appelRecherche(event): void {
		let test = this.test;
		const target = event.target;
		let query = {};//objet de la requête

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

		var toto = Array();

		this.donnees.getData(query).subscribe(
			data => {
				toto.push(data);
				this.tabl = toto[0].value;
				this.resultats = true;
				this.collectionSize = this.tabl.length;
				if(this.tabl.length>0){
					this.resultatsNonNul = true;
					if(this.tabl.length>1){
						this.resultatsMultiples = true;
					}
				}
				console.log(this.tabl);
			}
			
		);
	}
}