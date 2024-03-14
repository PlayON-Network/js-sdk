const express = require('express');
const path = require('path');
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const argv = yargs(hideBin(process.argv)).argv
const app = express();
const port = argv.port || process.env.PORT || 8080;

app.use('/cdn', express.static(path.join(__dirname, argv.cdn ?? 'packages/skeleton-ui/cdn')));
app.use('/assets', express.static(path.join(__dirname, argv.assets ?? 'packages/skeleton-ui/src/test/assets')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, `${argv.path}/index.html`));
});

app.listen(port);
console.log(`Serving ${argv.path} at http://localhost:` + port);