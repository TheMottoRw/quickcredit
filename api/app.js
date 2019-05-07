var express=require('express');
var router=require('./routes/routes');
//import { json, urlencoded } from 'body-parser';

var app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(router);

app.listen( PORT, () => {
    console.log( 'Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.' );
});

module.exports=app;