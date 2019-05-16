// import nodemailer from 'nodemailer';
import quickcredit from '../models/database';
import { isEmailExist, generateToken, generateJwtToken, missingParameter, encryptPassword, isEncryptedEqualPlainPassword } from '../helpers/userAccount';
import { validateSignup, validateSignin, validateResetPassword, validateVerifyUser } from '../middlewares/validator';
import { isNull } from 'util';

export const loadUser = (req, res) => {
  res.json({status: 200, data: quickcredit.users });
};

export const createUser = (req, res) => {
  const { body: { firstName, lastName, email, password } } = req;
  let response = {};
  const result = validateSignup({ firstName: firstName, lastName: lastName,  email: email, password: password});
  if (!firstName || !lastName || !email || !password) {
    response = {
      status: 400,
      data: {
        error: ` ${missingParameter(['firstName','lastName','email','password'],req.body)} must be provided`,
      },
    };
  } else if (!isNull(result.error)) {
    response = {
        status: 200,
        message:result.error.details[0].message, 
    };
} else if (isEmailExist(email)) {
    response = {
      status: 409,
      data: {
        message: 'Email already exist to other account',
      },
    };
  } else {
    const id = quickcredit.users.length + 1;
    const token = generateJwtToken(email);
    const status = 'unverified';
    const pwd = encryptPassword(password);
    const createdOn = new Date();
    const isAdmin = email.split('@')[0] === 'admin';
    
    quickcredit.users.push({
      'id': id,
      'token': token,
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'password': pwd,
      'status': status,
      'createdOn': createdOn,
      'isAdmin': isAdmin
    });
    
    response = {
      status: 201,
      data: {
        id: id,
        token: token,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: pwd,
        status: status,
        createdOn: createdOn,
        isAdmin: isAdmin,
      },
    };
  res.setHeader('Authorization',token);
  }
  
  res.status(response.status).json(response);
};

export const login = (req, res) => {
  let response = {};
  const result = validateSignin(req.body);
  const { email, password }  = req.body;
  if (email === undefined || password === undefined) {
    response = {
      status: 400,
      data: {
        error: `${missingParameter(['email', 'password'], req.body )} must be provided`,
      },
    };
  } else if (!isNull(result.error)) {
    response = {
        status: 200,
        message:result.error.details[0].message, 
    };
} else {
    const userInfo = quickcredit.users.find(user => user.email === email && isEncryptedEqualPlainPassword(password, user.password));
    const userIndex = quickcredit.users.findIndex(user => user.email === email && isEncryptedEqualPlainPassword(password, user.password));
    if (userInfo === undefined) {
      response = {
        status: 401,
        data: {
          message: 'Wrong username or password',
        },
      };
    } else if (userInfo.status === 'unverified') {
      response = {
        status: 403,
        data: {
          message: 'Sorry your account not yet verified,contact admin...!',
        },
      };
    } else {
      const newtoken = generateJwtToken(email);
      res.json(userIndex);
      quickcredit.users[userIndex].token = newtoken;
      response = {
        status: 200,
        data: {
          id: userInfo.id,
          token: newtoken,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          address: userInfo.address,
          status: userInfo.status,
          isAdmin: userInfo.isAdmin,
          createdOn: userInfo.createdOn,
        },
      };
    }
  }
   res.status(response.status).json(response);
};

export const toggleVerification = (req, res) => {
  let response = {};
  const { email } = req.params;
  const result = validateVerifyUser({ email: email });
  const userInfo = quickcredit.users;
  const isAdmin = (quickcredit.users.find(user => user.token === req.headers['authorization']).isAdmin);
  if (!isAdmin) {
    response = {
      status: 403,
      data: {
        message: 'You must be an admin to verify user',
      },
    };
  } else if (email === undefined) {
    response = {
      status: 400,
      data: {
        message: 'Email must be provided',
      },
    };
  } else if (!isNull(result.error)) {
    response = {
        status: 200,
        message:result.error.details[0].message, 
    };
} else {
    const userIndex = userInfo.findIndex(user => user.email === email);
    if (userIndex === -1) {
      response = {
        status: 404,
        data: {
          message: `No record found for this email ${email}`,
        },
      };
    } else {
      quickcredit.users[userIndex].status = 'verified';
      response = {
        status: 200,
        data: {
          id: userInfo.id,
          token: userInfo.token,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          status: quickcredit.users[userIndex].status,
        },
      };
    }
  }
  res.status(response.status).json(response);
};

export const resetPassword = (req, res) => {
  let response = {};
  const { body: { newpassword }, params: { email } } = req;
  const result = validateResetPassword({ email: email, newpassword: newpassword});
  const userInfo = quickcredit.users;
  if (!newpassword || !email) {
    response = {
      status: 400,
      data: {
        message: `${missingParameter(['email'],req.params)} ${missingParameter(['newpassword'], req.body)} must be provided`,
      },
    };
  } else if (!isNull(result.error)) {
    response = {
        status: 200,
        message:result.error.details[0].message, 
    };
} else {
    const userIndex = userInfo.findIndex(user => (user.email === email));
    if (userIndex === -1) {
      response = {
        status: 404,
        data: {
          message: `No user record found for email ${email}`,
        },
      };
    } else if (userInfo[userIndex].status === 'unverified') {
      response = {
        status: 403,
        data: {
          message: 'Sorry your account not yet verified,contact admin',
        },
      };
    } else {
      userInfo[userIndex].password = encryptPassword(newpassword);
      response = {
        status: 200,
        data: userInfo[userIndex],
      };
    }
  }
  res.status(response.status).json(response);
};
