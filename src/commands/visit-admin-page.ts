/**
 * Visit Admin Page ensuring logged in as admin first.
 *
 * @param page - Page to visit. May be absolute URL or relative to /wp-admin/
 * @param username - Username of the user
 * @param password - Password of the user
 *
 * @example
 * Use the command without argument, WordPress dashboard will open.
 * ```
 * cy.visitAdminPage()
 * ```
 *
 * @example
 * Use relative URL to open admin page, f.e. Site Health.
 * ```
 * cy.visitAdminPage('site-health.php')
 * ```
 *
 * @example
 * Visit Hello World post as Author
 * ```
 * cy.visitAdminPage('http://localhost:8889/hello-world/', 'author', 'password')
 * ```
 */
export const visitAdminPage = (
  page = 'index.php',
  username = 'admin',
  password = 'password'
): void => {
  cy.login(username, password);
  if (/^http/.exec(page)) {
    cy.visit(page);
  } else {
    cy.visit(`/wp-admin/${page.replace(/^\/|\/$/g, '')}`);
  }
};
