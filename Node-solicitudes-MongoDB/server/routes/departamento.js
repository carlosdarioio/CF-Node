const express = require('express');

let { verificaToken } = require('../middlewares/autenticacion'); //, verificaAdmin_Role

let app = express();

let Departamento = require('../models/departamento');
//x aqui vas intenta crear un post donde recibas el id de usuario y una lista de departamentos con nombre y descripcion que tenes que insertar a la base de datos 
//eso para practica la obtencion de clases
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

        });
});

//Obtener departamento por id
app.get('/departamento/getById/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    Departamento.find({ _id: id })
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

        });
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
        descripcion: body.descripcion,
        usuario: body.usuario

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


// ============================
// Crear lista de departamentos posteados
// ============================
app.post('/departamento/departamentospost', (req, res) => { //, verificaToken
    //x aqui vas funcional
    let body = req.body;
    console.log(body);
    //dos opciones directo: body.departamentos.map(({ nombre }) => console.log(nombre));    
    //con acciones
    body.departamentos.forEach(function(dep) {
        console.log(body.usuario);
        console.log(dep.nombre);

        let departamento = new Departamento({
            nombre: dep.nombre,
            descripcion: dep.descripcion,
            usuario: body.usuario
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

        });

    });


    res.json({
        ok: true,
        message: "Departamentos creados",
        departamento: body
    });


});


module.exports = app;