import { Component, OnInit } from '@angular/core';
import { DonneesService } from '../donnees.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {

  private svgPie;
	private marginPie = 50;
	private widthPie = 300;
	private heightPie = 200;
	private radius = Math.min(this.widthPie, this.heightPie) / 2 - this.marginPie; // The radius of the pie chart is half the smallest side
	private colorsPie;

  constructor(private donnees: DonneesService) { }

  ngOnInit(): void {
  }

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

	reset(){
		document.getElementById('pie').innerHTML = "";
	}

	constructPieChart(data) {
		if (data.length == 0) {
			return;
		}
		else {
			this.createSvgPie();
			this.createColorsPie(data.data);
			this.drawPie(data.data);
		}
	}
}
