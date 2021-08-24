// require app
const app = require('../app');
// require config
const config = require('config');

// get port from config or set default
const port = config.get('port') || 3000;


// app listen to port
app.listen(port, () => {
    console.log(`app run in port ${port}`);
});