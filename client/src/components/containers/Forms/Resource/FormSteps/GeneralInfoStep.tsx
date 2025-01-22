import React from 'react'
import { Select } from 'antd'
import MockifyInput from 'components/commons/Input/Input'
import { IResourceFormGeneralInfoStepProps } from 'types/forms';
import MockifySelect from 'components/commons/Select/Select';
import { normlizeSelectOptions } from 'utils';
export default function GeneralInfoStep(props : IResourceFormGeneralInfoStepProps) {
  const {handleFormChange, projectOptions, data } = props;
  return (
    <>
      <MockifyInput
        name={"name"}
        label={"resource name"}
        value={data?.name}
        onChange={(e) => handleFormChange(e, "name")}
        classes={['mockify-input', 'input']}
        />
      <MockifySelect
        label='projects'
        options={normlizeSelectOptions(projectOptions, "_id", "name")}
        onChange={(value : string) => handleFormChange(value, "project")}
        />
    </>
  )
}
