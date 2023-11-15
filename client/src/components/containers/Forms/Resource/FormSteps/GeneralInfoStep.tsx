import React from 'react'
import { Select } from 'antd'
import MockifyInput from 'components/commons/Input/Input'
import { IResourceFormGeneralInfoStepProps } from 'types/forms';
export default function GeneralInfoStep(props : IResourceFormGeneralInfoStepProps) {
  const {handleFormChange, projectOptions, data } = props;
  return (
    <>
      <MockifyInput
        name={"resourceName"}
        label={"resource name"}
        value={data.resourceName}
        onChange={(e) => handleFormChange(e, "resourceName")}
        classes={['mockify-input', 'input']}
        />
      {/* project */}
      <Select 
        className='mockify-select'
        defaultValue={data.project}
        onChange={(value : string) => handleFormChange(value, "project")}
        >
          {projectOptions.map((project : any, index : number) => {
            return (
              <Select.Option key={index} value={project._id}>{project.name}</Select.Option>
            )
          })}
        </Select>
          
    </>
  )
}
