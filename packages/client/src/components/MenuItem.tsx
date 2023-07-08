import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuItemProps } from '../interfaces'

export const MenuItem = ({ title, url, index, clickHandler, mouseEnterHandler, isActive }: MenuItemProps) => {
    const navigate = useNavigate();
    const onClick = url ? () => { navigate(url) } : clickHandler;

    return (
        <span data-index={index} className={`link menu__link ${ isActive ? 'menu__link_active' : '' }`} onClick={onClick} onMouseEnter={mouseEnterHandler}>
            {title}
        </span>
    )
}
