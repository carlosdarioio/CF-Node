const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let estadosValidos = {
    values: ['Solicitado', 'En_Desarrollo', 'Atendida'],
    message: '{VALUE} no es un estado válido'
};


let Schema = mongoose.Schema;


let solicitudSchema = new Schema({
    tema: {
        type: String,
        required: [true, 'El tema es necesario'],
        unique: false
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es necesario'],
        unique: false
    },
    estados: {
        type: String,
        default: 'Solicitado',
        enum: estadosValidos,
        unique: false
    },

    fecha: {
        type: String,
        default: Date.now(),
        unique: false
    },

    cancelado: {
        type: Boolean,
        default: false,
        unique: false
    },
    solicitante: { type: Schema.Types.ObjectId, ref: 'Usuario', unique: false },
    asignado: { type: Schema.Types.ObjectId, ref: 'Usuario', unique: false }
});

solicitudSchema.methods.toJSON = function() {

    let solicitu = this;
    let solicituObject = solicitu.toObject();
    delete solicituObject.cancelado;

    return solicituObject;
}


solicitudSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });


module.exports = mongoose.model('Solicitud', solicitudSchema);