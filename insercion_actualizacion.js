const Sequelize = require('sequelize');

const sequelize = new Sequelize('concesionaria', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión establecida.');
  })
  .catch(err => {
    console.error('No es posible conectar con la base de datos', err);
  });



class Autos extends Sequelize.Model {}
Autos.init({
  marca: Sequelize.STRING,
  color:Sequelize.STRING
}, { sequelize, modelName: 'Autos' });


sequelize.sync()
.then(() => Autos.create({
  marca: 'BMW',
  color: 'Rojo'
}))
.then(resp => {
  console.log(resp.toJSON());
});


//se debe ejecutar luego de crear al bmw ,porque el update no espera a que la creacion del registro se complete
//se debe realizar en otro script.
Autos.update({ color: "Verde" }, {
    where: {
        marca: "BMW"
    }
}).then(() => {
    console.log("Registro actualizado")
})