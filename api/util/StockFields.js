var _ = require('lodash');
const FIELDS = _.flatten([
  // Pricing
  ['a','p', 'o'],
  // Dividends
//['y', 'd'],
  // Date
  ['c1', 'p2', 'd1', 't1'],
  // Averages
  ['c8', 'g', 'h', 't8', 'm5', 'm6', 'm7', 'm8', 'm3', 'm4'],
  // Misc
  ['m'],
  // 52 Week Pricing
  ['k', 'j', 'j5', 'k4', 'j6', 'k5', 'w'],
  // System Info
  [ 'j1', 'f6', 'n', 's1', 'x'],
  // Volume
  ['v', 'k3', 'a2'],
  // Ratio
  ['e', 'e7', 'e8', 'e9', 'b4', 'j4', 'p5', 'p6', 'r', 'r5', 'r6', 'r7', 's7'],
  // Misc
//  ['t7', 't6', 'i5', 'l2', 'l3', 'v1', 'v7', 's6', 'e1']
]);
module.exports = {
    STOCK_FILEDS: FIELDS
};