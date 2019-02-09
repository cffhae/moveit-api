import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { User } from "../entity/User";

@Service()
export class UserService {
  constructor(@InjectRepository() private userRepository: Repository<User>) {}

  getUsers() {
    this.userRepository.find();
  }
}
