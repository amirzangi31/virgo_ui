import React from 'react'
import { CiEdit, CiTrash } from 'react-icons/ci'
import { Button } from '../Button'
import { VscEye } from "react-icons/vsc";

type CrudButtonsType = {
      deleteButtonHandler?: () => void
      editButtonHandler?: () => void
      detailButtonHandler?: () => void
      deleteLoading?: boolean,
      editLoading?: boolean
      detailLoading?: boolean
      buttons: {
            isDelete?: boolean,
            isEdit?: boolean,
            isDetail?: boolean,

      }
}


const CrudButtons = (props: CrudButtonsType) => {
      const { deleteButtonHandler, deleteLoading, editButtonHandler, detailButtonHandler, detailLoading, editLoading, buttons: { isDelete = true, isEdit = true , isDetail = true } } = props

      return (
            <div className='flex justify-center items-center gap-2'>

                  {isEdit && (<Button
                        isDisabled={editLoading}
                        isLoading={editLoading}
                        variant='primary_outlined'
                        className='md:min-w-fit group p-0 size-[2.5rem]'
                        onClick={editButtonHandler}
                  >
                        <CiEdit className='text-primary text-2xl group-hover:text-white' />
                  </Button>)}
                  {
                        isDelete && (
                              <Button
                                    isDisabled={deleteLoading}
                                    isLoading={deleteLoading}
                                    className='md:min-w-fit text-error group p-0 size-[2.5rem]'
                                    variant='danger_outlined'
                                    onClick={deleteButtonHandler}
                              >
                                    <CiTrash className='text-error text-2xl group-hover:text-white' />

                              </Button>
                        )
                  }
                  {
                        isDetail && (
                              <Button
                                    isDisabled={detailLoading}
                                    isLoading={detailLoading}
                                    className='md:min-w-fit text-gray-500 group p-0 size-[2.5rem]'
                                    variant='default_outlined'
                                    onClick={detailButtonHandler}
                              >
                                    <VscEye className='text-gray-500  text-2xl group-hover:text-white' />
                              </Button>
                        )
                  }
            </div>
      )
}

export default CrudButtons