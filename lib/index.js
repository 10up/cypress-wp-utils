"use strict";
/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />
Object.defineProperty(exports, "__esModule", { value: true });
// Import commands.
const login_1 = require("./commands/login");
// Register commands
Cypress.Commands.add('login', login_1.login);
