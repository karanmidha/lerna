"use strict";

const normalizeNewline = require("normalize-newline");

const gitSHA = require("@lerna-test/serialize-git-sha"); // expect.addSnapshotSerializer(require("@lerna-test/serialize-changelog"));


module.exports = {
  serialize(str) {
    return gitSHA.serialize(normalizeNewline(str)).replace(/(\[.*?\])\(.*\/compare\/(.*?)\)/g, "$1(/compare/$2)").replace(/(\[.*?\])\(.*\/commits\/GIT_HEAD\)/g, "$1(COMMIT_URL)").replace(/\(\d{4}-\d{2}-\d{2}\)/g, "(YYYY-MM-DD)");
  },

  test(val) {
    return val != null && typeof val === "string";
  }

};