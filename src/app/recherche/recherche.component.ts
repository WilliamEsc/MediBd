import { Component, ViewChild, OnInit }		from '@angular/core';
import { RechercheAvanceeComponent }		from "../recherche-avancee/recherche-avancee.component";
import { ResultatComponent }				from "../resultat/resultat.component"
import { DonneesService }					from '../donnees.service';
import { ZoomableCirclePackingComponent }	from '../zoomable-circle-packing/zoomable-circle-packing.component'
import { ForceDirectedGraphComponent }		from '../force-directed-graph/force-directed-graph.component'

@Component({
	selector: 'app-recherche',
	templateUrl: './recherche.component.html',
	styleUrls: ['./recherche.component.scss'],
	providers: [ResultatComponent]
})

export class RechercheComponent implements OnInit {
	dataZCP =  {
		"name": "flare",
		"children": [
		 {
		  "name": "analytics",
		  "children": [
		   {
			"name": "cluster",
			"children": [
			 {"name": "AgglomerativeCluster", "value": 3938},
			 {"name": "CommunityStructure", "value": 3812},
			 {"name": "HierarchicalCluster", "value": 6714},
			 {"name": "MergeEdge", "value": 743}
			]
		   },
		   {
			"name": "graph",
			"children": [
			 {"name": "BetweennessCentrality", "value": 3534},
			 {"name": "LinkDistance", "value": 5731},
			 {"name": "MaxFlowMinCut", "value": 7840},
			 {"name": "ShortestPaths", "value": 5914},
			 {"name": "SpanningTree", "value": 3416}
			]
		   },
		   {
			"name": "optimization",
			"children": [
			 {"name": "AspectRatioBanker", "value": 7074}
			]
		   }
		  ]
		 },
		 {
		  "name": "animate",
		  "children": [
		   {"name": "Easing", "value": 17010},
		   {"name": "FunctionSequence", "value": 5842},
		   {
			"name": "interpolate",
			"children": [
			 {"name": "ArrayInterpolator", "value": 1983},
			 {"name": "ColorInterpolator", "value": 2047},
			 {"name": "DateInterpolator", "value": 1375},
			 {"name": "Interpolator", "value": 8746},
			 {"name": "MatrixInterpolator", "value": 2202},
			 {"name": "NumberInterpolator", "value": 1382},
			 {"name": "ObjectInterpolator", "value": 1629},
			 {"name": "PointInterpolator", "value": 1675},
			 {"name": "RectangleInterpolator", "value": 2042}
			]
		   },
		   {"name": "ISchedulable", "value": 1041},
		   {"name": "Parallel", "value": 5176},
		   {"name": "Pause", "value": 449},
		   {"name": "Scheduler", "value": 5593},
		   {"name": "Sequence", "value": 5534},
		   {"name": "Transition", "value": 9201},
		   {"name": "Transitioner", "value": 19975},
		   {"name": "TransitionEvent", "value": 1116},
		   {"name": "Tween", "value": 6006}
		  ]
		 },
		 {
		  "name": "data",
		  "children": [
		   {
			"name": "converters",
			"children": [
			 {"name": "Converters", "value": 721},
			 {"name": "DelimitedTextConverter", "value": 4294},
			 {"name": "GraphMLConverter", "value": 9800},
			 {"name": "IDataConverter", "value": 1314},
			 {"name": "JSONConverter", "value": 2220}
			]
		   },
		   {"name": "DataField", "value": 1759},
		   {"name": "DataSchema", "value": 2165},
		   {"name": "DataSet", "value": 586},
		   {"name": "DataSource", "value": 3331},
		   {"name": "DataTable", "value": 772},
		   {"name": "DataUtil", "value": 3322}
		  ]
		 },
		 {
		  "name": "display",
		  "children": [
		   {"name": "DirtySprite", "value": 8833},
		   {"name": "LineSprite", "value": 1732},
		   {"name": "RectSprite", "value": 3623},
		   {"name": "TextSprite", "value": 10066}
		  ]
		 },
		 {
		  "name": "flex",
		  "children": [
		   {"name": "FlareVis", "value": 4116}
		  ]
		 },
		 {
		  "name": "physics",
		  "children": [
		   {"name": "DragForce", "value": 1082},
		   {"name": "GravityForce", "value": 1336},
		   {"name": "IForce", "value": 319},
		   {"name": "NBodyForce", "value": 10498},
		   {"name": "Particle", "value": 2822},
		   {"name": "Simulation", "value": 9983},
		   {"name": "Spring", "value": 2213},
		   {"name": "SpringForce", "value": 1681}
		  ]
		 },
		 {
		  "name": "query",
		  "children": [
		   {"name": "AggregateExpression", "value": 1616},
		   {"name": "And", "value": 1027},
		   {"name": "Arithmetic", "value": 3891},
		   {"name": "Average", "value": 891},
		   {"name": "BinaryExpression", "value": 2893},
		   {"name": "Comparison", "value": 5103},
		   {"name": "CompositeExpression", "value": 3677},
		   {"name": "Count", "value": 781},
		   {"name": "DateUtil", "value": 4141},
		   {"name": "Distinct", "value": 933},
		   {"name": "Expression", "value": 5130},
		   {"name": "ExpressionIterator", "value": 3617},
		   {"name": "Fn", "value": 3240},
		   {"name": "If", "value": 2732},
		   {"name": "IsA", "value": 2039},
		   {"name": "Literal", "value": 1214},
		   {"name": "Match", "value": 3748},
		   {"name": "Maximum", "value": 843},
		   {
			"name": "methods",
			"children": [
			 {"name": "add", "value": 593},
			 {"name": "and", "value": 330},
			 {"name": "average", "value": 287},
			 {"name": "count", "value": 277},
			 {"name": "distinct", "value": 292},
			 {"name": "div", "value": 595},
			 {"name": "eq", "value": 594},
			 {"name": "fn", "value": 460},
			 {"name": "gt", "value": 603},
			 {"name": "gte", "value": 625},
			 {"name": "iff", "value": 748},
			 {"name": "isa", "value": 461},
			 {"name": "lt", "value": 597},
			 {"name": "lte", "value": 619},
			 {"name": "max", "value": 283},
			 {"name": "min", "value": 283},
			 {"name": "mod", "value": 591},
			 {"name": "mul", "value": 603},
			 {"name": "neq", "value": 599},
			 {"name": "not", "value": 386},
			 {"name": "or", "value": 323},
			 {"name": "orderby", "value": 307},
			 {"name": "range", "value": 772},
			 {"name": "select", "value": 296},
			 {"name": "stddev", "value": 363},
			 {"name": "sub", "value": 600},
			 {"name": "sum", "value": 280},
			 {"name": "update", "value": 307},
			 {"name": "variance", "value": 335},
			 {"name": "where", "value": 299},
			 {"name": "xor", "value": 354},
			 {"name": "_", "value": 264}
			]
		   },
		   {"name": "Minimum", "value": 843},
		   {"name": "Not", "value": 1554},
		   {"name": "Or", "value": 970},
		   {"name": "Query", "value": 13896},
		   {"name": "Range", "value": 1594},
		   {"name": "StringUtil", "value": 4130},
		   {"name": "Sum", "value": 791},
		   {"name": "Variable", "value": 1124},
		   {"name": "Variance", "value": 1876},
		   {"name": "Xor", "value": 1101}
		  ]
		 },
		 {
		  "name": "scale",
		  "children": [
		   {"name": "IScaleMap", "value": 2105},
		   {"name": "LinearScale", "value": 1316},
		   {"name": "LogScale", "value": 3151},
		   {"name": "OrdinalScale", "value": 3770},
		   {"name": "QuantileScale", "value": 2435},
		   {"name": "QuantitativeScale", "value": 4839},
		   {"name": "RootScale", "value": 1756},
		   {"name": "Scale", "value": 4268},
		   {"name": "ScaleType", "value": 1821},
		   {"name": "TimeScale", "value": 5833}
		  ]
		 },
		 {
		  "name": "util",
		  "children": [
		   {"name": "Arrays", "value": 8258},
		   {"name": "Colors", "value": 10001},
		   {"name": "Dates", "value": 8217},
		   {"name": "Displays", "value": 12555},
		   {"name": "Filter", "value": 2324},
		   {"name": "Geometry", "value": 10993},
		   {
			"name": "heap",
			"children": [
			 {"name": "FibonacciHeap", "value": 9354},
			 {"name": "HeapNode", "value": 1233}
			]
		   },
		   {"name": "IEvaluable", "value": 335},
		   {"name": "IPredicate", "value": 383},
		   {"name": "IValueProxy", "value": 874},
		   {
			"name": "math",
			"children": [
			 {"name": "DenseMatrix", "value": 3165},
			 {"name": "IMatrix", "value": 2815},
			 {"name": "SparseMatrix", "value": 3366}
			]
		   },
		   {"name": "Maths", "value": 17705},
		   {"name": "Orientation", "value": 1486},
		   {
			"name": "palette",
			"children": [
			 {"name": "ColorPalette", "value": 6367},
			 {"name": "Palette", "value": 1229},
			 {"name": "ShapePalette", "value": 2059},
			 {"name": "SizePalette", "value": 2291}
			]
		   },
		   {"name": "Property", "value": 5559},
		   {"name": "Shapes", "value": 19118},
		   {"name": "Sort", "value": 6887},
		   {"name": "Stats", "value": 6557},
		   {"name": "Strings", "value": 22026}
		  ]
		 },
		 {
		  "name": "vis",
		  "children": [
		   {
			"name": "axis",
			"children": [
			 {"name": "Axes", "value": 1302},
			 {"name": "Axis", "value": 24593},
			 {"name": "AxisGridLine", "value": 652},
			 {"name": "AxisLabel", "value": 636},
			 {"name": "CartesianAxes", "value": 6703}
			]
		   },
		   {
			"name": "controls",
			"children": [
			 {"name": "AnchorControl", "value": 2138},
			 {"name": "ClickControl", "value": 3824},
			 {"name": "Control", "value": 1353},
			 {"name": "ControlList", "value": 4665},
			 {"name": "DragControl", "value": 2649},
			 {"name": "ExpandControl", "value": 2832},
			 {"name": "HoverControl", "value": 4896},
			 {"name": "IControl", "value": 763},
			 {"name": "PanZoomControl", "value": 5222},
			 {"name": "SelectionControl", "value": 7862},
			 {"name": "TooltipControl", "value": 8435}
			]
		   },
		   {
			"name": "data",
			"children": [
			 {"name": "Data", "value": 20544},
			 {"name": "DataList", "value": 19788},
			 {"name": "DataSprite", "value": 10349},
			 {"name": "EdgeSprite", "value": 3301},
			 {"name": "NodeSprite", "value": 19382},
			 {
			  "name": "render",
			  "children": [
			   {"name": "ArrowType", "value": 698},
			   {"name": "EdgeRenderer", "value": 5569},
			   {"name": "IRenderer", "value": 353},
			   {"name": "ShapeRenderer", "value": 2247}
			  ]
			 },
			 {"name": "ScaleBinding", "value": 11275},
			 {"name": "Tree", "value": 7147},
			 {"name": "TreeBuilder", "value": 9930}
			]
		   },
		   {
			"name": "events",
			"children": [
			 {"name": "DataEvent", "value": 2313},
			 {"name": "SelectionEvent", "value": 1880},
			 {"name": "TooltipEvent", "value": 1701},
			 {"name": "VisualizationEvent", "value": 1117}
			]
		   },
		   {
			"name": "legend",
			"children": [
			 {"name": "Legend", "value": 20859},
			 {"name": "LegendItem", "value": 4614},
			 {"name": "LegendRange", "value": 10530}
			]
		   },
		   {
			"name": "operator",
			"children": [
			 {
			  "name": "distortion",
			  "children": [
			   {"name": "BifocalDistortion", "value": 4461},
			   {"name": "Distortion", "value": 6314},
			   {"name": "FisheyeDistortion", "value": 3444}
			  ]
			 },
			 {
			  "name": "encoder",
			  "children": [
			   {"name": "ColorEncoder", "value": 3179},
			   {"name": "Encoder", "value": 4060},
			   {"name": "PropertyEncoder", "value": 4138},
			   {"name": "ShapeEncoder", "value": 1690},
			   {"name": "SizeEncoder", "value": 1830}
			  ]
			 },
			 {
			  "name": "filter",
			  "children": [
			   {"name": "FisheyeTreeFilter", "value": 5219},
			   {"name": "GraphDistanceFilter", "value": 3165},
			   {"name": "VisibilityFilter", "value": 3509}
			  ]
			 },
			 {"name": "IOperator", "value": 1286},
			 {
			  "name": "label",
			  "children": [
			   {"name": "Labeler", "value": 9956},
			   {"name": "RadialLabeler", "value": 3899},
			   {"name": "StackedAreaLabeler", "value": 3202}
			  ]
			 },
			 {
			  "name": "layout",
			  "children": [
			   {"name": "AxisLayout", "value": 6725},
			   {"name": "BundledEdgeRouter", "value": 3727},
			   {"name": "CircleLayout", "value": 9317},
			   {"name": "CirclePackingLayout", "value": 12003},
			   {"name": "DendrogramLayout", "value": 4853},
			   {"name": "ForceDirectedLayout", "value": 8411},
			   {"name": "IcicleTreeLayout", "value": 4864},
			   {"name": "IndentedTreeLayout", "value": 3174},
			   {"name": "Layout", "value": 7881},
			   {"name": "NodeLinkTreeLayout", "value": 12870},
			   {"name": "PieLayout", "value": 2728},
			   {"name": "RadialTreeLayout", "value": 12348},
			   {"name": "RandomLayout", "value": 870},
			   {"name": "StackedAreaLayout", "value": 9121},
			   {"name": "TreeMapLayout", "value": 9191}
			  ]
			 },
			 {"name": "Operator", "value": 2490},
			 {"name": "OperatorList", "value": 5248},
			 {"name": "OperatorSequence", "value": 4190},
			 {"name": "OperatorSwitch", "value": 2581},
			 {"name": "SortOperator", "value": 2023}
			]
		   },
		   {"name": "Visualization", "value": 16540}
		  ]
		 }
		]
	}
	dataFDG =  {
		"nodes": [
		  {"id": "Myriel", "group": 1},
		  {"id": "Napoleon", "group": 1},
		  {"id": "Mlle.Baptistine", "group": 1},
		  {"id": "Mme.Magloire", "group": 1},
		  {"id": "CountessdeLo", "group": 1},
		  {"id": "Geborand", "group": 1},
		  {"id": "Champtercier", "group": 1},
		  {"id": "Cravatte", "group": 1},
		  {"id": "Count", "group": 1},
		  {"id": "OldMan", "group": 1},
		  {"id": "Labarre", "group": 2},
		  {"id": "Valjean", "group": 2},
		  {"id": "Marguerite", "group": 3},
		  {"id": "Mme.deR", "group": 2},
		  {"id": "Isabeau", "group": 2},
		  {"id": "Gervais", "group": 2},
		  {"id": "Tholomyes", "group": 3},
		  {"id": "Listolier", "group": 3},
		  {"id": "Fameuil", "group": 3},
		  {"id": "Blacheville", "group": 3},
		  {"id": "Favourite", "group": 3},
		  {"id": "Dahlia", "group": 3},
		  {"id": "Zephine", "group": 3},
		  {"id": "Fantine", "group": 3},
		  {"id": "Mme.Thenardier", "group": 4},
		  {"id": "Thenardier", "group": 4},
		  {"id": "Cosette", "group": 5},
		  {"id": "Javert", "group": 4},
		  {"id": "Fauchelevent", "group": 0},
		  {"id": "Bamatabois", "group": 2},
		  {"id": "Perpetue", "group": 3},
		  {"id": "Simplice", "group": 2},
		  {"id": "Scaufflaire", "group": 2},
		  {"id": "Woman1", "group": 2},
		  {"id": "Judge", "group": 2},
		  {"id": "Champmathieu", "group": 2},
		  {"id": "Brevet", "group": 2},
		  {"id": "Chenildieu", "group": 2},
		  {"id": "Cochepaille", "group": 2},
		  {"id": "Pontmercy", "group": 4},
		  {"id": "Boulatruelle", "group": 6},
		  {"id": "Eponine", "group": 4},
		  {"id": "Anzelma", "group": 4},
		  {"id": "Woman2", "group": 5},
		  {"id": "MotherInnocent", "group": 0},
		  {"id": "Gribier", "group": 0},
		  {"id": "Jondrette", "group": 7},
		  {"id": "Mme.Burgon", "group": 7},
		  {"id": "Gavroche", "group": 8},
		  {"id": "Gillenormand", "group": 5},
		  {"id": "Magnon", "group": 5},
		  {"id": "Mlle.Gillenormand", "group": 5},
		  {"id": "Mme.Pontmercy", "group": 5},
		  {"id": "Mlle.Vaubois", "group": 5},
		  {"id": "Lt.Gillenormand", "group": 5},
		  {"id": "Marius", "group": 8},
		  {"id": "BaronessT", "group": 5},
		  {"id": "Mabeuf", "group": 8},
		  {"id": "Enjolras", "group": 8},
		  {"id": "Combeferre", "group": 8},
		  {"id": "Prouvaire", "group": 8},
		  {"id": "Feuilly", "group": 8},
		  {"id": "Courfeyrac", "group": 8},
		  {"id": "Bahorel", "group": 8},
		  {"id": "Bossuet", "group": 8},
		  {"id": "Joly", "group": 8},
		  {"id": "Grantaire", "group": 8},
		  {"id": "MotherPlutarch", "group": 9},
		  {"id": "Gueulemer", "group": 4},
		  {"id": "Babet", "group": 4},
		  {"id": "Claquesous", "group": 4},
		  {"id": "Montparnasse", "group": 4},
		  {"id": "Toussaint", "group": 5},
		  {"id": "Child1", "group": 10},
		  {"id": "Child2", "group": 10},
		  {"id": "Brujon", "group": 4},
		  {"id": "Mme.Hucheloup", "group": 8}
		],
		"links": [
		  {"source": "Napoleon", "target": "Myriel", "value": 1},
		  {"source": "Mlle.Baptistine", "target": "Myriel", "value": 8},
		  {"source": "Mme.Magloire", "target": "Myriel", "value": 10},
		  {"source": "Mme.Magloire", "target": "Mlle.Baptistine", "value": 6},
		  {"source": "CountessdeLo", "target": "Myriel", "value": 1},
		  {"source": "Geborand", "target": "Myriel", "value": 1},
		  {"source": "Champtercier", "target": "Myriel", "value": 1},
		  {"source": "Cravatte", "target": "Myriel", "value": 1},
		  {"source": "Count", "target": "Myriel", "value": 2},
		  {"source": "OldMan", "target": "Myriel", "value": 1},
		  {"source": "Valjean", "target": "Labarre", "value": 1},
		  {"source": "Valjean", "target": "Mme.Magloire", "value": 3},
		  {"source": "Valjean", "target": "Mlle.Baptistine", "value": 3},
		  {"source": "Valjean", "target": "Myriel", "value": 5},
		  {"source": "Marguerite", "target": "Valjean", "value": 1},
		  {"source": "Mme.deR", "target": "Valjean", "value": 1},
		  {"source": "Isabeau", "target": "Valjean", "value": 1},
		  {"source": "Gervais", "target": "Valjean", "value": 1},
		  {"source": "Listolier", "target": "Tholomyes", "value": 4},
		  {"source": "Fameuil", "target": "Tholomyes", "value": 4},
		  {"source": "Fameuil", "target": "Listolier", "value": 4},
		  {"source": "Blacheville", "target": "Tholomyes", "value": 4},
		  {"source": "Blacheville", "target": "Listolier", "value": 4},
		  {"source": "Blacheville", "target": "Fameuil", "value": 4},
		  {"source": "Favourite", "target": "Tholomyes", "value": 3},
		  {"source": "Favourite", "target": "Listolier", "value": 3},
		  {"source": "Favourite", "target": "Fameuil", "value": 3},
		  {"source": "Favourite", "target": "Blacheville", "value": 4},
		  {"source": "Dahlia", "target": "Tholomyes", "value": 3},
		  {"source": "Dahlia", "target": "Listolier", "value": 3},
		  {"source": "Dahlia", "target": "Fameuil", "value": 3},
		  {"source": "Dahlia", "target": "Blacheville", "value": 3},
		  {"source": "Dahlia", "target": "Favourite", "value": 5},
		  {"source": "Zephine", "target": "Tholomyes", "value": 3},
		  {"source": "Zephine", "target": "Listolier", "value": 3},
		  {"source": "Zephine", "target": "Fameuil", "value": 3},
		  {"source": "Zephine", "target": "Blacheville", "value": 3},
		  {"source": "Zephine", "target": "Favourite", "value": 4},
		  {"source": "Zephine", "target": "Dahlia", "value": 4},
		  {"source": "Fantine", "target": "Tholomyes", "value": 3},
		  {"source": "Fantine", "target": "Listolier", "value": 3},
		  {"source": "Fantine", "target": "Fameuil", "value": 3},
		  {"source": "Fantine", "target": "Blacheville", "value": 3},
		  {"source": "Fantine", "target": "Favourite", "value": 4},
		  {"source": "Fantine", "target": "Dahlia", "value": 4},
		  {"source": "Fantine", "target": "Zephine", "value": 4},
		  {"source": "Fantine", "target": "Marguerite", "value": 2},
		  {"source": "Fantine", "target": "Valjean", "value": 9},
		  {"source": "Mme.Thenardier", "target": "Fantine", "value": 2},
		  {"source": "Mme.Thenardier", "target": "Valjean", "value": 7},
		  {"source": "Thenardier", "target": "Mme.Thenardier", "value": 13},
		  {"source": "Thenardier", "target": "Fantine", "value": 1},
		  {"source": "Thenardier", "target": "Valjean", "value": 12},
		  {"source": "Cosette", "target": "Mme.Thenardier", "value": 4},
		  {"source": "Cosette", "target": "Valjean", "value": 31},
		  {"source": "Cosette", "target": "Tholomyes", "value": 1},
		  {"source": "Cosette", "target": "Thenardier", "value": 1},
		  {"source": "Javert", "target": "Valjean", "value": 17},
		  {"source": "Javert", "target": "Fantine", "value": 5},
		  {"source": "Javert", "target": "Thenardier", "value": 5},
		  {"source": "Javert", "target": "Mme.Thenardier", "value": 1},
		  {"source": "Javert", "target": "Cosette", "value": 1},
		  {"source": "Fauchelevent", "target": "Valjean", "value": 8},
		  {"source": "Fauchelevent", "target": "Javert", "value": 1},
		  {"source": "Bamatabois", "target": "Fantine", "value": 1},
		  {"source": "Bamatabois", "target": "Javert", "value": 1},
		  {"source": "Bamatabois", "target": "Valjean", "value": 2},
		  {"source": "Perpetue", "target": "Fantine", "value": 1},
		  {"source": "Simplice", "target": "Perpetue", "value": 2},
		  {"source": "Simplice", "target": "Valjean", "value": 3},
		  {"source": "Simplice", "target": "Fantine", "value": 2},
		  {"source": "Simplice", "target": "Javert", "value": 1},
		  {"source": "Scaufflaire", "target": "Valjean", "value": 1},
		  {"source": "Woman1", "target": "Valjean", "value": 2},
		  {"source": "Woman1", "target": "Javert", "value": 1},
		  {"source": "Judge", "target": "Valjean", "value": 3},
		  {"source": "Judge", "target": "Bamatabois", "value": 2},
		  {"source": "Champmathieu", "target": "Valjean", "value": 3},
		  {"source": "Champmathieu", "target": "Judge", "value": 3},
		  {"source": "Champmathieu", "target": "Bamatabois", "value": 2},
		  {"source": "Brevet", "target": "Judge", "value": 2},
		  {"source": "Brevet", "target": "Champmathieu", "value": 2},
		  {"source": "Brevet", "target": "Valjean", "value": 2},
		  {"source": "Brevet", "target": "Bamatabois", "value": 1},
		  {"source": "Chenildieu", "target": "Judge", "value": 2},
		  {"source": "Chenildieu", "target": "Champmathieu", "value": 2},
		  {"source": "Chenildieu", "target": "Brevet", "value": 2},
		  {"source": "Chenildieu", "target": "Valjean", "value": 2},
		  {"source": "Chenildieu", "target": "Bamatabois", "value": 1},
		  {"source": "Cochepaille", "target": "Judge", "value": 2},
		  {"source": "Cochepaille", "target": "Champmathieu", "value": 2},
		  {"source": "Cochepaille", "target": "Brevet", "value": 2},
		  {"source": "Cochepaille", "target": "Chenildieu", "value": 2},
		  {"source": "Cochepaille", "target": "Valjean", "value": 2},
		  {"source": "Cochepaille", "target": "Bamatabois", "value": 1},
		  {"source": "Pontmercy", "target": "Thenardier", "value": 1},
		  {"source": "Boulatruelle", "target": "Thenardier", "value": 1},
		  {"source": "Eponine", "target": "Mme.Thenardier", "value": 2},
		  {"source": "Eponine", "target": "Thenardier", "value": 3},
		  {"source": "Anzelma", "target": "Eponine", "value": 2},
		  {"source": "Anzelma", "target": "Thenardier", "value": 2},
		  {"source": "Anzelma", "target": "Mme.Thenardier", "value": 1},
		  {"source": "Woman2", "target": "Valjean", "value": 3},
		  {"source": "Woman2", "target": "Cosette", "value": 1},
		  {"source": "Woman2", "target": "Javert", "value": 1},
		  {"source": "MotherInnocent", "target": "Fauchelevent", "value": 3},
		  {"source": "MotherInnocent", "target": "Valjean", "value": 1},
		  {"source": "Gribier", "target": "Fauchelevent", "value": 2},
		  {"source": "Mme.Burgon", "target": "Jondrette", "value": 1},
		  {"source": "Gavroche", "target": "Mme.Burgon", "value": 2},
		  {"source": "Gavroche", "target": "Thenardier", "value": 1},
		  {"source": "Gavroche", "target": "Javert", "value": 1},
		  {"source": "Gavroche", "target": "Valjean", "value": 1},
		  {"source": "Gillenormand", "target": "Cosette", "value": 3},
		  {"source": "Gillenormand", "target": "Valjean", "value": 2},
		  {"source": "Magnon", "target": "Gillenormand", "value": 1},
		  {"source": "Magnon", "target": "Mme.Thenardier", "value": 1},
		  {"source": "Mlle.Gillenormand", "target": "Gillenormand", "value": 9},
		  {"source": "Mlle.Gillenormand", "target": "Cosette", "value": 2},
		  {"source": "Mlle.Gillenormand", "target": "Valjean", "value": 2},
		  {"source": "Mme.Pontmercy", "target": "Mlle.Gillenormand", "value": 1},
		  {"source": "Mme.Pontmercy", "target": "Pontmercy", "value": 1},
		  {"source": "Mlle.Vaubois", "target": "Mlle.Gillenormand", "value": 1},
		  {"source": "Lt.Gillenormand", "target": "Mlle.Gillenormand", "value": 2},
		  {"source": "Lt.Gillenormand", "target": "Gillenormand", "value": 1},
		  {"source": "Lt.Gillenormand", "target": "Cosette", "value": 1},
		  {"source": "Marius", "target": "Mlle.Gillenormand", "value": 6},
		  {"source": "Marius", "target": "Gillenormand", "value": 12},
		  {"source": "Marius", "target": "Pontmercy", "value": 1},
		  {"source": "Marius", "target": "Lt.Gillenormand", "value": 1},
		  {"source": "Marius", "target": "Cosette", "value": 21},
		  {"source": "Marius", "target": "Valjean", "value": 19},
		  {"source": "Marius", "target": "Tholomyes", "value": 1},
		  {"source": "Marius", "target": "Thenardier", "value": 2},
		  {"source": "Marius", "target": "Eponine", "value": 5},
		  {"source": "Marius", "target": "Gavroche", "value": 4},
		  {"source": "BaronessT", "target": "Gillenormand", "value": 1},
		  {"source": "BaronessT", "target": "Marius", "value": 1},
		  {"source": "Mabeuf", "target": "Marius", "value": 1},
		  {"source": "Mabeuf", "target": "Eponine", "value": 1},
		  {"source": "Mabeuf", "target": "Gavroche", "value": 1},
		  {"source": "Enjolras", "target": "Marius", "value": 7},
		  {"source": "Enjolras", "target": "Gavroche", "value": 7},
		  {"source": "Enjolras", "target": "Javert", "value": 6},
		  {"source": "Enjolras", "target": "Mabeuf", "value": 1},
		  {"source": "Enjolras", "target": "Valjean", "value": 4},
		  {"source": "Combeferre", "target": "Enjolras", "value": 15},
		  {"source": "Combeferre", "target": "Marius", "value": 5},
		  {"source": "Combeferre", "target": "Gavroche", "value": 6},
		  {"source": "Combeferre", "target": "Mabeuf", "value": 2},
		  {"source": "Prouvaire", "target": "Gavroche", "value": 1},
		  {"source": "Prouvaire", "target": "Enjolras", "value": 4},
		  {"source": "Prouvaire", "target": "Combeferre", "value": 2},
		  {"source": "Feuilly", "target": "Gavroche", "value": 2},
		  {"source": "Feuilly", "target": "Enjolras", "value": 6},
		  {"source": "Feuilly", "target": "Prouvaire", "value": 2},
		  {"source": "Feuilly", "target": "Combeferre", "value": 5},
		  {"source": "Feuilly", "target": "Mabeuf", "value": 1},
		  {"source": "Feuilly", "target": "Marius", "value": 1},
		  {"source": "Courfeyrac", "target": "Marius", "value": 9},
		  {"source": "Courfeyrac", "target": "Enjolras", "value": 17},
		  {"source": "Courfeyrac", "target": "Combeferre", "value": 13},
		  {"source": "Courfeyrac", "target": "Gavroche", "value": 7},
		  {"source": "Courfeyrac", "target": "Mabeuf", "value": 2},
		  {"source": "Courfeyrac", "target": "Eponine", "value": 1},
		  {"source": "Courfeyrac", "target": "Feuilly", "value": 6},
		  {"source": "Courfeyrac", "target": "Prouvaire", "value": 3},
		  {"source": "Bahorel", "target": "Combeferre", "value": 5},
		  {"source": "Bahorel", "target": "Gavroche", "value": 5},
		  {"source": "Bahorel", "target": "Courfeyrac", "value": 6},
		  {"source": "Bahorel", "target": "Mabeuf", "value": 2},
		  {"source": "Bahorel", "target": "Enjolras", "value": 4},
		  {"source": "Bahorel", "target": "Feuilly", "value": 3},
		  {"source": "Bahorel", "target": "Prouvaire", "value": 2},
		  {"source": "Bahorel", "target": "Marius", "value": 1},
		  {"source": "Bossuet", "target": "Marius", "value": 5},
		  {"source": "Bossuet", "target": "Courfeyrac", "value": 12},
		  {"source": "Bossuet", "target": "Gavroche", "value": 5},
		  {"source": "Bossuet", "target": "Bahorel", "value": 4},
		  {"source": "Bossuet", "target": "Enjolras", "value": 10},
		  {"source": "Bossuet", "target": "Feuilly", "value": 6},
		  {"source": "Bossuet", "target": "Prouvaire", "value": 2},
		  {"source": "Bossuet", "target": "Combeferre", "value": 9},
		  {"source": "Bossuet", "target": "Mabeuf", "value": 1},
		  {"source": "Bossuet", "target": "Valjean", "value": 1},
		  {"source": "Joly", "target": "Bahorel", "value": 5},
		  {"source": "Joly", "target": "Bossuet", "value": 7},
		  {"source": "Joly", "target": "Gavroche", "value": 3},
		  {"source": "Joly", "target": "Courfeyrac", "value": 5},
		  {"source": "Joly", "target": "Enjolras", "value": 5},
		  {"source": "Joly", "target": "Feuilly", "value": 5},
		  {"source": "Joly", "target": "Prouvaire", "value": 2},
		  {"source": "Joly", "target": "Combeferre", "value": 5},
		  {"source": "Joly", "target": "Mabeuf", "value": 1},
		  {"source": "Joly", "target": "Marius", "value": 2},
		  {"source": "Grantaire", "target": "Bossuet", "value": 3},
		  {"source": "Grantaire", "target": "Enjolras", "value": 3},
		  {"source": "Grantaire", "target": "Combeferre", "value": 1},
		  {"source": "Grantaire", "target": "Courfeyrac", "value": 2},
		  {"source": "Grantaire", "target": "Joly", "value": 2},
		  {"source": "Grantaire", "target": "Gavroche", "value": 1},
		  {"source": "Grantaire", "target": "Bahorel", "value": 1},
		  {"source": "Grantaire", "target": "Feuilly", "value": 1},
		  {"source": "Grantaire", "target": "Prouvaire", "value": 1},
		  {"source": "MotherPlutarch", "target": "Mabeuf", "value": 3},
		  {"source": "Gueulemer", "target": "Thenardier", "value": 5},
		  {"source": "Gueulemer", "target": "Valjean", "value": 1},
		  {"source": "Gueulemer", "target": "Mme.Thenardier", "value": 1},
		  {"source": "Gueulemer", "target": "Javert", "value": 1},
		  {"source": "Gueulemer", "target": "Gavroche", "value": 1},
		  {"source": "Gueulemer", "target": "Eponine", "value": 1},
		  {"source": "Babet", "target": "Thenardier", "value": 6},
		  {"source": "Babet", "target": "Gueulemer", "value": 6},
		  {"source": "Babet", "target": "Valjean", "value": 1},
		  {"source": "Babet", "target": "Mme.Thenardier", "value": 1},
		  {"source": "Babet", "target": "Javert", "value": 2},
		  {"source": "Babet", "target": "Gavroche", "value": 1},
		  {"source": "Babet", "target": "Eponine", "value": 1},
		  {"source": "Claquesous", "target": "Thenardier", "value": 4},
		  {"source": "Claquesous", "target": "Babet", "value": 4},
		  {"source": "Claquesous", "target": "Gueulemer", "value": 4},
		  {"source": "Claquesous", "target": "Valjean", "value": 1},
		  {"source": "Claquesous", "target": "Mme.Thenardier", "value": 1},
		  {"source": "Claquesous", "target": "Javert", "value": 1},
		  {"source": "Claquesous", "target": "Eponine", "value": 1},
		  {"source": "Claquesous", "target": "Enjolras", "value": 1},
		  {"source": "Montparnasse", "target": "Javert", "value": 1},
		  {"source": "Montparnasse", "target": "Babet", "value": 2},
		  {"source": "Montparnasse", "target": "Gueulemer", "value": 2},
		  {"source": "Montparnasse", "target": "Claquesous", "value": 2},
		  {"source": "Montparnasse", "target": "Valjean", "value": 1},
		  {"source": "Montparnasse", "target": "Gavroche", "value": 1},
		  {"source": "Montparnasse", "target": "Eponine", "value": 1},
		  {"source": "Montparnasse", "target": "Thenardier", "value": 1},
		  {"source": "Toussaint", "target": "Cosette", "value": 2},
		  {"source": "Toussaint", "target": "Javert", "value": 1},
		  {"source": "Toussaint", "target": "Valjean", "value": 1},
		  {"source": "Child1", "target": "Gavroche", "value": 2},
		  {"source": "Child2", "target": "Gavroche", "value": 2},
		  {"source": "Child2", "target": "Child1", "value": 3},
		  {"source": "Brujon", "target": "Babet", "value": 3},
		  {"source": "Brujon", "target": "Gueulemer", "value": 3},
		  {"source": "Brujon", "target": "Thenardier", "value": 3},
		  {"source": "Brujon", "target": "Gavroche", "value": 1},
		  {"source": "Brujon", "target": "Eponine", "value": 1},
		  {"source": "Brujon", "target": "Claquesous", "value": 1},
		  {"source": "Brujon", "target": "Montparnasse", "value": 1},
		  {"source": "Mme.Hucheloup", "target": "Bossuet", "value": 1},
		  {"source": "Mme.Hucheloup", "target": "Joly", "value": 1},
		  {"source": "Mme.Hucheloup", "target": "Grantaire", "value": 1},
		  {"source": "Mme.Hucheloup", "target": "Bahorel", "value": 1},
		  {"source": "Mme.Hucheloup", "target": "Courfeyrac", "value": 1},
		  {"source": "Mme.Hucheloup", "target": "Gavroche", "value": 1},
		  {"source": "Mme.Hucheloup", "target": "Enjolras", "value": 1}
		]
	}
	  
