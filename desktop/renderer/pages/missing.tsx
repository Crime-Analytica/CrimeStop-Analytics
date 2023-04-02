import React, {useState, useEffect}from 'react'
import CreateMissing from '../components/createMissing';
import SideBar from '../components/sideBar'

function missing() {
    const [showSidebar, onSetShowSidebar] = useState(false);
    const [missingPersons, setMissingPersons] = useState([]);

  useEffect(() => {
    fetch('http://localhost:80/api/get-missing-persons')
      .then(response => response.json())
      .then(data => setMissingPersons(data))
      .catch(error => console.error(error));
  }, []);

    return (
  
     <div className='bg-[#1e1e1e]'>
          <button className="btn bg-[#8b0000] w-[102rem] ml-64 btn-lg "><span className='text-white'>
            STAY ALERT
</span>
</button>
        <SideBar
          onSidebarHide={() => {
            onSetShowSidebar(true);
          }}
          showSidebar={showSidebar}
        />

<button className="btn bg-[#8b0000] mt-20 ml-[112rem] z-10 "><span className='text-white'>
  Post
</span>
</button>
      {/* <CreateMissing /> */}
      
      <div className="ml-[22rem] flex flex-wrap gap-4">

      {missingPersons.map(person => (

      <div className="card lg:card-side bg-[#8b0000] shadow-xl mr-2 ml-2">
  <figure><img className="h-80 w-80" src={person.imageUrl} alt="Album "/></figure>
  <div className="card-body">
    <h2 className="card-title">{person.firstName} {person.lastName}</h2>
    <div className="card-actions justify-end">
      <button className="btn bg-[#1e1e1e] w-72 flex items-center justify-between  hover:bg-transparent">
      <span className="text-black  absolute text-xs">Age</span>
      <span className="text-black ml-[14rem] text-sm">{person.age}</span>
      </button>
    </div>
    <div className="card-actions justify-end">
      <button className="btn bg-[#1e1e1e] w-72 flex items-center justify-between  hover:bg-transparent">
      <span className="text-black  absolute text-xs">Last Seen</span>
      <span className="text-black ml-44 text-sm">{new Date(person.lastSeen).toLocaleDateString()}</span>
      </button>
    </div>
    <div className="card-actions justify-end">
      <button className="btn bg-[#1e1e1e] w-72 flex items-center justify-between  hover:bg-transparent">
      <span className="text-black  absolute text-xs">Date Missing</span>
      <span className="text-black ml-[10.5rem] text-sm">{new Date(person.dateMissing).toLocaleDateString()}</span>
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
     </div>

      )
}

export default missing