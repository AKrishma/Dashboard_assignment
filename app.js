const   http =  require('http'),
        graphql = require('graphql').graphql,
        express = require('express'),
        bodyParser = require('body-parser'),
        graphqlhttp = require('express-graphql'),
        graphqlSchema = require('./graphql_api/graphqlSchema'),
        mongoosSchema = require('./graphql_api/mongoosSchema'),
        mongoConn = require('./mongoConnection')();

/*  var query = 'query { boards { id, boardName } }'  
graphql(graphqlSchema, query).then( function(result) {  
    console.log(JSON.stringify(result,null," "));

})  */

app = express();

// Configure morgan to log your requests, with a standard date & time format
/* morgan.token('time', (req, res) => new Date().toISOString());
app.use(morgan('[:time] :remote-addr :method :url :status :res[content-length] :response-time ms'));
 */
// Setup bodyParsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let port = process.env.port || 4000;

// Mount the APIs specific to version
app.use('/',graphqlhttp({
    schema: graphqlSchema,
    pretty: true,
    graphiql: ((process.NODE_ENV !== 'production') ? true: false)
}));
app.listen(port, (err) => {
    if(err) {
        console.log('Error in server port: '+ err);
    }
    console.log('Server ready, Listening port on '+ port  +' for requests');
})