import * as React from 'react';

export default function ({children}: {
    children: children,
}) {
    return <div style={style}>{children}</div>
}

const style: React.CSSProperties = {
    width: '100%',
    overflowX: 'scroll',
}

type child = JSX.Element | string;
type children = child | child[];
