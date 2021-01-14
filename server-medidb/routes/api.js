var express = require('express');
var router = express.Router();

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/mediBD", { useNewUrlParser: true });
const { specialite, composition, presentation, avisASMR, avisCT, avisSMR, infosImportantes, conditionPrescDeliv } = require("../models/scheme");
const groupeGenerique = require("../models/groupeGenerique");
const proportionPrincep = require("../models/proportionPrinceps");

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function () {
	db.db.listCollections().toArray(
		function (err, names){
			if(err){
				console.log(err);
			}else{
				names.map(
					(name) => {
						if (name.name == "proportionPrincep") {
							mongoose.connection.db.dropCollection(
								"proportionPrincep",
								function (err, result) {
									console.log("Collection droped");
								}
							);
						}
					}
				)
			}
		}
	);

	const data = await specialite.aggregate([
		{
			$lookup: {
				from: groupeGenerique.collection.name,
				localField: "codeCis",
				foreignField: "codeCis",
				as: "gene"
			}
		},
		{
			$unwind: {
				"path": "$gene",
				"preserveNullAndEmptyArrays": true
			}
		}
	])
		.group({
			_id: { titulaire: "$titulaire" },
			nb_med: { $sum: 1 },
			nb_princ: { $sum: { "$cond": [{ "$eq": ["$gene.typeGenerique", 0] }, 1, 0] } },
			nb_gene: { $sum: { "$cond": [{ "$gt": ["$gene.typeGenerique", 0] }, 1, 0] } }
		})
		.exec()
		.then(docs => {
			let copy = [];

			docs.map(
					element => {
					copy.push({ titulaire: element._id.titulaire.trim(),
						data:[{nom:"Generique" ,value: element.nb_gene},
						{nom:"Princep" ,value: element.nb_princ},
						{nom:"Autre" ,value: element.nb_med-element.nb_princ-element.nb_gene}]});
				}
			)
			return copy;
		});
	db.createCollection("proportionPrincep", (err, result) => {
		if (err) throw err;
		console.log("proportionPrincep created");

		db.collection("proportionPrincep").insertMany(data, (err, result) => {
			if (err) throw err;
			console.log("donnees insere");
		});
	});
	console.log("connection ready");
});

router.get('/', function(req, res, next) {
	res.send(200, ({ sucess: true }));
});

router.get('/getTitulaire', function(
	req, res, next){
		specialite.distinct("titulaire").exec(
			function (err, data){
				if (err) throw err;
				if (data.length === 0) {
					res.status(404).send('no data found');
					return;
				}
				data.sort((a, b) => (a.titulaire > b.titulaire) ? 1 : ((b.titulaire > a.titulaire) ? -1 : 0));
				res.send({ value: data });
			}
		);
	}
);

router.post(
	'/DescMedicamentTitulaire',function(req,res,next){
		specialite.aggregate([
			{ $match: { titulaire: " " + req.body.titulaire } },
			{
				$lookup: {
					from: groupeGenerique.collection.name,
					localField: "codeCis",
					foreignField: "codeCis",
					as: "gene"
				}
			},
			{
				$unwind: {
					"path": "$gene",
					"preserveNullAndEmptyArrays": true
				}
			},
			{
				$lookup: {
					from: composition.collection.name,
					localField: "codeCis",
					foreignField: "codeCis",
					as: "compo"
				}
			}
		])
			.exec()
			.then(
				docs => {
					res.send({ value: docs });
				}
			);
	}
);

router.post(
	'/getPropPrincAnnee', function (req, res, next){
		specialite.aggregate([
			{ $match: { titulaire: " " + req.body.titulaire } },
			{
				$lookup: {
					from: groupeGenerique.collection.name,
					localField: "codeCis",
					foreignField: "codeCis",
					as: "gene"
				}
			},
			{ $project: { dateAMM: 1, "gene.typeGenerique": 1 } },
			{
				$unwind: {
					"path": "$gene",
					"preserveNullAndEmptyArrays": true
				}
			}
		])
			.exec()
			.then(
				docs => {
					let ret = [];
					docs.map(
						element => {
							let date = element.dateAMM.split('/');
							if (!ret.some(e => e.annee === date[2])) {
								if(!element.gene){
									ret.push({ annee: date[2], princep: 0, generique: 0,autre: 1 });
								}
								else if (element.gene && element.gene.typeGenerique == 0) {
									ret.push({ annee: date[2], princep: 1, generique: 0,autre: 0 });
								} else {
									ret.push({ annee: date[2], princep: 0, generique: 1,autre: 0 });
								}
							}else{
								ret.some(e => {
									if (e.annee === date[2]) {
										if(!element.gene){
											e.autre++;
										}
										else if (element.gene.typeGenerique == 0) {
											e.princep++;
										} else {
											e.generique++;
										}
									}
								}
								);
							}
						}
					);
					ret.sort((a,b) => (a.annee > b.annee) ? 1 : ((b.annee > a.annee) ? -1 : 0)); 
					res.send({ value: ret });
				}
			);
	}
);

