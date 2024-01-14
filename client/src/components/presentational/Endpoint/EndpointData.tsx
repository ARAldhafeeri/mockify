import { Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Invisible } from 'components/commons/Invisible/Invisible';

const methodsColorScheme : any = {
  "GET": "green",
  "POST": "blue",
  "PUT": "orange",
  "DELETE": "red"
}

const typesColorScheme : any = {
  "Generic": "#2db7f5",
  "Edge Function": "#87d068",
}


const ColumnsWithActions = (actions : any) : ColumnsType => {
  return  [
    {
      title: 'method'.toUpperCase(),
      dataIndex: 'method',
      key: 'method',
      render: (method : string) => (
        <Tag color={methodsColorScheme[method]} key={method}>
          {method}
        </Tag>
      ),
    },
    {
      title: 'url'.toUpperCase(),
      key: 'url',
      dataIndex: 'url',
      render: (endpoint : string) => Invisible(endpoint)
    },
    {
      title: 'path'.toUpperCase(),
      key: 'path',
      dataIndex: 'path',
    },
    {
      title: 'params'.toUpperCase(),
      key: 'params',
      dataIndex: 'params',
      render: (params : Array<string>) => (
        <>
          {params?.map((name : String, index : number) =>{
            return (
              <Tag color={"green"} key={index}>
                {name}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'headers'.toUpperCase(),
      key: 'headers',
      dataIndex: 'headers',
      render: (params : Array<string>) => (
        <>
          {params?.map((name : String, index : number) =>{
            return (
              <Tag color={"green"} key={index}>
                {name}
              </Tag>
            );
          })}
        </>
      ),
    },

    {
      title: 'queries'.toUpperCase(),
      key: 'query',
      dataIndex: 'query',
      render: (query : Array<string>) => (
        <>
          {query?.map((name : String, index : number) =>{
            return (
              <Tag color={"green"} key={index}>
                {name}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      "title": "type".toUpperCase(),
      "dataIndex": "type",
      "key": "type",
      "render": (type : string) => (
        <Tag color={typesColorScheme[type]} key={type}>
          {type}
        </Tag>
      ),
    }
  ];
}

export default ColumnsWithActions;