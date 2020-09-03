const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let comentariosSchema = new Schema({
    descripcion: { type: String, unique: false },
    fecha: { type: String, default: Date.now(), unique: false },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', unique: false },
    solicitud: { type: Schema.Types.ObjectId, ref: 'Solicitud', unique: false }


});


module.exports = mongoose.model('Comentario', comentariosSchema);