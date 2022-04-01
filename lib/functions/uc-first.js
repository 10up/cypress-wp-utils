"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ucFirst = void 0;
const ucFirst = (string) => string.toLowerCase().charAt(0).toUpperCase() + string.toLowerCase().slice(1);
exports.ucFirst = ucFirst;
