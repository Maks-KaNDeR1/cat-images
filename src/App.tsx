import React from 'react';
import './App.css';
import { Header } from './Header/Header';
import { Cats } from './Cats/Cats';
import { FavouriteCats } from './FavouriteCats/FavouriteCats';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path={'/'} element={<Cats />} />
        <Route path={'/cats'} element={<Cats />} />
        <Route path={'/favorite-cats'} element={<FavouriteCats />} />
      </Routes>
    </div>
  );
}

export default App;
