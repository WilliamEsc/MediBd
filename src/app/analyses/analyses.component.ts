import { Component, ViewChild, OnInit } from '@angular/core';
import { DonneesService } from '../donnees.service';
import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Axis from 'd3-axis';
import * as d3Array from 'd3-array';
import { piecewise } from 'd3';
import { stringify } from 'querystring';

export type DataType = { nom: any, value: any };

export interface Margin {
	top: number;
	right: number;
	bottom: number;
	left: number;
}

@Component({
	selector: 'app-analyses',
	templateUrl: './analyses.component.html',
	styleUrls: ['./analyses.component.scss']
})
export class AnalysesComponent implements OnInit {
	laboratoires = [];
	medicament = [];
	selected: string;

	private svgPie;
	private marginPie = 50;
	private widthPie = 300;
	private heightPie = 200;
	private radius = Math.min(this.widthPie, this.heightPie) / 2 - this.marginPie; // The radius of the pie chart is half the smallest side
	private colorsPie;


	private margin: Margin;
	private width: number;
	private height: number;
	private svg: any;
	private x: any;
	private y: any;
	private z: any;
	private g: any;

	constructor(private donnees: DonneesService) {

	}

	ngOnInit(): void {
		this.getLabo();
	}

	//////////////////PIE CHART///////////////////////////////////////////
	private createSvgPie(): void {
		this.svgPie = d3.select("figure#pie")
			.append("svg")
			.attr("style", "background-color:aliceblue")
			.attr("width", this.widthPie)
			.attr("height", this.heightPie)
			.append("g")
			.attr(
				"transform",
				"translate(" + this.widthPie / 2 + "," + this.heightPie / 2 + ")"
			);
	}

	private createColorsPie(data): void {
		let color = [];
		if (data[0].value > 0) {
			color.push("#2d60ae");
		}
		if (data[1].value > 0) {
			color.push("#2aa446");
		}
		this.colorsPie = d3.scaleOrdinal()
			.domain(data.map(d => d.value.toString()))
			.range(color);
	}


	private initMargins() {
		this.margin = { top: 20, right: 20, bottom: 30, left: 40 };
	}

	drawPie(data) {
		// Compute the position of each group on the pie:
		const pie = d3.pie<any>().value((d: any) => Number(d.value));

		// Build the pie chart
		this.svgPie
			.selectAll('pieces')
			.data(pie(data))
			.enter()
			.append('path')
			.attr('d', d3.arc()
				.innerRadius(0)
				.outerRadius(this.radius)
			)
			.attr('fill', (d, i) => (this.colorsPie(i)))
			.attr("stroke", "#121926")
			.style("stroke-width", "1px");

		// Add labels
		const labelLocation = d3.arc()
			.innerRadius(60)
			.outerRadius(this.radius);

		this.svgPie
			.selectAll('pieces')
			.data(pie(data))
			.enter()
			.append('text')
			.text(d => d.data.nom + ' ' + d.data.value)
			.attr("transform", d => "translate(" + labelLocation.centroid(d) + ")")
			.style("text-anchor", "middle")
			.style('fill', 'black')
			.style("font-size", 15);

	}

	constructPieChart(data) {
		document.getElementById('pie').innerHTML = "";
		if (data.length == 0) {
			return;
		}
		else {
			document.getElementById('titulaire').innerHTML = data.titulaire;
			this.createSvgPie();
			this.createColorsPie(data.data);
			this.drawPie(data.data);
		}
	}
	//////////////////////////////////////////////////////////////////////

	//////////////////BAR CHART///////////////////////////////////////////
	private initSvg() {


		if (screen.width > 400) {
			this.svg = d3.select("figure#stackedBar").append('svg').attr("width", 400)
				.attr("height", 300);
			this.width = 400 - this.margin.left - this.margin.right;
		} else {
			this.svg = d3.select("figure#stackedBar").append('svg').attr("width", screen.width)
				.attr("height", 300);
			this.width = screen.width - this.margin.left - this.margin.right;
		}
		this.svg.attr("style", "background-color:aliceblue")
		this.height = 300 - this.margin.top - this.margin.bottom;

		this.g = this.svg.append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

		this.x = d3Scale.scaleBand()
			.rangeRound([0, this.width])
			.paddingInner(0.05)
			.align(0.1);
		this.y = d3Scale.scaleLinear()
			.rangeRound([this.height, 0]);
	}

