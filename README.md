[![Coverage Status](https://coveralls.io/repos/github/TheMottoRw/quickcredit/badge.svg?branch=develop)](https://coveralls.io/github/TheMottoRw/quickcredit?branch=develop)
[![Build Status](https://travis-ci.org/TheMottoRw/quickcredit.svg?branch=develop)](https://travis-ci.org/TheMottoRw/quickcredit) 
[![Maintainability](https://api.codeclimate.com/v1/badges/9f7c15bd517e7bb3089c/maintainability)](https://codeclimate.com/github/TheMottoRw/quickcredit/maintainability)

# Quickcredit

Quick Credit is an online lending platform that provides short term soft loans to individuals. This helps solve problems of financial inclusion as a way to alleviate poverty and empower low income earners

## Getting Started
Get Quickcredit project running on your PC you need to clone this repo, and make sure you have Latest Version of NodeJS Installed.

After you have to run the following npm commands to get the system up and running.

```
// installing required node modules
npm init

// running the server in development mode
npm run watch

// building the ploject for deployment
npm run build

// running the server in production mode
npm run start
```

## Testing the poject

```
// running test
npm run test
```

## API Documentation

all endpoint can be accessed from the following base url:
https://quickcredits.herokuapp.com/api/v1/

### POST /auth/signup
this endpoint is used to signup the user

example request body
```
{
	"email": "niyobenon@gmail.com",
	"firstName": "Benon",
	"lastName": "Niyo",
	"password": "123@bk",
	}
```


### POST /auth/signin
this endpoint is used to signin the user
example request body
```
{
	"email": "manziroger@quickcredit.com",
	"password": "abc@123"
}
```

### PATCH /user/:email/verify
this endpoint is used to verify new user,

example request 
```
/user/manziroger@quikcredit.com/verify
```
### GET /loans/:id
this enpoint is used to get specific loan with id 1

example request 
```
/loans/1
```

### GET /loans?status=:status&repaid=:repaid
this endpoint is used to get loans approved and not yet repaid 	

example request url, 
```
/loans?status=approved&repaid=false
```
### GET /loans?status=:status&repaid=:repaid
this endpoint is used to get loans approved and repaid 	

example request url, 
```
/loans?status=approved&repaid=false
```

### GET /loans
this endpoint is used to get all pending and approved loans

example request url, 
```
/loans
```

### GET /loans/:loanid/repayments
this endpoint is used to get all loan repayment transactions

example request url, 
```
/loans/1/repayments
```

### POST /loans
this endpoint is used to create a loan application

example request url, 
```
### /loans

request body example
{
	token:'sdh34j43h3439dss2df',
	amount:1200,
	tenor:6
}
```


### PATCH /loans/:loanid
this endpoint is used to approve or reject a loan application

example request url, 
```
### /loans/1

request body example
{
	loanId:'sdh34j43h3439dss2df',
	status:'approved'
}
```
### POST /loans/:loanid/repayment
this endpoint is used to repay loan

example request url, 
```
### /loans/1/repayment

request body example
{
	loanId: 1,
	amount: 210
}
```
