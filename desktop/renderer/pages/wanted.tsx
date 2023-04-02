import React, {useEffect, useState} from 'react'
import SideBar from '../components/sideBar'
function wanted() {
    const [showSidebar, onSetShowSidebar] = useState(false);
    const [wanted, setWanted] = useState([]);

  useEffect(() => {
    fetch('http://localhost:80/api/getcriminals')
      .then(response => response.json())
      .then(data => setWanted(data))
      .catch(error => console.error(error));
  }, []);
    return (
      <>
         <div className="flex">
        <SideBar
          onSidebarHide={() => {
            onSetShowSidebar(true);
          }}
          showSidebar={showSidebar}
        />
      </div>
      


   

      
      <div className="ml-[22rem] flex flex-wrap gap-4">

      {wanted.map(person => (

      <div className="card lg:card-side bg-[#8b0000] shadow-xl mr-2 ml-2">
  <figure><img className="h-80 w-80" src={person.imageUrl} alt="Album "/></figure>
  <div className="card-body">
    <h2 className="card-title">{person.firstName} {person.lastName}</h2>
    <div className="card-actions justify-end">
      <button className="btn bg-[#1e1e1e] w-72 flex items-center justify-between  hover:bg-transparent">
      <span className="text-black  absolute text-xs">Wanted for</span>
      <span className="text-black ml-[14rem] text-sm">{person.wantedFor}</span>
      </button>
    </div>
    <div className="card-actions justify-center absolute z-10 mt-[14.5rem] ml-20">
      <button className="btn bg-[#1e1e1e] w-32 flex items-center justify-between  hover:bg-transparent z-10">
      <span className="text-black  ml-6 absolute text-xs">Report</span>

      </button>
    </div>
  </div>
</div>

      ))}
</div>
      </>

      
   
    )
}

export default wanted
