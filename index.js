const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

try {
    e = process.env;
    config = {
        webHookUrl: e.TEAMS_WEBHOOK,
    }
    if (!config.webHookUrl) {
        Core.setFailed("TEAMS_WEBHOOK is not set. Set it with\nenv:\n\TEAMS_WEBHOOK: ${{ secrets.TEAMS_WEBHOOK }}\n");
    }

    const msgToTeams = core.getInput('msg-to-teams');
    console.log(`${msgToTeams}!`);

    axios
        .post(`${config.webHookUrl}`, {
            text: `${msgToTeams}`
        })
        .then(res => {
            console.log(`statusCode: ${res.statusCode}`)
            console.log(res)
        })
        .catch(error => {
            console.error(error)
        })

    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);

} catch (error) {
    core.setFailed(error.message);
}
