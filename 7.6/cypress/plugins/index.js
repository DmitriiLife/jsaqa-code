/* eslint-disable quotes */
/* eslint-disable import/no-extraneous-dependencies */
const {
  addMatchImageSnapshotPlugin,
} = require("cypress-image-snapshot/plugin");
/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  addMatchImageSnapshotPlugin(on, config);
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
};
