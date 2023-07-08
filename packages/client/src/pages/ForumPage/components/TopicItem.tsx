import React, { useState } from 'react'
import { getDateToLocale } from '../../../utils/getDateToLocale'
import { useWindowSize } from '../../../utils/hooks/useWindowSize'
interface TopicItemProps {
    id: number
    login: string
    avatar: string
    text: string
    userId: number
    date: Date
}

interface TopicReactions {
    good: number,
    smile: number,
    great: number,
    question: number
}

export const TopicItem = ({
    // id,
    // userId,
    login,
    avatar,
    text,
    date }: TopicItemProps) => {
    const { width } = useWindowSize()
    const timestamp = new Date(date).getTime()
    const formattedDate = getDateToLocale(timestamp)

    // get reactions from get request to db
    const [ topicReactions, setTopicReactions ] = useState<TopicReactions>({
        good: 0,
        smile: 0,
        great: 0,
        question: 0
    })

    function reactionClick(id: string) {
        // send request to db
        setTopicReactions(prevState => ({
            ...prevState,
            [id]: topicReactions[id as keyof TopicReactions] + 1
        }))
    }

    const reactions = [
        {
            id: 'good',
            path: '/images/reactions/good.png'
        },
        {
            id: 'smile',
            path: '/images/reactions/smile.png'
        },
        {
            id: 'great',
            path: '/images/reactions/great.png'
        },
        {
            id: 'question',
            path: '/images/reactions/question.png'
        }
    ]

    return (
        <section className='topic'>
            <div className='topic__main'>
                {width > 768 && <div className='avatar__message'>
                    <img className='avatar__image' src={avatar} alt='Аватар' />
                </div>}
                <div className='topic__wrapper'>
                    <div className='topic__box'>
                        <span>{login}</span>
                        <span>{formattedDate}</span>
                    </div>
                    <p className='text__topic'>{text}</p>
                </div>
            </div>
            <div className='reaction'>
                {reactions.map(reaction => {
                    if (topicReactions[reaction.id as keyof TopicReactions]) {
                        return (<div className='reaction__item_topic' key={reaction.id}>
                            <div>{topicReactions[reaction.id as keyof TopicReactions]}</div>
                            <img className='reaction__image__topic' src={reaction.path}/>
                        </div>)
                    }
                })}
                <img className='reaction__image' src='/images/reactions/emoji.png'/>
                <div className='reaction__overlay'>
                    {reactions.map(reaction => {
                        return (<div className='reaction__item' key={reaction.id} onClick={reactionClick.bind(this, reaction.id)}>
                            <img className='reaction__image__item' src={reaction.path}/>
                        </div>)
                    })}
                </div>
            </div>
        </section>
    )
}
