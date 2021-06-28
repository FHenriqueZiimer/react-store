import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Catalog from './pages/Catalog'
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Catalog} />
        <Route path='/cart/' exact component={Cart} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default  Routes