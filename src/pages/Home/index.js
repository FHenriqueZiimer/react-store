import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import ScrollToTop from "../../components/ScrollToTopBtn";
import styles from "./styles.module.css";
import LoadingError from '../../components/LoadingError';
import { Link } from 'react-router-dom';
import Pagination from "../../components/Pagination";
import CatalogProd from "../../components/Catalog";


function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [error, setErro] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('newest');

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
  }, [sort]);

  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPost = indexOfLastPost - productsPerPage;
  const currentProducts = products.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

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
              <CatalogProd products={currentProducts} />
              <Pagination
                productsPerPage={productsPerPage}
                totalProducts={products.length}
                paginate={paginate}
              />
            </div>
          <ScrollToTop></ScrollToTop>
        </main>
      </>
    );
  }
}

export default Home;
