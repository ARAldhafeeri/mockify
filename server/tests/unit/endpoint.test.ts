import { domain } from '../../getEnv';
import EndpointService from '../../services/endpoint';
import { DATABASE_URL } from '../../getEnv';
import mongoose from 'mongoose';
import ResourceService from '../../services/resource';

const endpointService = new EndpointService();
const resService = new ResourceService();

describe('EndpointService', () => {

  beforeEach(async () => {
    await mongoose.connect(DATABASE_URL);
  });
  

  test('should create curd endpoints for resource', async () => {
    const res = await resService.findOne({resourceName: "default"});

    const endpoint = await endpointService.create(res.features, res.project, res.resourceName);
    expect(endpoint).toBeDefined();
    expect(endpoint).toHaveLength(9);

    // generic endpoints
    let getx = endpoint.find((e : any) => e.method === "GET");
    let postx = endpoint.find((e : any) => e.method === "POST");
    let putx = endpoint.find((e : any) => e.method === "PUT");
    let deletex = endpoint.find((e : any) => e.method === "DELETE");
    
    // get search, filter, pagination 
    let searchx = endpoint.find((e : any) => e.method === "GET" && e.url.includes("search"));
    let filterx = endpoint.find((e : any) => e.method === "GET" && e.url.includes("filter"));
    let paginatex = endpoint.find((e : any) => e.method === "GET" && e.url.includes("paginate"));


    // let validation put and post 
    let postValidate = endpoint.filter((e : any) => e.method === "POST" && e.url.includes("validate"));
    let putValidate = endpoint.filter((e : any) => e.method === "PUT" && e.url.includes("validate"));

    // funcs 
    let getXFunction = endpoint.filter((e : any) => e.method === "GET" && e.url.includes("edge"));
    let postXFunction = endpoint.filter((e : any) => e.method === "POST" && e.url.includes("edge"));
    let putXFunction = endpoint.filter((e : any) => e.method === "PUT" && e.url.includes("edge"));
    let deleteXFunction = endpoint.filter((e : any) => e.method === "DELETE" && e.url.includes("edge"));
    
    expect(getx).toBeDefined();
    expect(postx).toBeDefined();
    expect(putx).toBeDefined();
    expect(deletex).toBeDefined();
    // getx features
    expect(searchx).toBeDefined();
    expect(filterx).toBeDefined();
    expect(paginatex).toBeDefined();
    // validate 
    expect(postValidate).toBeDefined();
    expect(putValidate).toBeDefined();
    
    // functions
    expect(getXFunction.length > 0).toBeTruthy();
    expect(postXFunction.length > 0).toBeTruthy();
    expect(putXFunction.length > 0).toBeTruthy();
    expect(deleteXFunction.length > 0).toBeTruthy();

    
  });

  afterEach(async () => {
    await mongoose.connection.close();
  });

});