	drawBar(data: any[]) {
		let keys;
		let boolGen = false;
		let boolPrinc = false;
		data.map(d => {
			if (d.generique > 0) {
				boolGen = true;
			}
			if (d.princep > 0) {
				boolPrinc = true;
			}
		});
		if (boolGen && boolPrinc) {
			this.z = d3Scale.scaleOrdinal()
				.range(["#2d60ae", "#2aa446"]);
			keys = ["generique", "princep"];
		} else if (boolGen) {
			this.z = d3Scale.scaleOrdinal()
				.range(["#2d60ae"]);
			keys = ["generique"];
		} else {
			this.z = d3Scale.scaleOrdinal()
				.range(["#2aa446"]);
			keys = ["princep"];
		}

		data = data.map(v => {
			v.total = keys.map(key => v[key]).reduce((a, b) => a + b, 0);
			return v;
		});

		this.x.domain(data.map((d: any) => d.annee));
		this.y.domain([0, d3Array.max(data, (d: any) => d.total)]).nice();
		this.z.domain(keys);

		this.g.append('g')
			.selectAll('g')
			.data(d3Shape.stack().keys(keys)(data))
			.enter().append('g')
			.attr('fill', d => this.z(d.key))
			.selectAll('rect')
			.data(d => d)
			.enter().append('rect')
			.attr('x', d => this.x(d.data.annee))
			.attr('y', d => this.y(d[1]))
			.attr('height', d => this.y(d[0]) - this.y(d[1]))
			.attr('width', this.x.bandwidth());

		this.g.append('g')
			.attr('class', 'axis')
			.attr('transform', 'translate(0,' + this.height + ')')
			.call(d3Axis.axisBottom(this.x));

		this.g.append('g')
			.attr('class', 'axis')
			.call(d3Axis.axisLeft(this.y).ticks(null, 's'))
			.append('text')
			.attr('x', 2)
			.attr('y', this.y(this.y.ticks().pop()) + 0.5)
			.attr('dy', '0.32em')
			.attr('fill', '#000')
			.attr('font-weight', 'bold')
			.attr('text-anchor', 'start')
			.text('Population');

		let legend = this.g.append('g')
			.attr('font-family', 'sans-serif')
			.attr('font-size', 10)
			.attr('text-anchor', 'end')
			.selectAll('g')
			.data(keys.slice().reverse())
			.enter().append('g')
			.attr('transform', (d, i) => 'translate(0,' + i * 20 + ')');

		legend.append('rect')
			.attr('x', this.width)
			.attr('width', 19)
			.attr('height', 19)
			.attr('fill', this.z);

		legend.append('text')
			.attr('x', this.width - 5)
			.attr('y', 9.5)
			.attr('dy', '0.32em')
			.text(d => d);
	}

	constructStackedBarChart(data) {
		document.getElementById('stackedBar').innerHTML = "";
		if (data.length == 0) {
			return;
		}
		this.initMargins();
		this.initSvg();
		this.drawBar(data);
	}
	//////////////////////////////////////////////////////////////////////


	drawAnalysis(select) {
		this.selected = "";
		this.laboratoires.map(element => {
			if (element.titulaire == select)
				this.constructPieChart(element);
		})
		this.donnees.getPropPrincAnnee({ titulaire: select }).subscribe(
			data => {
				this.constructStackedBarChart(data.value);
			}
		);
		this.donnees.getData({ titulaire: select }).subscribe(
			data => {
				this.updateMedicament(data.value);
			}
		)
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

	getLabo() {
		this.donnees.getPropPrincLab().subscribe(
			data => {
				this.updateLabo(data.value);
			}
		);
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

	updateMedicament(data) {
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
