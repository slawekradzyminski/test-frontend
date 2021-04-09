export const homePageCss = {
    helloInfo: 'h1'
}

export const homePage = {
    verifyUserNameInfo: (username) => {
        cy.get(homePageCss.helloInfo).should('have.text', `Hi ${username}!`)    
    }

}