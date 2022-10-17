import { path } from '../paths/path';

export const preCondition = {
    path: path.incident,
    payload: {
        short_description: "Mouse issue",
        category: "hardware"
    },
    expectedResponse: {
        statusCode: 201,
        body: {
            result: {
                short_description: "Mouse issue",
                category: "hardware"
            }
        }
    }
};

export const postCondition = {
    path: path.incident,
    payload: { },
    expectedResponse: {
        statusCode: 204,
        body: { }
    }
};

export const testData = [
    {
        name: "Creating an incident [SUCCESS]",
        method: "POST",
        path: path.incident,
        payload: {
            short_description: "Mouse issue",
            category: "hardware"
        },
        expectedResponse: {
            statusCode: 201,
            body: {
                result: {
                    short_description: "Mouse issue",
                    category: "hardware"
                }
            }
        }
    },
    {
        name: "Creating an incident [FAIL - Wrong path]",
        method: "POST",
        path: "/api/now/table/inciden",
        payload: {
            short_description: "Mouse issue",
            category: "hardware"
        },
        expectedResponse: {
            statusCode: 400,
            body: {
                error: {
                    detail: null,
                    message: "Invalid table inciden",
                },
                status: "failure",
            }
        }
    },
    {
        name: "Creating an incident [FAIL - Wrong method]",
        method: "POS",
        path: path.incident,
        payload: {
            short_description: "Mouse issue",
            category: "hardware"
        },
        expectedResponse: {
            statusCode: 400,
            body: {
                error: {
                    detail: null,
                    message: "Invalid table inciden",
                },
                status: "failure",
            }
        }
    },
    {
        name: "Retrieving an incident [SUCCESS]",
        method: "GET",
        path: path.incident,
        expectedResponse: {
            statusCode: 200,
            body: {
                result: [{
                    short_description: "Mouse issue",
                    category: "hardware"
                }]
            }
        }
    },
    {
        name: "Modifying an incident [SUCCESS]",
        method: "PUT",
        path: path.incident,
        payload: {
            short_description: "Microsoft office in not working",
            category: "software"
        },
        expectedResponse: {
            statusCode: 200,
            body: {
                result: {
                    short_description: "Microsoft office in not working",
                    category: "software"
                }
            }
        }
    },
    {
        name: "Updating an incident [SUCCESS]",
        method: "PATCH",
        path: path.incident,
        payload: {
            short_description: "Wifi is not working",
            category: "network"
        },
        expectedResponse: {
            statusCode: 200,
            body: {
                result: {
                    short_description: "Wifi is not working",
                    category: "network"
                }
            }
        }
    },
    {
        name: "Deleting an incident [SUCCESS]",
        method: "DELETE",
        path: path.incident,
        payload: {},
        expectedResponse: {
            statusCode: 204,
            body: { }
        }
    }
]