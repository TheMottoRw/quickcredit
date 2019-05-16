/* eslint-disable object-curly-newline */
import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
use(chaiHttp);

const version = 'v1';
const baseUrl = `/api/${version}`;
var adminToken = '', userToken = '';

// index request page
describe(`GET ${baseUrl}/`, () => {
  it('Should be able to return welcome message', (done) => {
    request(app)
      .get(`${baseUrl}/`)
      .send()
      .end((err, res) => {
      
        expect(res.status).to.eql(200);
        done(err);
      });
  });
});

// successfull test register new standard user
describe(`POST ${baseUrl}/auth/signup`, () => {
  it('Should be able to create a new user', (done) => {
    request(app)
      .post(`${baseUrl}/auth/signup`)
      .send({ firstName: 'Benon', lastName: 'Niyo', email: 'niyobenon@quickcredit.com', password: 'niyo$123' })
      .end((err, res) => {
        userToken = res.body.data.token;
        expect(res.status).to.eql(201);
        done(err);
      });
  });
});

// test with already existing user email
describe(`POST ${baseUrl}/auth/signup`, () => {
  it('Should return email already exist to other account', (done) => {
    request(app)
      .post(`${baseUrl}/auth/signup`)
      .send({ firstName: 'Roger', lastName: 'Manzi', email: 'manziroger@quickcredit.com', password: 'abc@123' })
      .end((err, res) => {
      
        expect(res.status).to.eql(409);
        done(err);
      });
  });
});

// register admin user 
describe(`POST ${baseUrl}/auth/signup`, () => {
  it('Should return create admin user', (done) => {
    request(app)
      .post(`${baseUrl}/auth/signup`)
      .send({ firstName: 'Aimable', lastName: 'Cyemezo', email: 'admin@quickcredit.com', password: 'abc@123' })
      .end((err, res) => {
        adminToken = res.body.data.token;
        expect(res.status).to.eql(201);
        done(err);
      });
  });
});

// test with undefined parameters
describe(`POST ${baseUrl}/auth/signup`, () => {
  it('Should return status of 400 due to undefined parameters', (done) => {
    request(app)
      .post(`${baseUrl}/auth/signup`)
      .send()
      .end((err, res) => {
      
        expect(res.status).to.eql(400);
        done(err);
      });
  });
});

// test with some missing parameters
describe(`POST ${baseUrl}/auth/signin`, () => {
  it('Should return 400 error bad request some missing parameters', (done) => {
    request(app)
      .post(`${baseUrl}/auth/signin`)
      .send()
      .end((err, res) => {
      
        expect(res.status).to.eql(400);
        done(err);
      });
  });
});

// test invalid user login credential
describe(`POST ${baseUrl}/auth/signin`, () => {
  it('Should return wrong username or password', (done) => {
    request(app)
      .post(`${baseUrl}/auth/signin`)
      .send({ email: 'manziroger@gmail.com', password: 'abc@123' })
      .end((err, res) => {
      
        expect(res.status).to.eql(401);
        done(err);
      });
  });
});

// test with unverfiied user login credential
describe(`POST ${baseUrl}/auth/signin`, () => {
  it('Should return account not yet verified', (done) => {
    request(app)
      .post(`${baseUrl}/auth/signin`)
      .send({ email: 'manziroger@quickcredit.com', password: 'abc@123' })
      .end((err, res) => {
      
        expect(res.status).to.eql(403);
        done(err);
      });
  });
});

// test with noo-exist email user
describe(`PATCH ${baseUrl}/users/<email>/verify`, () => {
  it('Should return no data related to email', (done) => {
    request(app)
      .patch(`${baseUrl}/users/manziroger@gmail.com/verify`)
      .set('authorization', adminToken)
      .send()
      .end((err, res) => {
      
        expect(res.status).to.eql(404);
        done(err);
      });
  });
});

// test reset before user verified
describe(`PATCH ${baseUrl}/users/<email>/reset`, () => {
  it('Should  return account not yet verified', (done) => {
    request(app)
      .patch(`${baseUrl}/users/manziroger@quickcredit.com/reset`)
      .send({ newpassword: '123@abc' })
      .end((err, res) => {
      
        expect(res.status).to.eql(403);
        done(err);
      });
  });
});

// test with valid email it will verify user
describe(`PATCH ${baseUrl}/users/<email>/verify`, () => {
  it('Should verify user', (done) => {
    request(app)
      .patch(`${baseUrl}/users/manziroger@quickcredit.com/verify`)
      .set('authorization', adminToken)
      .send()
      .end((err, res) => {
      
        expect(res.status).to.eql(200);
        done(err);
      });
  });
});

