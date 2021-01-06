import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-medicament-labo',
  templateUrl: './liste-medicament-labo.component.html',
  styleUrls: ['./liste-medicament-labo.component.scss']
})
export class ListeMedicamentLaboComponent implements OnInit {
  medicament = [];
  selected: string;

  constructor() { }

  ngOnInit(): void {
  }

  reset(){
	  this.medicament=[];
  }

  updateMedicament(data) {
    this.selected="";
		let tab = []
		if (data.length == 0) {
			return;
		}
		else {
			data.forEach(element => {
				tab.push({
					title: element.denomination
				});
			});
			tab.sort();
			this.medicament = data;
			this.medicament.sort((a, b) => (a.denomination > b.denomination) ? 1 : ((b.denomination > a.denomination) ? -1 : 0));
			console.log(this.medicament);
		}
  }
  
  detailMedoc(nomMedoc, index) {
		console.log(this.medicament[index]);
		if (this.selected) {
			document.getElementById(this.selected).innerHTML = "";
		}
		if (this.selected != nomMedoc) {
			this.selected = nomMedoc;
			var div = document.createElement('div');
			div.setAttribute('class', 'd-flex justify-content-between bg-secondary');
			div.innerHTML = "<div>codeCis: " + this.medicament[index].codeCis + "</div><div> tesrttsr</div>";
			document.getElementById(this.selected).appendChild(div);
		} else {
			this.selected = "";
		}
	}
}