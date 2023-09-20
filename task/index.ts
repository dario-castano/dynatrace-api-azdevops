import tl = require('azure-pipelines-task-lib/task');
import axios from 'axios';

async function run() {
    try {
        const environmentId: string | undefined = tl.getInput('environmentId', true);
        const apiToken: string | undefined = tl.getInput('apiToken', true);
        const externalId: string | undefined = tl.getInput('externalId', false);
        const insertAfter: string | undefined = tl.getInput('insertAfter', false);
        const objectId: string | undefined = tl.getInput('objectId', false);
        const schemaId: string | undefined = tl.getInput('schemaId', true);
        const schemaVersion: string | undefined = tl.getInput('schemaVersion', false);
        const scope: string | undefined = tl.getInput('scope', true);
        const value: string | undefined = tl.getInput('value', true);

        const payload = JSON.stringify([
            {
               "externalId": externalId,
               "insertAfter": insertAfter,
               "objectId": objectId,
               "schemaId": schemaId,
               "schemaVersion": schemaVersion,
               "scope": scope,
               "value": JSON.parse(value!)
            }  
        ]);

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://${environmentId}.live.dynatrace.com/api/v2/settings/objects`,
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Api-Token ${apiToken}`
              },
            data: payload
        };

        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          if (response.status != 200) {
            tl.setResult(tl.TaskResult.Failed, "Response status code not OK");
          } else {
            tl.setResult(tl.TaskResult.Succeeded);
          }
        })
        .catch((error) => {
            tl.setResult(tl.TaskResult.Failed, error.message);
        });
    }
    catch (err: any) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();