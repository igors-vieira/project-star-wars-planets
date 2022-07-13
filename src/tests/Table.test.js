import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData'
import userEvent from '@testing-library/user-event';

describe('teste do componente Table', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(testData),
  });
  })
  test('teste do os filtro "maior que"', async () => {
    render(<App />);
  const btn = screen.getByTestId('button-filter')
  expect(screen.getAllByRole('columnheader')).toHaveLength(13)
  expect(btn).toBeInTheDocument()
  expect(await screen.findAllByRole('rowheader')).toHaveLength(10)
  userEvent.selectOptions(await screen.findByTestId("column-filter"), 'diameter')
  userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'maior que')
  userEvent.type(screen.getByTestId('value-filter'), '10000')
  expect(screen.getByTestId('value-filter')).toHaveValue(10000)
  userEvent.click(btn)
  expect(await screen.findAllByRole('rowheader')).toHaveLength(7)
  });
  test('teste do os filtro "menor que"', async () => {
    render(<App />);
  const btn = screen.getByTestId('button-filter')
  expect(screen.getAllByRole('columnheader')).toHaveLength(13)
  expect(btn).toBeInTheDocument()
  expect(await screen.findAllByRole('rowheader')).toHaveLength(10)
  userEvent.selectOptions(await screen.findByTestId("column-filter"), 'diameter')
  userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'menor que')
  userEvent.type(screen.getByTestId('value-filter'), '10000')
  expect(screen.getByTestId('value-filter')).toHaveValue(10000)
  userEvent.click(btn)
  expect(await screen.findAllByRole('rowheader')).toHaveLength(3)
  });
  test('teste do os filtro "igual a"', async () => {
    render(<App />);
  const btn = screen.getByTestId('button-filter')
  expect(screen.getAllByRole('columnheader')).toHaveLength(13)
  expect(btn).toBeInTheDocument()
  expect(await screen.findAllByRole('rowheader')).toHaveLength(10)
  userEvent.selectOptions(await screen.findByTestId("column-filter"), 'diameter')
  userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'igual a')
  userEvent.type(screen.getByTestId('value-filter'), '10200')
  expect(screen.getByTestId('value-filter')).toHaveValue(10200)
  userEvent.click(btn)
  expect(await screen.findAllByRole('rowheader')).toHaveLength(1)
  });

  test('teste do filtro de nome', async () => {
    render(<App />);
    const inputName = screen.getByRole('textbox')
    userEvent.type(inputName, 'tatoo')
    expect(await screen.findAllByRole('rowheader')).toHaveLength(1)
  });

})
