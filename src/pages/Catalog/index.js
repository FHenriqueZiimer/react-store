import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import ScrollToTop from "../../components/ScrollToTopBtn";
import styles from "./styles.module.css";
import LoadImage from '../../components/LoadImage';
import LoadingError from '../../components/LoadingError';
import { Link } from 'react-router-dom';

function Catalog() {
  const [error, setErro] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('newest');


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
  };


  useEffect(() => {
    fetch("https://5d6da1df777f670014036125.mockapi.io/api/v1/product")
      .then((res) => res.json())
      .then((result) => {
        setProducts(result.slice().sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()));
        setIsLoaded(true);
      })
      .catch((erro) => setErro(erro));
  }, []);

  useEffect(() => {
    if(sort === 'newest') {
      setProducts(products.slice().sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()))
    };
    if(sort === 'bigest') {
      setProducts(products.slice().sort((a, b) => b.price - a.price))
    }
    if(sort === 'lowest') {
      setProducts(products.slice().sort((a, b) => a.price - b.price))
    }
    // eslint-disable-next-line
  }, [sort])

  if (error) {
    return (
      <>
        <Header></Header>
        <LoadingError></LoadingError>
      </>
    );
  } else if (!isLoaded) {
    return (
      <>
        <Header></Header>
        <Loading></Loading>
      </>
    );
  } else {
    return (
      <>
        <Header></Header>
        <main className={styles.main}>
          <div className={styles.indexContainer}>
            <h3 className={styles.h1}>TODOS OS PRODUTOS</h3>
            <p><Link to='/' className={styles.link}>Página Inicial </Link></p>
          </div>
          <div className={styles.container}>
            <div className={styles.sort}>
              <span>{products.length} Produtos encontrados</span>
                <select onChange={e => setSort(e.target.value)}>
                  <option value='newest'>Ordenar por: Novidade</option>
                  <option value='lowest'>Ordernar por: Menor Preço</option>
                  <option value='bigest'>Ordernar por: Maior Preço</option>
                </select>
            </div>
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
                      <button onClick={e => addToCart(product)} className={styles.addCartBtn}>ADICIONAR AO CARRINHO</button>
                    </li>
                  ))}
                </ul>
            </div>
          </div>
          <ScrollToTop></ScrollToTop>
        </main>
      </>
    );
  }
}

export default Catalog;
