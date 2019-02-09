import { BaseEntity, Column, OneToMany, PrimaryColumn, Entity } from "typeorm";

import { User } from "./User";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity({ name: "Roles" })
export class Role extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn({ length: 25 })
  roleCode: string;

  @Field()
  @Column({ length: 50 })
  description: string;

  @Field()
  @Column({ default: false })
  isOverrideAllowed: boolean;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field(() => [User])
  @OneToMany(() => User, user => user.id)
  users: User[];
}
