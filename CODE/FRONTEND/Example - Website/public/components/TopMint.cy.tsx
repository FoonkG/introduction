import React from 'react'
import TopMint from './TopMint'

describe('<TopMint />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TopMint />)
  })
})