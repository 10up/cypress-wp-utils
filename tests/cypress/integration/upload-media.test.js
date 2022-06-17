describe('Command: uploadMedia', () => {
  before(() => {
    cy.login();
  });

  it('Should be able to upload image', () => {
    cy.uploadMedia('tests/cypress/fixtures/10up.png').then(response => {
      expect(response.success).to.equal(true);
      expect(Number.isNaN(response.mediaId)).to.equal(false);
      cy.visit(`/wp-admin/post.php?post=${response.mediaId}&action=edit`);
      cy.get('#title').then(ele => {
        expect(ele.val()).contains('10up');
      });
    });
  });

  it('Should be able to upload image', () => {
    cy.uploadMedia('tests/cypress/fixtures/example.json').then(response => {
      expect(response.success).to.equal(false);
      expect(response.errorMessage).to.be.a('string');
      expect(response.errorMessage).contains('has failed to upload');
    });
  });
});
