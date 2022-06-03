import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'


export const Header = () => {
    return (
        <header>
            <nav className={styles.nav} >
                <NavLink to={'/cats'}
                    style={({ isActive }) => {
                        return { backgroundColor: isActive ? 'rgb(44, 67, 219)' : '' }
                    }}>Всe котики</NavLink>
                <NavLink to={'/favorite-cats'}
                    style={({ isActive }) => {
                        return { backgroundColor: isActive ? 'rgb(44, 67, 219)' : '' }
                    }}>Любимые котики</NavLink>
            </nav>
        </header>
    )
}

