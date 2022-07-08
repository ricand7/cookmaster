 
//  const chai = require('chai');
//  const sinon = require('sinon');
 
//  const chaiHttp = require('chai-http');
//  // tira 
//  chai.use(chaiHttp);
 
//  const { expect } = chai;
//  //tira
//  const server = require('../api/server');
 
//  // tira os dois 
//  const { getConnection } = require('./connectionMock');
//  const  { MongoClient }  = require('mongodb');

//  const jwt = require('jsonwebtoken');

//  let connectionMock


  
//  describe('Testa usuario criacao', () => {
//   let response;

// //equivalente ao beforeALL tambem tira 
//  before(async () => {
//   connectionMock = await getConnection();
//   sinon.stub(MongoClient, 'connect').resolves(connectionMock);
//  })

//  //equivalente ao afterALL
//  after(async () => {
//  MongoClient.connect.restore();
//  })

//  describe('Testa se endpoint cria usuario', () => {

//  before(async () => {
//    response = await chai.request(server)
//    .post('/users')
//    .send({  
//     "name": "string",
//     "email": "b@hotmai.com",
//     "password": "string"
//    })
//    console.log('teste', response);
//  })
 

//  it ('sadfsd', () => {
//    expect(response).to.have.status(401)
//    expect(response).to.be.an(object)
//  })

//  it ('sadfsd', () => {
//    expect(response).to.have.status(401)
//    expect(response).to.be.an(object)
//  })

//  it ('sadfsd', () => {
//    expect(response).to.have.status(401)
//    expect(response).to.be.an(object)
//  })
 
//    it ('sadfsd', () => {
//    expect(response).to.have.status(401)
//    expect(response).to.be.an(object)
//    expect(response.body.message).to.be.equals('message')
//    expect(response).to.have.property('message')
//  })
 
// })

// })
