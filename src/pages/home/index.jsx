import React from 'react'
import { PageContext } from '../../lib/context'
import HomeView from './view'

const Home = () => {
  console.log("trigger");
  return (
    <PageContext.Provider value={{text: "hello"}}>
      <HomeView />
    </PageContext.Provider>
  )
}

export default Home