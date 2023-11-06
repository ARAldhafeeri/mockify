# Introduction 
Builder design pattern is a creational design pattern that lets us create complex objects step by step. The pattern allows us to produce different types and representations of an object using the same construction code.

In mockify.io , builder design pattern is used to build endpoints based on resource configuration, enabled features and other parameters.

*domainName.com/resourceName* is the basic structure of an endpoint. In mockify.io, we can add query parameters, headers, body, etc. to the endpoint.

For example if GET, POST, DELETE, PUT method is enabled for a resource as generic CURD,filteration, pagination, search then the following endpoints will be generated for the resource:
- GET -> domainName.com/resourceName?filter=filterValue&sort=sortValue&search=searchValue&page=pageNumber&size=pageSize
- POST, GET ( without any pagination, sort , filter, search params ) -> domainName.com/resourceName
- DELETE, PUT -> domainName.com/resourceName/:id
- GET -> domainName.com/resourceName/:id

Therefore the builder design pattern will generate the following endpoints:
- domainName.com/resourceName?filter=filterValue&sort=sortValue&search=searchValue&page=pageNumber&size=pageSize
- domainName.com/resourceName
- domainName.com/resourceName?id=idValue

visit how mockify.io uses chain of responsibility design pattern to learn more about filteration, pagination, search and sort and apply user defined functions on request, response entity.
// add link to chain of responsibility design pattern
 [Mockify.io and Chain of Responsiblity pattern](https://mockify.io/chain-of-responsibility-design-pattern/)


- Beta version of mockify.io will support only REST & CURD operations. In future versions, we will add support for GraphQL, gRPC, SOAP, etc. And the builder class will evolve accordingly.

