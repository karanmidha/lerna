"use strict";

const npa = require("npm-package-arg");

const path = require("path");

const semver = require("semver");

module.exports.getRangeToReference = getRangeToReference;
/** @typedef {import("npm-package-arg").Result & { version: string; saveRelativeFileSpec?: boolean; }} DecoratedSpec */

/**
 * Determine version range used when serializing changes or choosing packages to change.
 * @param {DecoratedSpec} spec
 * @param {Record<string, string>} deps
 * @param {string} loc
 * @param {string} prefix
 */

function getRangeToReference(spec, deps, loc, prefix) {
  const current = deps[spec.name];
  const resolved = spec.type === "tag" ? `${prefix}${spec.version}` : spec.fetchSpec;

  if (spec.saveRelativeFileSpec) {
    // "version" has been resolved to pkg.location in getPackageVersion()
    return npa.resolve(spec.name, path.relative(loc, spec.version), loc).saveSpec;
  }

  if (prefix && current && semver.intersects(current, resolved)) {
    return current;
  }

  return resolved;
}