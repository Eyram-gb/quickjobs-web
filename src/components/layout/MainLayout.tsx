import React from 'react'
import NavBar from './NavBar'

const MainLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <>
            <NavBar />
            <div>{children}</div>
            <footer></footer>
        </>
    )
}

export default MainLayout