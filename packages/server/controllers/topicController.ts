import { Request, Response } from 'express'
import { TopicService } from '../services/TopicService'

export const createTopic = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { data } = req.body

        if (!data || !data.text) {
            res.status(400).json({ error: 'Missing required fields' })
            return
        }

        const { text }: { text: string } = data

        const topic = await TopicService.create(text)
        res.status(201).send(topic)
    } catch (error) {
        console.error('Error creating topic:', error)
        res.status(500).json({ error: 'Failed to create topic' })
    }
}

export const getTopics = async (
    _req: Request,
    res: Response
): Promise<void> => {
    try {
        const topics = await TopicService.findAll()
        res.status(201).send(topics)
    } catch (error) {
        console.error('Error retrieving topics:', error)
        res.status(500).json({ error: 'Failed to retrieve topics' })
    }
}

export const getTopicById = async (
    req: Request<{ id: string }>,
    res: Response
): Promise<void> => {
    try {
        const { id }: { id: string } = req.params
        const topic = await TopicService.find(id)

        if (topic) {
            res.status(201).send(topic)
        } else {
            res.status(404).json({ error: 'Topic not found' })
        }
    } catch (error) {
        console.error('Error retrieving topics:', error)
        res.status(500).json({ error: 'Failed to retrieve topics' })
    }
}

export const updateTopic = async (
    req: Request<{ id: string }>,
    res: Response
): Promise<void> => {
    try {
        const { id }: { id: string } = req.params
        const { data } = req.body

        if (!data || !data.text) {
            res.status(400).json({ error: 'Missing required fields' })
            return
        }

        const { text } = data
        const topic = await TopicService.find(id)
        if (topic) {
            await topic.update({ id, text })
            res.status(201).send(topic)
        } else {
            res.status(404).json({ error: 'Topic not found' })
        }
    } catch (error) {
        console.error('Error updating topic:', error)
        res.status(500).json({ error: 'Failed to update topic' })
    }
}

export const deleteTopic = async (
    req: Request<{ id: string }>,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params
        const topic = await TopicService.find(id)
        if (topic) {
            await topic.destroy()
            res.status(204).end()
        } else {
            res.status(404).json({ error: 'Topic not found' })
        }
    } catch (error) {
        console.error('Error deleting topic:', error)
        res.status(500).json({ error: 'Failed to delete topic' })
    }
}
