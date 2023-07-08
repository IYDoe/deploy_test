import { Topic } from '../db'
import { BaseRESTService } from './BaseRESTService'

export class TopicService implements BaseRESTService {
    static async create(text: string) {
        return await Topic.create({ text: text })
    }

    static async findAll() {
        return await Topic.findAll()
    }

    static async find(id: string) {
        return await Topic.findOne({ where: { id } })
    }

    static async update(id: string, text: string) {
        return await Topic.update({ text }, { where: { id } })
    }
}
