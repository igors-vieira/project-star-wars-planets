import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData'

describe('teste do Provider', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(testData),
  });
  })
  test('teste se o fetch esta sendo chamado', async () => {
    render(<App />);
    expect(await screen.findAllByRole('rowheader')).toHaveLength(10)

    expect(fetch).toBeCalled();

    expect(fetch).toBeCalledWith('https://swapi-trybe.herokuapp.com/api/planets/');
  });
})
