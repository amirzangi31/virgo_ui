import React, { useState } from 'react'
import { Button } from './components'
import Input from './components/Input/Input'
import IconButton from './components/ButtonClose/ButtonClose';
import IconButtonBack from './components/ButtonBack/ButtonBack';
import InputOtp from './components/InputOtp/InputOtp';
import Modal from './components/modal/Modal';
import Dropdown, { DropdownItem } from './components/Dropdown/Dropdown';
import Table from './components/table/Table';
const App = () => {
      const [loading, setLoading] = useState(false)
      const [modal, setModal] = useState(false)


      return (
            <div className='w-full h-screen flex-1 justify-center items-center'>
                  <Button
                        variant='default'
                        size='sm'
                        isLoading={loading}
                        isDisabled={loading}
                        onClick={() => {
                              setLoading(true)
                              setTimeout(() => {
                                    setLoading(false)
                              }, 2000);
                        }} >
                        test
                  </Button>
                  <div className='mt-4 '>
                        <Input variant="error" size="md" placeholder="شماره همراه خود را وارد کنید" label="شماره همراه" />
                        <IconButton />
                        <IconButtonBack color='purple' svgColor='danger' />
                       
                  </div>
                  <Button   onClick={() => setModal(true)} variant='primary' size='sm'>
                        Open Modal
                  </Button>

                  <Modal
                        isOpen={modal}
                        position='bottom-modal'
                        title='ثبت نام'
                        onClose={() => { setModal(false) }}
                        isClose
                  >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi doloribus neque corrupti delectus ullam rem minus dolor. Asperiores ipsa non illum blanditiis numquam porro, maiores dolores eum similique rem. Hic.
                        <Button variant='danger_outlined' onClick={() => {
                              console.log("object");
                        }} >
                              test
                        </Button>
                  </Modal>
                  <Dropdown
        trigger={<span>Click me</span>}
        triggerColor="purple"
        rounded="lg"
        position="center"
        minWidth="md"
      >
        <DropdownItem color="primary" onClick={() => console.log("Option 1 clicked")}>
          Option 1
        </DropdownItem>
        <DropdownItem color="danger" onClick={() => console.log("Option 2 clicked")}>
          Option 2
        </DropdownItem>
        <DropdownItem color="purple" onClick={() => console.log("Option 3 clicked")}>
          Option 3
        </DropdownItem>
      </Dropdown>
      <Table variant="primary" size="lg" border="solid">
  <thead>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
      <th>Header 3</th>
      <th>Header 4</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Row 1, Cell 1</td>
      <td>Row 1, Cell 2</td>
      <td>Row 1, Cell 3</td>
      <td>Row 1, Cell 4</td>
    </tr>
    <tr>
      <td>Row 2, Cell 1</td>
      <td>Row 2, Cell 2</td>
      <td>Row 2, Cell 3</td>
      <td>Row 2, Cell 4</td>
    </tr>
  </tbody>
</Table>



            </div >

      )
}

export default App