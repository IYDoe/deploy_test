import React from 'react'

export const LoaderIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.0"
            width="64px"
            height="64px"
            viewBox="0 0 128 128">
            <g>
                <circle cx="16" cy="64" r="16" fill="#fcba09" />
                <circle
                    cx="16"
                    cy="64"
                    r="16"
                    fill="#fdd15b"
                    transform="rotate(45,64,64)"
                />
                <circle
                    cx="16"
                    cy="64"
                    r="16"
                    fill="#fee298"
                    transform="rotate(90,64,64)"
                />
                <circle
                    cx="16"
                    cy="64"
                    r="16"
                    fill="#fef1ce"
                    transform="rotate(135,64,64)"
                />
                <circle
                    cx="16"
                    cy="64"
                    r="16"
                    fill="#fff7e2"
                    transform="rotate(180,64,64)"
                />
                <circle
                    cx="16"
                    cy="64"
                    r="16"
                    fill="#fff7e2"
                    transform="rotate(225,64,64)"
                />
                <circle
                    cx="16"
                    cy="64"
                    r="16"
                    fill="#fff7e2"
                    transform="rotate(270,64,64)"
                />
                <circle
                    cx="16"
                    cy="64"
                    r="16"
                    fill="#fff7e2"
                    transform="rotate(315,64,64)"
                />
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    values="0 64 64;315 64 64;270 64 64;225 64 64;180 64 64;135 64 64;90 64 64;45 64 64"
                    calcMode="discrete"
                    dur="720ms"
                    repeatCount="indefinite"></animateTransform>
            </g>
        </svg>
    )
}
