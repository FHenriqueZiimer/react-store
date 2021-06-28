import React from 'react';
import LoadImage from '../../components/LoadImage';
import styles from "./styles.module.css";
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';

const Posts = ({ products }) => {
  const history = useHistory();
  const alert = useAlert();

  async function addToCart(product) {
    const items = JSON.parse(localStorage.getItem("productsInCart")) || [];

    if(!product.quantity) {
      product.quantity = 1;
    }

    if(items.some(item => item.id === product.id)) {
      const foundIndex = items.findIndex(item => item.id === product.id);
      const quantity = product.quantity + 1;
      
      product.quantity = quantity

      items[foundIndex] = product;

      return localStorage.setItem('productsInCart', JSON.stringify(items));
    };
    
    items.push(product);
    
    await localStorage.setItem('productsInCart', JSON.stringify(items));

    history.push('/cart');
  };

  return (
    <div className={styles.catalog}>
      <ul className={styles.products}>
         {products.map((product, index) => (
          <li className={styles.item} key={index}>
            <LoadImage
              src={`${product.image}`}
              alt={product.name}
            ></LoadImage>
            <h2>{product.name.toUpperCase()}</h2>
            <h2 className={styles.category}>{product.image.replace('http://lorempixel.com/640/480/', '')}</h2>
            <h3>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number.parseFloat(product.price))}
            </h3>
            <button onClick={e => { addToCart(product); alert.show(`Produto ${product.name} adicionado ao carrinho!`, {  type: 'success' }) }} className={styles.addCartBtn}>ADICIONAR AO CARRINHO</button>
          </li>
        ))}
      </ul>
  </div>
  );
};

export default Posts;
