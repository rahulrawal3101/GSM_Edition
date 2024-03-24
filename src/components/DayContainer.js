
const DayContainer = ({day,timingData,onChange,value}) => {
  

  return (
    <div className="flex flex-col justify-center items-center w-full">
        <div className="flex items-center">
          <div className="lg:flex lg:justify-center lg:items-center xs:hidden sm:flex">
          <svg width="50" height="50">
  <circle cx="25" cy="25" r="8" fill="transparent" stroke="gray" strokeWidth="2"/>
  <text x="50%" y="52%"  textAnchor="middle"  alignmentBaseline="middle" fontSize="12" fill="gray">
    &rarr;
  </text>
</svg>
          </div>
          <div className="lg:hidden sm:hidden xs:flex xs:justify-center xs:items-center">
          <svg width="50" height="50">
  <circle cx="25" cy="25" r="8" fill="transparent" stroke="gray" strokeWidth="2"/>
  <text x="50%" y="48%"  textAnchor="middle"  alignmentBaseline="middle" fontSize="15" fill="gray">
    &rarr;
  </text>
</svg>
          </div>
     
        <h3 className="font-bold text-orange-500">{day.toUpperCase()}</h3>
        </div>
        {/* timing select code */}
        <div  className={`flex w-full justify-center items-center border flex-wrap xs:border-r-0 ${day==="sunday"&&'border-r-4'}`}>
                {Object.keys(timingData).map(time => (
                <label key={time} onChange={()=>onChange(day,time)} className="w-1/2 border flex justify-between items-center lg:px-4 xs:px-2">
                  <input type="checkbox" checked={value[day][time]} readOnly name={`${day}-${time}`} />
                  <p>{time}</p>
                </label>
              ))}
              </div>
    </div>
  )
}

export default DayContainer



