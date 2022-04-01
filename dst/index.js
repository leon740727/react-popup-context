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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Panel = exports.PanelContext = exports.Section = exports.Screen = void 0;
const React = __importStar(require("react"));
const react_1 = require("react");
const screen_1 = __importDefault(require("./component/screen"));
const section_1 = __importDefault(require("./component/section"));
var screen_2 = require("./component/screen");
Object.defineProperty(exports, "Screen", { enumerable: true, get: function () { return __importDefault(screen_2).default; } });
var section_2 = require("./component/section");
Object.defineProperty(exports, "Section", { enumerable: true, get: function () { return __importDefault(section_2).default; } });
/**
 * 底層是以 Screen + Section 實作的，也可以直接使用這二個元件
 * Panel 只是一層比較好用的封裝
 * 使用時注意 **所有在 panel 外層的元件都要設定 css height**
 * 例如: `html, body, #root { height: 100%; }`
 */
class PanelContext {
    constructor(setSections, setIndex, _sections = [React.createElement(React.Fragment, null)], _active = 0) {
        this.setSections = setSections;
        this.setIndex = setIndex;
        this._sections = _sections;
        this._active = _active;
    }
    get sections() {
        return this._sections;
    }
    set sections(sections) {
        this._sections = sections;
        this.setSections(sections);
    }
    get active() {
        return this._active;
    }
    set active(index) {
        this._active = index;
        this.setIndex(index);
    }
    popup(children) {
        const newbie = React.createElement(section_1.default, { key: this.active + 1 }, children);
        this.sections = this.sections.slice(0, this.active + 1).concat([newbie]);
        this.active = this.active + 1;
        window.history.pushState({ active: this.active }, '', null);
    }
    _close() {
        if (this.active > 0) {
            this.active = this.active - 1;
        }
    }
    close() {
        window.history.back();
    }
}
exports.PanelContext = PanelContext;
function Panel({ width, height, children }) {
    const [sections, setSections] = (0, react_1.useState)([React.createElement(React.Fragment, null)]);
    const [active, setActive] = (0, react_1.useState)(0);
    const ctx = (0, react_1.useRef)(new PanelContext(setSections, setActive));
    (0, react_1.useEffect)(() => {
        window.history.replaceState({ active: 0 }, '', null);
        window.addEventListener('popstate', e => {
            if (state.isa(e.state)) {
                ctx.current._close();
            }
        });
    }, []);
    function trimSections() {
        setSections(sections => sections.slice(0, active + 1));
    }
    return (React.createElement(screen_1.default, { width: width, height: height, active: active, onTransitionEnd: trimSections }, (() => {
        const section1 = React.createElement(section_1.default, { key: 0 }, children(ctx.current));
        return [section1].concat(sections.slice(1));
    })()));
}
exports.Panel = Panel;
var state;
(function (state_1) {
    function isa(state) {
        return state && typeof state.active === 'number';
    }
    state_1.isa = isa;
})(state || (state = {}));
