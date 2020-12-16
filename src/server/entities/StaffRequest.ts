import {
    BaseEntity,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
} from "typeorm";
import { User } from "./User";
import { Session } from "./Session";

@Entity()
@Unique(["requester", "session"])
export class StaffRequest extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.requests)
    requester: User;

    @ManyToOne(() => User, (user) => user.acceptedRequests)
    acceptor: User;

    @ManyToOne(() => User)
    finaliser: User;

    @ManyToOne(() => Session, (session) => session.requests)
    session: Session;
}