// test with missing email parameter
describe(`PATCH ${baseUrl}/users/<email>/verify`, () => {
  it('Should verify user', (done) => {
    request(app)
      .patch(`${baseUrl}/users/manziroger@quickcredit.com/verify`)
      .set('authorization', adminToken)
      .send()
      .end((err, res) => {
      
        expect(res.status).to.eql(200);
        done(err);
      });
  });
});

// test with missing parameters
describe(`PATCH ${baseUrl}/users/<email>/reset`, () => {
  it('Should  return 400 error code', (done) => {
    request(app)
      .patch(`${baseUrl}/users/manziroger@quickcredit.com/reset`)
      .send()
      .end((err, res) => {
      
        expect(res.status).to.eql(400);
        done(err);
      });
  });
});

// test reset password successful pass
describe(`PATCH ${baseUrl}/users/<email>/reset`, () => {
  it('Should  reset user password', (done) => {
    request(app)
      .patch(`${baseUrl}/users/manziroger@quickcredit.com/reset`)
      .send({ newpassword: '123@abc' })
      .end((err, res) => {
      
        expect(res.status).to.eql(200);
        done(err);
      });
  });
});

describe(`GET ${baseUrl}/loans`, () => {
  it('Should return loan by status', (done) => {
    request(app)
      .get(`${baseUrl}/loans`)
      .set('authorization', adminToken)
      .send({ status: 'pending' })
      .end((err, res) => {
      
        expect(res.status).to.eql(200);
        done(err);
      });
  });
});

describe(`GET ${baseUrl}/loans`, () => {
  it('Should load loan information by status and repaid', (done) => {
    request(app)
      .get(`${baseUrl}/loans`)
      .send({ status: 'approved', repaid: true })
      .set('authorization', adminToken)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        done(err);
      });
  });
});

describe(`GET ${baseUrl}/loans/<id>`, () => {
  it('Should return loan by with id specified', (done) => {
    request(app)
      .get(`${baseUrl}/loans/1`)
      .send()
      .end((err, res) => {
        expect(res.status).to.eql(200);
        done(err);
      });
  });
});

describe(`GET ${baseUrl}/loans`, () => {
  it('Should list all pending loan application', (done) => {
    request(app)
      .get(`${baseUrl}/loans`)
      .set('authorization', adminToken)
      .send()
      .end((err, res) => {
      
        expect(res.status).to.eql(200);
        done(err);
      });
  });
});

describe(`GET ${baseUrl}/loans/<id>/repayments`, () => {
  it('Should return repayment history', (done) => {
    request(app)
      .get(`${baseUrl}/loans/1/repayments`)
      .set('authorization', adminToken)
      .send()
      .end((err, res) => {
      
        expect(res.status).to.eql(200);
        done(err);
      });
  });
});

// test loan applications while he has another
describe(`POST ${baseUrl}/loans`, () => {
  it('Should return forbidden', (done) => {
    request(app)
      .post(`${baseUrl}/loans`)
      .send({ amount: '1200.0', tenor: '8' })
      .set('authorization', userToken)
      .end((err, res) => {
      
        expect(res.status).to.eql(403);
        done(err);
      });
  });
});

describe(`PATCH ${baseUrl}/loans/<id>`, () => {
  it('Should return no record found', (done) => {
    request(app)
      .patch(`${baseUrl}/loans/10`)
      .send({ status: 'approved'})
      .set('authorization', adminToken)
      .end((err, res) => {
      
        expect(res.status).to.eql(404);
        done(err);
      });
  });
});

describe(`PATCH ${baseUrl}/loans/<id>`, () => {
  it('Should return status must be provided', (done) => {
    request(app)
      .patch(`${baseUrl}/loans/1`)
      .set('authorization', adminToken)
      .send()
      .end((err, res) => {
      
        expect(res.status).to.eql(400);
        done(err);
      });
  });
});

describe(`PATCH ${baseUrl}/loans/<id>`, () => {
  it('Should approve or reject loan application', (done) => {
    request(app)
      .patch(`${baseUrl}/loans/1`)
      .send({ status: 'approved' })
      .set('authorization', adminToken)
      .end((err, res) => {
      
        expect(res.status).to.eql(200);
        done(err);
      });
  });
});

describe(`POST ${baseUrl}/loans/<id>/repayment`, () => {
  it('Should repay loan', (done) => {
    request(app)
      .post(`${baseUrl}/loans/1/repayment`)
      .set('authorization', adminToken)
      .send({ amount: 210.0 })
      .end((err, res) => {
      
        expect(res.status).to.eql(200);
        done(err);
      });
  });
});
