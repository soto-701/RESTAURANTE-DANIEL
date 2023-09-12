'use strict';
const querystring = require('aws-sdk');
const querystring = require("querystring")
const mysql=require('mysql');
const connection=mysql.createConnection({
  host:'proyectofinal-daniel.cywrvdmfoq84.us-east-2.rds.amazonaws.com',
  user:'admin',
  port:'3306',
  password:'12345678',
  database:'Restaurante',
});

module.exports.hacerPedido = async (event) => {
  const pedidos = querystring.parse(event["body"])
  await new Promise((resolve, reject) => {
  const queryclient = "CALL insert_Pedidos(?,?,?,?,?);";
  connection.query(queryclient,[pedidos.producto_id,pedidos.cantidad_und,pedidos.valorUnidad,pedidos.valorTotal,pedidos.cliente_id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
  const messageBody = {
    Cliente: pedido.cliente_id,
    Producto: pedido.producto_id,
    Cantidad: pedido.cantidad,
    "Valor Total": pedido.valor_total,
  };
     // Parámetros del mensaje
     const params = {
      MessageBody: JSON.stringify(messageBody),
      QueueUrl: 'https://sqs.us-east-2.amazonaws.com/667168568942/order-queue',
    };
  
  await sqs.sendMessage(params).promise();
  const paramsEmail = {
    Source: "daniel.salazar27769@ucaldas.edu.co",
    Destination: {
      ToAddresses: [clienteEmail],
    },
    Message: {
      Subject: {
        Data: "Descripcion del pedido",
      },
      Body: {
        Text: {
          Data: `Descripcion del pedido:\n\nCliente: ${clienteNombre}\nProducto: ${producto_nombre}\nValor unitario: ${producto_valor}\nCantidad: ${pedido.cantidad}\nValor Total: ${pedido.valor_total}`,
        },
      },
    },
  };
  await ses.sendEmail(paramsEmail).promise();
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "exitoso",
        cliente_id: pedidos.cliente_id,
        producto_id: pedidos.producto_id,
        cantidad_und: pedidos.cantidad_und,
        valorUnidad: pedidos.valorUnidad,
        valorTotal: pedidos.valorTotal,  
      },
      null,
      2
    ),
  };
  connection.end();

};

module.exports.obtenerPedido = async (event) => {
  const pedido = querystring.parse(event["body"])
  const queryclient = "SELECT * FROM Pedidosrestaurante.pedidos where id=?;";
  const consulta = await new Promise((resolve, reject) => {
     connection.query(queryclient,[pedido.id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
  connection.end();
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "exitoso",
        pedido: consulta,
      },
      null,
      2
    ),
  };
};

