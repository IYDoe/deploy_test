import React, { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuProps } from '../interfaces'
import { MenuItem } from './MenuItem'

export const Menu = ({ items }: MenuProps) => {
    const navigate = useNavigate();
    const [ activeIndex, setActiveIndex ] = useState(0);

    const handleKeyPressArrow = (e: KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            setActiveIndex(prev => prev < items.length - 1 ? prev + 1 : 0);
        } else if (e.key === 'ArrowUp') {
            setActiveIndex(prev => prev ? prev - 1 : items.length - 1);
        }
    }

    const handleKeyPressEnter = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            const item = items[activeIndex];

            if (item.url) {
                navigate(item.url);
            } else if (item.clickHandler) {
                item.clickHandler();
            }
        }
    }

    const handleMouseEnter = (e: React.MouseEvent) => {
        const target = e.target;

        if (target instanceof HTMLElement && target.dataset.index) {
            setActiveIndex(Number(target.dataset.index));
        }
    }

    useEffect(() => {
        if (items.length) {
            window.addEventListener('keydown', handleKeyPressArrow);
            window.addEventListener('keydown', handleKeyPressEnter);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyPressArrow);
            window.removeEventListener('keydown', handleKeyPressEnter);
        }
    }, [ items.length , activeIndex ]);

    return (
        <nav className='menu'>
            {items.map((item, key) => {
                if (item.url || item.clickHandler) {
                    return (
                        <MenuItem
                            key={item.id}
                            index={key}
                            isActive={key === activeIndex}
                            url={item.url}
                            title={item.title}
                            clickHandler={item.clickHandler}
                            mouseEnterHandler={handleMouseEnter}
                        />
                    )
                }
            })}
        </nav>
    )
}
