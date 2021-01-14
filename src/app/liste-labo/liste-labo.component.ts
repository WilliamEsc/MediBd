import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
	selector: 'app-liste-labo',
	templateUrl: './liste-labo.component.html',
	styleUrls: ['./liste-labo.component.scss']
})
export class ListeLaboComponent implements OnInit{
	@Output() nameUpdate: EventEmitter<string> = new EventEmitter<string>();

	updateParent(name){
		this.nameUpdate.emit(name)
	}
	laboratoires = [];

	constructor(){}
	ngOnInit(): void {}

	updateLabo(data){
		if (data.length == 0) {
			return;
		}
		else {
			data.sort((a, b) => (a.titulaire > b.titulaire) ? 1 : ((b.titulaire > a.titulaire) ? -1 : 0));
			this.laboratoires = data;
			this.calculStatLabo();
		}
	}

	calculStatLabo(){
		let nbMedi = 0;
		let nbMin = 0;
		let nbGene = 0;
		let nbPrinc = 0;
		let nbAutre = 0;
		let maxMedi = {
			titulaire: "",
			nbMedi: 0,
			Generique: 0,
			Princep: 0,
			Autre:0
		};
		let maxGene = {
			titulaire: "",
			nbMedi: 0,
			Generique: 0,
			Princep: 0,
			Autre: 0
		};
		let maxPrinc = {
			titulaire: "",
			nbMedi: 0,
			Generique: 0,
			Princep: 0,
			Autre: 0
		};
		this.laboratoires.forEach(element => {
			let nb = element.data[0].value + element.data[1].value+element.data[2].value
			nbMedi += nb
			nbGene += element.data[0].value
			nbPrinc += element.data[1].value
			nbAutre += element.data[2].value
			if (maxMedi.nbMedi < nb) {
				maxMedi = {
					titulaire: element.titulaire,
					nbMedi: nb,
					Generique: element.data[0].value,
					Princep: element.data[1].value,
					Autre: element.data[2].value
				}
			}
			if(maxGene.Generique < element.data[0].value){
				maxGene = {
					titulaire: element.titulaire,
					nbMedi: nb,
					Generique: element.data[0].value,
					Princep: element.data[1].value,
					Autre: element.data[2].value
				}
			}
			if(maxPrinc.Generique < element.data[1].value){
				maxPrinc = {
					titulaire: element.titulaire,
					nbMedi: nb,
					Generique: element.data[0].value,
					Princep: element.data[1].value,
					Autre: element.data[2].value
				}
			}
			if (nb == 1){
				nbMin++;
			}
		});

		let txt = `
			<h3>Infos sur la base de données </h3>
			<ul class="list-group">
				<li class="list-group-item d-flex justify-content-between align-items-center">
					Nombre de laboratoires&nbsp;:
					<span class="badge bg-primary rounded-pill">` + this.laboratoires.length + `</span>
				</li>
				<li class="list-group-item">
					<div class="d-flex justify-content-between align-items-center">
						Nombre de médicaments&nbsp;:
						<span class="badge bg-primary rounded-pill">` + nbMedi + `</span>
					</div>
					<ul class="ml-3 list-unstyled">
						<li class="d-flex justify-content-between align-items-center">
							<span>Nombre de géneriques&nbsp;:</span>
							<span class="badge bg-info rounded-pill">` + nbGene + `</span>
						</li>
						<li class="d-flex justify-content-between align-items-center">
							<span class="">Nombre de Princeps&nbsp;:</span>
							<span class="badge bg-info rounded-pill">` + nbPrinc + `</span>
						</li>
						<li class="d-flex justify-content-between align-items-center">
							<span class="ps-5">Autre (homéopathie ou non renseigné)&nbsp;:</span>
							<span class="badge bg-info rounded-pill">` +  nbAutre + `</span>
						</li>
					</ul>
				</li>
				<li class="list-group-item d-flex justify-content-between align-items-center">
					En moyenne, un laboratoire produit&nbsp;:
					<span class="badge bg-primary rounded-pill">` +  nbMedi / this.laboratoires.length + ` médicaments</span>
				</li>
				<li class="list-group-item d-flex justify-content-between align-items-center">
					Laboratoires n&rsquo;ayant produit qu&rsquo;un seul médicament&nbsp;:
					<span class="badge bg-primary rounded-pill">` + nbMin + `</span>
				</li>
				<li class="list-group-item">
					<div class="d-flex justify-content-between align-items-center">
						Laboratoire ayant produit le plus de médicaments&nbsp;:
						<span class="badge bg-primary rounded-pill">` + maxMedi.titulaire + `</span>
					</div>
					<div class="ml-3 d-flex justify-content-between align-items-center">
						<span>avec&nbsp;:</span>
						<span class="badge bg-info rounded-pill">` + maxMedi.nbMedi + ` medicaments </span>
					</div>
					<ul class="ml-5 list-unstyled">
						<li class="d-flex justify-content-between align-items-center">
							<span class="">dont&nbsp;:</span>
							<span class="badge bg-secondary rounded-pill">` + maxMedi.Generique + ` génériques</span>
						</li>
						<li class="d-flex justify-content-between align-items-center">
							<span class="ps-5">ainsi que&nbsp;:</span>
							<span class="badge bg-secondary rounded-pill">` +  maxMedi.Princep + ` princeps</span>
						</li>
						<li class="d-flex justify-content-between align-items-center">
							<span class="ps-5">et&nbsp;:</span>
							<span class="badge bg-secondary rounded-pill">` +  maxMedi.Autre + ` autres</span>
						</li>
					</ul>
				</li>
				<li class="list-group-item">
					<div class="d-flex justify-content-between align-items-center">
						Laboratoire ayant produit le plus de médicaments génériques&nbsp;:
						<span class="badge bg-primary rounded-pill">` + maxGene.titulaire + `</span>
					</div>
					<div class="ml-3 d-flex justify-content-between align-items-center">
						<span>avec&nbsp;:</span>
						<span class="badge bg-info rounded-pill">` + maxGene.nbMedi + ` medicaments </span>
					</div>
					<ul class="ml-5 list-unstyled">
						<li class="d-flex justify-content-between align-items-center">
							<span class="">dont&nbsp;:</span>
							<span class="badge bg-secondary rounded-pill">` + maxGene.Generique + ` génériques</span>
						</li>
						<li class="d-flex justify-content-between align-items-center">
							<span class="ps-5">ainsi que&nbsp;:</span>
							<span class="badge bg-secondary rounded-pill">` + maxGene.Princep + ` princeps</span>
						</li>
						<li class="d-flex justify-content-between align-items-center">
							<span class="ps-5">et&nbsp;:</span>
							<span class="badge bg-secondary rounded-pill">` + maxGene.Autre + ` autres</span>
						</li>
					</ul>
				</li>
				<li class="list-group-item">
					<div class="d-flex justify-content-between align-items-center">
						Laboratoire ayant produit le plus de médicaments princeps&nbsp;:
						<span class="badge bg-primary rounded-pill">` + maxPrinc.titulaire + `</span>
					</div>
					<div class="ml-3 d-flex justify-content-between align-items-center">
						<span>avec&nbsp;:</span>
						<span class="badge bg-info rounded-pill">` + maxPrinc.nbMedi + ` medicaments </span>
					</div>
					<ul class="ml-5 list-unstyled">
						<li class="d-flex justify-content-between align-items-center">
							<span class="">dont&nbsp;:</span>
							<span class="badge bg-secondary rounded-pill">` + maxPrinc.Generique + ` génériques</span>
						</li>
						<li class="d-flex justify-content-between align-items-center">
							<span class="ps-5">ainsi que&nbsp;:</span>
							<span class="badge bg-secondary rounded-pill">` + maxPrinc.Princep + ` princeps</span>
						</li>
						<li class="d-flex justify-content-between align-items-center">
							<span class="ps-5">et&nbsp;:</span>
							<span class="badge bg-secondary rounded-pill">` + maxPrinc.Autre + ` autres</span>
						</li>
					</ul>
				</li>
			</ul>`;
		document.getElementById("statLabo").innerHTML = txt;
	}
}
