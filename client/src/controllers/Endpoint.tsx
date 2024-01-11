import React from "react";
import { fetchEndpoints } from "redux/features/endpoint/endpointThunk";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { ToastifyMockify } from "utils";
import ResourceController from "./Resource";
import YAML from 'yaml'
const EndpointController = () => {
  const {resource } = ResourceController();
  const { endpoint, loading } = useAppSelector((state) => state.endpoint);
  const [ selectedResource, setSelectedResource  ] = React.useState<any>(resource[0]);
  const [ selectedResourceSwaggerDocs, setSelectedResourceSwaggerDocs ] = React.useState<any>(null);
  const dispatch = useAppDispatch();
  const [ key, setKey ] = React.useState<number>(0);
  const [ swaggerDrawerVisible, setSwaggerDrawerVisible ] = React.useState<boolean>(false);

  React.useEffect(() =>{
    
    const dispatched = dispatch(fetchEndpoints(selectedResource));
    ToastifyMockify(dispatched);
  }, [dispatch, key])

  const handleTabChange = (key : string, resource : any) => {
    setKey(parseInt(key));
    setSelectedResource(resource[key]);
  }

  const generateSwaggerDocs = (data : any) => {
    const swaggerTemplate  : any = {
        swagger: "2.0",
        info: {
            version: "1.0.0",
            title: "API Documentation",
            description: "Documentation for the API endpoints",
        },
        paths: {},
    };

    data.forEach((endpoint : any) => {
        const method = endpoint.method.toLowerCase();
        const url = endpoint.url;

        if (!(url in swaggerTemplate.paths)) {
            swaggerTemplate.paths[url] = {};
        }

        swaggerTemplate.paths[url][method] = {
            summary: `${method} operation for ${url}`,
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
    // globals
    endpoint, 
    loading,
    handleTabChange,
    key,
    swaggerDocsCache,
    selectedResourceSwaggerDocs,
    handleShowSwaggerDrawer,
    handleCloseSwaggerDrawer,
    swaggerDrawerVisible,
    selectedResource
  }
}

export default EndpointController;