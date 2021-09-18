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
  marca: 'Peugeot',
  color: 'Blanco'
}))
.then(resp => {
  console.log(resp.toJSON());
});

//elimina el bmw.
Autos.destroy({
  where: {
    id: 2
  }
}).then(() => {
  console.log("Elimine Registro");
});
