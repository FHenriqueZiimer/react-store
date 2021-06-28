import React, { useState, useEffect} from 'react';
import Header from '../../components/Header';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import ScrollToTop from "../../components/ScrollToTopBtn";
import { useAlert } from 'react-alert'


function Cart () {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState('')
  const items = JSON.parse(localStorage.getItem('productsInCart'));
  const alert = useAlert();

  useEffect(() => {
    setCart(items)
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const totalPrice = items.reduce((prev, cur) => {
      return prev + parseInt(cur.price * cur.quantity);
    }, 0);  

    setTotalPrice(totalPrice)
  }, [cart, items])

  function removeItem (id) {
    items.splice(items.findIndex(item => item.id === id), 1)

    setCart(items)
    localStorage.setItem('productsInCart', JSON.stringify(items));
  };

  function chanceQuantity (action, product) {
    if(action === 'decrement' && product.quantity <= 1) {
      removeItem(product.id);
      alert.show(`Produto ${product.name} removido do carrinho`, { type: 'success' })
    }

    if(action === 'increment') {
      const foundIndex = items.findIndex(item => item.id === product.id);
      const quantity = product.quantity + 1;

      product.quantity = quantity

      items[foundIndex] = product;

      setCart(items)
      return localStorage.setItem('productsInCart', JSON.stringify(items));
    }

    if(action === 'decrement') {
      const foundIndex = items.findIndex(item => item.id === product.id);
      const quantity = product.quantity - 1;

      product.quantity = quantity

      items[foundIndex] = product;

      setCart(items)
      return localStorage.setItem('productsInCart', JSON.stringify(items));
    }
  }


  if(cart === null || cart.length <= 0) {
    return (
      <>
      <Header></Header>
      <main className={styles.main}>
        <div className={styles.indexContainer}>
          <h3 className={styles.h1}>CARRINHO</h3>
          <p><Link to='/' className={styles.link}>Página Inicial </Link> | Carrinho</p>
        </div>
          <div className={styles.container}>
            <h3>Seu carrinho está vázio</h3>
          </div>
      </main>
      </>
    )
  } 
  return (
    <>
    <Header></Header>
    <main className={styles.main}>
      <div className={styles.indexContainer}>
        <h3 className={styles.h1}>CARRINHO</h3>
        <p><Link to='/' className={styles.link}>Página Inicial </Link> | Carrinho</p>
      </div>
      <div className={styles.container}>
       <article className={styles.article}>
         <h1>ITENS</h1>
            {cart.map(item => (
              <div key={item.id} className={styles.item}>
                <img src={`${item.image}`} alt={item.name}></img>
                <h1>{item.name.toUpperCase()}</h1>
                {item.quantity >= 2 ? 
                  <>
                    <h1>Valor Unitário: {Intl.NumberFormat('pt-BR',{ style: 'currency', currency: 'BRL'}).format(Number.parseFloat(item.price))}</h1>
                    <h1>{Intl.NumberFormat('pt-BR',{ style: 'currency', currency: 'BRL'}).format(Number.parseFloat(item.price * item.quantity))}</h1>
                  </>
                  : <h1>{Intl.NumberFormat('pt-BR',{ style: 'currency', currency: 'BRL'}).format(Number.parseFloat(item.price))}</h1>
                }
                <div className={styles.quantity}>
                  <p>Quantidade</p>
                  <div>
                    <button value='decrement' onClick={e => chanceQuantity(e.target.value, item)}>-</button><input min='1' max={item.stock} value={item.quantity} readOnly type='number'></input><button value='increment' onClick={e => chanceQuantity(e.target.value, item)}>+</button>
                  </div>
                </div>
                <button className={styles.primaryBtn} onClick={() => { removeItem(item.id); alert.show(`Produto ${item.name} removido do carrinho`, { type: 'success' }) }}>REMOVER ITEM</button>
              </div>
            ))}
          </article>
          <aside className={styles.resumeCart}> 
            <div className={styles.fixed}>
              <h1>RESUMO DO PEDIDO</h1>
              <h2>Preço Total: {Intl.NumberFormat('pt-BR',{ style: 'currency', currency: 'BRL'}).format(Number.parseFloat(totalPrice))}</h2>
              <button className={styles.primaryBtn}>FINALIZAR COMPRA</button>
            </div>
          </aside>
      </div>
      <ScrollToTop></ScrollToTop>

    </main>
    </>
  )
  }

export default Cart