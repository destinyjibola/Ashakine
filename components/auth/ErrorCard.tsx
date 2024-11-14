import React from 'react'
import CardWrapper from './CardWrapper'
import { FaExclamationTriangle } from 'react-icons/fa'

const ErrorCard = () => {
  return (
   <CardWrapper headerLabel='Oops! something went wrong' backButtonHref='/auth/login' backButtonLabel='Back to login'>
    <div className='w-full flex justify-center items-center'>
        <FaExclamationTriangle className='text-destructive' />

    </div>

   </CardWrapper>
  )
}

export default ErrorCard