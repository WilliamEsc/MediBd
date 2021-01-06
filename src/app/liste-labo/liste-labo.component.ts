import { Component, OnInit , Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-liste-labo',
  templateUrl: './liste-labo.component.html',
  styleUrls: ['./liste-labo.component.scss']
})
export class ListeLaboComponent implements OnInit {
  
  @Output() nameUpdate: EventEmitter<string> = new EventEmitter<string>();
  updateParent(name){
    this.nameUpdate.emit(name)
  }

  laboratoires = [];

  constructor() { }

  ngOnInit(): void {
  }

  updateLabo(data) {
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
		let nbMedi=0;
		let nbMin=0;
		let nbGene=0;
		let nbPrinc=0;
		let maxMedi={
			titulaire:"",
			nbMedi:0,
			Generique:0,
			Princep:0
		};
		let maxGene={
			titulaire:"",
			nbMedi:0,
			Generique:0,
			Princep:0
		};
		let maxPrinc={
			titulaire:"",
			nbMedi:0,
			Generique:0,
			Princep:0
		};
		this.laboratoires.map(element=>{
			let nb=element.data[0].value+element.data[1].value
			nbMedi+= nb
			nbGene+= element.data[0].value
			nbPrinc+= element.data[1].value
			if(maxMedi.nbMedi<nb){
				maxMedi={
					titulaire:element.titulaire,
					nbMedi:nb,
					Generique:element.data[0].value,
					Princep:element.data[1].value
				}
			}
			if(maxGene.Generique<element.data[0].value){
				maxGene={
					titulaire:element.titulaire,
					nbMedi:nb,
					Generique:element.data[0].value,
					Princep:element.data[1].value
				}
			}
			if(maxPrinc.Generique<element.data[1].value){
				maxPrinc={
					titulaire:element.titulaire,
					nbMedi:nb,
					Generique:element.data[0].value,
					Princep:element.data[1].value
				}
			}
			if(nb==1){
				nbMin++;
			}
		});
		let txt="<h3>Infos sur la base de données </h3>";
		txt+="<div> Nombre de laboratoire: "+ this.laboratoires.length+"</div>";
		txt+="<div> Nombre de Médicament: "+ nbMedi+" Nombre de Génerique:"+ nbGene+" Nombre de Princep:"+ nbPrinc+"</div>";
		txt+="<div> En moyenne un laboratoire produit "+ nbMedi/this.laboratoires.length+" médicaments </div>";
		txt+="<div> Un total de "+ nbMin +" laboratoires n'as produit qu'un seul médicament </div>";
		txt+="<div> Laboratoire ayant produit le plus de médicament: "+ maxMedi.titulaire+" avec "+maxMedi.nbMedi +" medicaments dont "+ maxMedi.Generique +" generique et "+ maxMedi.Princep+" princep</div>";
		txt+="<div> Laboratoire ayant produit le plus de médicament Generique: "+ maxGene.titulaire+" avec "+maxGene.nbMedi +" medicaments dont "+ maxGene.Generique +" generique et "+ maxGene.Princep+" princep</div>";
		txt+="<div> Laboratoire ayant produit le plus de médicament Princep: "+ maxPrinc.titulaire+" avec "+maxPrinc.nbMedi +" medicaments dont "+ maxPrinc.Generique +" generique et "+ maxPrinc.Princep+" princep</div>";
		document.getElementById("statLabo").innerHTML=txt;
	}

}