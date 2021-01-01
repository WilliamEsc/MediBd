import { Component, ViewChild, OnInit } from '@angular/core';
import { DonneesService } from '../donnees.service';
import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Axis from 'd3-axis';
import * as d3Array from 'd3-array';
import { piecewise } from 'd3';

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
	medicament= [];
	selected :string;

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

	private createColorsPie(data): void {
		this.colorsPie = d3.scaleOrdinal()
			.domain(data.map(d => d.value.toString()))
			.range(["#2d60ae", "#2aa446"]);
	}


    private initMargins() {
        this.margin = {top: 20, right: 20, bottom: 30, left: 40};
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

	private initSvg() {
        this.svg = d3.select("figure#stackedBar").append('svg').attr("width", 400)
		.attr("height", 300);

        this.width = 400 - this.margin.left - this.margin.right;
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
		let boolGen=false;
		let boolPrinc=false;
		data.map(d =>{
			if(d.generique >0){
				boolGen=true;
			}
			if(d.princep >0){
				boolPrinc=true;
			}
		});
		if(boolGen && boolPrinc){
			this.z = d3Scale.scaleOrdinal()
			.range(["#2d60ae","#2aa446"]);
			keys =["generique","princep"];
		}else if(boolGen ){
			this.z = d3Scale.scaleOrdinal()
			.range(["#2aa446"]);
			keys =["generique"];
		}else{
			this.z = d3Scale.scaleOrdinal()
			.range(["#2d60ae"]);
			keys =["princep"];
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

	constructStackedBarChart(data) {
		document.getElementById('stackedBar').innerHTML = "";
		if (data.length == 0) {
			return;
		}
		this.initMargins();
		this.initSvg();
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

	updateMedicament(data){
		let tab=[]
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
			this.medicament.sort((a,b) => (a.denomination > b.denomination) ? 1 : ((b.denomination > a.denomination) ? -1 : 0)); 
			console.log(this.medicament);
		}
	}

	drawAnalysis(titulaire) {
		this.donnees.getPropPrincLab(titulaire).subscribe(
			data => {
				this.constructPieChart(data.value[0]);
			}
		);
		this.donnees.getPropPrincAnnee({ titulaire: titulaire }).subscribe(
			data => {
				this.constructStackedBarChart(data.value);
			}
		);
		this.donnees.getData({titulaire:titulaire}).subscribe(
			data =>{
				this.updateMedicament(data.value);
			}
		)
	}

	printOk2(nomMedoc,index) {
		console.log(this.medicament[index]);
		if(this.selected){
			document.getElementById(this.selected).innerHTML="";
		}
		if(this.selected != nomMedoc){
			this.selected=nomMedoc;
			document.getElementById(this.selected).innerHTML="CodeCis: "+this.medicament[index].codeCis;
		}else{
			this.selected="";
		}
	}

	getLabo() {
		this.donnees.getTitulaire().subscribe(
			data => {
				this.updateLabo(data.value);
			}
		);
	}

}
