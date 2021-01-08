const mongoose = require('mongoose');
const schema = mongoose.Schema;
const objectId = mongoose.ObjectId;

//schema.Types.String.set('trim', true);

const specialiteSchema = schema({
    id: objectId,
    codeCis:Number,
    denomination: String,
    formePharmaceutique:String,
    voiesAdministration: String,
    statutAdministratif: String,
    typeProcedureAMM: String,
    etatDeCommercialisation: String,
    dateAMM: String,
    statutBdm: String,
    numeroAutorisationEuropeenne: String,
    titulaire: String,
    surveillanceRenforcee: String
});

const presentationSchema = schema({
    id: objectId,
    codeCis: String,
    codeCip7: String,
    libelle: String,
    statusAdmninistratif: String,
    etatCommercialisation: String,
    dateDeclaration: String,
    codeCIP13: String,
    agrementCollectivites: String,
    tauxRemboursement: String,
    prix: String,
    indications: String
});

const compositionSchema = schema({
    id: objectId,
    codeCis: String,
    designationElementPharmaceutique: String,
    codeSubstance: String,
    denominationSubstance: String,
    dosageSubstance: String,
    referenceDosage: String,
    natureComposant: String,
    lienEntreSubstancesActivesEtFractionsTherapeutiques: String
});

const avisSMRSchema = schema({
    id: objectId,
    codeCis: String,
    codeDossierHAS: String,
    motifEvaluation: String,
    dateAvisCommissionTransparence: String,
    valeurSMR: String,
    libelleSMR: String
});

const avisASMRSchema = schema({
    id: objectId,
    codeCis: String,
    codeDossierHAS: String,
    motifEvaluation: String,
    dateAvisCommissionTransparence: String,
    valeurASMR: String,
    libelleASMR: String
});

const avisCTSchema = schema({
    id: objectId,
    CodeDossierHAS: String,
    lienVersPagesAvis: String
});

const conditionPrescDelivSchema = schema({
    id: objectId,
    codeCis: String,
    conditionPrescriptionOuDelivrance: String
});

const infosImportantesSchema = schema({
    id: objectId,
    codeCis: String,
    dateDebutInformationSecurite: String,
    dateFinInformationSecurite: String,
    texteAAfficherEtLienInfoSecurite: String
});


const specialite = mongoose.model("specialite", specialiteSchema);
const presentation = mongoose.model("presentation", presentationSchema);
const composition = mongoose.model("composition", compositionSchema,"composition");
const avisSMR = mongoose.model("avis_SMR_de_la_HAS", avisSMRSchema);
const avisASMR = mongoose.model("avis_ASMR_de_la_HAS", avisASMRSchema);
const avisCT = mongoose.model("avis_CT_de_la_HAS", avisCTSchema);
const conditionPrescDeliv = mongoose.model("condition_prescription_et_delivrance", conditionPrescDelivSchema);
const infosImportantes = mongoose.model("infos_importantes", infosImportantesSchema);

module.exports = {
    specialite: specialite,
    presentation: presentation,
    composition: composition,
    avisSMR: avisSMR,
    avisASMR: avisASMR,
    avisCT: avisCT,
    conditionPrescDeliv: conditionPrescDeliv,
    infosImportantes: infosImportantes
}