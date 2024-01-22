import React from 'react'
import { Row, Typography, Col, Switch,  } from 'antd'
import { IResourceFormFeatureStepProps } from 'types/forms';
import features from 'constants/features';

export default function FeatureStep(props : IResourceFormFeatureStepProps) {
  const { data, handleFormChangeFeatures} = props;
  
  const feats = data?.features ?? features;

  return (
    <>
    {/* FEATURES */}
    <Typography style={{fontFamily: "fantasy", fontSize:"18px"}}>Enable/Disable Features</Typography>

    <Row gutter={16}>
    {
      Object.keys(feats).map((name : String, index : number) =>{
        return (
          <Col span={8} key={index}>
            <Switch 
              checkedChildren={name} 
              unCheckedChildren={name} 
              defaultChecked={feats[name as keyof typeof feats]}
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
