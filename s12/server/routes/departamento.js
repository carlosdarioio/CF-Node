const express = require('express');

let { verificaToken } = require('../middlewares/autenticacion'); //, verificaAdmin_Role

let app = express();

let Departamento = require('../models/departamento');

// ============================
// Mostrar todos los departamentos
// ============================
app.get('/departamento', verificaToken, (req, res) => {

    Departamento.find({})
        .sort('nombre descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, departamentos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                departamentos
            });

        })
});




// ============================
// Crear nueva departamento
// ============================
app.post('/departamento', verificaToken, (req, res) => {
    // regresa la nueva departamento
    // req.usuario._id
    let body = req.body;

    let departamento = new Departamento({
        nombre: body.nombre,
        descripcion: body.descripcion
            //,        usuario: req.usuario._id
    });


    departamento.save((err, departamentoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!departamentoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            departamento: departamentoDB
        });


    });


});


// ============================
// Mostrar todas las departamentos
// ============================
app.put('/departamento/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descDepartamento = {
        nombre: body.nombre,
        descripcion: body.descripcion
    };

    Departamento.findByIdAndUpdate(id, descDepartamento, { new: true, runValidators: true }, (err, departamentoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!departamentoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            departamento: departamentoDB
        });

    });


});



module.exports = app;