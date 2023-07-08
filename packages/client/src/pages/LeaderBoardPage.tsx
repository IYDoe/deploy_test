import React, { useEffect, useState } from 'react'
import { ParticipantItem } from '../components/ParticipantItem'
import { ParticipantData } from '../interfaces'
import { Link } from 'react-router-dom'
import { Paths } from '../utils/paths'
import { v4 as makeId } from 'uuid'
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectLeaderboardData, selectIsLoadingLeaderboard } from '../store/selectors/leaderboardSelectors';
import { getTeamLeaderboard } from '../store/slices/leaderBoardSlice/actions'
import { Loader } from '../components/Loader'
import { teamName, ratingFieldName } from '../utils/constants'

export function LeaderBoardPage() {
    const leaderboard = useAppSelector(selectLeaderboardData)
    const isLoading = useAppSelector(selectIsLoadingLeaderboard)
    const dispatch = useAppDispatch()

    function getLeaders(participants: ParticipantData[]) {
        return participants.map(participant =>
            <ParticipantItem
                key={makeId()}
                id={participant.data.id}
                name={participant.data.name}
                time={participant.data.time}
                level={participant.data.level}
            />
        )
    }

    useEffect(() => {
        dispatch(getTeamLeaderboard({
            teamName,
            data: {
                ratingFieldName,
                cursor: 0,
                limit: 10
            }
        }))
    }, [])

    if (isLoading) {
        return <main className='main'><Loader /></main>
    }

    return (
        <main className='main'>
            <div className='shape'>
                <div className='shape__wrapper'>
                    <div className='title title_main shape__title shape__title_big'>
                        Таблица лидеров
                    </div>
                    <div className='shape__participant-title'>
                        <div className='text text__big shape__leaders'>Логин</div>
                        <div className='text text__big shape__leaders'>Время</div>
                        <div className='text text__big shape__leaders'>Уровень</div>
                    </div>
                    {getLeaders(leaderboard)}
                    <Link to={Paths.startScreen} className='link shape__link'>Назад к игре</Link>
                </div>
            </div>
        </main>
    )
}
