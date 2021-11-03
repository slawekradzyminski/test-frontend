describe('Infinity scroll', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/blog/page/**').as('blog')
    })

    it('', () => {
        let numberOfPosts = 4
        cy.visit('http://www.drewleague.com/blog/')
        for (let i = 0; i < 5; i++) {
            cy.get('.posts--desktop > div').should('have.length', numberOfPosts + i * 4)
            cy.scrollTo('bottom', { duration: 5000 })
                .wait('@blog')
        }
    })
})