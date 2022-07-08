const chai =  require('chai');
const chaihttp = require('chai-http')
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const getConnection = require('./connectionMock')
const server = require('../api/server')


chai.use(chaihttp);
const { expect } = chai;

describe('teste de criacao', () => {
  let connectionMock;

  before( async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock)
  })
  after(() => {
    MongoClient.connect.restore();
  }) 

  describe('teste', () => {
    let response = {};
    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({  
          "name": "string",
          "email": "b@hotmai.com",
          "password": "string"
         })
    })

    it('testando api', () => {
      expect(response).to.have.status(201)
    })
  })

})



