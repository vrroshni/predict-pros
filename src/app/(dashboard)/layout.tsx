import { Sidebar } from '@/components/Sidebar'
import { Navbar } from '@/components/ui/Navbar'
import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-full relative'>
            <div className='hidden h-full md:flex md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900 md:w-72 '>
                <Sidebar />
            </div>
            <main className='md:pl-72 '>
                <Navbar />
                {children}
            </main>

        </div>
    )
}

export default DashboardLayout
