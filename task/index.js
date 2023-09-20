"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tl = require("azure-pipelines-task-lib/task");
const axios_1 = __importDefault(require("axios"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const environmentId = tl.getInput('environmentId', true);
            const apiToken = tl.getInput('apiToken', true);
            const externalId = tl.getInput('externalId', false);
            const insertAfter = tl.getInput('insertAfter', false);
            const objectId = tl.getInput('objectId', false);
            const schemaId = tl.getInput('schemaId', true);
            const schemaVersion = tl.getInput('schemaVersion', false);
            const scope = tl.getInput('scope', true);
            const value = tl.getInput('value', true);
            const payload = JSON.stringify([
                {
                    "externalId": externalId,
                    "insertAfter": insertAfter,
                    "objectId": objectId,
                    "schemaId": schemaId,
                    "schemaVersion": schemaVersion,
                    "scope": scope,
                    "value": JSON.parse(value)
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
            axios_1.default.request(config)
                .then((response) => {
                console.log(JSON.stringify(response.data));
                if (response.status != 200) {
                    tl.setResult(tl.TaskResult.Failed, "Response status code not OK");
                }
                else {
                    tl.setResult(tl.TaskResult.Succeeded);
                }
            })
                .catch((error) => {
                tl.setResult(tl.TaskResult.Failed, error.message);
            });
        }
        catch (err) {
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
run();
