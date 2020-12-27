const mongoose = require('mongoose');
const schema = mongoose.Schema;
const objectId = mongoose.ObjectId;

schema.Types.String.set('trim', true);

const groupeGeneriqueSchema = schema({
    id: objectId,
    iDGroupeGenerique: String,
    libelleGroupeGenerique: String,
    codeCis: Number,
    typeGenerique: Number,
    numeroTrisElementsGroupe: String
});

const groupeGenerique = mongoose.model("groupes_generiques", groupeGeneriqueSchema);

module.exports = groupeGenerique;