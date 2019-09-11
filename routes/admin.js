var express = require('express');
var console = require('console');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  if (!req.session.autenticado) {
    res.render('administrator/login');
  }else{
    res.render('administrator/index', { username: req.session.usuario });
  }
});

router.get('/login', function(req, res, next) {
  if (!req.session.autenticado) {
    res.render('administrator/login');
  }else{
    res.render('administrator/index', { username: req.session.usuario });
  }
});

/* GET logout. */
router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.render('administrator/login');
});

router.post('/login', function(req, res, next) {
    var autenticado = req.session.autenticado;
    var db = req.app.get('db');
    var registro = req.body;

    if (!autenticado) {
      if (validaRegistro(registro)){
        //registro.txt_clave = crypto.createHash('sha384').update(registro.txt_clave, 'utf8').digest('hex');
        const text = "select * from func_login($1, $2, $3);"
        const values = [
                        registro.txt_email,
                        registro.txt_clave,
                        1
                      ];

        // callback
        db.query(text, values, (err, result) => {
          if (err) {
            console.log(err.stack);
            var response = { status: 500, message: "Ha ocurrido un error con la base de datos.", result: null };
            res.status(500).json(response);
          } else {
            if (result.rows.length > 0) {
                var response = { status: 200, message: "Autenticación exitosa!.", result: result.rows[0] };
                req.session.autenticado = true;
                req.session.id_usuario = result.rows[0].id;
                req.session.usuario = result.rows[0].nombre;
                res.status(200).json(response);
            }else{
              req.session.autenticado = false;
              var response = { status: 401, message: "Usuario no autorizado.", result: null };
              res.status(401).json(response);
            }
          }
        });
      }else{
        var response = { status: 403, message: "Ha ocurrido un error con el envío de la información.", result: null };
        res.status(403).json(response);
      }
    } else {
        var response = { status: 200, message: "El usuario esta autenticado, favor deslogearse.", result: null };
        res.status(200).json(response);
    }
});

/* Valida si el registro es null. */
function validaRegistro(registro){
  if ((registro == undefined) || (registro == null)){
    return false;
  }
  return true;
}

router.get('/alimentos', function(req, res, next) {
  if (!req.session.autenticado) {
    res.render('administrator/login');
  }else{
    res.render('administrator/alimentos', { username: req.session.usuario });
  }
});

router.get('/Test', function(req, res, next) {
  if (!req.session.autenticado) {
    res.render('administrator/login');
  }else{
    res.render('administrator/Test', { username: req.session.usuario });
  }
});



//RUTAS MANTENIMIENTO TEST
router.get('/Test/table', function(req, res, next) {
  var autenticado = req.session.autenticado;
  var db = req.app.get('db');

  if (autenticado) {
      const text = "select * from tbl_categorias;"
      const values = [];

      // callback
      db.query(text, values, (err, result) => {
        if (err) {
          console.log(err.stack);
          var response = { status: 500, message: "Ha ocurrido un error con la base de datos.", result: null };
          res.status(500).json(response);
        } else {
          res.status(200).json(result.rows);
        }
      });
  } else {
      var response = { status: 200, message: "El usuario esta autenticado, favor deslogearse.", result: null };
      res.status(200).json(response);
  }
});

router.post('/Test/read', function(req, res, next) {
  var autenticado = req.session.autenticado;
  var db = req.app.get('db');
  var registro = req.body;

  if (autenticado) {
    if (validaRegistro(registro)){
      const text = "select * from tbl_categorias where id="+registro.txt_id+";"
      const values = [];

      // callback
      db.query(text, values, (err, result) => {
        if (err) {
          console.log(err.stack);
          var response = { status: 500, message: "Ha ocurrido un error con la base de datos.", result: null };
          res.status(500).json(response);
        } else {
          if (result.rows.length > 0) {
              var response = { status: 200, message: "Registro consultado con exito!.", result: result.rows[0] };
              res.status(200).json(response);
          }else{
            req.session.autenticado = false;
            var response = { status: 401, message: "Usuario no autorizado.", result: null };
            res.status(401).json(response);
          }
        }
      });
    }else{
      var response = { status: 403, message: "Ha ocurrido un error con el envío de la información.", result: null };
      res.status(403).json(response);
    }
  } else {
      var response = { status: 200, message: "El usuario esta autenticado, favor deslogearse.", result: null };
      res.status(200).json(response);
  }
});