	@ViewChild(RechercheAvanceeComponent) child;
	constructor(private donnees: DonneesService){}
	ngOnInit(){}

	test				= '';
	tabl				= []; // Contenus du resultat
	resultats			= false; // Existence d'un résultat
	resultatsNonNul 	= false; // Existence d'un résultat contenant au moins un élément
	resultatsMultiples	= false; // Existence d'un résultat contenant au moins deux élément
	collectionSize		= 0;
	records				= [];
	pageSize			= 10;
	page				= 1;

	isCollapsed			= false;

	public appelRecherche(event): void {
		let test = this.test;
		const target = event.target;
		let query = {};//objet de la requête

		//la recherche
		if (test !== ''){
			query = { ...query, research: test };
		}

		let queryForme = [];
		this.child.formes.map(
			forme => {
				if(forme.selected){
					queryForme.push(forme.value);
				}
			}
		);
		if(queryForme.length > 0){
			query = { ...query, formes: queryForme };
		}

		let queryVoies = [];
		this.child.voies.map(
			voie => {
				if(voie.selected){
					queryVoies.push(voie.value);
				}
			}
		);
		if(queryVoies.length > 0){
			query = { ...query, voies: queryVoies };
		}

		let queryAMM = [];
		this.child.AMM.map(
			amm => {
				if(amm.selected){
					queryVoies.push(amm.value);
				}
			}
		);
		if(queryAMM.length > 0){
			query = { ...query, AMMs: queryAMM };
		}

		query = {
			...query,
			autorisation: target.querySelector('input[name=autorisation]:checked').value,
			commercialise: target.querySelector('input[name=commercialise]:checked').value,
			surveillance: target.querySelector('input[name=surveillance]:checked').value
		};

		if(target.querySelector('#statut').value.length > 0){
			query = { ...query, statut: target.querySelector('#statut').value };
		}
		if(target.querySelector('#autorisation_euro').value.length > 0){
			query = { ...query, autorisation_euro: target.querySelector('#autorisation_euro').value };
		}
		if(target.querySelector('#titulaire').value.length > 0){
			query = { ...query, titulaire: target.querySelector('#titulaire').value };
		}

		var toto = Array();

		this.donnees.getData(query).subscribe(
			data => {
				toto.push(data);
				this.tabl = toto[0].value;
				this.resultats = true;
				this.collectionSize = this.tabl.length;
				if(this.tabl.length>0){
					this.resultatsNonNul = true;
					if(this.tabl.length>1){
						this.resultatsMultiples = true;
					}
				}
				console.log(this.tabl);
				this.dataZCP = this.resultatToZCP(this.tabl);
			}
		);
	}

	resultatToZCP(data){
		let retour = {
			"name" : "médicaments",
			"children" : []
		};
		for(let i=0; i<data.length; i++){
			let ajout =  {"name" : data[i].denomination, "value" : data[i].codeCis}
			//console.log(retour.children.length);
			retour.children.push(ajout);
		}
		console.log(retour);
		return retour;
	}
}