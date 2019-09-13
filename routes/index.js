var express = require('express');
var crypto = require('crypto');
var console = require('console');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.session.autenticado) {
    res.render('login');
  }else{
    res.render('index', { username: req.session.usuario });
  }
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  if (!req.session.autenticado) {
    res.render('login');
  }else{
    res.render('index', { username: req.session.usuario });
  }
});

/* GET logout. */
router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.render('login');
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
                        2
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

router.get('/instrucciones', function(req, res, next) {
  if (!req.session.autenticado) {
    res.render('login');
  }else{
    res.render('instrucciones', { username: req.session.usuario });
  }
});

router.get('/bar', function(req, res, next) {
  if (!req.session.autenticado) {
    res.render('login');
  }else{
    res.render('bar', { username: req.session.usuario });
  }
});

router.get('/bar2', function(req, res, next) {
  if (!req.session.autenticado) {
    res.render('login');
  }else{
    res.render('bar2', { username: req.session.usuario, puntosNivel1: req.param("puntos") });
  }
});

router.get('/Alimentos', function(req, res, next) {
  var db = req.app.get('db');
  const text = "select * from tbl_alimentos;"
  const values = [];
  
    db.query(text, values, (err, result) => {
      if (result.rows.length > 0) {
        var response = { status: 200, message: "Autenticación exitosa!.", result: result.rows };
        res.status(200).json(response);
    }
  });
});

router.get('/InsertAlimentos', function(req, res, next) {
  var db = req.app.get('db');
  const text = "select * from tbl_alimentos;"
  const values = [];
  
    db.query(text, values, (err, result) => {
      if (result.rows.length > 0) {
        var response = { status: 200, message: "Autenticación exitosa!.", result: result.rows };
        res.status(200).json(response);
    }
  });
});


router.post('/getAlimentos', function(req, res, next) {
  if (req.session.autenticado) {
    var db = req.app.get('db');
    const text = "select * from tbl_alimentos;"
    const values = [];

    // callback
    db.query(text, values, (err, result) => {
      if (err) {
        console.log(err.stack);
        var response = { status: 500, message: "Ha ocurrido un error con la base de datos.", result: null };
        res.status(500).json(response);
      } else {
        if (result.rows.length > 0) {
            var response = { status: 200, message: "Autenticación exitosa!.", result: result.rows };
            res.status(200).json(response);
        }else{
          req.session.autenticado = false;
          var response = { status: 401, message: "Usuario no autorizado.", result: null };
          res.status(401).json(response);
        }
      }
    });
  }
});

router.post('/puntaje', function(req, res, next) {
  if (!req.session.autenticado) {
    res.render('login');
  }else{
    var db = req.app.get('db');
    const now = new Date();
    const text = "select * from func_guarda_puntaje($1, $2, $3, $4);"
    const values = [
                    now,
                    req.param("puntos"),
                    req.param("nivel"),
                    req.session.id_usuario
                  ];

    // callback
    db.query(text, values, (err, result) => {
      if (err) {
        console.log(err.stack);
        var response = { status: 500, message: "Ha ocurrido un error con la base de datos.", result: null };
        res.status(500).json(response);
      }
    });
  }
});

router.get('/puntaje', function(req, res, next) {
  if (!req.session.autenticado) {
    res.render('login');
  }else{
    res.render("puntaje", { puntaje: req.param("puntos"), username: req.session.usuario });
  }
});







//API GET TRAE TODOS LOS USUARIOS
router.get('/users/getall', function(req, res, next) {
  var db = req.app.get('db');
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

});

router.get('/users/getbyid', function(req, res, next) {
  var db = req.app.get('db');
  var registro = req.body;
      const text = "select * from tbl_users where id="+registro.txt_id+";"
      const values = [];

      // callback
      db.query(text, values, (err, result) => {
       
          if (result.rows.length > 0) {
              var response = { status: 200, message: "Registro consultado con exito!.", result: result.rows[0] };
              res.status(200).json(response);
          }
        });    
});

router.post('/users/insert', function(req, res, next) {
  var db = req.app.get('db');
  var registro = req.body;

      var text = "";
      var values = [];

        text = "select * from func_insert_user($1, $2, $3, $4);"
        values = [
                        registro.txt_email,
                        registro.txt_pass,
                        registro.txt_nombre,
                        2
                      ];

      db.query(text, values, (err, result) => {
 
          if (result.rows.length > 0) {
              var response = { status: 200, message: "Registro guardado con exito!.", result: result.rows[0] };
              res.status(200).json(response);
          }
        
      });

});

