"use strict";

var _chai = require("chai");

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable object-curly-newline */
(0, _chai.use)(_chaiHttp["default"]);
var version = 'v1';
var baseUrl = "/api/".concat(version); // index request page

describe("GET ".concat(baseUrl, "/"), function () {
  it('should be able to return welcome message', function (done) {
    (0, _chai.request)(_app["default"]).get("".concat(baseUrl, "/")).send().end(function (err, res) {
      // Expect status to Ok!
      (0, _chai.expect)(res.status).to.eql(200);
      done(err);
    });
  });
}); // successfull test register new user

describe("POST ".concat(baseUrl, "/auth/signup"), function () {
  it('should be able to create a new user', function (done) {
    (0, _chai.request)(_app["default"]).post("".concat(baseUrl, "/auth/signup")).send({
      firstName: 'Benon',
      lastName: 'Niyo',
      email: 'niyobenon@quickcredit.com',
      password: 'niyo$123'
    }).end(function (err, res) {
      // Expect status to Ok!
      (0, _chai.expect)(res.status).to.eql(200);
      done(err);
    });
  });
}); // test with already existing user email

describe("POST ".concat(baseUrl, "/auth/signup"), function () {
  it('should return email already exist to other account', function (done) {
    (0, _chai.request)(_app["default"]).post("".concat(baseUrl, "/auth/signup")).send({
      firstName: 'Roger',
      lastName: 'Manzi',
      email: 'manziroger@quickcredit.com',
      password: 'abc@123'
    }).end(function (err, res) {
      // Expect status to Ok!
      (0, _chai.expect)(res.status).to.eql(200);
      done(err);
    });
  });
}); // test with undefined parameters

describe("POST ".concat(baseUrl, "/auth/signup"), function () {
  it('should return status of 400 due to undefined parameters', function (done) {
    (0, _chai.request)(_app["default"]).post("".concat(baseUrl, "/auth/signup")).send().end(function (err, res) {
      // Expect status to Ok!
      (0, _chai.expect)(res.status).to.eql(400);
      done(err);
    });
  });
}); // test with some missing parameters

describe("POST ".concat(baseUrl, "/auth/signin"), function () {
  it('should return 400 error bad request some missing parameters', function (done) {
    (0, _chai.request)(_app["default"]).post("".concat(baseUrl, "/auth/signin")).send().end(function (err, res) {
      // Expect status to Ok!
      (0, _chai.expect)(res.status).to.eql(400);
      done(err);
    });
  });
}); // test invalid user login credential

describe("POST ".concat(baseUrl, "/auth/signin"), function () {
  it('should return no data found wrong username or password', function (done) {
    (0, _chai.request)(_app["default"]).post("".concat(baseUrl, "/auth/signin")).send({
      email: 'manziroger@gmail.com',
      password: 'xyz@123'
    }).end(function (err, res) {
      // Expect status to Ok!
      (0, _chai.expect)(res.status).to.eql(200);
      done(err);
    });
  });
}); // test with unverfiied user login credential

describe("POST ".concat(baseUrl, "/auth/signin"), function () {
  it('should return account not yet verified', function (done) {
    (0, _chai.request)(_app["default"]).post("".concat(baseUrl, "/auth/signin")).send({
      email: 'manziroger@quickcredit.com',
      password: 'abc@123'
    }).end(function (err, res) {
      // Expect status to Ok!
      (0, _chai.expect)(res.status).to.eql(200);
      done(err);
    });
  });
}); // test with noo-exist email user

describe("PATCH ".concat(baseUrl, "/users/<email>/verify"), function () {
  it('should return no data related to email', function (done) {
    (0, _chai.request)(_app["default"]).patch("".concat(baseUrl, "/users/manziroger@gmail.com/verify")).send().end(function (err, res) {
      // Expect status to Ok!
      (0, _chai.expect)(res.status).to.eql(200);
      done(err);
    });
  });
}); // test reset before user verified

describe("PATCH ".concat(baseUrl, "/users/<token>/reset"), function () {
  it('should  return account not yet verified', function (done) {
    (0, _chai.request)(_app["default"]).patch("".concat(baseUrl, "/users/aXRl6xJRf/reset")).send({
      oldpassword: 'abc@123',
      newpassword: '123@abc'
    }).end(function (err, res) {
      // Expect status to Ok!
      (0, _chai.expect)(res.status).to.eql(200);
      done(err);
    });
  });
}); // test with valid token it will verify user

describe("PATCH ".concat(baseUrl, "/users/<token>/verify"), function () {
  it('should verify user', function (done) {
    (0, _chai.request)(_app["default"]).patch("".concat(baseUrl, "/users/aXRl6xJRf/verify")).send().end(function (err, res) {
      // Expect status to Ok!
      (0, _chai.expect)(res.status).to.eql(200);
      done(err);
    });
  });
}); // test with verified user login credential

describe("POST ".concat(baseUrl, "/auth/signin"), function () {
  it('should return logged user information', function (done) {
    (0, _chai.request)(_app["default"]).post("".concat(baseUrl, "/auth/signin")).send({
      email: 'manziroger@quickcredit.com',
      password: 'abc@123'
    }).end(function (err, res) {
      // Expect status to Ok!
      (0, _chai.expect)(res.status).to.eql(200);
      done(err);
    });
  });
}); // test reset password with invalid token fail

