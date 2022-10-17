import { test, expect, request } from '@playwright/test';
import { APIUtils } from '../utils/APIs/APIUtils';
import { preCondition, testData, postCondition } from '../utils/data/testdata';

let apiContext;
let apiUtils;

let sys_id;
let task_effective_number;

test.beforeAll(async ({ baseURL, extraHTTPHeaders }) => {
  apiContext = await request.newContext({ baseURL, extraHTTPHeaders });
  apiContext.on('console', msg => console.log(msg.text())); 
  apiUtils = new APIUtils(apiContext);
});

for (const data of testData) {

  test.describe(data.method, async () => {

    test.beforeEach(async () => {
      if (data.method == 'GET' || data.method == 'PUT' || data.method == 'PATCH' || data.method == 'DELETE') {
        const response = await apiUtils.createIncident(preCondition.path, preCondition.payload);
        await expect(response.status()).toBe(preCondition.expectedResponse.statusCode)
        const resJson = await response.json();
        expect(resJson).toMatchObject(preCondition.expectedResponse.body);
        sys_id = resJson.result.sys_id;
        task_effective_number = resJson.result.task_effective_number;
        console.log("Pre-condition was used\n");
      }
      else {
        console.log("No pre-condition required\n");
      }
    });

    test(data.name, async () => {
      let response, resJson;
      switch (data.method) {
        case 'POST': {
          response = await apiUtils.createIncident(data.path, data.payload);
          break;
        }
        case 'GET': {
          response = await apiUtils.getIncident(data.path, task_effective_number);
          break;
        }
        case 'PUT': {
          response = await apiUtils.modifyIncident(data.path, data.payload, sys_id);
          break;
        }
        case 'PATCH': {
          response = await apiUtils.updateIncident(data.path, data.payload, sys_id);
          break;
        }
        case 'DELETE': {
          response = await apiUtils.deleteIncident(data.path, data.payload, sys_id);
          break;
        }
        default: {
          break;
        }
      };
      if (response != undefined) {
        await expect(response.status()).toBe(data.expectedResponse.statusCode);
        if (data.method != 'DELETE') {
          resJson = await response.json();
          expect(resJson).toMatchObject(data.expectedResponse.body);
          if (data.method == 'POST' && sys_id == undefined && response.status() == 201){
            sys_id = resJson.result.sys_id;
            console.log("Record Created\n")
          }
          else if(data.method == 'GET')
            console.log("Record retrieved\n");
          else if(data.method == 'PUT')
            console.log("Record modified\n");
          else if(data.method == 'PATCH')
            console.log("Record updated\n");
          console.log("-----RESPONSE-START-----");
          console.log(resJson);
          console.log("-----RESPONSE-END-------\n");
        }
        else{
          console.log("Record deleted\n");
        }
      }
      else {
        console.log("Invalid method name\n");
      }
    });

    test.afterEach(async () => {
      if (sys_id != undefined) {
        if (data.method == 'POST' || data.method == 'GET' || data.method == 'PUT' || data.method == 'PATCH') {
          const response = await apiUtils.deleteIncident(postCondition.path, postCondition.payload, sys_id);
          await expect(response.status()).toBe(postCondition.expectedResponse.statusCode);
          console.log("Post-condition was used")
        }
      }
      else{
        console.log("No post-condition required\n");
      }
      sys_id = undefined;
      task_effective_number = undefined;
    })

  })

  test.afterAll(async () => {
    apiContext.dispose();
  });

};