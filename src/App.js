import React, { Fragment, useState } from 'react'
import Header from './components/Layout/Header'
import './App.css'
import Meals from './components/Meals/Meals'
import Cart from './components/Cart/Cart'

function App () {
  const [showCart, setShowCart] = useState(false)

  const showCartHandler = () => {
    setShowCart(true)
  }

  const hideCartHandler = () => {
    setShowCart(false)
  }

  return (
    <Fragment>
      {/* below states if showCart truthy then Modal will appear */}
      {showCart && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </Fragment>
  )
}

export default App

