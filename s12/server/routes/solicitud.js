const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Solicitud = require('../models/solicitud');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

const app = express();

app.get('/solicitud', verificaToken, (req, res) => {


    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Solicitud.find({ cancelado: false }, 'tema descripcion estados fecha')
        .skip(desde)
        .limit(limite)
        .exec((err, solicitud) => { //base de datos

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Solicitud.count({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    solicitud,
                    cuantos: conteo
                });

            });


        });


});



app.post('/solicitud', [verificaToken], function(req, res) {

    let body = req.body;

    let solicitud = new Solicitud({
        tema: body.tema,
        descripcion: body.descripcion,
        estados: 'Solicitado',
        cancelado: false

    });


    solicitud.save((err, solicitudDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            solicitud: solicitudDB
        });


    });


});


app.put('/solicitud/:id', [verificaToken], function(req, res) {

    let id = req.params.id;
    //let body = _.pick(req.body, ['tema', 'descripcion', 'estados', 'cancelado']);
    let body = req.body;

    Solicitud.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, solicitudDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }



        res.json({
            ok: true,
            solicitud: solicitudDB
        });

    })

});


app.delete('/solicitud/:id', [verificaToken, verificaAdmin_Role], function(req, res) {


    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        canceladO: true
    };

    Solicitud.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, solicitudBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!solicitudBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Solicitud no encontrada'
                }
            });
        }

        res.json({
            ok: true,
            solicitud: solicitudBorrado
        });

    });



});






module.exports = app;