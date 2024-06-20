'use client';

import React from 'react';
import { themeChange } from 'theme-change';
import { useMapContext } from '../provider/MapProvider';

function Arrange() {
    const { filterState } = useMapContext();
    const [ filter, setFilter ] = filterState;

    React.useEffect(() => themeChange(false), [])

    return (
        <div className='w-full'>
        <div className="flex justify-center items-center w-full mx-auto">
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn m-1">
                    Theme
                    <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
                </div>
                <ul tabIndex={0} className="dropdown-content z-[100] p-2 shadow-2xl bg-base-300 rounded-box w-52">
                    {
                        [
                            { value: 'default', label: 'Default' },
                            { value: 'light', label: 'Light' },
                            { value: 'dark', label: 'Dark' },
                            { value: 'cupcake', label: 'Cupcake' },
                            { value: 'bumblebee', label: 'Bumblebee' },
                            { value: 'emerald', label: 'Emerald' },
                            { value: 'corporate', label: 'Corporate' },
                            { value: 'synthwave', label: 'Synthwave' },
                            { value: 'retro', label: 'Retro' },
                            { value: 'cyberpunk', label: 'Cyberpunk' },
                            { value: 'valentine', label: 'Valentine' },
                            { value: 'halloween', label: 'Halloween' },
                            { value: 'garden', label: 'Garden' },
                            { value: 'forest', label: 'Forest' },
                            { value: 'aqua', label: 'Aqua' },
                            { value: 'lofi', label: 'Lofi' },
                            { value: 'pastel', label: 'Pastel' },
                            { value: 'fantasy', label: 'Fantasy' },
                            { value: 'wireframe', label: 'Wireframe' },
                            { value: 'black', label: 'Black' },
                            { value: 'luxury', label: 'Luxury' },
                            { value: 'dracula', label: 'Dracula' },
                            { value: 'cmyk', label: 'Cmyk' },
                            { value: 'autumn', label: 'Autumn' },
                            { value: 'business', label: 'Business' },
                            { value: 'acid', label: 'Acid' },
                            { value: 'lemonade', label: 'Lemonade' },
                            { value: 'night', label: 'Night' },
                            { value: 'coffee', label: 'Coffee' },
                            { value: 'winter', label: 'Winter' },
                            { value: 'dim', label: 'Dim' },
                            { value: 'nord', label: 'Nord' },
                            { value: 'sunset', label: 'Sunset' },
                        ].map((theme, index) => (
                            <li key={index}>
                                <input className='theme-controller btn btn-sm btn-block btn-ghost justify-start' data-set-theme={theme.value} aria-label={theme.label} type='radio' name='theme-dropdown' value={theme.value} />
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div role="tablist" className="tabs tabs-boxed ml-auto">
                {
                    [
                        {value: '', label: "전체"},
                        {value: "음식", label: "식당"},
                        {value: "카페", label: "카페"},
                        {value: "숙박", label: "펜션"},
                    ].map((tab, index) => (
                        <button key={index} role="tab" className={`tab ${filter === tab.value ? "tab-active" : ""}`} onClick={() => {
                            setFilter(tab.value);
                        }}>{tab.label}</button>
                    ))
                }
                </div>
            </div>
        </div>
    );
}

export default Arrange;
