import { User } from '../db'
import { BaseRESTService } from './BaseRESTService'

export class UserService implements BaseRESTService {
    static async create(login: string) {
        return await User.findOrCreate({ where: { login }, defaults: { login } });
    }

    static async update(login: string, id: number) {
        return await User.update( { login }, { where: { id } });
    }

    static async find(login: string) {
        return await User.findOne({ where: { login } });
    }
}
