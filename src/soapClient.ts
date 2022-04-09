import { URL } from 'node:url';
import { HttpClient } from 'typed-rest-client/HttpClient';

/** Soap Client */
export class SoapClient {

    /** HTTP Client */
    httpClient: HttpClient;

    /** Base URL */
    baseUrl: URL;

    constructor(
        private readonly hostname: string,
        private readonly userAgent = 'node-sky-q'
    ) {
        this.baseUrl = new URL('/as', `http://${hostname}:49153`);

        this.httpClient = new HttpClient(userAgent);
    }

    /** Get Media Information */
    async getMediaInfo(): Promise<unknown> {
        const requestUrl = new URL('GetMediaInfo', this.baseUrl);
        const response = await this.httpClient.get(requestUrl.href);

        return response;
    }

    /** Get Transport Information */
    async getTransportInfo(): Promise<unknown> {
        const requestUrl = new URL('GetTransportInfo', this.baseUrl);
        const response = await this.httpClient.get(requestUrl.href);

        return response;
    }
}