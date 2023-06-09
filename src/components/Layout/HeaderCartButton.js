import React, { useContext, useEffect, useState } from 'react'
import CartIcon from '../Cart/CartIcon'
import CartContext from '../../context/cart-context'
import classes from './HeaderCartButton.module.css'

const HeaderCartButton = props => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)
  const cartCtx = useContext(CartContext)
  const numberOfCartItems = cartCtx.items.reduce((currNum, accItem) => {
    return currNum + accItem.amount
  }, 0)

  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`
  const { items } = cartCtx
  useEffect(
    () => {
      if (cartCtx.length === 0) {
        return
      }
      setBtnIsHighlighted(true)
      setTimeout(() => {
        setBtnIsHighlighted(false)
      }, 300)
    },
    [items]
  )
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton



