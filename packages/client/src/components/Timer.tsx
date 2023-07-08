import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../utils/paths'
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setFinishTime } from '../store/slices/gameSlice/gameSlice';
import { addUser, getTeamLeaderboard } from '../store/slices/leaderBoardSlice/actions';
import { teamName, ratingFieldName } from '../utils/constants'
import { selectUserData } from '../store/selectors/userSelectors';

export function Timer({ needStop }: Record<string, boolean>) {
    const [ seconds, setSeconds ] = useState(0)
    const [ time, setTime ] = useState('00:00')
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const userData = useAppSelector(selectUserData)

    const addZero = (num: number) => {
        return String(num).length === 1 ? `0${num}` : num;
    }

    const convertTime = (second: number) => {
        const minutes = Math.floor(second / 60);
        const seconds = second % 60;
        setTime(`${addZero(minutes)}:${addZero(seconds)}`)
    }

    useEffect(() => {
        const interval = needStop ? 0 : setInterval(() => {
            setSeconds(second => {
                const next = second + 1;
                convertTime(next);
                return next;
            });
        }, 1000);

        if (needStop) {
            dispatch(setFinishTime(time))
            navigate(Paths.endScreen)

            dispatch(addUser({
                teamName,
                ratingFieldName,
                data: {
                    id: userData.id,
                    name: userData.login,
                    score: seconds * -1,
                    time: time,
                    level: 1,
                },
            }))
        }

        return () => clearInterval(interval)
    }, [ needStop ])

    return (
        <div className='players__timer'>{time}</div>
    )
}
