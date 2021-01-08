import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-medicament-labo',
  templateUrl: './liste-medicament-labo.component.html',
  styleUrls: ['./liste-medicament-labo.component.scss']
})
export class ListeMedicamentLaboComponent implements OnInit {
  medicament = [];
  selected={
	  nom:"",
	  index: 0
  };

  constructor() { }

  ngOnInit(): void {
  }

  reset(){
	  this.medicament=[];
  }

  updateMedicament(data) {
    this.selected.nom="";
		if (data.length == 0) {
			return;
		}
		else {
			data.forEach(element => {
				let obj={class: "autre"};
				if(element.gene){
					if(element.gene.typeGenerique==0){
						obj.class="Generique";
					}else{
						obj.class="Princep";
					}
				}
				Object.assign(element, obj);
			});
			this.medicament = data;
			this.medicament.sort((a, b) => (a.denomination > b.denomination) ? 1 : ((b.denomination > a.denomination) ? -1 : 0));
		}
  }
  
  detailMedoc(nomMedoc, index) {
		console.log(this.medicament[index]);
		if (this.selected.nom) {
			document.getElementById(this.selected.nom).innerHTML = "";
			document.getElementById(this.selected.nom).parentElement.setAttribute('class','divMedicament border border-dark '+this.medicament[this.selected.index].class)
		}
		if (this.selected.nom != nomMedoc) {
			this.selected.nom = nomMedoc;
			this.selected.index=index;
			document.getElementById(this.selected.nom).parentElement.setAttribute('class','divMedicament border border-light '+this.medicament[this.selected.index].class)
			var div = document.createElement('div');
			div.setAttribute('class', 'd-flex flex-column bg-secondary rounded-bottom border border-light');
			let inHTML="";
			inHTML += "<div class='d-flex flex-row justify-content-between'><div>codeCis: " + this.medicament[index].codeCis + "</div><div> date AMM:"+ this.medicament[index].dateAMM +"</div></div>";
			inHTML += "<div class='d-flex justify-content-start border border-dark'> voie:"+this.medicament[index].voiesAdministration.replace(/;/gi,", ")+"</div>";
			inHTML += "<div>";
			inHTML += "<div>"+this.medicament[index].statutAdministratif+"</div>";
			inHTML += "<div>"+this.medicament[index].typeProcedureAMM+"</div>";
			inHTML += "<div>"+this.medicament[index].etatDeCommercialisation+"</div>";
			inHTML += "</div>";
			if(this.medicament[index].compo.length >0){
				inHTML += "<div><div class='d-flex justify-content-start border border-dark'>Composant du médicament: </div>"
				this.medicament[index].compo.forEach(element => {
					inHTML += "<div class='d-flex flex-row justify-content-between align-items-end border border-dark'><div class='text-left'>"+element.denominationSubstance +"</div><div > Code:"+ element.codeSubstance+"</div></div>";
				});
				inHTML += "</div>";
			}
			inHTML+="<a href='http://base-donnees-publique.medicaments.gouv.fr/extrait.php?specid="+this.medicament[index].codeCis+"' target='_blank'>Lien vers la notice</a>";
			div.innerHTML=inHTML;
			document.getElementById(this.selected.nom).appendChild(div);
		} else {
			this.selected.nom = "";
		}
	}
}
