import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home'
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/cart/' exact component={Cart} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default  Routes