import { Component, ViewChild, OnInit } from '@angular/core';
import { DonneesService } from '../donnees.service';
import { PieComponent } from '../pie/pie.component';
import { StackedBarComponent } from '../stacked-bar/stacked-bar.component';
import { ListeMedicamentLaboComponent } from '../liste-medicament-labo/liste-medicament-labo.component';
import { ListeLaboComponent } from '../liste-labo/liste-labo.component';

export type DataType = { nom: any, value: any };

@Component({
	selector: 'app-analyses',
	templateUrl: './analyses.component.html',
	styleUrls: ['./analyses.component.scss']
})
export class AnalysesComponent implements OnInit {
	@ViewChild(PieComponent) childPie:PieComponent;
	@ViewChild(StackedBarComponent) childBar:StackedBarComponent;
	@ViewChild(ListeMedicamentLaboComponent) childListeM:ListeMedicamentLaboComponent;
	@ViewChild(ListeLaboComponent) childListeL:ListeLaboComponent;

	constructor(private donnees: DonneesService) {

	}

	ngOnInit(): void {
		this.getLabo();
	}

	drawAnalysis(select) {
		document.getElementById('titulaire').innerHTML = select;
		this.childPie.reset();
		this.childBar.reset();
		this.childListeM.reset();
		if(select != ""){
			this.childListeL.laboratoires.map(element => {
				if (element.titulaire == select){
					this.childPie.constructPieChart(element);
				}
			})
			this.donnees.getPropPrincAnnee({ titulaire: select }).subscribe(
				data => {
					this.childBar.constructStackedBarChart(data.value);
				}
			);
			this.donnees.getData({ titulaire: select }).subscribe(
				data => {
					this.childListeM.updateMedicament(data.value);
				}
			)
		}
	}

	getLabo() {
		this.donnees.getPropPrincLab().subscribe(
			data => {
				this.childListeL.updateLabo(data.value);
			}
		);
	}
}
