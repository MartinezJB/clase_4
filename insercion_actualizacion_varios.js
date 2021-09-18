const Sequelize = require('sequelize');

const sequelize = new Sequelize('concesionaria', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb'
  });
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexion establecida.');
  }) 
  .catch(err => {
    console.error('Imposible conectarse a la base de datos:', err);
  });


class Autos extends Sequelize.Model {}
Autos.init({
    marca: Sequelize.STRING,
    color:Sequelize.STRING
}, { sequelize, modelName: 'Autos' });


sequelize.sync()
.then(() => Autos.create({
  marca: 'Ford',
  color: 'Plateado'
}))
.then(resp => {
  console.log(resp.toJSON());
});

Autos.destroy({
  where: {
    id: [1,3]  //para eliminar varios registros, hay que pasarle un arreglo con sus respectivos id
  }
}).then(() => {
  console.log("Elimine Registro");
});
