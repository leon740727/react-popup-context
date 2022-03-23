"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
/** 最外層的像電視螢幕的框，只顯示出其中一個 Section */
function default_1({ width, height, active, children }) {
    const complement = {
        width: children instanceof Array ? `${children.length * 100}%` : '100%',
        left: active === -1 ? '0%' : `${-1 * active * 100}%`,
    };
    return (React.createElement("div", { style: Object.assign(Object.assign({}, style), { width, height }) },
        React.createElement("div", { style: Object.assign(Object.assign({}, sectionListStyle), complement) }, children)));
}
exports.default = default_1;
const style = {
    position: 'relative',
    overflow: 'hidden',
};
const sectionListStyle = {
    position: 'absolute',
    height: '100%',
    display: 'flex',
    transition: 'left ease-out 0.2s',
};
