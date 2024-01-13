import React from 'react'
import EndpointService from './Endpoint';
import YAML from 'yaml'
import ResourceService from './Resource';

const SwaggerService = () => {

  const { endpoint } = EndpointService();
  const { resource } = ResourceService();
  const [ selectedResourceSwaggerDocs, setSelectedResourceSwaggerDocs ] = React.useState<any>("");
  const [ swaggerDrawerVisible, setSwaggerDrawerVisible ] = React.useState<boolean>(false);
  const [ selectedResource, setSelectedResource  ] = React.useState<any>(resource[0]);
  const [ key, setKey ] = React.useState<number>(0);

  React.useEffect(() =>{
    swaggerDocsCache();
  }, [selectedResource])

  const handleTabChange = (key : string, resource : any) => {
    setKey(parseInt(key));
    setSelectedResource(resource[key]);
    swaggerDocsCache();
  }
  
  const generateSwaggerDocs = (data : any) => {
    const swaggerTemplate  : any = {
        swagger: "2.0",
        info: {
            title: `API Documentation for ${selectedResource?.resourceName}`,
            description: `The following endpoints are available for ${selectedResource?.resourceName}`,
        },
        paths: {},
    };

    data?.forEach((endpoint : any) => {
        const method = endpoint?.method?.toLowerCase();
        const url = endpoint?.url;
        const resourceName = selectedResource?.resourceName;

        if (!(url in swaggerTemplate.paths)) {
            swaggerTemplate.paths[url] = {};
        }

        swaggerTemplate.paths[url][method] = {
            tags: [resourceName],
            summary: `${method} operation for ${resourceName}`,
            parameters: [],
            responses: {
                200: { description: "OK" },
            },
        };

        if ("params" in endpoint) {
            endpoint.params.forEach((param : any) => {
                swaggerTemplate.paths[url][method].parameters.push({
                    name: param,
                    in: "query",
                    required: true,
                    type: "string",
                });
            });
        }

        if ("body" in endpoint) {
            swaggerTemplate.paths[url][method].parameters.push({
                name: "body",
                in: "body",
                required: true,
                schema: {
                    type: "object",
                    properties: endpoint.body,
                },
            });
        }
    });

    return YAML.stringify(swaggerTemplate);
  }

  const swaggerDocsCache = () => {
    let resourceCache : string | null = localStorage.getItem(selectedResource?.resourceName);
    if (!resourceCache) {
      let swaggerDocs : any = generateSwaggerDocs(endpoint);
      localStorage.setItem(selectedResource?.resourceName, swaggerDocs);
    } else {
      setSelectedResourceSwaggerDocs(resourceCache);
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
