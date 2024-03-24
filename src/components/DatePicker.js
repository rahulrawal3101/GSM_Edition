
const DatePicker = ({value,onChange}) => {
    
    return (<>
      <label htmlFor="dateok" className="flex justify-end items-center p-2 mt-2 w-full bg-slate-200 rounded">
            <input value={value} onChange={onChange} className="w-3/5 px-2 bg-transparent outline-none select-none"  type="date" id="dateok" name="dateok"/>
        </label>
    </>
    );
}

export default DatePicker;
