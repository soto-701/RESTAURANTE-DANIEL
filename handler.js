'use strict';
const mysql=require('mysql');
const connection=mysql.createConnection({
  host:'proyectofinal-daniel.cywrvdmfoq84.us-east-2.rds.amazonaws.com',
  user:' ',
  port:'3306',
  pasword:' ',
  database:' ',
});

module.exports.hacerPedido = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.obtenerPedido = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Ejemplo de pedido',
        input: event,
      },
      null,
      2
    ),
  };
};

