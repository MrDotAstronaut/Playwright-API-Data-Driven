import { PlaywrightTestConfig} from '@playwright/test';

const config: PlaywrightTestConfig = {
  
  testDir: './tests',

  fullyParallel: true,
  workers: 7,
  // retries: 1,
  
  timeout: 30 * 1000,
  
  expect: {
    timeout: 5000
  },
  
  reporter: 'html',
  
  use: {
    baseURL : "https://dev85236.service-now.com",
    extraHTTPHeaders : {
      "Authorization" : "Basic YWRtaW46bVR4MyRKZlJ3OVIh"
    }
  }
}

export default config;
