import { Component, ViewChild, OnInit } from '@angular/core';
import { DonneesService } from '../donnees.service';
import * as d3 from 'd3';
import { piecewise } from 'd3';

export type DataType = { nom: any, value: any };

@Component({
	selector: 'app-analyses',
	templateUrl: './analyses.component.html',
	styleUrls: ['./analyses.component.scss']
})
export class AnalysesComponent implements OnInit {
	analyse = [];
	laboratoires = [];
	selected = {};
	private svgPie;
	private margin = 50;
	private widthPie = 300;
	private heightPie = 200;
	private radius = Math.min(this.widthPie, this.heightPie) / 2 - this.margin; // The radius of the pie chart is half the smallest side
	private colorsPie;

	constructor(private donnees: DonneesService) {

	}

	ngOnInit(): void {
		this.getLabo();
	}

	private createSvgPie(): void {
		this.svgPie = d3.select("figure#pie")
			.append("svg")
			.attr("width", this.widthPie)
			.attr("height", this.heightPie)
			.append("g")
			.attr(
				"transform",
				"translate(" + this.widthPie / 2 + "," + this.heightPie / 2 + ")"
			);
	}

	private createColorsPie(): void {
		this.colorsPie = d3.scaleOrdinal()
			.domain(this.analyse[0].data.map(d => d.value.toString()))
			.range(["#2d60ae", "#2aa446"]);
	}

	drawPie(data, title) {
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

		this.svgPie.append("text")
			.attr("x", 15 - this.widthPie / 2)
			.attr("y", 12 - this.heightPie / 2)
			.style("font-size", "10px")
			.style("text-decoration", "underline")
			.style('fill', 'darkOrange')
			.text(title);
	}

	updateAnalyse(data) {
		let test = [];
		document.getElementById('pie').innerHTML = "";
		if (data.length == 0) {
			return;
		}
		else {
			data.forEach(element => {
				test.push({
					title: element.titulaire,
					data: [
						{ nom: 'Generique', value: element.nb_med - element.nb_princ },
						{ nom: 'Princep', value: element.nb_princ }
					]
				});
			});
			this.analyse = test;
			this.analyse.forEach(data => {
				this.createSvgPie();
				this.createColorsPie();
				this.drawPie(data.data, data.title);
			})
		}
	}


	updateLabo(data) {
		let tab = [];
		if (data.length == 0) {
			return;
		}
		else {
			data.forEach(element => {
				tab.push({
					title: element.titulaire
				});
			});
			this.laboratoires = tab;
		}
	}

	printOK(data) {
		this.donnees.getPropPrincLab(data).subscribe(
			data => {
				this.updateAnalyse(data.value);
			}
		);
	}

	getLabo() {
		this.donnees.getLabo().subscribe(
			data => {
				console.log(data);
				this.updateLabo(data.value);
			}
		);
	}

}
