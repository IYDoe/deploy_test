import { UserTheme } from '../db'
import { BaseRESTService } from './BaseRESTService'

export class ThemeService implements BaseRESTService {
    static async create(isLightTheme: boolean, userId: number) {
        return await UserTheme.create({ isLightTheme, userId });
    }

    static async update(isLightTheme: boolean, userId: number) {
        return await UserTheme.update( { isLightTheme }, { where: { userId } });
    }

    static async find(userId: number) {
        return await UserTheme.findOne({ where: { userId } });
    }
}
