import React from 'react'
import DashSide from '../component/Dashboard/DashSide'
import DashNav from '../component/Dashboard/DashNav'
import { Outlet } from 'react-router-dom'
import DashFooter from '../component/Dashboard/DashFooter'

const Dashboard = () => {
    return (
        <div>
            <div className="">
                <div className="">
                    <DashSide />
                </div>
                <div className="">
                    <DashNav />
                </div>
            </div>
            <div className="">
                <Outlet />
            </div>
            <div className="">
                <DashFooter />
            </div>
        </div>
    )
}

export default Dashboard