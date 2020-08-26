const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');
const { config } = require('process');

//Invoke-RestMethod -Method post -ContentType 'Application/Json' -Body '{"text":"Hello World!"}' -Uri <YOUR WEBHOOK URL>
try {

    env = process.env;

    config = {
        webHookUrl: env.TEAMS_WEBHOOK,
    }
    if (!config.webHookUrl) {
        Core.setFailed("TEAMS_WEBHOOK is not set. Set it with\nenv:\n\TEAMS_WEBHOOK: ${{ secrets.TEAMS_WEBHOOK }}\n");
    }

    // `msgto-Teams` input defined in action metadata file
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
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);

} catch (error) {
    core.setFailed(error.message);
}
