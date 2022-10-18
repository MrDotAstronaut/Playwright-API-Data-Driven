import { APIRequestContext } from '@playwright/test';

export class APIUtils{

    readonly request : APIRequestContext;

    constructor(request : APIRequestContext){
        this.request = request;
    }

    async createIncident(path : URL, payload : JSON){
        const response = await this.request.post(`${path}`, {
            data: payload
        });
        return response;
    }

    async getIncident(path : URL, task_effective_number : string){
        const response = await this.request.get(`${path}`, {
            params: {
                task_effective_number: task_effective_number,
            }
        });
        return response;
    }

    async modifyIncident(path : URL, payload : JSON, sys_id : string){
        const response = await this.request.put(`${path}/${sys_id}`, {
            data: payload
        });
        return response;
    }

    async updateIncident(path : URL, payload : JSON, sys_id : string){
        const response = await this.request.patch(`${path}/${sys_id}`, {
            data: payload
        });
        return response;
    }

    async deleteIncident(path : URL, payload : JSON, sys_id : string){
        const response = await this.request.delete(`${path}/${sys_id}`, {
            data : payload
         });
        return response;
    }

}