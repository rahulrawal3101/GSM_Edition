'use client'
import CustomOption from "@/components/CustomOption";
import { CustomSelectElement } from "@/components/CustomSelectElement";
import DatePicker from "@/components/DatePicker";
import DayContainer from "@/components/DayContainer";
import { useState } from "react";
import * as XLSX from 'xlsx';


export default function Home() {
  const initialData = {
    teams: ["Animals", "Calm-Chorz", "Kill Squad", "Motley Crew", "Squashers", "Sultans", "Warriorz",],
    players: {
      "Animals": ["Harjinder Singh", "Sikander Kamal", "Amit Mina", "Ashim Shrivastava", "Dhiraj Khanna", "Divay Pratap", "Ashish Kumar", "Piyush Sachdeva", "Neville Seth", "Raghav Gupta", "Sanjay Gupta",],
      "Calm-Chorz": ["Chetan Malhotra", "Gaurav Verma", "Rohit Sehgal", "Sumit Kumar Johri", "Rahul Shah", "Shikhar Sharma", "Robin Groser", "Pavandeep Choudhary", "Abhishek Goyal", "Vikas Phogaat", "Nikhil Rajpal"],
      "Kill Squad":["Viraj Sinh","Gaurav Goel","Harpreet Chawla","Prashant Jetley","Akhil Puri","Rohit Dalal","Rachit Bahri","Amit Malik","Ajay Kohli","Nandy Narang","Sandeep Neha"],
      "Motley Crew":["Rahul Batra","Abhishek Kalia","Nitin Aggarwal","Ravi Sharma","Amol Kalra","Asit Dhingra","Bawa Chandhok","Sukrita","Kushal Gupta","Sahil Jain","Hardesh"],
      "Squashers":["Ajnav Dhawan","Mrigank Tripathi","Rahul Bharti","Salil Malhotra","Roopam Jain","SukhSagar Singh","Dhruv Sahai","Vipin","Saurav Khemani","Samir Dewan","Ranjan Pal"],
      "Sultans":["Pranav Bassi","Anirudh Sood","Karan Bedi","Arjun Mehta","Pranay Kapoor","Amit Jain","Gaurav Marwah","Ashish Gupta","Manish Handa","Sumit Nanda","Vir Mehta"],
      "Warriorz":["Yashwinder Chikkara","Akul Juneja","Manmeet Walia","Saurabh Mehta","Tanmay Khandelawal","Harshit Jain","Atishay Kumar","Rajan Puri","Sumit Kumar Domyan","Adeep Arora","Gautam Singh"]
    },
    timings: {
      "sunday": {
        "9:00 AM": false,
        "9:30 AM": false,
        "10:00 AM": false,
        "10:30 AM": false,
        "11:00 AM": false,
        "11:30 AM": false,
        "12:00 Noon": false,
        "12:30 PM": false,
        "1:00 PM": false,
        "1:30 PM": false,
        "2:00 PM": false,
        "2:30 PM": false,
        "3:00 PM": false,
        "3:30 PM": false,
        "4:00 PM": false,
        "4:30 PM": false,
        "5:00 PM": false,
        "5:30 PM": false
      },
      "saturday": {
        "9:00 AM": false,
        "9:30 AM": false,
        "10:00 AM": false,
        "10:30 AM": false,
        "11:00 AM": false,
        "11:30 AM": false,
        "12:00 Noon": false,
        "12:30 PM": false,
        "1:00 PM": false,
        "1:30 PM": false,
        "2:00 PM": false,
        "2:30 PM": false,
        "3:00 PM": false,
        "3:30 PM": false,
        "4:00 PM": false,
        "4:30 PM": false,
        "5:00 PM": false,
        "5:30 PM": false
      }
    }
  }
  const [team, setTeam] = useState("")
  const [player, setPlayer] = useState("")
  const [date, setDate] = useState('yyyy-mm-dd');
  const [timings, setTimings] = useState(initialData.timings);
  const [savedSelections, setSavedSelections] = useState([]);

  const handleTeamChange = (e) => {
    setTeam(e.target.value);
    setPlayer('');
  }
  const handlePlayerChange = (e) => {
    setPlayer(e.target.value);
  }
  const handleTimingChange = (day, time) => {
    setTimings(prevTimings => ({
      ...prevTimings,
      [day]: {
        ...prevTimings[day],
        [time]: !prevTimings[day][time]
      }
    }));
  };
  const handleTimingChangeThroughOption = (day, type) => {
    const updatedTimings = Object.keys(initialData.timings).reduce((acc, day) => {
      acc[day] = Object.fromEntries(
        Object.entries(initialData.timings[day]).map(([time, _]) => [time, type === "available" ? true : false])
      );
      return acc;
    }, {});
    setTimings(prevTimings => ({
      ...prevTimings,
      [day]: updatedTimings[day]
    }));
  };
  const handleSave = () => {
    if (date !== 'yyyy-mm-dd' && team && player ) {
      const flattenedTimings = { 'Date': date, 'Team Name': team, 'Player Name': player };
      Object.keys(timings).forEach(day => {
        Object.entries(timings[day]).forEach(([time, available]) => {
          if (available) {
            flattenedTimings[`${day}_${time}`] = '✓';
          } else {
            flattenedTimings[`${day}_${time}`] = 'X';
          }
        });
      });
      setSavedSelections(prevSelections => [...prevSelections, flattenedTimings]);
      setTeam('');
      setPlayer('');
      setTimings(initialData.timings);
      alert('Add others players entries also')
   
    } else {
      alert("Please Select team or player or date!!!")
    }
  };
  const handleDownload = () => {
    const allSelections = savedSelections;
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(allSelections);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Selections');
    XLSX.writeFile(workbook, 'selections.xlsx');
    location.reload();
  };
  return (
    <div>
      <div className="flex justify-around">
        <CustomSelectElement name="Team" onChange={handleTeamChange} value={team} data={initialData.teams} />
        <CustomSelectElement name="Player" onChange={handlePlayerChange} value={player} data={team ? initialData.players[team] : []} />
      </div>
      <DatePicker value={date} onChange={(e) => setDate(e.target.value)} />
      <div className="flex w-full h-auto flex-wrap justify-evenly items-center gap-3 mt-10">
        <CustomOption onClick={() => handleTimingChangeThroughOption('saturday', 'available')} type="Available:&nbsp;" option={"All time slots on Saturday "} />
        <CustomOption onClick={() => handleTimingChangeThroughOption('sunday', 'available')} type="Available:&nbsp;" option={"All time slots on Sunday "} />
        <CustomOption onClick={() => handleTimingChangeThroughOption('saturday', 'unavailable')} type="Unavailable:-&nbsp;" option={"All time slots on Saturday "} />
        <CustomOption onClick={() => handleTimingChangeThroughOption('sunday', 'unavailable')} type="Unavailable:-&nbsp;" option={"All time slots on Sunday "} />
      </div>
      <div className="flex xs:inline-block sm:flex p-2 mt-2 w-full justify-evenly items-center">
        <DayContainer value={timings} onChange={handleTimingChange} day="saturday" timingData={initialData.timings["saturday"]} />
        <DayContainer value={timings} onChange={handleTimingChange} day="sunday" timingData={initialData.timings["sunday"]} />
      </div>
      <div className="flex flex-col gap-3 justify-center items-center w-full mt-5">
        <button onClick={handleSave} className="bg-green-600 rounded-lg text-white px-10 py-1 w-1/2">Save</button>
        <button onClick={handleDownload} disabled={savedSelections.length > 0 ? false : true} className={`${savedSelections.length > 0 ? 'bg-blue-600' : 'bg-gray-400'} ${!savedSelections.length > 0 && 'cursor-not-allowed'}  rounded-lg text-white px-10 py-1 w-1/2`}>Download Excel File</button>
      </div>
    </div>
  )
}