router.post('/Test/store', function(req, res, next) {
  var autenticado = req.session.autenticado;
  var db = req.app.get('db');
  var registro = req.body;

  if (autenticado) {
    if (validaRegistro(registro)){
      var text = "";
      var values = [];

      if(registro.txt_id==""){
        text = "select * from func_insert_categorias($1);"
        values = [
                        registro.txt_descripcion
                      ];
                    }
                    else{
                      text = "select * from func_update_categorias($1, $2);"
                      values = [
                                      registro.txt_descripcion,
                                      registro.txt_id
                                    ];
                    }
      

      db.query(text, values, (err, result) => {
        if (err) {
          console.log("errror "+err.stack);
          var response = { status: 500, message: "Ha ocurrido un error con la base de datos.", result: null };
          res.status(500).json(response);
        } else {
          if (result.rows.length > 0) {
              var response = { status: 200, message: "Registro guardado con exito!.", result: result.rows[0] };
              res.status(200).json(response);
          }else{
            req.session.autenticado = false;
            var response = { status: 401, message: "Usuario no autorizado.", result: null };
            res.status(401).json(response);
          }
        }
      });
    }else{
      var response = { status: 403, message: "Ha ocurrido un error con el envío de la información.", result: null };
      res.status(403).json(response);
    }
  } else {
      var response = { status: 200, message: "El usuario esta autenticado, favor deslogearse.", result: null };
      res.status(200).json(response);
  }
});

router.post('/Test/remove', function(req, res, next) {
  var autenticado = req.session.autenticado;
  var db = req.app.get('db');
  var registro = req.body;

  if (autenticado) {
    if (validaRegistro(registro)){
        const text = "select * from func_remove_categorias($1);"
        const values = [
                        registro.txt_id
                      ];
      // callback
      db.query(text, values, (err, result) => {
        if (err) {
          console.log(err.stack);
          var response = { status: 500, message: "Ha ocurrido un error con la base de datos.", result: null };
          res.status(500).json(response);
        } else {
          if (result.rows.length > 0) {
              var response = { status: 200, message: "Registro eliminado con exito!.", result: result.rows[0] };
              res.status(200).json(response);
          }else{
            req.session.autenticado = false;
            var response = { status: 401, message: "Usuario no autorizado.", result: null };
            res.status(401).json(response);
          }
        }
      });
    }else{
      var response = { status: 403, message: "Ha ocurrido un error con el envío de la información.", result: null };
      res.status(403).json(response);
    }
  } else {
      var response = { status: 200, message: "El usuario esta autenticado, favor deslogearse.", result: null };
      res.status(200).json(response);
  }
});


//RUTAS MANTENIMIENTO DE USUARIO
router.get('/users/table', function(req, res, next) {
  var autenticado = req.session.autenticado;
  var db = req.app.get('db');

  if (autenticado) {
      const text = "select * from tbl_users where tipo_usuario=2;"
      const values = [];

      // callback
      db.query(text, values, (err, result) => {
        if (err) {
          console.log(err.stack);
          var response = { status: 500, message: "Ha ocurrido un error con la base de datos.", result: null };
          res.status(500).json(response);
        } else {
          res.status(200).json(result.rows);
        }
      });
  } else {
      var response = { status: 200, message: "El usuario esta autenticado, favor deslogearse.", result: null };
      res.status(200).json(response);
  }
});

router.post('/users/read', function(req, res, next) {
  var autenticado = req.session.autenticado;
  var db = req.app.get('db');
  var registro = req.body;

  if (autenticado) {
    if (validaRegistro(registro)){
      const text = "select * from tbl_users where id="+registro.txt_id+";"
      const values = [];

      // callback
      db.query(text, values, (err, result) => {
        if (err) {
          console.log(err.stack);
          var response = { status: 500, message: "Ha ocurrido un error con la base de datos.", result: null };
          res.status(500).json(response);
        } else {
          if (result.rows.length > 0) {
              var response = { status: 200, message: "Registro consultado con exito!.", result: result.rows[0] };
              res.status(200).json(response);
          }else{
            req.session.autenticado = false;
            var response = { status: 401, message: "Usuario no autorizado.", result: null };
            res.status(401).json(response);
          }
        }
      });
    }else{
      var response = { status: 403, message: "Ha ocurrido un error con el envío de la información.", result: null };
      res.status(403).json(response);
    }
  } else {
      var response = { status: 200, message: "El usuario esta autenticado, favor deslogearse.", result: null };
      res.status(200).json(response);
  }
});

