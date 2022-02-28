"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable jest/no-export */
/* eslint-disable jest/expect-expect */
const global_1 = __importDefault(require("global"));
const jest_specific_snapshot_1 = require("jest-specific-snapshot");
const { describe, it } = global_1.default;
function snapshotTest({ item, asyncJest, framework, testMethod, testMethodParams }) {
    const { name } = item;
    const context = Object.assign(Object.assign({}, item), { framework });
    if (asyncJest === true) {
        it(name, () => new Promise((resolve, reject) => testMethod(Object.assign({ done: (error) => (error ? reject(error) : resolve()), story: item, context }, testMethodParams))), testMethod.timeout);
    }
    else {
        it(name, () => testMethod(Object.assign({ story: item, context }, testMethodParams)), testMethod.timeout);
    }
}
function snapshotTestSuite(_a) {
    var { item, suite } = _a, restParams = __rest(_a, ["item", "suite"]);
    const { kind, children } = item;
    describe(suite, () => {
        describe(kind, () => {
            children.forEach((c) => {
                snapshotTest(Object.assign({ item: c }, restParams));
            });
        });
    });
}
function snapshotsTests(_a) {
    var { data, snapshotSerializers } = _a, restParams = __rest(_a, ["data", "snapshotSerializers"]);
    if (snapshotSerializers) {
        snapshotSerializers.forEach((serializer) => {
            jest_specific_snapshot_1.addSerializer(serializer);
            expect.addSnapshotSerializer(serializer);
        });
    }
    data.forEach((item) => {
        snapshotTestSuite(Object.assign({ item }, restParams));
    });
}
exports.default = snapshotsTests;
