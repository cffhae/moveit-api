import { Service } from "typedi";
import bcrypt from "bcryptjs";
import { InjectConnection } from "typeorm-typedi-extensions";
import { Repository, Connection } from "typeorm";
import { User } from "../entity/User";

import { AddUserInput } from "../entity/AddUserInput";

@Service()
export class UserService {
  private repository: Repository<User>;

  constructor(
    @InjectConnection()
    private connection: Connection
  ) {
    this.repository = this.connection.getRepository(User);
  }

  async getUsers() {
    return this.repository.find();
  }

  async addUser(newUser: AddUserInput) {
    const saltCode = await bcrypt.genSalt();
    const hashedPinCode = await bcrypt.hash(pinCode, saltCode);

    const user = await User.create({
      id,
      firstName,
      lastName,
      pinCode: hashedPinCode,
      salt: saltCode
    }).save();

    return user;

    try {
      return this.repository.create(newUser).save();
    } catch (err) {
      return err;
    }
  }
}
