var quickcredit=require( '../models/database'),
shortid=require('shortid');

class Users {

    load(req, res) {
        res.send(quickcredit.users);
    }

    create(req, res) {
       
        var user = req.body;

        // increment user id for the next user        
        user.id=quickcredit.users.length + 1;
        user.token=shortid.generate();

        // push or add user to an array of users
        quickcredit.users.push(user);
        
        // response generate
        var response = {
            status: 200,
            data: {
                id: user.id,
                token: user.token,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        }

        res.json(response);
    }

    login(req, res) {
        var credentials = req.query;
        // find user with provided credentials 
        var userInfo = quickcredit.users.find((user) => user.email == credentials.email && user.password==credentials.password);

        // login response specifications
        var response = {
            status : 200,
            data : {
                token : userInfo.token,
                id : userInfo.id,
                firstName : userInfo.firstName,
                lastName : userInfo.lastName,
                email : userInfo.email
            }
        };

        res.json(response);
    }
    toggleVerification(req, res) {
        
        // getting user information from email
        let userEmail = req.params.email;
        let userInfo = quickcredit.users;

        // load userId using account number
        const userIndex = userInfo.findIndex((user) => user.email === userEmail);
        // updating account based on account index
        userInfo[userIndex].status = 'verified';
      

        // response object
        let response = {
            status: 200,
            data: {
                id: userInfo[userIndex].id,
                token: userInfo[userIndex].token,
                firstName: userInfo.firstName,
                lastName: userInfo[userIndex].lastName,
                email: userInfo[userIndex].email,
                status: userInfo[userIndex].status
            }
        }

        res.json(response);
    }    
}

const users = new Users();
module.exports=users;