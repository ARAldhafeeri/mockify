import React from 'react'
import EndpointService from './Endpoint';
import ResourceService from './Resource';

const SwaggerService = () => {

  const { endpoint } = EndpointService();
  const { resource } = ResourceService();
  const [ selectedResourceSwaggerDocs, setSelectedResourceSwaggerDocs ] = React.useState<any>("");
  const [ swaggerDrawerVisible, setSwaggerDrawerVisible ] = React.useState<boolean>(false);
  const [ selectedResource, setSelectedResource  ] = React.useState<any>(resource[0]);
  const [ key, setKey ] = React.useState<number>(0);

  console.log("swagger", selectedResource, selectedResourceSwaggerDocs, resource)
  React.useEffect(() =>{
    swaggerDocsCache();
  }, [selectedResource, key])


  const handleTabChange = (key : string, resource : any) => {
    setKey(parseInt(key));
    setSelectedResource(resource[key]);
    swaggerDocsCache();
  }
  const formatSwaggerBody = (body : any) => {
    /**
     * from this :
     *   fields: [{
          name: {type: String, required: true},
          type: {type: String, required: true},
          required: {type: Boolean, required: true},
        
        }],
      to this :
      fields: {
        name: {type: String, required: true},
        type: {type: String, required: true},
        required: {type: Boolean, required: true},
      }
     */
    let formattedBody : any = {};
    body.forEach((field : any) => {
      formattedBody[field.name] = field;
    });

    return formattedBody;
  
  }

  const generateSwaggerDocs = (data : any) => {
    const swaggerTemplate  : any = {
        swagger: "2.0",
        info: {
            title: `API Documentation for ${selectedResource?.resourceName}`,
            description: `The following endpoints are available for ${selectedResource?.resourceName}`,
        },
        host: "api.mockify.io",
        schemes: ["https"],
        basePath: "/v1",
        paths: {},
    };

    data?.forEach((endpoint : any) => {
        const method = endpoint?.method?.toLowerCase();
        const path = endpoint?.path;
        const resourceName = selectedResource?.resourceName;

        if (!(path in swaggerTemplate.paths)) {
            swaggerTemplate.paths[path] = {};
        }

        swaggerTemplate.paths[path][method] = {
            tags: [resourceName],
            summary: `${method} operation for ${resourceName}`,
            parameters: [],
            responses: {
                200: { description: "OK" },
            },
        };

        if ("query" in endpoint) {
            endpoint?.query.forEach((param : any) => {
                swaggerTemplate.paths[path][method].parameters.push({
                    name: param,
                    in: "query",
                    required: true,
                    type: "string",
                });
            });
        }
        if ("params" in endpoint) {
            endpoint?.params.forEach((param : any) => {
                swaggerTemplate.paths[path][method].parameters.push({
                    name: param,
                    in: "path",
                    required: true,
                    type: "string",
                });
            });
        }

        if ("body" in endpoint) {
            swaggerTemplate.paths[path][method].parameters.push({
                name: "body",
                in: "body",
                required: true,
                schema: {
                    type: "object",
                    properties: formatSwaggerBody(endpoint?.body),
                },
            });
        }

        if ("headers" in endpoint){
            endpoint?.headers.forEach((header : any) => {
                swaggerTemplate.paths[path][method].parameters.push({
                    name: header,
                    in: "header",
                    required: true,
                    type: "string",
                });
            });
        }
    });

    return swaggerTemplate;
  }

  const swaggerDocsCache = () => {
    let resourceCache : string | null = localStorage.getItem(selectedResource?.resourceName);
    if (!resourceCache) {
      let swaggerDocs : any = generateSwaggerDocs(endpoint);
      localStorage.setItem(selectedResource?.resourceName, JSON.stringify(swaggerDocs, null, 2));
    } else {
      setSelectedResourceSwaggerDocs(JSON.parse(resourceCache));
    }

  }

  const handleShowSwaggerDrawer = () => {
    setSwaggerDrawerVisible(true);
  }

  const handleCloseSwaggerDrawer = () => {
    setSwaggerDrawerVisible(false);
  }
  return {
    swaggerDocsCache,
    swaggerDrawerVisible,
    selectedResourceSwaggerDocs,
    handleShowSwaggerDrawer,
    handleCloseSwaggerDrawer,
    resource,
    selectedResource,
    key, 
    handleTabChange,
  }
}

export default SwaggerService;
