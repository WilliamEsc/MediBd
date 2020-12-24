import { Component, OnInit, ViewEncapsulation }	from '@angular/core';
import { DonneesService }						from '../donnees.service';
import { NgbModal }								from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-recherche-avancee',
	templateUrl: './recherche-avancee.component.html',
	encapsulation: ViewEncapsulation.None,
	styleUrls: ['../app.component.scss']
})

export class RechercheAvanceeComponent implements OnInit {
	constructor(private donnees: DonneesService, private modalService: NgbModal) {
		// Lié aux choix des listes à choix
		this.donnees.getForme()
		.subscribe(rep => {
			rep.value.map(entry => {
				this.formes.push({value:entry,selected:false});
			});
			//console.log(this.formes);
		});
		this.donnees.getVoies()
		.subscribe(rep => {
			rep.value.map(entry => {
				this.voies.push({value:entry,selected:false});
			});
			// console.log(this.Voies);
	    });
		this.donnees.getAMM()
		.subscribe(rep => {
			rep.value.map(entry => {
				this.AMM.push({value:entry,selected:false});
			});
			// console.log(this.AMM);
		});
	}

	public isCollapsed = false
	formes	= [];
	voies	= [];
	AMM		= [];

	// Lié à l'afichage des Modals Boostrap
	ngOnInit(){}
	openScrollableContent(longContent){
		this.modalService.open(longContent, { scrollable: true });
	}
	openLgScrollableContent(longContent){
		this.modalService.open(longContent, { scrollable: true, size: 'lg'});
	}
}
