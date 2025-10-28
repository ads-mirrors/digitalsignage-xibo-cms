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
describe('Layout Editor (Global Elements)', function () {
  beforeEach(function () {
    cy.login();
  });

  // Add global element to a layout
  it('should add a global element in the layout', () => {
    cy.visit('/layout/view');
    cy.contains('Add Layout').click();
    cy.get('a[data-title="Global Elements"]').should('be.visible').click();
    cy.get('[data-template-id="text"]').dblclick();
    cy.get('.viewer-object[id^="layout_"]').dblclick();
    cy.get('[data-template-id="date_advanced"]').dblclick();
    cy.get('.viewer-object[id^="layout_"]').dblclick()
    cy.get('[data-template-id="line"]').dblclick();
    cy.get('.viewer-object[id^="layout_"]').click();
    cy.get('[data-template-id="rectangle"]').dblclick();
    cy.get('.viewer-object[id^="layout_"]').click();
    cy.get('[data-template-id="circle"]').dblclick();
    cy.get('.viewer-object[id^="layout_"]').click();
    cy.get('[data-template-id="ellipse"]').dblclick();
    cy.get('.viewer-object[id^="layout_"]').click();
    cy.get('[data-template-id="triangle"]').dblclick();
    cy.get('.viewer-object[id^="layout_"]').click();
    cy.get('[data-template-id="pentagon"]').dblclick();
    cy.get('.viewer-object[id^="layout_"]').click();
    cy.get('[data-template-id="hexagon"]').dblclick();
    cy.get('.viewer-object[id^="layout_"]').click();
  });
});
