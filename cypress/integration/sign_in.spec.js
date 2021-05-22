/// <reference types="cypress" />

describe('Autenticação', () => {
  it('Efetuar login com usuário e senha válidos', () => {
    //Acessar o site
    cy.visit('/')

    //Clicar no botão sign on
    cy.get('.nav-link') //4 elementos
      .contains('Sign in')
      .click()
    // cy.get('[href*=login]').click()

    //Informar login senha
    const user = Cypress.env('user').email
    const pass = Cypress.env('user').password

    cy.get('input[type=email').type(user)
    cy.get('input[type=password').type(pass)

    //Clicar no botão entrar
    cy.get('button.btn-primary').click()

    // deve conter o tamanho = 2
    cy.get('.nav-pills a.nav-link').should('have.length', 2)

    //Verificar se foi autenticado
    cy.get('.nav-pills a.nav-link').first().should('contain.text', 'Your Feed')
  })
})
