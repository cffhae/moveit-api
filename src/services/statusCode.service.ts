import { InjectConnection } from "typeorm-typedi-extensions";
import { Connection, Repository } from "typeorm";
import { StatusCode } from "../entity/StatusCode";
import { Service } from "typedi";
import { AddStatusCodeInput } from "../entity/AddStatusCodeInput";
import { UserInputError } from "apollo-server-express";

@Service()
export class StatusCodeService {
  private repository: Repository<StatusCode>;

  constructor(
    @InjectConnection()
    private connection: Connection
  ) {
    this.repository = this.connection.getRepository(StatusCode);
  }

  getStatusCodes() {
    return this.repository
      .createQueryBuilder("StatusCodes")
      .where({ isActive: true })
      .orderBy("sortOrder", "ASC")
      .getMany();
  }

  addStatusCode(newStatusCode: AddStatusCodeInput) {
    return this.repository.create(newStatusCode).save();
  }

  async deactivateStatusCode(statusCode: string) {
    const statusCodeToUpdate = await this.repository.findOne({ statusCode });

    if (!statusCodeToUpdate) {
      return new UserInputError("Status Code does not exist.");
    }

    statusCodeToUpdate.isActive = false;
    return statusCodeToUpdate.save();
  }
}
