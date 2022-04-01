/// <reference types="react" />
/** 最外層的像電視螢幕的框，只顯示出其中一個 Section */
export default function ({ width, height, active, children, onTransitionEnd }: {
    width: string;
    height: string;
    active: number;
    children: children;
    onTransitionEnd: () => void;
}): JSX.Element;
declare type child = JSX.Element | string;
declare type children = child | child[];
export {};
