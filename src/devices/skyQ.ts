import { EventEmitter } from 'events';

import { Logger } from '@epickris/node-logger';
import ping from 'ping';
import { SkyRemote } from 'sky-remote';

import { AsClient } from '../asClient';
import { SoapClient } from '../soapClient';
import * as Responses from '../responses';
import { Command } from '../commands';

/** Log */
const log = Logger.withPrefix('Powerline');

/** Sky Q */
export class SkyQ extends EventEmitter {

    /** AS Client */
    private asClient: AsClient;

    private remoteClient: SkyRemote;

    /** Soap Client */
    private soapClient: SoapClient;

    /**
     * @param device Device
     */
    constructor(
        protected readonly hostname: string
    ) {
        super();

        this.asClient = new AsClient(hostname);
        this.remoteClient = new SkyRemote(hostname);
        this.soapClient = new SoapClient(hostname);
    }
    
    /** Name */
    async name(): Promise<string> {
        const info = await this.asClient.systemInformation();

        if (info.airplayID) {
            return info.airplayID;
        }

        if (info.btID) {
            return info.btID;
        }

        throw new Error("No value for 'airplayID' or 'btID'.");
    }

    /** MAC */
    async mac(): Promise<string> {
        const info = await this.asClient.systemInformation();

        if (!info.MACAddress) {
            throw new Error("No value for 'MACAdddress'.");
        }

        return info.MACAddress;
    }

    /** IP Address */
    async ipAddress(): Promise<string> {
        const info = await this.asClient.systemInformation();

        if (!info.IPAddress) {
            throw new Error("No value for 'IPAddress'.");
        }

        return info.IPAddress;
    }

    /** Active? */
    async active(): Promise<boolean> {
        const info = await this.asClient.systemInformation();

        if (!info.activeStandby) {
            throw new Error("No value for 'activeStandby'.");
        }

        return !info.activeStandby;
    }

    /** Manufacturer */
    async manufacturer(): Promise<string> {
        const info = await this.asClient.systemInformation();

        if (!info.manufacturer) {
            throw new Error("No value for 'manufacturer'.");
        }

        return info.manufacturer;
    }

    /** Model */
    async model(): Promise<string> {
        const info = await this.asClient.systemInformation();

        if (info.modelNumber) {
            return info.modelNumber;
        }

        if (info.hardwareModel) {
            return info.hardwareModel;
        }

        throw new Error("No value for 'modelNumber' or 'hardwareModel'.");
    }

    /** Serial Number */
    async serialNumber(): Promise<string> {
        const info = await this.asClient.systemInformation();

        if (!info.serialNumber) {
            throw new Error("No value for 'serialNumber'.");
        }

        return info.serialNumber;
    }

    /** Services */
    async services(): Promise<Responses.Service[]> {
        const services = await this.asClient.services();

        if (!services.services) {
            throw new Error("No value for 'services'.");
        }

        return services.services;
    }

    /** Send */
    async send(sequence: Command | Command[]): Promise<void> {
        this.remoteClient.press(sequence);
    }

    /** Ping */
    async ping(): Promise<void> {
        const promise = new Promise<void>((resolve, reject) => {
            try {
                ping.promise.probe(this.hostname);
                resolve();
            } catch (error) {
                log.error(error);

                reject(error);
            }
        });

        return promise;
    }
}