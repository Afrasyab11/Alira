import React from 'react'
import Sidebar from './Sidebar'
import ChatInterphase from './ChatInterphase'

const Dashbaord = () => {
    return (
        <div className='flex w-full'>
            <Sidebar />
            <ChatInterphase />
        </div>
    )
}

export default Dashbaord
