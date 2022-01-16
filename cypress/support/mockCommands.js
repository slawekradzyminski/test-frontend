Cypress.Commands.add('setTokenInLocalStorage', () => { 
    const user = { token: "12345" }
    window.localStorage.setItem('user', JSON.stringify(user))
})