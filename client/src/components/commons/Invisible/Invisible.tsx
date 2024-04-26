import { CopyOutlined, EyeInvisibleOutlined } from "@ant-design/icons"
import MockifyButton from "../Button/Button"

const CopyButton : React.FC<any> = (props) => {
  const { apiKey } = props;
  return (
    <div className="tooltiptext relative bg-light-text text-white w-[150px] h-[100px]">
      <p className="text-[#fff] break-words ml-2 mr-2 text-clip">{apiKey}</p>
      <MockifyButton 
      icon={<CopyOutlined style={{fontSize: "20px"}} />} 
      onClick={() => navigator.clipboard.writeText(apiKey)}
      classes={['absolute', 'right-0', 'bottom-0']}
      />
    </div>
    )
}

export const Invisible = (data : string) => {
  return (
    <div className="tooltiptop">
      <EyeInvisibleOutlined />
      <CopyButton apiKey={data} />
    </div>
  )
}