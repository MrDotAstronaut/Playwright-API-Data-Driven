import { APIRequestContext } from '@playwright/test';

export class APIUtils{

    readonly apiContext : APIRequestContext;

    constructor(apiContext : APIRequestContext){
        this.apiContext = apiContext;
    }

    async createIncident(path : URL, payload : JSON){
        const response = await this.apiContext.post(`${path}`, {
            data: payload
        });
        return response;
    }

    async getIncident(path : URL, task_effective_number : string){
        const response = await this.apiContext.get(`${path}`, {
            params: {
                task_effective_number: task_effective_number,
            }
        });
        return response;
    }

    async modifyIncident(path : URL, payload : JSON, sys_id : string){
        const response = await this.apiContext.put(`${path}/${sys_id}`, {
            data: payload
        });
        return response;
    }

    async updateIncident(path : URL, payload : JSON, sys_id : string){
        const response = await this.apiContext.patch(`${path}/${sys_id}`, {
            data: payload
        });
        return response;
    }

    async deleteIncident(path : URL, payload : JSON, sys_id : string){
        const response = await this.apiContext.delete(`${path}/${sys_id}`, {
            data : payload
         });
        return response;
    }

}