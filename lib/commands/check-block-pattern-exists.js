"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBlockPatternExists = void 0;
const checkBlockPatternExists = ({ title, categoryValue = 'featured', }) => {
    cy.window()
        .then(win => {
        /* eslint-disable */
        return new Promise(resolve => {
            let elapsed = 0;
            const inverval = setInterval(function () {
                var _a, _b;
                if (elapsed > 2500) {
                    clearInterval(inverval);
                    resolve(false);
                }
                const { wp } = win;
                const getSettings = (_b = (_a = wp === null || wp === void 0 ? void 0 : wp.data) === null || _a === void 0 ? void 0 : _a.select('core/block-editor')) === null || _b === void 0 ? void 0 : _b.getSettings;
                if (undefined !== getSettings) {
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
