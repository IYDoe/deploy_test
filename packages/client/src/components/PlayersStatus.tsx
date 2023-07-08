import React, { useState } from 'react'
import { Timer } from '../components/Timer';
import { PlayersStatusItem } from './PlayersStatusItem';
import { PlayersStatusProps } from '../interfaces';

export function PlayersStatus({ players, stopTimer }: PlayersStatusProps) {
    return (
        <div className='players'>
            <div className="players__wrapper">
                {/* <div className="players__trash">
                    <img src="/images/trash.svg" alt="Выбросить." />
                </div> */}
                {players.map(player => (
                    <PlayersStatusItem player={player} key={player.id} />
                ))}
            </div>
            <Timer needStop={stopTimer} />
        </div>
    )
}
