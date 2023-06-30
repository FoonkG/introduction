import React from 'react'
import LiveSale from './LiveSale'

describe('<LiveSale />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LiveSale />)
  })
})