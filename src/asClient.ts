import { URL } from 'node:url';
import { RestClient } from 'typed-rest-client';

import * as Responses from './responses';

/** AS Client */
export class AsClient {

    /** Rest Client */
    restClient: RestClient;

    constructor(
        private readonly hostname: string,
        private readonly userAgent = 'node-sky-q'
    ) {
        const baseUrl = new URL('/as', `http://${hostname}:9006`);

        this.restClient = new RestClient(userAgent, baseUrl.href);
    }

    /** System Device Information */
    async systemDeviceInformation(): Promise<Responses.DeviceInfo> {
        const response = await this.restClient.get<Responses.DeviceInfo>('/system/deviceinformation');

        if (!response.result) {
            throw new Error();
        }

        return response.result;
    }

    /** System Information */
    async systemInformation(): Promise<Responses.Info> {
        const response = await this.restClient.get<Responses.Info>('/system/information');

        if (!response.result) {
            throw new Error();
        }

        return response.result;
    }

    /** Services */
    async services(): Promise<Responses.Services> {
        const response = await this.restClient.get<Responses.Services>('/services');

        if (!response.result) {
            throw new Error();
        }

        return response.result;
    }
}