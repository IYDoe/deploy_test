import React from 'react'

export const useWindowSize = () => {
    const [ windowSize, setWindowSize ] = React.useState<Record<string, number>>({
        width: 0,
        height: 0,
    })
    React.useEffect(() => {
        const handleResize = () =>
            setWindowSize({ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight })
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return windowSize
}
