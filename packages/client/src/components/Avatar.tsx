import React, { FC, useEffect, useState, ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectUserData } from '../store/selectors/userSelectors'
import { Urls } from '../utils/api'
import { changeAvatar } from '../store/slices/userSlice/actions'

export const Avatar: FC = () => {
    const dispatch = useAppDispatch()
    const { avatar } = useAppSelector(selectUserData)
    const { baseUrl } = Urls
    const [ image, setImage ] = useState<string | null>(null)

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
       
        if (target.files === null) {
            return
        }

        const formData = new FormData()
        const file = target.files[0]
        formData.append('avatar', file)

        dispatch(changeAvatar(formData))
    }

    useEffect(() => {
        if (avatar) {
            setImage(`${baseUrl}/resources/${avatar}`)
        }
    }, [ avatar ])

    return (
        <div className="avatar">
            <label htmlFor="avatar-input">
                <div className="avatar__image">
                    {image ? (
                        <img src={image} alt="avatar" />
                    ) : (
                        <span className="avatar__placeholder">+</span>
                    )}
                </div>
            </label>
            <input
                id="avatar-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
            />
        </div>
    )
}
