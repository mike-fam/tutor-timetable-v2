import {
    BaseEntity as TypeOrmBaseEntity,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { DataLoaders } from "../types/dataloaders";

@ObjectType()
export abstract class BaseEntity extends TypeOrmBaseEntity {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    protected static loaders: DataLoaders;

    public static setLoaders(loaders: DataLoaders) {
        this.loaders = loaders;
    }
}