router.post('/users/store', function(req, res, next) {
  var autenticado = req.session.autenticado;
  var db = req.app.get('db');
  var registro = req.body;

  if (autenticado) {
    if (validaRegistro(registro)){
      var text = "";
      var values = [];

      if(registro.txt_id==""){
        text = "select * from func_insert_user($1, $2, $3, $4);"
        values = [
                        registro.txt_email,
                        registro.txt_pass,
                        registro.txt_nombre,
                        2
                      ];
      }else{
        text = "select * from func_update_user($1, $2, $3, $4);"
        values = [
                        registro.txt_email,
                        registro.txt_pass,
                        registro.txt_nombre,
                        registro.txt_id
                      ];
      }

      // callback
      db.query(text, values, (err, result) => {
        if (err) {
          console.log("errror "+err.stack);
          var response = { status: 500, message: "Ha ocurrido un error con la base de datos.", result: null };
          res.status(500).json(response);
        } else {
          if (result.rows.length > 0) {
              var response = { status: 200, message: "Registro guardado con exito!.", result: result.rows[0] };
              res.status(200).json(response);
          }else{
            req.session.autenticado = false;
            var response = { status: 401, message: "Usuario no autorizado.", result: null };
            res.status(401).json(response);
          }
        }
      });
    }else{
      var response = { status: 403, message: "Ha ocurrido un error con el envío de la información.", result: null };
      res.status(403).json(response);
    }
  } else {
      var response = { status: 200, message: "El usuario esta autenticado, favor deslogearse.", result: null };
      res.status(200).json(response);
  }
});

router.post('/users/remove', function(req, res, next) {
  var autenticado = req.session.autenticado;
  var db = req.app.get('db');
  var registro = req.body;

  if (autenticado) {
    if (validaRegistro(registro)){
        const text = "select * from func_remove_user($1);"
        const values = [
                        registro.txt_id
                      ];
      // callback
      db.query(text, values, (err, result) => {
        if (err) {
          console.log(err.stack);
          var response = { status: 500, message: "Ha ocurrido un error con la base de datos.", result: null };
          res.status(500).json(response);
        } else {
          if (result.rows.length > 0) {
              var response = { status: 200, message: "Registro eliminado con exito!.", result: result.rows[0] };
              res.status(200).json(response);
          }else{
            req.session.autenticado = false;
            var response = { status: 401, message: "Usuario no autorizado.", result: null };
            res.status(401).json(response);
          }
        }
      });
    }else{
      var response = { status: 403, message: "Ha ocurrido un error con el envío de la información.", result: null };
      res.status(403).json(response);
    }
  } else {
      var response = { status: 200, message: "El usuario esta autenticado, favor deslogearse.", result: null };
      res.status(200).json(response);
  }
});

//RUTAS MANTENIMIENTO DE ALIMENTOS
router.get('/alimentos/table', function(req, res, next) {
  var autenticado = req.session.autenticado;
  var db = req.app.get('db');

  if (autenticado) {
      const text = "select * from tbl_alimentos;"
      const values = [];

      // callback
      db.query(text, values, (err, result) => {
        if (err) {
          console.log(err.stack);
          var response = { status: 500, message: "Ha ocurrido un error con la base de datos.", result: null };
          res.status(500).json(response);
        } else {
          res.status(200).json(result.rows);
        }
      });
  } else {
      var response = { status: 200, message: "El usuario esta autenticado, favor deslogearse.", result: null };
      res.status(200).json(response);
  }
});

