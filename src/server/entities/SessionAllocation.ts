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
@Unique(["session", "user"])
export class SessionAllocation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Session, (session) => session.sessionAllocations)
    session: Session;

    @ManyToOne(() => User, (user) => user.sessionAllocations)
    user: User;
}
