import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarContext from './StarContext';

function StarProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  useEffect(() => {
    const starApi = async () => {
      const endPoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const response = await fetch(endPoint);
      const jsonResp = await response.json();
      const deletedJson = jsonResp.results.filter((planeta) => delete planeta.residents);
      setPlanets(deletedJson);
    };
    starApi();
  }, []);

  const context = {
    planets,
  };
  return (
    <StarContext.Provider value={ context }>
      {children}
    </StarContext.Provider>
  );
}

StarProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default StarProvider;
