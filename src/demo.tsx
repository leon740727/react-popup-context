import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { render } from 'react-dom';
import { Panel, PanelContext } from './index';

type order = {
    id: string,
    items: string[],
}

type child = JSX.Element | string;
type children = child | child[];

function OrderList ({panel}: {
    panel: PanelContext,
}) {
    const [orders, setOrders] = useState([
        {id: '1', items: ['國']},
        {id: '2', items: ['國']},
        {id: '3', items: ['國']},
    ]);

    return (
    <>
        {orders.map(o => 
            <div key={o.id}
                onClick={async () => {
                    const ord = await popup(o);
                    setOrders(orders => amend(orders, o => o.id === ord.id, ord));
                }}>
                order {o.id} -- {o.items.join(', ')}
            </div>)}
    </>);

    function popup(order: order): Promise<order> {
        return new Promise((resolve, reject) => {
            const o = <Order
                key={order.id} panel={panel} defaultValue={order}
                onDone={items => {
                    resolve({id: order.id, items});
                    panel.close();
                }}/>
            panel.popup(o);
        });
    }

    function amend <i> (list: i[], match: (i: i) => boolean, newitem: i) {
        const target = list.findIndex(match);
        return list.slice(0, target).concat([newitem]).concat(list.slice(target+1));
    }
}

function Order({defaultValue, panel, onDone}: {
    defaultValue: order,
    panel: PanelContext,
    onDone: (items: string[]) => void,
}) {
    const [items, setItems] = useState(defaultValue.items);

    return (
    <div>
        <h1>order: ${defaultValue.id}</h1>
        {items.map((it, i) => <div key={i}>{it}</div>)}
        <hr/>
        <button onClick={() => selectItem().then(it => setItems(items => items.concat(it)))}>新增</button>
        <button onClick={() => onDone(items)}>完成</button>
    </div>);

    function selectItem(): Promise<string> {
        return new Promise((resolve, reject) => {
            const picker = <ItemPicker panel={panel}
                onSelect={it => {
                    resolve(it);
                    panel.close();
                }}/>
            panel.popup(picker);
        });
    }
}

function ItemPicker({panel, onSelect}: {
    panel: PanelContext,
    onSelect: (item: string) => void,
}) {
    const items = ['國', '英', '數'];
    return (
    <>
        <div>新增產品</div>
        {items.map((it, i) => <div key={i} onClick={() => {
            onSelect(it);
        }}>{it}</div>)}
    </>);
}

function App() {
    return (
    <Panel width='100%' height='100%'>
        {ctx => <OrderList panel={ctx}/>}
    </Panel>);
}

render(<App/>, document.getElementById('root'));
