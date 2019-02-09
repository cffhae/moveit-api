import { InputType, Field } from "type-graphql";
import { StatusCode } from "./StatusCode";

@InputType()
export class AddStatusCodeInput implements Partial<StatusCode> {
  @Field()
  statusCode: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  triggersRoomChange?: boolean;

  @Field({ nullable: true })
  sortOrder?: number;

  @Field({ nullable: true })
  isActive?: boolean;
}
