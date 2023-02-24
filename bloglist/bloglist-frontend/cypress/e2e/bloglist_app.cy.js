const red = 'rgb(169, 68, 66)'
const green = 'rgb(60, 118, 61)'
const user1 = {username: 'root', name: 'Name', password: 'toor'}
const user2 = {username: 'diff', name: 'Duff', password: 'aaaa'}

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3000/api/users', user1)
    cy.request('POST', 'http://localhost:3000/api/users', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Username')
    cy.contains('Password')
    cy.get('#login-button').should('contain', 'Log In')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('toor')
      cy.get('#login-button').click()

      cy.contains('Name logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('WRONG')
      cy.get('#login-button').click()

      cy.should('not.contain', 'Name logged in')
      cy.get('#notif')
        .should('contain', 'Wrong Credentials')
        .and('have.css', 'color', red)
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login(user1)
    })

    it('A blog can be created', function() {
      cy.get('#show-blog-form-btn').click()

      cy.get('#title').type('Title of Blog')
      cy.get('#author').type('Author Name')
      cy.get('#url').type('website.com')
      cy.get('#create-blog-btn').click()

      cy.get('#notif')
        .should('contain', 'Title of Blog by Author Name added')
        .and('have.css', 'color', green)
      
      cy.get('.bloglist').contains('Title of Blog')
      cy.get('.bloglist').contains('Author Name')
      cy.get('.bloglist').should('not.contain', 'website.com')
      
    })

    it('a blog cannot be created with missing values', function() {
      cy.get('#show-blog-form-btn').click()

      cy.get('#title').type('Title of Blog')
      cy.get('#author').type('Author Name')
      cy.get('#create-blog-btn').click()

      cy.get('#notif')
        .should('contain', 'Missing fields')
        .and('have.css', 'color', red)

      cy.get('.bloglist').should('not.contain', 'Title of Blog')
    })

    describe('when a blog already exists', function() {
      beforeEach(function() {
        const blog = {
          title: 'Random Title',
          author: 'Real Author',
          url: 'website.co.uk'
        }
        cy.createBlog(blog)
      })

      it('a blog can be liked', function() {
        cy.get('.blog > button').click()

        cy.get('.blog').contains('0 likes')
        cy.get('.blog').contains('Like').click()

        cy.get('#notif')
        .should('contain', 'Liked Random Title by Real Author')
        .and('have.css', 'color', green)
        cy.get('.blog').contains('1 likes')
      })

      it('a blog can be deleted', function() {
        cy.get('.blog > button').click()

        cy.get('.blog').contains('Remove').click()

        cy.get('#notif')
        .should('contain', 'Deleted Random Title by Real Author')
        .and('have.css', 'color', green)
        cy.get('.bloglist').should('not.contain', 'Random Title')
      })

      it('a blog cannot be deleted by a different user', function() {
        cy.contains('Logout').click()
        cy.login(user2)

        cy.get('.bloglist').should('contain', 'Random Title by Real Author')
        cy.get('.blog > button').click()

        cy.get('.blog').should('not.contain', 'Remove')
      })
    })

    describe('when multiple blogs exist', function() {
      beforeEach(function() {

      })

      it('blogs are ordered according to likes', function() {

      })
      
      it('blogs will change position if liked enough', function() {

      })
    })
    
  })
})