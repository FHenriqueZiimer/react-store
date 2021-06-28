import React from 'react';
import logo from '../../assets/logo-2x.png'
import { BsSearch } from 'react-icons/bs';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './header.module.css';

function Header () {
  return (
    <header>
      <div>
        <Link to='/'><img className={styles.img} alt='logo' src={logo}></img></Link>
      </div>
      <div className={styles.searchBar}>
        <input placeholder='Pesquisa'></input>
        <button className={styles.btnSearch}><BsSearch></BsSearch></button>
      </div>
      <div>
        <Link to='/cart' className={styles.btnCart}><FaShoppingCart size={20}></FaShoppingCart></Link>
      </div>
    </header>
  )
}


export default Header