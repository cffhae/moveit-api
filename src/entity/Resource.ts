import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Entity,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { Field, ObjectType, ID } from "type-graphql";
import { User } from "./User";
import { Site } from "./Site";

@ObjectType()
@Entity({ name: "Resources" })
export class Resource extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  lytecResource: number;

  @Field(() => [User])
  @OneToMany(() => User, user => user.id)
  users: User[];

  @Field(() => Site)
  @ManyToOne(() => Site)
  @JoinColumn({ name: "siteCode" })
  siteCode: Site;

  @Field()
  @Column({ type: "tinyint" })
  priorityRating: number;

  @Field()
  @Column({ default: false })
  individual: boolean;

  @Field()
  @Column({ default: true })
  isActive: boolean;
}
