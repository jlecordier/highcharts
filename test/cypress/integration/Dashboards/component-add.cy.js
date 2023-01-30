function grabComponent(name) {
    cy.get('.hd-edit-tools-btn').contains('Add').click();
    cy.get('.hd-edit-sidebar-tab').contains('components').click();
    cy.get('.hd-edit-sidebar-tab-content')
        .children()
        .contains(name)
        .trigger('mousedown');
}

function dropComponent(elementName) {
    cy.get(elementName).first().trigger('mouseenter', {force: true});
    cy.get(elementName).first().trigger('mousemove', 'right', {force: true});
    cy.get(elementName).first().trigger('mouseup', 'right', {force: true});
}

function hideSidebar() {
    cy.get('.hd-edit-sidebar-button-nav.hd-edit-close-btn').click()
}

describe('Add component through UI', () => {
    beforeEach(() => {
        cy.visit('/dashboards/cypress/add-layout');
        cy.viewport(1200, 1000);
        cy.get('.hd-edit-context-menu-btn').click();
        cy.get('.hd-edit-toggle-slider').click();
    });

    it('should be able to add a layout', function() {
        grabComponent('layout');
        dropComponent('#dashboard-col-0');
        cy.dashboard().then((dashboard) => {
            assert.equal(
                dashboard.layouts.length,
                2,
                'New layout should be added.'
            );
        });
    });

    it('should be able to add a HTML component', function() {
        grabComponent('HTML');
        dropComponent('#dashboard-col-0');
        hideSidebar(); // Hide sidebar to avoid interference with the next test.
        cy.dashboard().then((dashboard) => {
            assert.equal(
                dashboard.layouts[0].rows[0].cells.length,
                3,
                'New cell should be added.'
            );

            const m = dashboard.mountedComponents;
            assert.equal(
                m[m.length - 1].component.type,
                'HTML',
                `New component's type should be 'HTML'`
            );
        });
        cy.get('#dashboard-col-0').children().click()
        cy.get('.hd-edit-menu.hd-edit-toolbar-cell').children().should('be.visible')
    });

    it('should be able to add a chart component and resize it', function() {
        grabComponent('chart');
        dropComponent('#dashboard-col-0')
        hideSidebar(); // Hide sidebar to avoid interference with the next test.
        cy.get('.hd-edit-resize-snap-x').trigger('mousedown');
        cy.get('.hd-cell').eq(1).trigger('mousemove');
        cy.get('.hd-cell').eq(1).trigger('mouseup');
        cy.dashboard().then((dashboard) => {
            assert.equal(
                dashboard.layouts[0].rows[0].cells.length,
                3,
                'New cell should be added.'
            );

            const m = dashboard.mountedComponents,
                component =  m[m.length - 1].component;
            assert.equal(
                component.type,
                'Highcharts',
                `New component's type should be 'Highcharts'.`
            );
        });
    });

    it('DataGrid component should be added.', function() {
        grabComponent('datagrid');
        dropComponent('#dashboard-col-0')
        hideSidebar(); // Hide sidebar to avoid interference with the next test.
        cy.dashboard().then((dashboard) => {
            assert.equal(
                dashboard.layouts[0].rows[0].cells.length,
                3,
                'New cell should be added.'
            );
            const m = dashboard.mountedComponents,
                component = m[m.length - 1].component;
            assert.equal(
                component.type,
                'DataGrid',
                `New component's type should be 'DataGrid'.`
            );
        });
    });
});
