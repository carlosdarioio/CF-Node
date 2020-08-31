const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let departamentoSchema = new Schema({
    nombre: { type: String, unique: true, required: [true, 'El nombre es obligatorio'] },
    descripcion: { type: String, required: false }
    //usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
});


module.exports = mongoose.model('Departamento', departamentoSchema);