import React from 'react'
import LiveMint from './LiveMint'

describe('<LiveMint />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LiveMint />)
  })
})