import React, { useContext } from 'react'
import { PageContext } from '../../lib/context'

const HomeView = () => {
    const {text} = useContext(PageContext);
  return (
    <div className='flex items-center justify-center'>{text ?? 'bye'}</div>
  )
}

export default HomeView