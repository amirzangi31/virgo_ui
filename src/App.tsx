import React, { useState } from 'react'
import Header from './components/header/Header'
import { Sidebar } from './components'
import SidebarHeader from './components/sidebar/SidebarHeader'
import SidebarItem from './components/sidebar/SidebarItem'
import SidebarDropdown from './components/sidebar/SidebarDropdown'
import { HeaderMobile } from './components/headermobile'

const App = () => {
      const [isOpen, setIsOpen] = useState(false)
      const [sideBarIndex, setSideBarIndex] = useState(2)

      return (
            <div className='flex justify-start items-start  flex-col min-h-screen bg-bg_content'>
                  <Header />
                  <HeaderMobile rightElement={<button type='button' onClick={() => {
                        setIsOpen(true)
                  }}>test</button>} >
                        صفحه اصلی
                  </HeaderMobile>
                  <main className='flex justify-between  items-stretch gap-2  h-[calc(100vh-96px)]  py-2 w-full px-4 relative'>

                        <Sidebar isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} >
                              <SidebarHeader isOpen={isOpen} rightButton={<p>right</p>} leftButton={<p>left</p>} >
                                    <p className='text-sm'>امیرمحمد زنگی آبادی </p>
                              </SidebarHeader>
                              <div className='py-4'>
                                    <SidebarItem isOpen={isOpen} text='تست' icon={<p>Icon</p>} />
                                    <SidebarDropdown handler={() => setSideBarIndex(0)} open={sideBarIndex === 0} title='test' icon={<p>Icon</p>} isOpen={isOpen} >
                                          <SidebarItem isOpen={isOpen} text='تست' icon={<p>Icon</p>} />
                                    </SidebarDropdown>
                                    <SidebarDropdown handler={() => setSideBarIndex(1)} open={sideBarIndex === 1} title='test' icon={<p>Icon</p>} isOpen={isOpen} >
                                          <SidebarItem isOpen={isOpen} text='تست' icon={<p>Icon</p>} />
                                    </SidebarDropdown>
                                    <SidebarDropdown handler={() => setSideBarIndex(2)} open={sideBarIndex === 2} title='test' icon={<p>Icon</p>} isOpen={isOpen} >
                                          <SidebarItem isOpen={isOpen} text='تست' icon={<p>Icon</p>} />
                                    </SidebarDropdown>
                              </div>
                        </Sidebar>

                        <div className='shadow-shadow_category rounded-xl bg-white w-full '>

                        </div>

                  </main>
            </div>
      )
}

export default App