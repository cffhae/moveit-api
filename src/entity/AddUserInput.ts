import { InputType, Field } from "type-graphql";
import { User } from "./User";

@InputType()
export class AddUserInput implements Partial<User> {
  @Field()
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  pinCode: string;

  @Field({ nullable: true })
  forceReset?: boolean;

  @Field({ nullable: true })
  isActive?: boolean;
}
