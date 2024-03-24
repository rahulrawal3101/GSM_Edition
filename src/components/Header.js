
const Header = ({title}) => {
  return (
   <div className="flex items-center justify-center p-3 bg-orange-400 rounded border-red-500 border-4 mb-2">
    <h3 className="font-bold">{title}</h3>
   </div>
  )
}

export default Header