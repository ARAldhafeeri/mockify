import React from 'react'

interface SelectProps {
  options: any[];
  onChange: (value : string) => void;
  label: string;
}
const MockifySelect : React.FC<SelectProps> = ({options, onChange, label}) =>{
  return (    
    <div className=" relative m-5">
    <label className=" bg-light-primary px-2 text-xs rounded-full absolute top-[-10px] left-0">{label}</label>
      <input list={label} onChange={(e) => onChange(e.target.value)} className='w-[] shadow rounded py-2 px-3 l focus:ring-1 focus:ring-light-primary focus:outline-none' />
      <datalist id={label}>
      {
          options.map((option : any) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))
        }
      </datalist>
    </div>
  )
}

export default MockifySelect;