router.post('/users/update', function(req, res, next) {
  var db = req.app.get('db');
  var registro = req.body;

      var text = "";
      var values = [];
        text = "select * from func_update_user($1, $2, $3, $4);"
        values = [
                        registro.txt_email,
                        registro.txt_pass,
                        registro.txt_nombre,
                        registro.txt_id
                      ];

      db.query(text, values, (err, result) => {
 
          if (result.rows.length > 0) {
              var response = { status: 200, message: "Registro actualizado con exito!.", result: result.rows[0] };
              res.status(200).json(response);
          }
        
      });

});

router.post('/users/delete', function(req, res, next) {
  var db = req.app.get('db');
  var registro = req.body;

        const text = "select * from func_remove_user($1);"
        const values = [
                        registro.txt_id
                      ];
      db.query(text, values, (err, result) => {

          if (result.rows.length > 0) {
              var response = { status: 200, message: "Registro eliminado con exito!.", result: result.rows[0] };
              res.status(200).json(response);
          }
        });
});

//RUTAS MANTENIMIENTO DE ALIMENTOS
router.get('/alimentos/getall', function(req, res, next) {
  var db = req.app.get('db');
      const text = "select * from tbl_alimentos;"
      const values = [];

      // callback
      db.query(text, values, (err, result) => {
        if (err) {
          console.log(err.stack);
          var response = { status: 500, message: "Ha ocurrido un error con la base de datos.", result: null };
          res.status(500).json(response);
        } 
          res.status(200).json(result.rows);
        
      });
   
});

router.post('/alimentos/getbyid', function(req, res, next) {
  var db = req.app.get('db');
  var registro = req.body;

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
          }
        }
      });
    
  
});

router.post('/alimentos/insert', function(req, res, next) {
  var autenticado = req.session.autenticado;
  var db = req.app.get('db');
  var registro = req.body;

      var text = "";
      var values = [];

     
        text = "select * from func_insert_alimento($1, $2, $3, $4, $5);"
        values = [
                        registro.txt_nombre,
                        registro.txt_puntos,
                        registro.txt_sonido,
                        registro.txt_categoria,
                        registro.txt_imagen,
                      ];
  
      
      db.query(text, values, (err, result) => {
        if (err) {
          console.log("error "+err.stack);
          var response = { status: 500, message: "Ha ocurrido un error con la base de datos.", result: null };
          res.status(500).json(response);
        } else {
          if (result.rows.length > 0) {
              var response = { status: 200, message: "Registro guardado con exito!.", result: result.rows[0] };
              res.status(200).json(response);
          }
        }
      });
});

router.post('/alimentos/update', function(req, res, next) {
  var autenticado = req.session.autenticado;
  var db = req.app.get('db');
  var registro = req.body;

      var text = "";
      var values = [];

        text = "select * from func_update_alimento($1, $2, $3, $4, $5, $6);"
        values = [
                        registro.txt_nombre,
                        registro.txt_puntos,
                        registro.txt_sonido,
                        registro.txt_categoria,
                        registro.txt_imagen,
                        registro.txt_id
                      ];
      
      db.query(text, values, (err, result) => {
        if (err) {
          console.log("error "+err.stack);
          var response = { status: 500, message: "Ha ocurrido un error con la base de datos.", result: null };
          res.status(500).json(response);
        } else {
          if (result.rows.length > 0) {
              var response = { status: 200, message: "Registro actualizado con exito!.", result: result.rows[0] };
              res.status(200).json(response);
          }
        }
      });
});

router.post('/alimentos/delete', function(req, res, next) {
  var db = req.app.get('db');
  var registro = req.body;

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
          }
        }
      });
    
  
});


//API REST PARA CATEGORIAS
router.get('/categorias/getall', function(req, res, next) {
  var db = req.app.get('db');
      const text = "select * from tbl_categorias;"
      const values = [];

      // callback
      db.query(text, values, (err, result) => {
        if (err) {
          console.log(err.stack);
          var response = { status: 500, message: "Ha ocurrido un error con la base de datos.", result: null };
          res.status(500).json(response);
        } 
          res.status(200).json(result.rows);
        
      });
   
});

router.post('/categorias/getbyid', function(req, res, next) {
  var db = req.app.get('db');
  var registro = req.body;

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
          }
        }
      });
    
  
});

