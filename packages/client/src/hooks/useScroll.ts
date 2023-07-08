import React from 'react'

export const useScroll = <T>(deps: T[]): React.MutableRefObject<HTMLElement | null> => {
    const ref = React.useRef<HTMLElement>(null)
    React.useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight
        }
    }, [ ...deps ])
    return ref
}
