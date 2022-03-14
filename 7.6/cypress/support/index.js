/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable quotes */
// Import commands.js using ES2015 syntax:
import "./commands";
import { addMatchImageSnapshotCommand } from "cypress-image-snapshot/command";

addMatchImageSnapshotCommand();
// Alternatively you can use CommonJS syntax:
// require('./commands')
