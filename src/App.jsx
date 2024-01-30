//import React, { useState } from 'react'
import style from './App.module.css'
// import AnimalExample from '@/components/AnimalExample'
import AnimalExampleWithApiStates from './components/AnimalExampleWithApiStates'
import Logo from './components/Logo'

function App() {
  return (
    <div className="container flex  flex-col min-h-screen gap-8 p-4 mx-auto">
      <Logo />
      <AnimalExampleWithApiStates />
    </div>
  )
}

export default App
