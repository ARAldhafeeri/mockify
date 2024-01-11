import React from 'react'
import { Row, Typography, Col, Switch,  } from 'antd'
import { IResourceFormFeatureStepProps } from 'types/forms';

export default function FeatureStep(props : IResourceFormFeatureStepProps) {
  const { data, handleFormChangeFeatures} = props;

  return (
    <>
    {/* FEATURES */}
    <Typography style={{fontFamily: "fantasy", fontSize:"18px"}}>Enable/Disable Features</Typography>

    <Row gutter={16}>
    {
      Object.keys(data?.features ?? {}).map((name : String, index : number) =>{
        return (
          <Col span={8} key={index}>
            <Switch 
              checkedChildren={name} 
              unCheckedChildren={name} 
              defaultChecked={data?.features[name as keyof typeof data.features]}
              onChange={(checked : boolean) => handleFormChangeFeatures(checked, name)}
              />
          </Col>


        )
      })
    }
    </Row>     
  </>
  )
}
