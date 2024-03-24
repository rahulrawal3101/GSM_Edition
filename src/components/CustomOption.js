
const CustomOption = ({option,type,onClick}) => {
  return (
    <div onClick={onClick} className="flex justify-center items-center rounded-xl p-2 px-3 lg:w-2/5 sm:w-full xs:w-full cursor-pointer hover:bg-black transition-all bg-slate-700">
        <h3 className={`${type===type.split('-')[0] ? "text-green-200":"text-red-400"} font-bold`}>{type}</h3>
        <h3 className="text-white text-sm">{option}</h3>
    </div>
  )
}

export default CustomOption