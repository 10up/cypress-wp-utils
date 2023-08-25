"use strict";
/**
 * Code taken from the Cypress iframe package.
 *
 * https://gitlab.com/kgroat/cypress-iframe
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIframe = void 0;
const DEFAULT_OPTS = {
    log: true,
    timeout: 30000,
};
const DEFAULT_IFRAME_SELECTOR = 'iframe';
function sleep(timeout) {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
const frameLoaded = (selector, opts) => {
    if (selector === undefined) {
        selector = DEFAULT_IFRAME_SELECTOR;
    }
    else if (typeof selector === 'object') {
        opts = selector;
        selector = DEFAULT_IFRAME_SELECTOR;
    }
    const fullOpts = Object.assign(Object.assign({}, DEFAULT_OPTS), opts);
    const log = fullOpts.log
        ? Cypress.log({
            name: 'frame loaded',
            displayName: 'frame loaded',
            message: [selector],
        }).snapshot()
        : null;
    return cy
        .get(selector, { log: false })
        .then({ timeout: fullOpts.timeout }, ($frame) => __awaiter(void 0, void 0, void 0, function* () {
        log === null || log === void 0 ? void 0 : log.set('$el', $frame);
        if ($frame.length !== 1) {
            throw new Error(`cypress-iframe commands can only be applied to exactly one iframe at a time. Instead found ${$frame.length}`);
        }
        const contentWindow = $frame.prop('contentWindow');
        const hasNavigated = fullOpts.url
            ? () => {
                var _a;
                return typeof fullOpts.url === 'string'
                    ? contentWindow.location.toString().includes(fullOpts.url)
                    : (_a = fullOpts.url) === null || _a === void 0 ? void 0 : _a.test(contentWindow.location.toString());
            }
            : () => contentWindow.location.toString() !== 'about:blank';
        while (!hasNavigated()) {
            yield sleep(100);
        }
        if (contentWindow.document.readyState === 'complete') {
            return $frame;
        }
        const loadLog = Cypress.log({
            name: 'Frame Load',
            message: [contentWindow.location.toString()],
            event: true,
        }).snapshot();
        yield new Promise(resolve => {
            Cypress.$(contentWindow).on('load', resolve);
        });
        loadLog.end();
        log === null || log === void 0 ? void 0 : log.finish();
        return $frame;
    }));
};
const getIframe = (selector, opts) => {
    if (selector === undefined) {
        selector = DEFAULT_IFRAME_SELECTOR;
    }
    else if (typeof selector === 'object') {
        opts = selector;
        selector = DEFAULT_IFRAME_SELECTOR;
    }
    const fullOpts = Object.assign(Object.assign({}, DEFAULT_OPTS), opts);
    const log = fullOpts.log
        ? Cypress.log({
            name: 'iframe',
            displayName: 'iframe',
            message: [selector],
        }).snapshot()
        : null;
    return frameLoaded(selector, Object.assign(Object.assign({}, fullOpts), { log: false })).then($frame => {
        log === null || log === void 0 ? void 0 : log.set('$el', $frame).end();
        const contentWindow = $frame.prop('contentWindow');
        return Cypress.$(contentWindow.document.body);
    });
};
exports.getIframe = getIframe;
