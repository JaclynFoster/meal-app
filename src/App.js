import React, { Fragment, useState } from 'react'
import Header from './components/Layout/Header'
import './App.css'
import Meals from './components/Meals/Meals'
import Cart from './components/Cart/Cart'
import CartProvider from './context/CartProvider'

function App () {
  const [showCart, setShowCart] = useState(false)

  const showCartHandler = () => {
    setShowCart(true)
  }

  const hideCartHandler = () => {
    setShowCart(false)
  }

  return (
    <CartProvider>
      {/* below states if showCart truthy then Modal will appear */}
      {showCart && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  )
}

export default App


