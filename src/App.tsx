import React, { useState } from 'react'
import { Button } from './components'

const App = () => {
      const [loading, setLoading] = useState(false)
      return (
            <div className='w-full h-screen flex justify-center items-center'>
                  <Button
                        variant='warning' size='md'
                        isLoading={loading}
                        isDisabled={loading}
                        classname='' onClick={() => {
                              setLoading(true)
                              setTimeout(() => {
                                    setLoading(false)
                              }, 2000);
                        }} >
                        test
                  </Button>
            </div>
      )
}

export default App