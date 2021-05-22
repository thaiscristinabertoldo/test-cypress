// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/users/login`,
    body: {
      user: {
        email: Cypress.env('user').email,
        password: Cypress.env('user').password,
      },
    },
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then((response) => {
    localStorage.setItem('token', response.body.user.token)
  })

  cy.visit('/')

  // deve conter o tamanho = 2
  cy.get('.nav-pills a.nav-link').should('have.length', 2)

  //Verificar se foi autenticado
  cy.get('.nav-pills a.nav-link').first().should('contain.text', 'Your Feed')
})
