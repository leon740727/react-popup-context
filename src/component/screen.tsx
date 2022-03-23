import * as React from 'react';

/** 最外層的像電視螢幕的框，只顯示出其中一個 Section */
export default function ({width, height, active, children}: {
    width: string,
    height: string,
    active: number,
    children: children,
}) {
    const complement: React.CSSProperties = {
        width: children instanceof Array ? `${children.length*100}%` : '100%',
        left: active === -1 ? '0%' : `${-1 * active * 100}%`,
    }

    return (
    <div style={{...style, width, height}}>
        {/* 在 screen 底下長長的畫布，可以左右移動以顯示不同的 section */}
        <div style={{...sectionListStyle, ...complement}}>
            {children}
        </div>
    </div>);
}

const style: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
}

const sectionListStyle: React.CSSProperties = {
    position: 'absolute',
    height: '100%',
    display: 'flex',
    transition: 'left ease-out 0.2s',
}

type child = JSX.Element | string;
type children = child | child[];