router.post(
	'/getPropPrincLab', function (req, res, next){
		let find={};
		if(req.body.titulaire){
			find={titulaire: req.body.titulaire}
		}
		proportionPrincep.find(
			find, function (err, data){
				if (err) throw err;
				if (data.length === 0) {
					res.status(404).send('no data found');
					return;
				}
				res.send({ value: data });
			}
		);
	}
);

router.post(
	'/getMedi', function (req, res, next){
		/*Object.entries(req.body).forEach(([key, value]) => {
				console.log(key + ' : ' + value);
		});*/
		let recherche = {};
		if(req.body.research){
			recherche = { ...recherche, denomination: { "$regex": req.body.research, "$options": 'i' } };
		}
		if(req.body.titulaire) {
			let tabTitu=[];
			req.body.titulaire.split(",").map(element=>{
				tabTitu.push(" "+element.trim());
			})
			recherche = { ...recherche, titulaire: { "$in": tabTitu} };
		}
		if(req.body.voies){
			let tabVoie=req.body.voies;
			let strVoie="";
			req.body.voies.map(element=>{
				strVoie+=";"+element;
			})
			tabVoie.push(strVoie.slice(1));
			recherche = { ...recherche, voiesAdministration: { "$in": tabVoie} };
		}
		if(req.body.formes){
			recherche = { ...recherche, formePharmaceutique: { "$in": req.body.formes} };
		}
		if(req.body.autorisation){
			recherche = { ...recherche, statutAdministratif: { "$in": req.body.autorisation} };
		}
		if(req.body.commercialise){
			recherche = { ...recherche, etatDeCommercialisation: { "$in": req.body.commercialise} };
		}
		if(req.body.surveillance){
			recherche = { ...recherche, surveillanceRenforcee: { "$in": req.body.surveillance} };
		}
		if(req.body.statut){
			recherche = { ...recherche, statutBdm: { "$in": req.body.statut} };
		}
		if(req.body.autorisation_euro){
			recherche = { ...recherche, numeroAutorisationEuropeenne: req.body.autorisation_euro};
		}
		specialite.find(recherche, function (err, data){
			if (err) throw err;
			/*if (data.length === 0) { // Permet la capture d'un résultat vide pour l'affichage d'un message approprié.
				res.send({ value: data });
			}*/
			res.send({ value: data });
		});
});

router.get(
	'/getAllMedi', function(req, res, next){
		specialite.find({}, { denomination: 1 }, function (err, data){
			if (err) throw err;
			if (data.length === 0) {
				res.status(404).send('no data found');
				return;
			}
			res.send({ value: data });
		}).sort({ denomination: 1 });
	}
);

router.get(
	'/getForme', async function (req, res, next){
		const data = await specialite.aggregate([
			{ $group: { _id: { formePharmaceutique: "$formePharmaceutique" } } },
			{ $sort: { '_id.formePharmaceutique': 1 } }
		]);
		res.send({ value: data.map(entry => { return entry._id.formePharmaceutique }) });
	}
);

router.get(
	'/getVoies', async function (req, res, next){
		const data = await specialite.find({}).select({ voiesAdministration: 1 });
		const tab = data.map(entry => { return entry.voiesAdministration });
		let tabReturn = [];
		tab.map(entry => {
			const voie = entry.split(';');
			voie.map(_voie => {
				if (!tabReturn.includes(_voie)) {
					tabReturn.push(_voie);
				}
			});
		});
		tabReturn.sort();
		//console.log(tabReturn);
		res.send({ value: tabReturn.map(entry => { return entry }) });
	}
);

router.get(
	'/getAMM', async function (req, res, next){
		const data = await specialite.aggregate([
			{ $group: { _id: { typeProcedureAMM: "$typeProcedureAMM" } } },
			{ $sort: { '_id.typeProcedureAMM': 1 } }
		]);
		res.send({ value: data.map(entry => { return entry._id.typeProcedureAMM }) });
	}
);
module.exports = router;