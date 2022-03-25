/// <reference types="react" />
export { default as Screen } from './component/screen';
export { default as Section } from './component/section';
/**
 * 底層是以 Screen + Section 實作的，也可以直接使用這二個元件
 * Panel 只是一層比較好用的封裝
 * 使用時注意 **所有在 panel 外層的元件都要設定 css height**
 * 例如: `html, body, #root { height: 100%; }`
 */
export declare class PanelContext {
    private setSections;
    private setIndex;
    private _sections;
    private _active;
    constructor(setSections: (sections: JSX.Element[]) => void, setIndex: (index: number) => void, _sections?: JSX.Element[], _active?: number);
    private get sections();
    private set sections(value);
    private get active();
    private set active(value);
    popup(children: children): void;
    close(): void;
}
export declare function Panel({ width, height, children }: {
    width: string;
    height: string;
    children: (ctx: PanelContext) => children;
}): JSX.Element;
declare type child = JSX.Element | string;
declare type children = child | child[];
