/*
 * Copyright (C) 2025 Xibo Signage Ltd
 *
 * Xibo - Digital Signage - https://xibosignage.com
 *
 * This file is part of Xibo.
 *
 * Xibo is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * Xibo is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Xibo.  If not, see <http://www.gnu.org/licenses/>.
 */

/* eslint-disable max-len */
describe('Remote Datasets', function() {
  let testRun = '';

  beforeEach(function() {
    cy.login();

    testRun = Cypress._.random(0, 1e9);
  });

  it('should be able to add json remote dataset', function() {
    cy.visit('/dataset/view');

    // Click on the Add Dataset button
    cy.contains('Add DataSet').click();

    cy.get('.modal input#dataSet')
      .type('Cypress Test Dataset ' + testRun + '_1');

    cy.get('#isRemote').click();

    cy.get('a[href="#gateway"]').click();

    cy.get('#uri').type('https://jsonplaceholder.typicode.com/posts/1');

    cy.get('a[href="#data"]').click();

    cy.get('#dataRoot').type('data');

    cy.get('#dataSetRemoteTestButton').click();

    // Add first by clicking next
    cy.get('.modal .save-button').click();

    // Check if dataset is added in toast message
    cy.contains('Added Cypress Test Dataset ' + testRun + '_1');
  });
  
  it('should be able to add csv remote dataset', function() {
    cy.visit('/dataset/view');

    // Click on the Add Dataset button
    cy.contains('Add DataSet').click();

    cy.get('.modal input#dataSet')
      .type('Cypress Test Dataset ' + testRun + '_1');

    cy.get('#isRemote').click();

    cy.get('a[href="#gateway"]').click();

    cy.get('#uri').type('http://localhost/cy_people2.csv');

    cy.get('a[href="#data"]').click();

    cy.get('#sourceId').select(1);

    // cy.get('#dataRoot').type('data');

    cy.get('#dataSetRemoteTestButton').click();

    // Add first by clicking next
    cy.get('.modal .save-button').click();

    // Check if dataset is added in toast message
    cy.contains('Added Cypress Test Dataset ' + testRun + '_1');
  });

  it('should be seeing data in created remote dataset', function() {
    cy.visit('/dataset/view');

    cy.get('div[title="Row Menu"]').first().click();
    
    cy.contains('View Data').click();

    cy.get('tbody tr').should('have.length.greaterThan', 1)
  });
  
  it('should not be able to add remote dataset if no URI is populated', function() {
    cy.visit('/dataset/view');

    // Click on the Add Dataset button
    cy.contains('Add DataSet').click();

    cy.get('.modal input#dataSet')
      .type('Cypress Test Dataset ' + testRun + '_1');

    cy.get('#isRemote').click();

    cy.get('a[href="#gateway"]').click();

    // Add first by clicking next
    cy.get('.modal .save-button').click();

    cy.get('span[id="uri-error"]').should('have.text', 'This field is required.');
  });
});