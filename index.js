var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/create', require('./routes/create'));
app.use('/read', require('./routes/read'));
app.use('/update', require('./routes/update'));
app.use('/delete', require('./routes/delete'));

app.listen(3000, function () {
    console.log('CORS-enabled web server listening on port 3000');
});
