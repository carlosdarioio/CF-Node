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
        required: [true, 'El tema es necesario']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es necesario']
    },
    estados: {
        type: String,
        default: 'Solicitado',
        enum: estadosValidos
    },

    fecha: {
        type: String,
        default: Date.now()
    },

    cancelado: {
        type: Boolean,
        default: false
    }
});


solicitudSchema.methods.toJSON = function() {

    let solicitu = this;
    let solicituObject = solicitu.toObject();
    delete solicituObject.cancelado;

    return solicituObject;
}


solicitudSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });


module.exports = mongoose.model('Solicitud', solicitudSchema);