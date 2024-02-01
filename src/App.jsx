//import React, { useState } from 'react'
import style from './App.module.css'
// import AnimalExample from '@/components/AnimalExample'
//import AnimalExampleWithApiStates from './components/AnimalExampleWithApiStates'
//import AnimalExampleWithApiStatesConstants from './components/AnimalExampleWithApiStatesConstants'
import AnimalExampleWithUseApiStatus from './components/AnimalExampleWithUseApiStatus'
import Logo from './components/Logo'

function App() {
  return (
    <div className="container flex  flex-col min-h-screen gap-8 p-4 mx-auto">
      <Logo />
      <AnimalExampleWithUseApiStatus />
    </div>
  )
}

export default App
