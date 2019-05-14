/* eslint-disable object-curly-newline */
import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
use(chaiHttp);

const version = 'v1';
const baseUrl = `/api/${version}`;
// index request page
describe(`GET ${baseUrl}/`, () => {
  it('should be able to return welcome message', (done) => {
    request(app)
      .get(`${baseUrl}/`)
      .send()
      .end((err, res) => {
      // Expect status to Ok!
        expect(res.status).to.eql(200);
        done(err);
      });
  });
});
// successfull test register new user
describe(`POST ${baseUrl}/auth/signup`, () => {
  it('should be able to create a new user', (done) => {
    request(app)
      .post(`${baseUrl}/auth/signup`)
      .send({ firstName: 'Benon', lastName: 'Niyo', email: 'niyobenon@quickcredit.com', password: 'niyo$123' })
      .end((err, res) => {
      // Expect status to Ok!
        expect(res.status).to.eql(201);
        done(err);
      });
  });
});
// test with already existing user email
describe(`POST ${baseUrl}/auth/signup`, () => {
  it('should return email already exist to other account', (done) => {
    request(app)
      .post(`${baseUrl}/auth/signup`)
      .send({ firstName: 'Roger', lastName: 'Manzi', email: 'manziroger@quickcredit.com', password: 'abc@123' })
      .end((err, res) => {
      // Expect status to Ok!
        expect(res.status).to.eql(409);
        done(err);
      });
  });
});
// test with undefined parameters
describe(`POST ${baseUrl}/auth/signup`, () => {
  it('should return status of 400 due to undefined parameters', (done) => {
    request(app)
      .post(`${baseUrl}/auth/signup`)
      .send()
      .end((err, res) => {
      // Expect status to Ok!
        expect(res.status).to.eql(400);
        done(err);
      });
  });
});
// test with some missing parameters
describe(`POST ${baseUrl}/auth/signin`, () => {
  it('should return 400 error bad request some missing parameters', (done) => {
    request(app)
      .post(`${baseUrl}/auth/signin`)
      .send()
      .end((err, res) => {
      // Expect status to Ok!
        expect(res.status).to.eql(400);
        done(err);
      });
  });
});
// test invalid user login credential
describe(`POST ${baseUrl}/auth/signin`, () => {
  it('should return no data found wrong username or password', (done) => {
    request(app)
      .post(`${baseUrl}/auth/signin`)
      .send({ email: 'manziroger@gmail.com', password: 'abc@123' })
      .end((err, res) => {
      // Expect status to Ok!
        expect(res.status).to.eql(404);
        done(err);
      });
  });
});
// test with unverfiied user login credential
describe(`POST ${baseUrl}/auth/signin`, () => {
  it('should return account not yet verified', (done) => {
    request(app)
      .post(`${baseUrl}/auth/signin`)
      .send({ email: 'manziroger@quickcredit.com', password: 'abc@123' })
      .end((err, res) => {
      // Expect status to Ok!
        expect(res.status).to.eql(403);
        done(err);
      });
  });
});
// test with noo-exist email user
describe(`PATCH ${baseUrl}/users/<email>/verify`, () => {
  it('should return no data related to email', (done) => {
    request(app)
      .patch(`${baseUrl}/users/manziroger@gmail.com/verify`)
      .send()
      .end((err, res) => {
      // Expect status to Ok!
        expect(res.status).to.eql(404);
        done(err);
      });
  });
});
// test reset before user verified
describe(`PATCH ${baseUrl}/users/<token>/reset`, () => {
  it('should  return account not yet verified', (done) => {
    request(app)
      .patch(`${baseUrl}/users/aXRl6xJRf/reset`)
      .send({ oldpassword: 'abc@123', newpassword: '123@abc' })
      .end((err, res) => {
      // Expect status to Ok!
        expect(res.status).to.eql(403);
        done(err);
      });
  });
});