router.post('/alimentos/read', function(req, res, next) {
  var autenticado = req.session.autenticado;
  var db = req.app.get('db');
  var registro = req.body;

  if (autenticado) {
    if (validaRegistro(registro)){
      const text = "select * from tbl_alimentos where id="+registro.txt_id+";"
      const values = [];

      // callback
      db.query(text, values, (err, result) => {
        if (err) {
          console.log(err.stack);
          var response = { status: 500, message: "Ha ocurrido un error con la base de datos.", result: null };
          res.status(500).json(response);
        } else {
          if (result.rows.length > 0) {
              var response = { status: 200, message: "Registro consultado con exito!.", result: result.rows[0] };
              res.status(200).json(response);
          }else{
            req.session.autenticado = false;
            var response = { status: 401, message: "Usuario no autorizado.", result: null };
            res.status(401).json(response);
          }
        }
      });
    }else{
      var response = { status: 403, message: "Ha ocurrido un error con el envío de la información.", result: null };
      res.status(403).json(response);
    }
  } else {
      var response = { status: 200, message: "El usuario esta autenticado, favor deslogearse.", result: null };
      res.status(200).json(response);
  }
});

router.post('/alimentos/store', function(req, res, next) {
  var autenticado = req.session.autenticado;
  var db = req.app.get('db');
  var registro = req.body;

  if (autenticado) {
    if (validaRegistro(registro)){
      var text = "";
      var values = [];

      if(registro.txt_id==""){
        text = "select * from func_insert_alimento($1, $2, $3, $4, $5, $6);"
        values = [
                        registro.txt_nombre,
                        registro.txt_puntos,
                        registro.txt_sonido,
                        registro.txt_categoria,
                        registro.txt_imagen,
                        registro.txt_fechaelaboracion
                      ];
      }else{
        
        text = "select * from func_update_alimento($1, $2, $3, $4, $5, $6, $7);"
        values = [
                        registro.txt_nombre,
                        registro.txt_puntos,
                        registro.txt_sonido,
                        registro.txt_categoria,
                        registro.txt_imagen,
                        registro.txt_fechaelaboracion,
                        registro.txt_id
                      ];
                      console.log("valores a actualizar: " + values);
      }

      // callback

      db.query(text, values, (err, result) => {
        if (err) {
          console.log("errror "+err.stack);
          var response = { status: 500, message: "Ha ocurrido un error con la base de datos.", result: null };
          res.status(500).json(response);
        } else {
          if (result.rows.length > 0) {
              var response = { status: 200, message: "Registro guardado con exito!.", result: result.rows[0] };
              res.status(200).json(response);
          }else{
            req.session.autenticado = false;
            var response = { status: 401, message: "Usuario no autorizado.", result: null };
            res.status(401).json(response);
          }
        }
      });
    }else{
      var response = { status: 403, message: "Ha ocurrido un error con el envío de la información.", result: null };
      res.status(403).json(response);
    }
  } else {
      var response = { status: 200, message: "El usuario esta autenticado, favor deslogearse.", result: null };
      res.status(200).json(response);
  }
});

router.post('/alimentos/remove', function(req, res, next) {
  var autenticado = req.session.autenticado;
  var db = req.app.get('db');
  var registro = req.body;

  if (autenticado) {
    if (validaRegistro(registro)){
        const text = "select * from func_remove_alimento($1);"
        const values = [
                        registro.txt_id
                      ];
      // callback
      db.query(text, values, (err, result) => {
        if (err) {
          console.log(err.stack);
          var response = { status: 500, message: "Ha ocurrido un error con la base de datos.", result: null };
          res.status(500).json(response);
        } else {
          if (result.rows.length > 0) {
              var response = { status: 200, message: "Registro eliminado con exito!.", result: result.rows[0] };
              res.status(200).json(response);
          }else{
            req.session.autenticado = false;
            var response = { status: 401, message: "Usuario no autorizado.", result: null };
            res.status(401).json(response);
          }
        }
      });
    }else{
      var response = { status: 403, message: "Ha ocurrido un error con el envío de la información.", result: null };
      res.status(403).json(response);
    }
  } else {
      var response = { status: 200, message: "El usuario esta autenticado, favor deslogearse.", result: null };
      res.status(200).json(response);
  }
});

module.exports = router;
