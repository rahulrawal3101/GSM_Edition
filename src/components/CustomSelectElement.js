export const CustomSelectElement = ({name,data,value,onChange}) => {
  return (
<select value={value} onChange={onChange} className="text-md text-white p-1 rounded font-bold bg-red-500 hover:bg-red-700 cursor-pointer">
    <option value="" className="text-sm text-center font-bold">Select {name}</option>
    {data?.map((item)=>{
        return <option className="text-sm text-center bg-orange-400" value={item} key={item}>{item}</option>
    })}
</select>
  )
}
