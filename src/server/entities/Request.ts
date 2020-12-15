import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Session } from "./Session";

@Entity()
export class StaffRequest extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.requests)
    requester: User;

    @ManyToOne(() => User, (user) => user.acceptedRequests)
    acceptor: User;

    @ManyToOne(() => User)
    finaliser: User;

    @ManyToOne(() => Session, session => session.requests)
    session: Session;
}
