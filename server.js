#!/usr/bin/env node

const express = require('express');
const { readFile } = require('fs').promises;


const app = express();

app.use(express.static(__dirname + '/public'));



app.get('/stats', async (_, res) => {
    const temp = (+await readFile('/sys/class/thermal/thermal_zone0/temp', 'utf-8') / 1000).toFixed(1);

    let load = await readFile('/proc/loadavg', 'utf-8');
    load = load.match(/^.*? .*? .*? /)[0].trim();

    res.send({ temp, load });
});

app.get('/hostname', async (_, res) => {
    const hostname = (await readFile('/etc/hostname', 'utf-8')).trim();

    res.send(JSON.stringify(hostname));
})

app.listen(5005, function () {
    const { address, port } = this.address();
    console.log(`Listening: http://${address}:${port}`);
});


