import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Site } from "../entity/Site";

@Resolver()
export class SiteResolver {
  @Query(() => [Site])
  async sites() {
    return Site.find({ isActive: true });
  }

  @Mutation(() => Site)
  async createSite(
    @Arg("siteCode") siteCode: string,
    @Arg("longCode") longCode: string,
    @Arg("dbName") dbName: string,
    @Arg("isActive") isActive: boolean
  ) {
    const site = await Site.create({
      siteCode,
      longCode,
      dbName,
      isActive
    }).save();

    return site;
  }
}
