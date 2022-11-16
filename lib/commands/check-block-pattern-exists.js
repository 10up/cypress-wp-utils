"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBlockPatternExists = void 0;
const checkBlockPatternExists = ({ title, categoryValue = 'featured', }) => {
    cy.window()
        .then(win => {
        /* eslint-disable */
        return new Promise(resolve => {
            let elapsed = 0;
            setInterval(function () {
                if (elapsed > 2500) {
                    resolve(false);
                }
                const { wp } = win;
                const { getSettings } = wp.data.select('core/block-editor');
                const allRegisteredPatterns = getSettings().__experimentalBlockPatterns;
                if (undefined !== allRegisteredPatterns) {
                    for (let i = 0; i < allRegisteredPatterns.length; i++) {
                        if (title === allRegisteredPatterns[i].title &&
                            allRegisteredPatterns[i].categories &&
                            allRegisteredPatterns[i].categories.includes(categoryValue)) {
                            resolve(true);
                            return;
                        }
                    }
                }
                elapsed += 100;
            }, 100);
        });
    })
        .then(val => {
        /* eslint-enable */
        cy.wrap(val);
    });
};
exports.checkBlockPatternExists = checkBlockPatternExists;
