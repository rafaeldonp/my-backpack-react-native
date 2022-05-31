import { NextFunction, Request, Response } from "express";
//import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { CommonController } from "./CommonController";

export class UserController extends CommonController {

    entity = User;

    async save(request: Request, response: Response, next: NextFunction) {
        return this.entity.create(request.body);
    }
    
    /*
    private userRepository = AppDataSource.getRepository(User);

    async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne({
            where: {
                id: parseInt(request.params.id)
            }
        });
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOneBy({ id: parseInt(request.params.id) });
        await this.userRepository.remove(userToRemove);
    }
    */
}