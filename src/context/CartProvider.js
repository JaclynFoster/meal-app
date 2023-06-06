import React, { useReducer } from 'react'
import CartContext from './cart-context'

const defaultCartState = {
  items: [],
  totalAmount: 0
}
// useReducer handles more complex state, outside of component function it doesn't need to be recreated everytime and needs nothing from the component below
const cartReducer = (state, action) => {
  // last state snapshot of the state managed by the reducer
  if (action.type === 'ADD') {
    const updatedItems = state.items.concat(action.item)
    // making a new array for state items, rendering brand new state object
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount
    // must return a new state snapshot
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }
  return defaultCartState
}

const CartProvider = props => {
  // state element, function are  destructured
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  )
  const addItemToCart = item => {
    dispatchCartAction({ type: 'ADD', item: item })
    // property names to identify the action name it something that makes sense i.e type
    // forward item you expect to get to the reducer as second argument i.e item
  }
  const removeItemFromCart = id => {
    dispatchCartAction({ type: 'REMOVE', id: id })
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart
  }
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider


