import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Runtime, Inspector } from "../force-directed-graph/runtime.js";

@Component({
	selector: 'app-zoomable-circle-packing',
	templateUrl: './zoomable-circle-packing.component.html',
	styleUrls: ['./zoomable-circle-packing.component.scss']
})
export class ZoomableCirclePackingComponent implements OnInit, OnChanges{
	@Input() data: any;
	constructor(){}
	ngOnInit(): void {}

	main;

	ngOnChanges() {
		this.initialisation();
	}
	
	toto = setTimeout(() => this.initialisation(), 500);

	initialisation(){
		this.main = new Runtime().module(define, name=> {
			if(name === "chart"){
				return new Inspector(document.getElementById('zoomableCircle'));
			}
		});

		setTimeout(() => {
			// Redefine the cell `data` as the local file population.json;
			// it will update in the element previously given to the Inspector above
			this.main.redefine("data", this.data)
		  }, 500)
	}
}

// Cf. https://observablehq.com/@d3/zoomable-circle-packing
export function define(runtime, observer){
	const main = runtime.module();
	main.variable(observer()).define(
		["md"], function(md){
			return(
				md``
			)
		}
	);
	main.variable(observer("chart")).define(
		"chart", ["pack","data","d3","width","height","color"], function(pack,data,d3,width,height,color){
			const root = pack(data);
			let focus = root;
			let view;

			const svg = d3.create("svg")
				.attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
				.style("display", "block")
				.style("margin", "0 -14px")
				.style("background", color(0))
				.style("cursor", "pointer")
				.on("click", (event) => zoom(event, root));

			const node = svg.append("g")
				.selectAll("circle")
				.data(root.descendants().slice(1))
				.join("circle")
				.attr("fill", d => d.children ? color(d.depth) : "white")
				.attr("pointer-events", d => !d.children ? "none" : null)
				.on("mouseover", function() { d3.select(this).attr("stroke", "#000"); })
				.on("mouseout", function() { d3.select(this).attr("stroke", null); })
				.on("click", (event, d) => focus !== d && (zoom(event, d), event.stopPropagation()));

			const label = svg.append("g")
				.style("font", "8px sans-serif")
				.attr("pointer-events", "none")
				.attr("text-anchor", "middle")
				.selectAll("text")
				.data(root.descendants())
				.join("text")
				.style("fill-opacity", d => d.parent === root ? 1 : 0)
				.style("display", d => d.parent === root ? "inline" : "none")
				.text(d => d.data.name);

			zoomTo([root.x, root.y, root.r * 2]);

			function zoomTo(v){
				const k = width / v[2];

				view = v;

				label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
				node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
				node.attr("r", d => d.r * k);
			}

			function zoom(event, d){
				const focus0 = focus;

				focus = d;

				const transition = svg.transition()
					.duration(event.altKey ? 7500 : 750)
					.tween("zoom", d => {
					const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
					return t => zoomTo(i(t));
					});

				label
				.filter(
					function(d) { return d.parent === focus || this.style.display === "inline"; }
				)
				.transition(transition)
					.style("fill-opacity", d => d.parent === focus ? 1 : 0)
					.on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
					.on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
			}

			return svg.node();
		}
	);
	main.variable(observer("data")).define(
		"data", ["FileAttachment"], function(FileAttachment){
			return(
				undefined
			)
		}
	);
	main.variable(observer("pack")).define(
		"pack", ["d3","width","height"], function(d3,width,height){
			return(
				data => d3.pack()
					.size([width, height])
					.padding(3)
				(
					d3.hierarchy(data)
						.sum(d => d.value)
						.sort((a, b) => b.value - a.value)
				)
			)
		}
	);
	main.variable(observer("width")).define(
		"width", function(){
			return(
				932
			)
		}
	);
	main.variable(observer("height")).define(
		"height", ["width"], function(width){
			return(
				width
			)
		}
	);
	main.variable(observer("format")).define(
		"format", ["d3"], function(d3){
			return(
				d3.format(",d")
			)
		}
	);
	main.variable(observer("color")).define(
		"color", ["d3"], function(d3){
			return(
				d3.scaleLinear()
					.domain([0, 5])
					.range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
					.interpolate(d3.interpolateHcl)
			)
		}
	);
	main.variable(observer("d3")).define(
		"d3", ["require"], function(require){
			return(
				require("d3@6")
			)
		}
	);
	return main;
}