import {
  Resolver,
  Mutation,
  Arg,
  FieldResolver,
  Root,
  Query
} from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../src/entity/User";

import { UserService } from "../services/user.service";
import Container, { Service } from "typedi";

@Service()
@Resolver(() => User)
export class UserResolver {
  constructor(private service: UserService) {
    this.service = Container.get(UserService);
  }

  @Query(() => [User])
  async users() {
    return this.service.getUsers();
  }

  @FieldResolver(() => String)
  async initials(@Root() parent: User) {
    return `${parent.firstName.substr(0, 1)}${parent.lastName.substr(0, 1)}`;
  }

  @Mutation(() => User)
  async addUser(
    @Arg("id") id: number,
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("pinCode") pinCode: string
  ): Promise<User> {}
}
