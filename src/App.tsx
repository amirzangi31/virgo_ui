import React, { useState } from 'react'
import { Button } from './components'
import Input from './components/Input/Input'
import IconButton from './components/ButtonClose/ButtonClose';
import IconButtonBack from './components/ButtonBack/ButtonBack';
import InputOtp from './components/InputOtp/InputOtp';
const App = () => {
      const [loading, setLoading] = useState(false)
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
                  <div className='mt-4 bg-red-700'>
                        <Input variant="default" size="md" placeholder="شماره همراه خود را وارد کنید" label="شماره همراه" />
                        <IconButton />
                        <IconButtonBack />
                        <InputOtp variant="default" />
                  </div>
            </div>

      )
}

export default App