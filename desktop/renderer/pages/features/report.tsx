import React, {useState} from 'react'
import SideBar from '../../components/sideBar'

function report() {
    const [showSidebar, onSetShowSidebar] = useState(false);
    return (
      <div className="flex">
        <SideBar
          onSidebarHide={() => {
            onSetShowSidebar(true);
          }}
          showSidebar={showSidebar}
        />
      </div>
    )
}

export default report
