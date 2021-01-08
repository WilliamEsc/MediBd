import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Axis from 'd3-axis';
import * as d3Array from 'd3-array';

export interface Margin {
	top: number;
	right: number;
	bottom: number;
	left: number;
}

@Component({
  selector: 'app-stacked-bar',
  templateUrl: './stacked-bar.component.html',
  styleUrls: ['./stacked-bar.component.scss']
})
export class StackedBarComponent implements OnInit {
  private margin: Margin;
	private width: number;
	private height: number;
	private svg: any;
	private x: any;
	private y: any;
	private z: any;
	private g: any;

  constructor() { }

  ngOnInit(): void {
  }

  reset(){
	  document.getElementById("stackedBar").innerHTML="";
  }

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
		let keys=[];
		let color=[];
		let boolGen=false;
		let boolPrin=false;
		let boolAutre=false;
		data.map(d => {
			if (d.generique > 0) {
				boolGen=true;
			}
			if (d.princep > 0) {
				boolPrin=true;
			}
			if (d.autre > 0) {
				boolAutre=true;
			}
		});
		if(boolAutre){
			keys.push("autre");
			color.push("#9cb61a");
		}
		if(boolGen){
			keys.push("generique");
			color.push("#2d60ae");
		}
		if(boolPrin){
			keys.push("princep");
			color.push("#2aa446");
		}
			this.z = d3Scale.scaleOrdinal()
				.range(color);

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

	private initMargins() {
		this.margin = { top: 20, right: 20, bottom: 30, left: 40 };
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

}
