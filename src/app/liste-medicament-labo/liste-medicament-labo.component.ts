import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-liste-medicament-labo',
	templateUrl: './liste-medicament-labo.component.html',
	styleUrls: ['./liste-medicament-labo.component.scss']
})
export class ListeMedicamentLaboComponent implements OnInit {
	@Output() clickDesc: EventEmitter<Object> = new EventEmitter<Object>();

	medicament = [];
	selected = {
		nom: "",
		index: 0
	};


	updateParent(denomination, index) {
		this.clickDesc.emit({ denomination: denomination, index: index })
	}

	constructor() { }

	ngOnInit(): void {
	}

	reset() {
		this.medicament = [];
	}

	updateMedicament(data) {
		this.selected.nom = "";
		if (data.length == 0) {
			return;
		}
		else {
			this.medicament = data;
		}
	}

	detailMedoc(infoMed, index) {
		if (this.selected.nom) {
			document.getElementById(this.selected.nom).innerHTML = "";
			document.getElementById(this.selected.nom).parentElement.setAttribute('class', 'divMedicament border border-dark ' + this.medicament[this.selected.index].class)
		}
		if (this.selected.nom != infoMed.denomination) {
			this.selected.nom = infoMed.denomination;
			this.selected.index = index;
			document.getElementById(this.selected.nom).parentElement.setAttribute('class', 'divMedicament border border-light ' + this.medicament[this.selected.index].class);
			var div = document.createElement('div');
			div.setAttribute('class', 'd-flex flex-column bg-secondary rounded-bottom border border-light');
			let inHTML = "";
			inHTML += "<div class='d-flex flex-row justify-content-between'><div>codeCis: " + infoMed.codeCis + "</div><div> date AMM:" + infoMed.dateAMM +
				"</div></div><div class='d-flex justify-content-start border border-dark'> voie:" + infoMed.voiesAdministration.replace(/;/gi, ", ") +
				"</div><div>" +
				"<div>" + infoMed.statutAdministratif + "</div>" +
				"<div>" + infoMed.typeProcedureAMM + "</div>" +
				"<div>" + infoMed.etatDeCommercialisation + "</div>" +
				"</div>";
			if (infoMed.compo.length > 0) {
				inHTML += "<div><div class='d-flex justify-content-start border border-dark'>Composant du médicament: </div>"
				infoMed.compo.forEach(element => {
					inHTML += "<div class='d-flex flex-row justify-content-between align-items-end border border-dark'><div class='text-left'>" + element.denominationSubstance + "</div><div > Code:" + element.codeSubstance + "</div></div>";
				});
				inHTML += "</div>";
			}
			inHTML += "<a href='http://base-donnees-publique.medicaments.gouv.fr/extrait.php?specid=" + infoMed.codeCis + "' target='_blank'>Lien vers la notice</a>";
			div.innerHTML = inHTML;
			document.getElementById(this.selected.nom).appendChild(div);
		} else {
			this.selected.nom = "";
		}
	}
}
