import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Button } from './Button'

describe('Button', () => {
    const onClickMock = jest.fn()

    afterEach(() => {
        onClickMock.mockClear()
    })

    it('renders the button with correct text', () => {
        const buttonText = 'Click me'
        const { getByText } = render(
            <Button
                buttonClass="my-button"
                type="button"
                onClick={onClickMock}
                text={buttonText}
            />
        )

        const buttonElement = getByText(buttonText)
        expect(buttonElement).toBeInTheDocument()
    })

    it('triggers onClick callback when clicked', () => {
        const buttonText = 'Click me'
        const { getByText } = render(
            <Button
                buttonClass="my-button"
                type="button"
                onClick={onClickMock}
                text={buttonText}
            />
        )

        const buttonElement = getByText(buttonText)
        fireEvent.click(buttonElement)

        expect(onClickMock).toHaveBeenCalledTimes(1)
    })

    it('renders the button with correct class', () => {
        const buttonText = 'Click me'
        const buttonClass = 'my-button'
        const { getByText } = render(
            <Button
                buttonClass={buttonClass}
                type="button"
                onClick={onClickMock}
                text={buttonText}
            />
        )

        const buttonElement = getByText(buttonText)
        expect(buttonElement).toHaveClass(buttonClass)
    })

    it('renders the button with correct type', () => {
        const buttonText = 'Click me'
        const buttonType = 'submit'
        const { getByText } = render(
            <Button
                buttonClass="my-button"
                type={buttonType}
                onClick={onClickMock}
                text={buttonText}
            />
        )

        const buttonElement = getByText(buttonText)
        expect(buttonElement).toHaveAttribute('type', buttonType)
    })
})
