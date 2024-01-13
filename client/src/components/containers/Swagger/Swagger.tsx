import React from 'react'
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css";

const Swagger  : React.FC = () => {
  return (
    <SwaggerUI spec={{
      "openapi": "3.0.0",
      "info": {
        "title": "Hello World API",
        "version": "1.0.0",
        "description": "A simple API to greet the world"
      },
      "paths": {
        "/hello": {
          "get": {
            "summary": "Get a friendly greeting",
            "responses": {
              "200": {
                "description": "Successful response",
                "content": {
                  "application/json": {
                    "example": {
                      "message": "Hello, World!"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }} />

  )
}

export default Swagger;