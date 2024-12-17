import React, { useState } from 'react'
import { Button } from './components'
import Input from './components/Input/Input'
import IconButton from './components/ButtonClose/ButtonClose';
import IconButtonBack from './components/ButtonBack/ButtonBack';
import InputOtp from './components/InputOtp/InputOtp';
import Modal from './components/modal/Modal';
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
                        <InputOtp variant="default" />
                  </div>


                  <Button onClick={() => setModal(true)} variant='primary' size='sm'>
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
            </div >

      )
}

export default App