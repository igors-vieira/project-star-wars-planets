import React, { useContext, useState } from 'react';
import StarContext from '../context/StarContext';

function Table() {
  const { planets } = useContext(StarContext);
  const [filterByName, setFilterByName] = useState({ name: '' });

  const handleFilter = ({ target }) => {
    setFilterByName({ name: target.value });
  };

  return (
    <div className="App">
      <input className="App" data-testid="name-filter" onChange={ handleFilter } />
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
            .filter(({ name }) => name.includes(filterByName.name)).map((planet, i) => (
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