router.post('/categorias/insert', function(req, res, next) {
  var autenticado = req.session.autenticado;
  var db = req.app.get('db');
  var registro = req.body;

      var text = "";
      var values = [];

     
        text = "select * from func_insert_categorias($1, $2, $3, $4, $5);"
        values = [
                        registro.txt_nombre,
                        registro.txt_puntos,
                        registro.txt_sonido,
                        registro.txt_categoria,
                        registro.txt_imagen,
                      ];
  
      
      db.query(text, values, (err, result) => {
        if (err) {
          console.log("error "+err.stack);
          var response = { status: 500, message: "Ha ocurrido un error con la base de datos.", result: null };
          res.status(500).json(response);
        } else {
          if (result.rows.length > 0) {
              var response = { status: 200, message: "Registro guardado con exito!.", result: result.rows[0] };
              res.status(200).json(response);
          }
        }
      });
});

router.post('/categorias/update', function(req, res, next) {
  var autenticado = req.session.autenticado;
  var db = req.app.get('db');
  var registro = req.body;

      var text = "";
      var values = [];

        text = "select * from func_update_categorias($1, $2, $3, $4, $5, $6);"
        values = [
                        registro.txt_nombre,
                        registro.txt_puntos,
                        registro.txt_sonido,
                        registro.txt_categoria,
                        registro.txt_imagen,
                        registro.txt_id
                      ];
      
      db.query(text, values, (err, result) => {
        if (err) {
          console.log("error "+err.stack);
          var response = { status: 500, message: "Ha ocurrido un error con la base de datos.", result: null };
          res.status(500).json(response);
        } else {
          if (result.rows.length > 0) {
              var response = { status: 200, message: "Registro actualizado con exito!.", result: result.rows[0] };
              res.status(200).json(response);
          }
        }
      });
});

router.post('/categorias/delete', function(req, res, next) {
  var db = req.app.get('db');
  var registro = req.body;

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
          }
        }
      });
});


//API REST PARA PUNTAJES
router.get('/puntajes/getall', function(req, res, next) {
  var db = req.app.get('db');
      const text = "select * from tbl_puntajes;"
      const values = [];

      // callback
      db.query(text, values, (err, result) => {
        if (err) {
          console.log(err.stack);
          var response = { status: 500, message: "Ha ocurrido un error con la base de datos.", result: null };
          res.status(500).json(response);
        } 
          res.status(200).json(result.rows);
        
      });
   
});

router.post('/puntajes/getbyid', function(req, res, next) {
  var db = req.app.get('db');
  var registro = req.body;

      const text = "select * from tbl_puntajes where id="+registro.txt_id+";"
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
          }
        }
      });
    
  
});

router.post('/puntajes/insert', function(req, res, next) {
  var autenticado = req.session.autenticado;
  var db = req.app.get('db');
  var registro = req.body;

      var text = "";
      var values = [];

     
        text = "select * from func_insert_puntajes($1, $2, $3, $4);"
        values = [
                        registro.txt_fecha,
                        registro.txt_puntaje,
                        registro.txt_nivel,
                        registro.txt_id_usuario,
                       
                      ];
  
      
      db.query(text, values, (err, result) => {
        if (err) {
          console.log("error "+err.stack);
          var response = { status: 500, message: "Ha ocurrido un error con la base de datos.", result: null };
          res.status(500).json(response);
        } else {
          if (result.rows.length > 0) {
              var response = { status: 200, message: "Registro guardado con exito!.", result: result.rows[0] };
              res.status(200).json(response);
          }
        }
      });
});

router.post('/puntajes/update', function(req, res, next) {
  var autenticado = req.session.autenticado;
  var db = req.app.get('db');
  var registro = req.body;

      var text = "";
      var values = [];

        text = "select * from func_update_puntajes($1, $2, $3, $4, $5);"
        values = [
                        registro.txt_fecha,
                        registro.txt_puntaje,
                        registro.txt_nivel,
                        registro.txt_id_usuario,
                        registro.txt_id
                      ];
      
      db.query(text, values, (err, result) => {
        if (err) {
          console.log("error "+err.stack);
          var response = { status: 500, message: "Ha ocurrido un error con la base de datos.", result: null };
          res.status(500).json(response);
        } else {
          if (result.rows.length > 0) {
              var response = { status: 200, message: "Registro actualizado con exito!.", result: result.rows[0] };
              res.status(200).json(response);
          }
        }
      });
});

router.post('/puntajes/delete', function(req, res, next) {
  var db = req.app.get('db');
  var registro = req.body;

        const text = "select * from func_remove_puntajes($1);"
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
          }
        }
      });
});

module.exports = router;

