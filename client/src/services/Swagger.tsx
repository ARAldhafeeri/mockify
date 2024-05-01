import React from "react";
import { fetchEndpoints } from "redux/features/endpoint/endpointThunk";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { ToastifyMockify } from "utils";
import ResourceService from "./Resource";

const SwaggerService = () => {

  const { endpoint  } =  useAppSelector((state) => state.endpoint);

  const { resource } = useAppSelector((state) => state.resource);

  const dispatch = useAppDispatch();
  const [ selectedResourceSwaggerDocs, setSelectedResourceSwaggerDocs ] = React.useState<any>({
    swagger: "2.0",
    info: {
        title: `API Documentation for ${resource[0]?.resourceName}`,
        description: `The following endpoints are available for ${resource[0]?.resourceName}`,
    },
    host: "api.mockify.io",
    schemes: ["https"],
    basePath: "/v1",
    paths: {},
  
  });
  const [ swaggerDrawerVisible, setSwaggerDrawerVisible ] = React.useState<boolean>(false);
  const [swaggerDocsPaginated, setSwaggerDocsPaginated] = React.useState<any>({
    swagger: "2.0",
    info: {
        title: `API Documentation for ${resource[0]?.resourceName}`,
        description: `The following endpoints are available for ${resource[0]?.resourceName}`,
    },
    host: "api.mockify.io",
    schemes: ["https"],
    basePath: "/v1",
    paths: {},  
  });
  const [ selectedResource, setSelectedResource  ] = React.useState<any>(resource[0]);
  const [ key, setKey ] = React.useState<number>(0);
  const [page , setPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(5);

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
    console.log("body", body)
    if(Array.isArray(body)){
      body?.forEach((field : any) => {
        formattedBody[field.name] = {
          type: field.type,
          required: field.required,
        };
      });
    }

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
        console.log(swaggerTemplate)

        if ("query" in endpoint) {
            endpoint?.query?.forEach((param : any) => {
                swaggerTemplate.paths[path][method].parameters.push({
                    name: param,
                    in: "query",
                    required: true,
                    type: "string",
                });
            });
        }
        if ("params" in endpoint) {
            endpoint?.params?.forEach((param : any) => {
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
            endpoint?.headers?.forEach((header : any) => {
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
      let swaggerDocs : any = generateSwaggerDocs(endpoint);
      setSelectedResourceSwaggerDocs(swaggerDocs);
  
  }


  const handleTabChange = (key : string, resource : any) => {
    setKey(parseInt(key));
    setSelectedResource(resource[key]);
    swaggerDocsCache();
  }


  const handleShowSwaggerDrawer = () => {
    setSwaggerDrawerVisible(true);
  }

  const handleCloseSwaggerDrawer = () => {
    setSwaggerDrawerVisible(false);
  }

  React.useEffect(() =>{
    dispatch(fetchEndpoints(resource[key]));
    setSwaggerDocsPaginated({
      ...selectedResourceSwaggerDocs,
      paths: Object.fromEntries(Object.entries(selectedResourceSwaggerDocs.paths).slice((page - 1) * pageSize, page * pageSize))
    });

    }, [dispatch, key, page, resource, pageSize, selectedResourceSwaggerDocs])


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
    page, 
    setPage,
    pageSize,
    setPageSize, 
    swaggerDocsPaginated
  }
}

export default SwaggerService;
