import { Component, Input, OnInit } from '@angular/core';
import { Runtime, Inspector } from "./runtime.js";

@Component({
	selector: 'app-force-directed-graph',
	templateUrl: './force-directed-graph.component.html',
	styleUrls: ['./force-directed-graph.component.scss']
})
export class ForceDirectedGraphComponent implements OnInit {
	@Input() data: any;
	constructor(){}
	ngOnInit(): void{}

	main;

	ngOnChanges() {
		this.initialisation();
	}

	toto = setTimeout(() => this.initialisation(), 500);

	initialisation(){
		this.main = new Runtime().module(define, name=> {
			if(name === "chart"){
				return new Inspector(document.getElementById('directedGraph'));
			}
		});

		setTimeout(() => {
			// Redefine the cell `data` as the local file population.json;
			// it will update in the element previously given to the Inspector above
			this.main.redefine("data", this.data)
		  }, 500)
	}
}

// Cf. https://observablehq.com/@sbryfcz/d3-force-directed-graph-with-convex-hull
export default function define(runtime, observer){
	const main = runtime.module();
	main.variable(observer()).define(
		["md"], function(md){
			return(
				md``
			)
		}
	);
	main.variable(observer("chart")).define(
		"chart", ["data", "d3", "width", "height", "_", "DOM", "color", "drag"], function(data,d3, width, height, _, DOM, color, drag){
			const links = data.links.map(d => Object.create(d));
			const nodes = data.nodes.map(d => Object.create(d));
			
			const simulation = d3.forceSimulation(nodes)
				.force("link", d3.forceLink(links).id(d => d.id))
				.force("charge", d3.forceManyBody())
				.force("center", d3.forceCenter(width / 2, height / 2))
				.on("tick", ticked);
			
			var groups = _(data.nodes).map('group').uniq().sort().value();
			
			// mutate to add the group
			_.each(
				nodes, (n, i) => {
					n.group = data.nodes[i].group;
				}
			);
			
			// now group by group
			const nodeGroups = _.groupBy(nodes, 'group');
				
			const svg = d3.select(DOM.svg(width, height));
			
			const hulls = svg.append("g")
				.selectAll('path')
				.data(groups)
				.enter()
				.append('path')
				.style(
					'stroke', d => {
						return color({group:d});
					}
				)
			.style('fill', 'none')
			.style('stroke-width', 15)
			.style('stroke-opacity', 0.3)
			.style('fill-opacity', 0.3)
			.attr('stroke-linejoin', 'round');
			
			const link = svg.append("g")
				.attr("stroke", "#999")
				.attr("stroke-opacity", 0.6)
				.selectAll("line")
				.data(links)
				.enter().append("line")
				.attr("stroke-width", d => Math.sqrt(d.value));
			
			const node = svg.append("g")
				.attr("stroke", "#fff")
				.attr("stroke-width", 1.5)
				.selectAll("circle")
				.data(nodes)
				.enter().append("circle")
				.attr("r", 5)
				.attr("fill", color)
				.call(drag(simulation));
		
			node.append("title")
				.text(d => d.id);
			
			function ticked() {
				link
					.attr("x1", d => d.source.x)
					.attr("y1", d => d.source.y)
					.attr("x2", d => d.target.x)
					.attr("y2", d => d.target.y);
			
				node
					.attr("cx", d => d.x)
					.attr("cy", d => d.y);
			
				hulls 
					.attr('d', g => {    
						let hullPoints = nodeGroups[g].map(
							n=>{
								return [n.x,n.y];
							}
						);
						const hullData = d3.polygonHull(hullPoints);      
						if(hullData === null){
							return;
						}
						hullData.push(hullData[0]);
						return d3.line()(hullData);
				});
			}
			return svg.node();
		}
	);
	main.variable(observer("data")).define(
		"data", async function(){
			return(
				JSON
			)
		}
	);
	main.variable(observer("height")).define(
		"height", function(){
			return(
				600
			)
		}
	);
	main.variable(observer("color")).define(
		"color", ["d3"], function(d3){
			const scale = d3.scaleOrdinal(d3.schemePaired);
			return d => scale(d.group);
		}
	);
	main.variable(observer("drag")).define(
		"drag", ["d3"], function(d3){
			return(
				simulation => {
					function dragstarted(d){
						if(!d3.event.active) simulation.alphaTarget(0.3).restart();
						d.fx = d.x;
						d.fy = d.y;
					}
					function dragged(d){
						d.fx = d3.event.x;
						d.fy = d3.event.y;
					}
					function dragended(d){
						if(!d3.event.active) simulation.alphaTarget(0);
						d.fx = null;
						d.fy = null;
					}
					return d3.drag()
						.on("start", dragstarted)
						.on("drag", dragged)
						.on("end", dragended);
				}
			)
		}
	);
	main.variable(observer("d3")).define(
		"d3", ["require"], function(require){
			return(
				require("https://d3js.org/d3.v5.min.js")
			)
		}
	);
	main.variable(observer("_")).define(
		"_", ["require"], function(require){
			return(
				require('lodash@4.17.10')
			)
		}
	);
	return main;
}