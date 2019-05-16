import jwt from 'jsonwebtoken';
import { APP_KEY } from '../helpers/config';

export const isAuthenticated = (req, res, next) => {
    if( req.headers['authorization'] !== undefined ){
    let token = req.headers['authorization']; 
    if (token.substring(0,5) === 'Quick') {
      // Remove Bearer from string
       token = token.slice(5, token.length);
    }
      jwt.verify(token, APP_KEY, (err, decoded) => {
        if (err) {
          return res.json({
            status: 403,
            data: {
              message: `Token is not valid, please sign in to get a token`
            }
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        status: 401,
        data: {
            message: 'Authorization token is not supplied,signin if you do not have token'
        },
      });
    }
  };
