import React from 'react'
import HeaderCartButton from './HeaderCartButton'
import background from '../../assets/meals.jpeg'
import classes from './Header.module.css'

const Header = props => {
  return (
    <div>
      <header className={classes.header}>
        <h1>MealsApp</h1>
        <HeaderCartButton />
      </header>
      <div className={classes['main-image']}>
        <img src={background} alt="A table full of food" />
      </div>
    </div>
  )
}

export default Header
