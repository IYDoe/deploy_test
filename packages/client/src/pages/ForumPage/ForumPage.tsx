import React, { ChangeEvent, useEffect, useState } from 'react'
import { TopicItem } from './components/TopicItem'
import { tempUserData } from '../../utils/constants'
import { Button } from '../../components/Button'
import { useScroll } from '../../hooks/useScroll'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { createTopic, getTopics } from '../../store/slices/forumSlice/actions'
import { selectTopics } from '../../store/selectors/forumSelectors'

export const ForumPage = () => {
    const dispatch = useAppDispatch()
    const [ topicText, setTopicText ] = useState('')
    const [ isVisibleButton, setIsVisibleButton ] = useState(false)
    const topics = useAppSelector(selectTopics)
    const ref = useScroll([ topics ])

    const handleSendMessage = () => {
        setIsVisibleButton(false)

        dispatch(createTopic({ text: topicText }))
        dispatch(getTopics())
        setTopicText('')
    }

    const handleKeyPress = (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (!event.shiftKey && !event.ctrlKey && event.key === 'Enter') {
            event.preventDefault()
            handleSendMessage()
        }
        if (event.metaKey && event.key === 'Enter') {
            event.preventDefault()
            handleSendMessage()
        }
    }
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setIsVisibleButton(true)
        setTopicText(e.target.value)
        if (!e.target.value.replace('\n', '')) {
            setIsVisibleButton(false)
            setTopicText('')
        }
    }

    useEffect(() => {
        dispatch(getTopics())
    }, [])

    return (
        <main className="main__feed">
            <section className="content" ref={ref}>
                {topics.map(topic => {
                    return (
                        <TopicItem
                            key={topic.id}
                            id={topic.id}
                            avatar={tempUserData.avatar}
                            login={tempUserData.login}
                            userId={tempUserData.id}
                            date={topic.createdAt}
                            text={topic.text}
                        />
                    )
                })}
            </section>
            <footer className="footer">
                <textarea
                    value={topicText}
                    className="textarea__feed"
                    placeholder="Добавить новый топик"
                    name="topic"
                    autoFocus
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                />
                {isVisibleButton && (
                    <Button
                        buttonClass="button__feed"
                        type="button"
                        onClick={handleSendMessage}
                        text="Отправить"
                    />
                )}
            </footer>
        </main>
    )
}
