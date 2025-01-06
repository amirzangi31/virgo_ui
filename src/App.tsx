import React, { useEffect, useState } from 'react'
import Header from './components/header/Header'
import { BackButton, Button, Dropdown, Loader, Modal, Pagination, SectionTitle, Sidebar, Table, TextField } from './components'
import SidebarHeader from './components/sidebar/SidebarHeader'
import SidebarItem from './components/sidebar/SidebarItem'
import SidebarDropdown from './components/sidebar/SidebarDropdown'
import { HeaderMobile } from './components/headermobile'
import { TableColumnUi } from './types/GlobalType'
import { useForm, SubmitHandler } from 'react-hook-form';
import { RadioButton } from './components/radioButton'
import { toast } from './components/toast/toastManager'
import Tooltip from './components/tooltip/Tooltip'


type FormValues = {
      username: string;
      email: string;
};
const App = () => {
      const [isOpen, setIsOpen] = useState(true)
      const [sideBarIndex, setSideBarIndex] = useState<null | number>(null)
      const [data, setData] = useState([])
      const [radioButton, setRadioButton] = useState<string | number>("isCenter")

      const columns: TableColumnUi<{ id: number; title: string; body: string; }>[] = [
            { key: "id", label: "ID", sortable: true, width: "10%" },
            { key: "title", label: "Title", sortable: true, filterable: true, width: "30%" },
            { key: "body", label: "Description", sortable: true, width: "60%" },
      ];

      const handleRowSelect = (selectedRows: number[]) => {
            // console.log("Selected Rows:", selectedRows);
      };
      const [loading, setLoading] = useState(false)
      const fetchData = async () => {
            setLoading(true)
            const res = await fetch("https://jsonplaceholder.typicode.com/posts")
            const result = await res.json()
            setData(result)
            setLoading(false)
            return result
      }
      useEffect(() => {
            fetchData()
      }, [])


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
                                    }} open={sideBarIndex === 0} title='مدیریت شهر و استان' icon={<p>Icon</p>} isOpen={isOpen} >
                                          <SidebarItem isOpen={isOpen} text='تست' icon={<p>Icon</p>} />
                                    </SidebarDropdown>
                                    <SidebarDropdown handler={() => {
                                          if (sideBarIndex === 1) {
                                                setSideBarIndex(null)
                                                return
                                          }
                                          setSideBarIndex(1)
                                    }} open={sideBarIndex === 1} title='مدیریت شهر و استان' icon={<p>Icon</p>} isOpen={isOpen} >
                                          <SidebarItem isOpen={isOpen} text='تست' icon={<p>Icon</p>} />
                                    </SidebarDropdown>
                                    <SidebarDropdown handler={() => {
                                          if (sideBarIndex === 2) {
                                                setSideBarIndex(null)
                                                return
                                          }
                                          setSideBarIndex(2)
                                    }} open={sideBarIndex === 2} title='مدیریت شهر و استان' icon={<p>Icon</p>} isOpen={isOpen} >
                                          <SidebarItem isOpen={isOpen} text='تست' icon={<p>Icon</p>} />
                                    </SidebarDropdown>
                              </div>
                        </Sidebar>
                        <div className='shadow-shadow_category rounded-xl bg-white w-full p-4 h-[calc(100vh-120px)] overflow-y-auto'>
                              <SectionTitle >
                                    est
                              </SectionTitle>
                              <Table
                                    className='mt-8'
                                    refetch={() => { console.log('refetch') }}
                                    data={data.map((data: { id: number, title: string, body: string }, index) => {
                                          return {
                                                id: data.id, title: data.title, body: data.body
                                          }
                                    }) || []}

                                    columns={columns}
                                    variant="primary"
                                    textColor='primary'
                                    size="lg"
                                    asyncSortableFun={async (sort, key) => {

                                    }}
                                    border="solid"
                                    enableRowSelect={true}
                                    loading={loading}
                                    pagination={<Pagination
                                          pageCount={pageCount} // تعداد کل صفحات
                                          currentPage={currentPage} // صفحه فعلی
                                          onPageChange={handlePageChange}
                                          activeVariant='primary'
                                          className="justify-center" // کلاس سفارشی
                                          nextLabel={<BackButton svgColor='primary' />}
                                          size='sm'
                                          previousLabel={<BackButton svgColor='primary' />}
                                          breakLabel={<span className="text-gray-400">...</span>} // جداکننده صفحات
                                          activeClassName="bg-green-500 text-white" // استایل برای صفحه فعال
                                          renderOnZeroPageCount={() => <p>No pages available</p>} // رفتار برای زمانی که صفحه‌ای وجود ندارد
                                          variant={'primary'} />}
                                    onRowSelect={handleRowSelect}
                                    rowCount={{
                                          count: 10,
                                          handler: (count) => { console.log(count) },
                                          cotent: [{ value: 10, name: '10' }, { value: 20, name: '20' }, { value: 30, name: '30' }, { value: 40, name: '40' }, { value: 50, name: '50' }]
                                    }}
                              />
                              <div>
                                    <RadioButton
                                          id="radio-1"
                                          name="group-1"
                                          value="option-1"
                                          title="Option 1"
                                          isChecked={radioButton === "option-1"}
                                          changeHandler={(value) => setRadioButton(value)}
                                          variant="white"
                                          size="md"
                                          background="primary"
                                    />
                                    <RadioButton
                                          id="radio-2"
                                          name="group-1"
                                          value="option-2"
                                          title="Option 2"
                                          isChecked={radioButton === "option-2"}
                                          changeHandler={(value) => setRadioButton(value)}
                                          variant="secondary"
                                          size="md"
                                          background="default"
                                    />

                                    {/* <Tooltip content="lorem cafdaadsf asdf asdf" position='top-center' variant='danger'>
                                          <p className='mx-auto  border border-error rounded-lg w-fit'>×</p>
                                    </Tooltip> */}
                              </div>
                              <Button variant='primary' onClick={() => {
                                    //  const [toasts, setToasts] = useState<ToastManagerType[]>([]);


                                    //  const addToast = (toast: Omit<ToastManagerType, "id" | "onClose">) => {
                                    //        setToasts((prevToasts) => [
                                    //              ...prevToasts,
                                    //              {
                                    //                    ...toast,
                                    //                    id: Date.now(),
                                    //                    onClose: (id) =>
                                    //                          setToasts((prevToasts) =>
                                    //                                prevToasts.filter((toast) => toast.id !== id)
                                    //                          ),
                                    //              },
                                    //        ]);
                                    //  };
                                    // addToast({
                                    //       title: "خطا",
                                    //       message:
                                    //             (error instanceof Error ? error.message : "مشکلی در دریافت اطلاعات رخ داد!") ||
                                    //             "مشکلی در دریافت اطلاعات رخ داد!",
                                    //       variant: "danger",
                                    //       rounded: "md",
                                    //       autoClose: 5000,
                                    //       position: "bottom-right",
                                    // });


                              }}>
                                    test
                              </Button>
                        </div>
                        <button type='button' className='border border-error p-4' onClick={() => {
                              toast("test", 'warning')
                              toast("test", 'error', "top-right")
                              toast("test", 'success')
                        }}>
                              show toast
                        </button>
                  </main>
            </div>
      )
}

export default App