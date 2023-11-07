import { CopyOutlined, EyeInvisibleOutlined } from "@ant-design/icons"
import MockifyButton from "../Button/Button"
import { Tooltip } from "antd"

const withCopyButton = (apiKey : string) => {
  return (
    <div>
      <p style={{marginTop: "23px"}}>{apiKey}</p>
      <MockifyButton 
      icon={<CopyOutlined style={{fontSize: "20px"}} />} 
      onClick={() => navigator.clipboard.writeText(apiKey)}
      classes={['copy-api-key-btn']}
      />
    </div>
    )
}

export const Invisible = (data : string) => {
  return <Tooltip title={withCopyButton(data)}><EyeInvisibleOutlined /></Tooltip>
}