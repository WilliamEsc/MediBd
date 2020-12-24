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
private svg;
private margin = 50;
private width = 300;
private height = 200;
// The radius of the pie chart is half the smallest side
private radius = Math.min(this.width, this.height) / 2 - this.margin;
private colors;

private createSvg(): void {
	this.svg = d3.select("figure#pie")
	.append("svg")
	.attr("width", this.width)
	.attr("height", this.height)
	.append("g")
	.attr(
		"transform",
		"translate(" + this.width / 2 + "," + this.height / 2 + ")"
	);
}

private createColors(): void {
	this.colors = d3.scaleOrdinal()
	.domain(this.analyse[0].data.map(d => d.value.toString()))
	.range(["#2d60ae", "#2aa446"]);
}

constructor(private donnees: DonneesService) {

}

ngOnInit(): void {
}

drawPie(data,title) {
	// Compute the position of each group on the pie:
	const pie = d3.pie<any>().value((d: any) => Number(d.value));

	// Build the pie chart
	this.svg
	.selectAll('pieces')
	.data(pie(data))
	.enter()
	.append('path')
	.attr('d', d3.arc()
		.innerRadius(0)
		.outerRadius(this.radius)
	)
	.attr('fill', (d, i) => (this.colors(i)))
	.attr("stroke", "#121926")
	.style("stroke-width", "1px");

	// Add labels
	const labelLocation = d3.arc()
	.innerRadius(60)
	.outerRadius(this.radius);

	this.svg
	.selectAll('pieces')
	.data(pie(data))
	.enter()
	.append('text')
	.text(d => d.data.nom+' '+d.data.value)
	.attr("transform", d => "translate(" + labelLocation.centroid(d) + ")")
	.style("text-anchor", "middle")
	.style('fill', 'black')
	.style("font-size", 15);

	this.svg.append("text")
	.attr("x", 15-this.width/2)             
	.attr("y", 12-this.height/2) 
	.style("font-size", "10px") 
	.style("text-decoration", "underline")  
	.style('fill', 'darkOrange')
	.text(title);
}

updateAnalyse(data) {
	if (data.length == 0) {
		return;
	}
	else {
	data.forEach(element => {
		this.analyse.push({
		title: element._id.titulaire,
		data: [
			{ nom: 'Generique', value: element.nb_med-element.nb_princ },
			{ nom: 'Princep', value: element.nb_princ }
		]
		});
	});
	this.analyse.forEach(data=>{
		this.createSvg();
		this.createColors();
		this.drawPie(data.data,data.title);
	})
	}
}

getData() {
	this.donnees.getPropPrincLab().subscribe(
	data => {
		this.updateAnalyse(data.value);
	}
	);
}

}
