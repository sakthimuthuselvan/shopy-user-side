import React from 'react'
import SideBarList from './SidebarList'

function SideBar() {

  return (
    <div className={`sideNav pt-10vh primary-bg position-fixed`}>
      {
        SideBarList.map((item)=>{
          return(
            <div className='d-flex iconDiv cursor-pointer ml-1'>
                {item.icon}
         <div className='show fw-bold text-white ms-2'>{item.name}</div>
        </div>
          )
        })
      }
    </div>  )
}

export default SideBar