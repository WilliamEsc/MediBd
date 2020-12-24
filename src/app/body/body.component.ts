import { Component, OnInit, ViewChild } from '@angular/core';
import { RechercheComponent } from "../recherche/recherche.component"

@Component({
	selector: 'app-body',
	templateUrl: './body.component.html',
	styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
	@ViewChild(RechercheComponent) child;
	constructor(){}

	ngOnInit(): void {
	}
}
