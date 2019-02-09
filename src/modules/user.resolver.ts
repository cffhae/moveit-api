import { Resolver, Mutation, Arg, FieldResolver, Root } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../src/entity/User";

@Resolver(User)
export class UserResolver {
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
  ): Promise<User> {
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
  }
}
