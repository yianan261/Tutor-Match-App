import React from 'react'
import ManageBook from '../components/ManageBook'
import Navbar from '../components/Navbar'
import SideNav from '../components/SideNav'

function ManageBookingPage() {
  return (
    <div>ManageBookingPage
    <Navbar />
      <div className="flex">
      <SideNav />
        <ManageBook/>
      </div>
     
    </div>
  )
}

export default ManageBookingPage