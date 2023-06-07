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
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount
    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.item.id
    )
    const existingCartItem = state.items[existingCartItemIndex]

    let updatedItems
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      }
      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex] = updatedItem
    } else {
      updatedItems = state.items.concat(action.item)
    }

    // making a new array for state items, rendering brand new state object
    // must return a new state snapshot
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }
  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.id
    )
    const existingItem = state.items[existingCartItemIndex]
    const updatedTotalAmount = state.totalAmount - existingItem.price
    let updatedItems
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id)
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 }
      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex] = updatedItem
    }
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




