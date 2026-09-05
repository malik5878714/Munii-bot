const { spawn } = require("child_process");
const axios = require("axios");
const logger = require("./utils/log");

///////////////////////////////////////////////////////////
//========= Create website for dashboard/uptime =========//
///////////////////////////////////////////////////////////

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// Serve the index.html file
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

// Health endpoint for uptime monitors
app.get('/status', function (req, res) {
    res.json({ status: 'ok', uptime: process.uptime(), restarts: global.countRestart || 0 });
});

// Start the server and add error handling
app.listen(port, () => {
    logger(`Server is running on port ${port}...`, "[ MirryKal ]");
}).on('error', (err) => {
    if (err.code === 'EACCES') {
        logger(`Permission denied. Cannot bind to port ${port}.`, "[ MirryKal ]");
    } else {
        logger(`Server error: ${err.message}`, "[ Kripya Dhyan de ]");
    }
});

/////////////////////////////////////////////////////////
//========= Start bot with auto-restart on crash =======//
/////////////////////////////////////////////////////////

global.countRestart = global.countRestart || 0;

function startBot(message) {
    if (message) logger(message, "[ MirryKal ]");

    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "rudra.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close", (codeExit) => {
        // If exit code is not zero try to restart with exponential backoff (capped)
        if (codeExit !== 0 && global.countRestart < 10) {
            global.countRestart++;
            const delay = Math.min(30000, 1000 * Math.pow(2, global.countRestart)); // cap at 30s
            logger(`Bot exited with code ${codeExit}. Restarting in ${delay / 1000}s... (${global.countRestart}/10)`, "[ Ayush ]");
            setTimeout(() => startBot(), delay);
        } else {
            logger(`Bot stopped after ${global.countRestart} restarts.`, "[ MirrKal]");
        }
    });

    child.on("error", (error) => {
        logger(`An error occurred: ${JSON.stringify(error)}`, "[ Ayush ]");
    });
}

//////////////////////////////////////////////
//========= Check update from GitHub =========//
//////////////////////////////////////////////

axios.get("https://raw.githubusercontent.com/priyanshu192/bot/main/package.json")
    .then((res) => {
        logger(res.data.name, "[ Mirrykal ]");
        logger(`Version: ${res.data.version}`, "[ Mirrykal]");
        logger(res.data.description, "[ Mirrykal ]");
    })
    .catch((err) => {
        logger(`Failed to fetch update info: ${err.message}`, "[ Ayush ]");
    });

// Start the bot
startBot();
