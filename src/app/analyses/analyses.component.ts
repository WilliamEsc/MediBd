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
	analyse = {title:String, data:[]};
	analyse2 = [];
	laboratoires = [];
	selected = {};
	test=[
		{date:"2015"},
		{date:"2016"},
		{date:"2017"}
	]
	private svgPie;
	private svgBar;
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

	private createSvgBar(): void {
		this.svgBar = d3.select("figure#stackedBar")
			.append("svg")
			.attr("width", this.widthPie)
			.attr("height", this.heightPie)
			.attr("margin", 50)
			.attr("pading",50);
	}

	private createColorsPie(): void {
		this.colorsPie = d3.scaleOrdinal()
			.domain(this.analyse.data.map(d => d.value.toString()))
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


	drawBar(data) {

	}

	drawAxis(data) {
		const yScale = d3.scaleLinear()
			.range([this.heightPie, 0])
			.domain([0, 100]);

			this.svgBar.append('g')
			.call(d3.axisLeft(yScale));

		const xScale = d3.scaleBand()
			.range([0, this.widthPie-100])
			.domain(this.test.map((s) => s.date))
			.padding(0.2)

			this.svgBar.append('g')
			.attr('transform', `translate(0, ${this.heightPie-100})`)
			.call(d3.axisBottom(xScale));
	}

	updateAnalyse(data) {
		document.getElementById('pie').innerHTML = "";
		if (data.length == 0) {
			return;
		}
		else {
			data.forEach(element => {
				this.analyse.title = element.titulaire;
				this.analyse.data = [
					{ nom:"Generique", value: element.nb_med - element.nb_princ },
					{ nom:"Princep",value: element.nb_princ }
				];
			});
			this.createSvgPie();
			this.createColorsPie();
			this.drawPie(this.analyse.data, this.analyse.title);
		}
	}

	updateAnalyse2(data) {
		document.getElementById('stackedBar').innerHTML = "";
		if (data.length == 0) {
			return;
		}
		this.analyse2 = data;
		this.createSvgBar();
		this.drawAxis(data);
		this.drawBar(data);
	}


	updateLabo(data) {
		let tab = [];
		if (data.length == 0) {
			return;
		}
		else {
			data.sort();
			data.forEach(element => {
				tab.push({
					title: element
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
		this.donnees.getData({ titulaire: data }).subscribe(
			data => {
				console.log(data);
				this.updateAnalyse2(data.value);
			}
		)
	}

	getLabo() {
		this.donnees.getTitulaire().subscribe(
			data => {
				console.log(data);
				this.updateLabo(data.value);
			}
		);
	}

}
