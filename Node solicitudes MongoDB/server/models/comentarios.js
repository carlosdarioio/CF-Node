const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let comentariosSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    solicitud: { type: Schema.Types.ObjectId, ref: 'Solicitud' },
    descripcion: { type: String },
    fecha: { type: String, default: Date.now(), unique: false },

});


module.exports = mongoose.model('Comentarios', comentariosSchema);