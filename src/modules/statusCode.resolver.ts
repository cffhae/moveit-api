import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { StatusCode } from "../entity/StatusCode";
import { StatusCodeService } from "../services/statusCode.service";
import { Container, Service } from "typedi";
import { AddStatusCodeInput } from "../entity/AddStatusCodeInput";

@Service()
@Resolver(() => StatusCode)
export class StatusCodeResolver {
  constructor(private service: StatusCodeService) {
    this.service = Container.get(StatusCodeService);
  }

  @Query(() => [StatusCode])
  async statusCodes() {
    return this.service.getStatusCodes();
  }

  @Mutation(() => StatusCode)
  async addStatusCode(@Arg("data") newStatusCode: AddStatusCodeInput) {
    return this.service.addStatusCode(newStatusCode);
  }

  @Mutation(() => StatusCode)
  async deactivateStatusCode(@Arg("statusCode") statusCode: string) {
    return this.service.deactivateStatusCode(statusCode);
  }
}
