import { ParticipantProps } from '../interfaces'

export function ParticipantItem({ id, name, time, level }: ParticipantProps) {
    return (
        <div className='shape__participant' id={`${id}`}>
            <div className='text text__big shape__leaders' title={name}>{name}</div>
            <div className='text text__big shape__leaders'>{time}</div>
            <div className='text text__big shape__leaders'>{level}</div>
        </div>
    )
}