// test with valid email it will verify user
describe(`PATCH ${baseUrl}/users/<email>/verify`, () => {
  it('should verify user', (done) => {
    request(app)
      .patch(`${baseUrl}/users/manziroger@quickcredit.com/verify`)
      .send()
      .end((err, res) => {
      // Expect status to Ok!
        expect(res.status).to.eql(200);
        done(err);
      });
  });
});
// test with verified user login credential
describe(`POST ${baseUrl}/auth/signin`, () => {
  it('should return logged user information', (done) => {
    request(app)
      .post(`${baseUrl}/auth/signin`)
      .send({ email: 'manziroger@quickcredit.com', password: 'abc@123' })
      .end((err, res) => {
      // Expect status to Ok!
        expect(res.status).to.eql(200);
        done(err);
      });
  });
});
// test reset password with invalid token fail
describe(`PATCH ${baseUrl}/users/<token>/reset`, () => {
  it('should  reset user password', (done) => {
    request(app)
      .patch(`${baseUrl}/users/aXRl6xJRfs/reset`)
      .send({ oldpassword: 'abc@123', newpassword: '123@abc' })
      .end((err, res) => {
      // Expect status to Ok!
        expect(res.status).to.eql(404);
        done(err);
      });
  });
});
// test with missing parameters
describe(`PATCH ${baseUrl}/users/<token>/reset`, () => {
  it('should  return 400 error code', (done) => {
    request(app)
      .patch(`${baseUrl}/users/aXRl6xJRf/reset`)
      .send({ newpassword: '123@abc' })
      .end((err, res) => {
      // Expect status to Ok!
        expect(res.status).to.eql(400);
        done(err);
      });
  });
});
// test reset password successful pass
describe(`PATCH ${baseUrl}/users/<token>/reset`, () => {
  it('should  reset user password', (done) => {
    request(app)
      .patch(`${baseUrl}/users/aXRl6xJRf/reset`)
      .send({ oldpassword: 'abc@123', newpassword: '123@abc' })
      .end((err, res) => {
      // Expect status to Ok!
        expect(res.status).to.eql(200);
        done(err);
      });
  });
});
// End users account tests
describe(`GET ${baseUrl}/loans`, () => {
  it('should return loan by status and repayment application', (done) => {
    request(app)
      .get(`${baseUrl}/loans`)
      .send({ status: 'pending', repaid: false })
      .end((err, res) => {
      // Expect status to Ok!
        expect(res.status).to.eql(200);
        done(err);
      });
  });
});
describe(`GET ${baseUrl}/loans`, () => {
  it('should loan information data ', (done) => {
    request(app)
      .get(`${baseUrl}/loans`)
      .send({ status: 'rejected', repaid: true })
      .end((err, res) => {
      // Expect status to Ok!
        expect(res.status).to.eql(200);
        done(err);
      });
  });
});
describe(`GET ${baseUrl}/loans/<id>`, () => {
  it('should return loan by with id specified', (done) => {
    request(app)
      .get(`${baseUrl}/loans/1`)
      .send()
      .end((err, res) => {
      // Expect status to Ok!
        expect(res.status).to.eql(200);
        done(err);
      });
  });
});
describe(`GET ${baseUrl}/loans`, () => {
  it('should list all pending loan application', (done) => {
    request(app)
      .get(`${baseUrl}/loans`)
      .send()
      .end((err, res) => {
      // Expect status to Ok!
        expect(res.status).to.eql(200);
        done(err);
      });
  });
});
describe(`GET ${baseUrl}/loans/<id>/repayments`, () => {
  it('should return repayment history', (done) => {
    request(app)
      .get(`${baseUrl}/loans/1/repayments`)
      .send()
      .end((err, res) => {
      // Expect status to Ok!
        expect(res.status).to.eql(200);
        done(err);
      });
  });
});
// test loan applications
describe(`POST ${baseUrl}/loans`, () => {
  it('should create loan application', (done) => {
    request(app)
      .post(`${baseUrl}/loans`)
      .send({ user: 'aXRl6xJRf', amount: '1200.0', tenor: '8' })
      .end((err, res) => {
      // Expect status to Ok!
        expect(res.status).to.eql(409);
        done(err);
      });
  });
});
describe(`PATCH ${baseUrl}/loans/<id>`, () => {
  it('should approve or reject loan application', (done) => {
    request(app)
      .patch(`${baseUrl}/loans/1`)
      .send({ status: 'approved' })
      .end((err, res) => {
      // Expect status to Ok!
        expect(res.status).to.eql(200);
        done(err);
      });
  });
});
describe(`POST ${baseUrl}/loans/<id>/repayment`, () => {
  it('should repay loan', (done) => {
    request(app)
      .post(`${baseUrl}/loans/1/repayment`)
      .send({ amount: 210.0 })
      .end((err, res) => {
      // Expect status to Ok!
        expect(res.status).to.eql(200);
        done(err);
      });
  });
});
