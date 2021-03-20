export const registerCss = {
    firstNameField: '[name=firstName]',
    lastNameField: '[name=lastName]',
    usernameField: '[name=username]',
    passwordField: '[name=password]',
    registerButton: '.btn-primary'
  }
  
export const registerPage = {
    registerUser: (firstName, lastName, username, password) => {
    cy.get(registerCss.firstNameField).type(firstName)
    cy.get(registerCss.lastNameField).type(lastName)
    cy.get(registerCss.usernameField).type(username)
    cy.get(registerCss.passwordField).type(password)
    cy.get(registerCss.registerButton).click()
    }
    
  }
  