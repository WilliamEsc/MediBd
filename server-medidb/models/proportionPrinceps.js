const mongoose = require('mongoose');
const schema = mongoose.Schema;
const objectId = mongoose.ObjectId;

mongoose.set('debug', true);

schema.Types.String.set('trim', true);

const proportionPrincepSchema = schema({
    _id:schema.Types.Mixed,
    nb_med: schema.Types.Mixed,
    nb_princ: schema.Types.Mixed
});

const proportionPrincep = mongoose.model("proportionPrincep", proportionPrincepSchema,"proportionPrincep");

module.exports = proportionPrincep;