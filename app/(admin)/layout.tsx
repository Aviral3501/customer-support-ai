import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import React from 'react'

function AdminLayout({children}:{children:React.ReactNode}) {
  return (
    <div className='flex flex-col flex-1'>
        {/* header */}
        <Header/>

        <div className='flex flex-col flex-1 lg:flex-row bg-gray-100'>
            {/* sidebar */}
            <Sidebar/>

            <div className='flex flex-1 justify-center lg:justify-start items-start max-w-5xl mx-auto bg-slate-200 w-full'>
                {/* dashboard */}
                {children}
            </div>
        </div>

    </div>
  )
}

export default AdminLayout
