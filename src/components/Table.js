import React, { useContext, useEffect, useState } from 'react';
import StarContext from '../context/StarContext';

function Table() {
  const { planets } = useContext(StarContext);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues,
    setFilterByNumericValues] = useState([]);
  const [filtedPlanets, setFiltedPlanets] = useState([]);
  const [options, setOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  useEffect(() => {
    setFiltedPlanets(planets);
  }, [planets]);

  const filterFunc = () => {
    let filted = planets;
    filterByNumericValues.forEach((filter) => {
      if (filter.comparison === 'maior que') {
        filted = filted.filter((planet) => planet[filter.column] > filter.value);
      }
      if (filter.comparison === 'menor que') {
        filted = filted.filter((planet) => planet[filter.column] < filter.value);
      }
      if (filter.comparison === 'igual a') {
        filted = filted.filter((planet) => Number(planet[filter
          .column]) === filter.value);
      }
    });
    setFiltedPlanets(filted);
  };

  useEffect(() => {
    filterFunc();
  }, [filterByNumericValues]);

  const handleName = ({ target }) => {
    setFilterByName({ name: target.value });
  };

  const handleFilter = (e) => {
    const { target } = e;
    e.preventDefault();
    console.log(setOptions);
    setOptions(options.filter((op) => op !== target[1].value));
    setFilterByNumericValues([...filterByNumericValues, {
      column: target[1].value,
      comparison: target[2].value,
      value: Number(target[3].value),
    }]);
  };

  return (
    <div>
      <form onSubmit={ handleFilter }>
        <input type="text" data-testid="name-filter" onChange={ handleName } />
        <select data-testid="column-filter">
          {options.map((option, i) => (
            <option key={ i + option } value={ option }>{option}</option>
          ))}
        </select>
        <select data-testid="comparison-filter">
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input type="number" defaultValue="0" data-testid="value-filter" />
        <button type="submit" data-testid="button-filter">
          Adicionar Filtro
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Período de rotação</th>
            <th scope="col">Período orbital</th>
            <th scope="col">Diametro</th>
            <th scope="col">Clima</th>
            <th scope="col">Gravidade</th>
            <th scope="col">Terreno</th>
            <th scope="col">Superfície da Água</th>
            <th scope="col">População</th>
            <th scope="col">Filmes</th>
            <th scope="col">Feito Em</th>
            <th scope="col">Editado</th>
            <th scope="col">URL</th>
          </tr>
        </thead>
        <tbody>
          {filtedPlanets
            .filter(({ name }) => name.toLowerCase().includes(filterByName.name))
            .map((planet, i) => (
              <tr key={ i + planet.name }>
                <th scope="row">{planet.name}</th>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>
                  {planet.films.map((film) => film)}
                </td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
