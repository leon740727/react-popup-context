import * as React from 'react';
import {useState, useEffect, useRef} from 'react';
import Screen from './component/screen';
import Section from './component/section';

export {default as Screen} from './component/screen';
export {default as Section} from './component/section';

/**
 * 底層是以 Screen + Section 實作的，也可以直接使用這二個元件
 * Panel 只是一層比較好用的封裝
 * 使用時注意 **所有在 panel 外層的元件都要設定 css height**
 * 例如: `html, body, #root { height: 100%; }`
 */

export class PanelContext {
    constructor(
        private setSections: (sections: JSX.Element[]) => void,
        private setIndex: (index: number) => void,
        private _sections: JSX.Element[] = [],
        private _active: number = -1,
    ) {}

    get sections() {
        return this._sections;
    }

    set sections(sections: JSX.Element[]) {
        this._sections = sections;
        this.setSections(sections);
    }

    get active() {
        return this._active;
    }

    set active(index: number) {
        this._active = index;
        this.setIndex(index);
    }

    init(children: children) {
        if (this.sections.length === 0) {
            this.popup(children);
        }
    }

    popup(children: children) {
        const newbie = <Section key={this.active + 1}>{children}</Section>;
        this.sections = this.sections.slice(0, this.active + 1).concat([newbie]);
        this.active = this.active + 1;
    }

    close() {
        if (this.active > 0) {
            this.active = this.active - 1;
        }
    }
}

export function Panel({width, height, children}: {
    width: string,
    height: string,
    children: (ctx: PanelContext) => children,
}) {
    const [sections, setSections] = useState<JSX.Element[]>([]);
    const [active, setActive] = useState(-1);
    const ctx = useRef(new PanelContext(setSections, setActive));
    
    useEffect(() => ctx.current.init(children(ctx.current)), []);

    return (
    <Screen width={width} height={height} active={active}>
        {sections}
    </Screen>);
}

type child = JSX.Element | string;
type children = child | child[];
