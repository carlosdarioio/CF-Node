const express = require('express');

let { verificaToken } = require('../middlewares/autenticacion'); //, verificaAdmin_Role

let app = express();

let Comentario = require('../models/comentarios');

// ============================
// Mostrar todos los comentarios
// ============================
app.get('/comentarios', verificaToken, (req, res) => {

    Comentario.find({})
        .sort('descripcion fecha')
        .populate('usuario', 'nombre email')
        .populate('solicitud', '_id')
        .exec((err, comentarios) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                comentarios
            });

        });
});

//Obtener departamento por id
app.get('/comentarios/getById/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    Comentario.find({ _id: id })
        .exec((err, comentarios) => {


            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                comentarios
            });

        });
});

//Obtener departamento por solicitudid
app.get('/comentarios/getBySolId/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    Comentario.find({ solicitud: id })
        .exec((err, comentarios) => {


            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                comentarios
            });

        });
});




//x aqui vas postia comentaroi y mira si se ingresa
// ============================
// Crear nueva comentarios
// ============================
app.post('/comentarios', verificaToken, (req, res) => {
    // regresa la nueva comentarios
    // req.usuario._id
    let body = req.body;

    let comentarios = new Comentario({
        solicitud: body.solicitud,
        usuario: body.usuario,
        descripcion: body.descripcion
    });


    comentarios.save((err, comentariosDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!comentariosDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            comentarios: comentariosDB
        });


    });


});


// ============================
// Mostrar todas las comentarios
// ============================
app.put('/comentarios/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descComentario = {
        descripcion: body.descripcion
    };

    Comentario.findByIdAndUpdate(id, descComentario, { new: true, runValidators: true }, (err, comentariosDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!comentariosDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            comentarios: comentariosDB
        });

    });


});

// ============================
// Mostrar todas las comentarios
// ============================
app.delete('/comentarios/:id', [verificaToken], (req, res) => {
    // solo un administrador puede borrar comentarios    
    let id = req.params.id;

    Comentario.findByIdAndRemove(id, (err, comentariosDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!comentariosDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Comentario Borrada'
        });

    });


});


module.exports = app;