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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_1 = require("react");
const react_dom_1 = require("react-dom");
const index_1 = require("./index");
function OrderList({ panel, now }) {
    const [orders, setOrders] = (0, react_1.useState)([
        { id: '1', items: ['國'] },
        { id: '2', items: ['國'] },
        { id: '3', items: ['國'] },
    ]);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", null,
            "now: ",
            now.toLocaleString()),
        orders.map(o => React.createElement("div", { key: o.id, onClick: () => __awaiter(this, void 0, void 0, function* () {
                const ord = yield popup(o);
                setOrders(orders => amend(orders, o => o.id === ord.id, ord));
            }) },
            "order ",
            o.id,
            " -- ",
            o.items.join(', ')))));
    function popup(order) {
        return new Promise((resolve, reject) => {
            const o = React.createElement(Order, { key: order.id, panel: panel, defaultValue: order, onDone: items => {
                    resolve({ id: order.id, items });
                    panel.close();
                } });
            panel.popup(o);
        });
    }
    function amend(list, match, newitem) {
        const target = list.findIndex(match);
        return list.slice(0, target).concat([newitem]).concat(list.slice(target + 1));
    }
}
function Order({ defaultValue, panel, onDone }) {
    const [items, setItems] = (0, react_1.useState)(defaultValue.items);
    return (React.createElement("div", null,
        React.createElement("h1", null,
            "order: $",
            defaultValue.id),
        items.map((it, i) => React.createElement("div", { key: i }, it)),
        React.createElement("hr", null),
        React.createElement("button", { onClick: () => selectItem().then(it => setItems(items => items.concat(it))) }, "\u65B0\u589E"),
        React.createElement("button", { onClick: () => onDone(items) }, "\u5B8C\u6210")));
    function selectItem() {
        return new Promise((resolve, reject) => {
            const picker = React.createElement(ItemPicker, { panel: panel, onSelect: it => {
                    resolve(it);
                    panel.close();
                } });
            panel.popup(picker);
        });
    }
}
function ItemPicker({ panel, onSelect }) {
    const items = ['國', '英', '數'];
    return (React.createElement(React.Fragment, null,
        React.createElement("div", null, "\u65B0\u589E\u7522\u54C1"),
        (() => {
            return items.map(i => {
                return (React.createElement("div", { key: i },
                    React.createElement("input", { type: 'checkbox', onChange: e => {
                            if (e.target.checked) {
                                onSelect(i);
                            }
                        } }),
                    i));
            });
        })()));
}
function App() {
    const [now, setNow] = (0, react_1.useState)(new Date());
    (0, react_1.useEffect)(() => {
        setInterval(() => setNow(new Date()), 1000);
    }, []);
    return (React.createElement(index_1.Panel, { width: '100%', height: '100%' }, ctx => React.createElement(OrderList, { panel: ctx, now: now })));
}
(0, react_dom_1.render)(React.createElement(App, null), document.getElementById('root'));
