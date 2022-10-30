export const swaggerDocument = {
    "swagger": "2.0",
    "info": {
        "description": "This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.",
        "version": "1.0.6",
        "title": "Swagger Petstore",
        "termsOfService": "http://swagger.io/terms/",
        "contact": {
            "email": "apiteam@swagger.io"
        },
        "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        }
    },
    "host": "180.93.175.236:3000/",
    "basePath": "",
    "tags": [
        {
            "name": "ca",
            "description": "This is Ca_Demo_TEST",
        },
    ],
    "schemes": [
        "http"
    ],
    "paths": {
        "/staff/login/": {
            "post": {
                "tags": [
                    "ca"
                ],
                "summary": "This is CA",
                "description": "",
                "operationId": "loginId",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Pet object that needs to be added to the store",
                        "required": true,
                        "schema": {
                          "$ref": "#/definitions/LoginReq"
                        }
                      }
            
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "$ref": "#/definitions/LoginRes"
                        }
                    }
                },

            }
        },
    },
    "securityDefinitions": {
        "api_key": {
            "type": "apiKey",
            "name": "api_key",
            "in": "header"
        },
        "petstore_auth": {
            "type": "oauth2",
            "authorizationUrl": "https://petstore.swagger.io/oauth/authorize",
            "flow": "implicit",
            "scopes": {
                "read:pets": "read your pets",
                "write:pets": "modify pets in your account"
            }
        }
    },
    "definitions": {
        "LoginRes": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "displayName": {
                    "type": "string"
                },
                "displayName":{
                    "type": "string"
                },
                "key":{
                    "type": "string"
                },
                "accessToken":{
                    "type": "string"
                },
                "refreshToken":{
                    "type": "string"
                },
                "role": {
                    "type": "string"
                }
            }
        },
        "LoginReq": {
            "type": "object",
            "properties": {
          
                "username": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                },
            }
        }
    },
}