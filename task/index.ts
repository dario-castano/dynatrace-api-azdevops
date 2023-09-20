import tl = require('azure-pipelines-task-lib/task');
import https = require('follow-redirects');

async function run() {
    try {
        const inputString: string | undefined = tl.getInput('samplestring', true);
        if (inputString == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
            return;
        }
        console.log('Hello', inputString);
    }
    catch (err: any) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();