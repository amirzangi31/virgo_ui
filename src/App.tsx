import React, { useState } from 'react'
import { Button } from './components'
import { Loader } from './components/Loader'

const App = () => {
      const [loading, setLoading] = useState(false)
      return (
            <div className='w-full h-screen flex justify-center items-center gap-2' >
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
                  <Button
                        variant='primary_outlined'
                        size='sm'
                        isLoading={loading}
                        isDisabled={loading}
                        loader={<Loader  variant='primary'  />}
                        onClick={() => {
                              setLoading(true)
                              setTimeout(() => {
                                    setLoading(false)
                              }, 2000);
                        }} >
                        test
                  </Button>
                  <Loader label='test' variant='primary' size="sm" />
            </div>
      )
}

export default App