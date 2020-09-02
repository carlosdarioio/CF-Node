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




//x aqui vas postia comentaroi y mira si se ingresa
// ============================
// Crear nueva comentarios
// ============================
app.post('/comentarios', verificaToken, (req, res) => {
    // regresa la nueva comentarios
    // req.usuario._id
    let body = req.body;

    let comentarios = new Comentario({
        nombre: body.nombre,
        descripcion: body.descripcion
            //,        usuario: req.usuario._id
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
        nombre: body.nombre,
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



module.exports = app;