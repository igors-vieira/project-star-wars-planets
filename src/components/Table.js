import React, { useContext, useState } from 'react';
import StarContext from '../context/StarContext';

function Table() {
  const { planets } = useContext(StarContext);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues,
    setFilterByNumericValues] = useState([]);

  const handleName = ({ target }) => {
    setFilterByName({ name: target.value });
  };

  const handleFilter = (e) => {
    const { target } = e;
    e.preventDefault();
    setFilterByNumericValues({
      column: target[1].value,
      comparison: target[2].value,
      value: Number(target[3].value),
    });
    console.log(filterByNumericValues);
  };

  return (
    <div>
      <form onSubmit={ handleFilter }>
        <input type="text" data-testid="name-filter" onChange={ handleName } />
        <select data-testid="column-filter">
          <option value="population">population</option>
          <option value="diameter">diameter</option>
          <option value="orbital_period">orbital_period</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
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
          {planets && planets
            .filter(({ name }) => name.includes(filterByName.name))
            .filter((planet) => {
              if (filterByNumericValues.comparison === 'maior que') {
                return planet[filterByNumericValues
                  .column] > filterByNumericValues.value;
              }
              if (filterByNumericValues.comparison === 'menor que') {
                return planet[filterByNumericValues
                  .column] < filterByNumericValues.value;
              }
              if (filterByNumericValues.comparison === 'igual a') {
                return Number(planet[filterByNumericValues
                  .column]) === filterByNumericValues.value;
              }
              return true;
            })
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
