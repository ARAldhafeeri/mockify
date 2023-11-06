Mockify.io uses chain of responsbility design pattern to apply user defined functions on request, response entity and to implement filteration, pagination, search and sort.

- System defined functionality : filteration, pagination, search and sort. 
- User defined functionality : apply user defined functions on request, response entity.

For example user can define custom filteration or pigination logic and apply it on request, response entity before running the custom standard logic, user may want to apply some validation on the request entity and return error response if validation fails. Also user may want to apply some logic on the response entity before returning it to the client. All of this is enabled by chain of responsiblity design pattern. 

## Introduction
- Based on the request method specific responsiblity chain is created. For example if request method is GET then the responsiblity chain will be created for GET method. Examples:
- GET -> filteration -> pagination -> search -> sort -> apply user defined functions on request -> run custom standard logic -> apply user defined functions on response -> return response to client
- ALL the following [ apply user defined functions on request, run custom standard logic, apply user defined functions on response ] are optional. User can defined them via resource functions. 
- POST -> run validation -> apply other user defined functions on request, response entities -> return response to client. 

## How to use chain of responsiblity design pattern in mockify.io

- Create resource.
- Enable some features.
- Add schema 
- Add resource functions
- Click save

it's that easy. 