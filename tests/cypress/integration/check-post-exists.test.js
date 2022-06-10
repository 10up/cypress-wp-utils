describe('Command: checkPostExists', () => {
  before(() => {
    cy.login();
  });

  it('Should be able to Check if Post Exists', () => {
    cy.checkPostExists({
      title: 'Hello world!',
    }).then(exists => {
      if (exists) {
        console.log('The post exists!');
        // The block patter exists!
      } else {
        console.log('The post does not exist!');
        // The block pattern does not exist!
      }
    });
  });

  it('Should be able to Check if Page Exists', () => {
    cy.checkPostExists({
      title: 'Sample Page',
      postType: 'page',
    }).then(exists => {
      if (exists) {
        console.log('The page exists!');
        // The block patter exists!
      } else {
        console.log('The page does not exist!');
        // The block pattern does not exist!
      }
    });
  });
});
