import React, { useState } from 'react'
import Header from './components/header/Header'
import { Button, Loader, Modal, Pagination, SectionTitle, Sidebar, Table, TextField } from './components'
import SidebarHeader from './components/sidebar/SidebarHeader'
import SidebarItem from './components/sidebar/SidebarItem'
import SidebarDropdown from './components/sidebar/SidebarDropdown'
import { HeaderMobile } from './components/headermobile'
import { TableColumnUi } from './types/GlobalType'
import { useForm, SubmitHandler } from 'react-hook-form';
import SearchComponent from './components/SearchComponent/SearchComponent';

type FormValues = {
      username: string;
      email: string;
};
const App = () => {
      const [isOpen, setIsOpen] = useState(true)
      const [sideBarIndex, setSideBarIndex] = useState<null | number>(null)
      const data = [
            { id: 1, name: "John Doe", age: 28, role: "Developer" },
            { id: 2, name: "Jane Smith", age: 34, role: "Designer" },
            { id: 3, name: "Sam Johnson", age: 25, role: "Manager" },
            { id: 4, name: "Alice Brown", age: 30, role: "Tester" },
      ];

      const columns: TableColumnUi<{ id: number; name: string; age: number; role: string }>[] = [
            { key: "id", label: "ID", sortable: true, width: "10%" },
            { key: "name", label: "Name", sortable: true, filterable: true, width: "30%" },
            { key: "age", label: "Age", sortable: true, width: "20%" },
            { key: "role", label: "Role", width: "40%" },
      ];

      const handleRowSelect = (selectedRows: number[]) => {
            console.log("Selected Rows:", selectedRows);
      };

      const {
            register,
            handleSubmit,
            formState: { errors },
      } = useForm<FormValues>();
      const onSubmit: SubmitHandler<FormValues> = (data) => {
            console.log(data);
      };
      const [currentPage, setCurrentPage] = useState(1); // وضعیت صفحه فعلی
      const pageCount = 10;

      const handlePageChange = (page: number) => {
            console.log(`Page changed to: ${page}`);
            setCurrentPage(page);
      };
      return (
            <div className='flex justify-start items-start  flex-col h-screen bg-bg_content'>
                  <Header />
                  <HeaderMobile rightElement={<button type='button' onClick={() => {
                        setIsOpen(true)
                  }}>test</button>} >
                        صفحه اصلی
                  </HeaderMobile>
                  <main className='flex justify-between  items-stretch container  gap-2  h-[calc(100vh-96px)]  py-2 w-full  relative'>
                        <Sidebar isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} >
                              <SidebarHeader isOpen={isOpen} rightButton={<p>right</p>} leftButton={<p>left</p>} >
                                    <p className='text-sm'>امیرمحمد زنگی آبادی </p>
                              </SidebarHeader>
                              <div className='py-4'>
                                    <SidebarItem isOpen={isOpen} text='تست' icon={<p>Icon</p>} />
                                    <SidebarDropdown handler={() => {
                                          if (sideBarIndex === 0) {
                                                setSideBarIndex(null)
                                                return
                                          }
                                          setSideBarIndex(0)
                                    }} open={sideBarIndex === 0} title='test' icon={<p>Icon</p>} isOpen={isOpen} >
                                          <SidebarItem isOpen={isOpen} text='تست' icon={<p>Icon</p>} />
                                    </SidebarDropdown>
                                    <SidebarDropdown handler={() => {
                                          if (sideBarIndex === 1) {
                                                setSideBarIndex(null)
                                                return
                                          }
                                          setSideBarIndex(1)
                                    }} open={sideBarIndex === 1} title='test' icon={<p>Icon</p>} isOpen={isOpen} >
                                          <SidebarItem isOpen={isOpen} text='تست' icon={<p>Icon</p>} />
                                    </SidebarDropdown>
                                    <SidebarDropdown handler={() => {
                                          if (sideBarIndex === 2) {
                                                setSideBarIndex(null)
                                                return
                                          }
                                          setSideBarIndex(2)
                                    }} open={sideBarIndex === 2} title='test' icon={<p>Icon</p>} isOpen={isOpen} >
                                          <SidebarItem isOpen={isOpen} text='تست' icon={<p>Icon</p>} />
                                    </SidebarDropdown>
                              </div>
                        </Sidebar>
                        <div className='shadow-shadow_category rounded-xl bg-white w-full p-4'>
                              <SectionTitle >
                                    est
                              </SectionTitle>
                              <Loader label='درحال بارگذاری' />
                              <Table
                                    className='mt-8'
                                    data={data}
                                    columns={columns}
                                    variant="primary"
                                    textColor='primary'
                                    size="lg"

                                    border="solid"
                                    enableRowSelect={true}
                                    pagination={true}
                                    onRowSelect={handleRowSelect}
                              />
                              <TextField
                                    label="نام کاربری"
                                    name="username"
                                    placeholder="نام کاربری را وارد کنید"
                                    size="md"
                                    rounded="lg"
                                    register={register('username', { required: 'نام کاربری الزامی است' })}
                                    error={errors.username}
                              />
                        </div>
                        <Button loader={<Loader variant='white' size='sm' />} isLoading={true}>
                              dsaf
                        </Button>
                        <SearchComponent value='test' variant='white' changeHandler={() => console.log("0")} />
                        <Pagination
                              pageCount={pageCount} // تعداد کل صفحات
                              currentPage={currentPage} // صفحه فعلی
                              onPageChange={handlePageChange}
                              className="justify-center" // کلاس سفارشی
                              nextLabel={<span>
                                    test
                              </span>}
                              previousLabel={// آیکون دکمه قبلی
                                    <span>
                                          test
                                    </span>}
                              breakLabel={<span className="text-gray-400">...</span>} // جداکننده صفحات
                              activeClassName="bg-green-500 text-white" // استایل برای صفحه فعال
                              renderOnZeroPageCount={() => <p>No pages available</p>} // رفتار برای زمانی که صفحه‌ای وجود ندارد
                              variant={'default'} />
                  </main>
            </div>
      )
}

export default App