describe("PATCH ".concat(baseUrl, "/users/<token>/reset"), function () {
  it('should  reset user password', function (done) {
    (0, _chai.request)(_app["default"]).patch("".concat(baseUrl, "/users/aXRl6xJRfs/reset")).send({
      oldpassword: 'abc@123',
      newpassword: '123@abc'
    }).end(function (err, res) {
      // Expect status to Ok!
      (0, _chai.expect)(res.status).to.eql(200);
      done(err);
    });
  });
}); // test with missing parameters

describe("PATCH ".concat(baseUrl, "/users/<token>/reset"), function () {
  it('should  return 400 error code', function (done) {
    (0, _chai.request)(_app["default"]).patch("".concat(baseUrl, "/users/aXRl6xJRf/reset")).send({
      newpassword: '123@abc'
    }).end(function (err, res) {
      // Expect status to Ok!
      (0, _chai.expect)(res.status).to.eql(400);
      done(err);
    });
  });
}); // test reset password successful pass

describe("PATCH ".concat(baseUrl, "/users/<token>/reset"), function () {
  it('should  reset user password', function (done) {
    (0, _chai.request)(_app["default"]).patch("".concat(baseUrl, "/users/aXRl6xJRf/reset")).send({
      oldpassword: 'abc@123',
      newpassword: '123@abc'
    }).end(function (err, res) {
      // Expect status to Ok!
      (0, _chai.expect)(res.status).to.eql(200);
      done(err);
    });
  });
}); // End users account tests

describe("GET ".concat(baseUrl, "/loans"), function () {
  it('should of loan by status and repayment application', function (done) {
    (0, _chai.request)(_app["default"]).get("".concat(baseUrl, "/loans")).send({
      status: 'pending',
      repaid: true
    }).end(function (err, res) {
      // Expect status to Ok!
      (0, _chai.expect)(res.status).to.eql(200);
      done(err);
    });
  });
});
describe("GET ".concat(baseUrl, "/loans"), function () {
  it('should no data ', function (done) {
    (0, _chai.request)(_app["default"]).get("".concat(baseUrl, "/loans")).send({
      status: 'rejected',
      repaid: true
    }).end(function (err, res) {
      // Expect status to Ok!
      (0, _chai.expect)(res.status).to.eql(200);
      done(err);
    });
  });
});
describe("GET ".concat(baseUrl, "/loans/<id>"), function () {
  it('should return loan by with id specified', function (done) {
    (0, _chai.request)(_app["default"]).get("".concat(baseUrl, "/loans/1")).send().end(function (err, res) {
      // Expect status to Ok!
      (0, _chai.expect)(res.status).to.eql(200);
      done(err);
    });
  });
});
describe("GET ".concat(baseUrl, "/loans"), function () {
  it('should list all pending loan application', function (done) {
    (0, _chai.request)(_app["default"]).get("".concat(baseUrl, "/loans")).send().end(function (err, res) {
      // Expect status to Ok!
      (0, _chai.expect)(res.status).to.eql(200);
      done(err);
    });
  });
});
describe("GET ".concat(baseUrl, "/loans/<id>/repayments"), function () {
  it('should return repayment history', function (done) {
    (0, _chai.request)(_app["default"]).get("".concat(baseUrl, "/loans/1/repayments")).send().end(function (err, res) {
      // Expect status to Ok!
      (0, _chai.expect)(res.status).to.eql(200);
      done(err);
    });
  });
}); // test loan applications

describe("POST ".concat(baseUrl, "/loans"), function () {
  it('should create loan application', function (done) {
    (0, _chai.request)(_app["default"]).post("".concat(baseUrl, "/loans")).send({
      user: 'aXRl6xJRf',
      amount: '1200.0',
      tenor: '8'
    }).end(function (err, res) {
      // Expect status to Ok!
      (0, _chai.expect)(res.status).to.eql(200);
      done(err);
    });
  });
});
describe("POST ".concat(baseUrl, "/loans"), function () {
  it('should create loan application', function (done) {
    (0, _chai.request)(_app["default"]).post("".concat(baseUrl, "/loans")).send({
      user: 'aXRl6xJRf',
      amount: '1200.0',
      tenor: '8'
    }).end(function (err, res) {
      // Expect status to Ok!
      (0, _chai.expect)(res.status).to.eql(200);
      done(err);
    });
  });
});
describe("PATCH ".concat(baseUrl, "/loans/<id>"), function () {
  it('should approve or reject loan application', function (done) {
    (0, _chai.request)(_app["default"]).patch("".concat(baseUrl, "/loans/1")).send({
      status: 'approved'
    }).end(function (err, res) {
      // Expect status to Ok!
      (0, _chai.expect)(res.status).to.eql(200);
      done(err);
    });
  });
});
describe("POST ".concat(baseUrl, "/loans/<id>/repayment"), function () {
  it('should repay loan', function (done) {
    (0, _chai.request)(_app["default"]).post("".concat(baseUrl, "/loans/1/repayment")).send({
      id: 1,
      amount: '210'
    }).end(function (err, res) {
      // Expect status to Ok!
      (0, _chai.expect)(res.status).to.eql(200);
      done(err);
    });
  });
});
//# sourceMappingURL=test.js.map