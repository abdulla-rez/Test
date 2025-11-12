import { AppDataSource } from "../config/data-source"
import { User } from "../entities/User.entity"

 export const userRepo = AppDataSource.getRepository(User)

export const findUserByEmail = async (email: string) => {
    return await userRepo.findOneBy({email});
}

export const createUser = async (userData: Partial<User>) => {
    const user = userRepo.create(userData);
    userRepo.save(user)
    return user
}