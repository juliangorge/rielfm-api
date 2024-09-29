import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { StatusCodes } from "http-status-codes";

export abstract class BaseService<
  T,
  R extends {
    findAll: () => Promise<T[] | []>;
    findById: (id: number) => Promise<T | null>;
  },
> {
  protected repository: R;

  constructor(repository: R) {
    this.repository = repository;
  }

  protected handleError(error: unknown, entityName: string, action: string): ServiceResponse<null> {
    const errorMessage = `Error ${action} ${entityName}: ${(error as Error).message}`;
    logger.error(errorMessage);
    return ServiceResponse.failure(
      `An error occurred while ${action} ${entityName}.`,
      null,
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }

  async findAll(): Promise<ServiceResponse<T[] | null>> {
    try {
      const entities = await this.repository.findAll();
      if (entities.length === 0) {
        return ServiceResponse.success("Items not found", []);
      }
      return ServiceResponse.success<T[]>("Items found", entities);
    } catch (error) {
      return this.handleError(error, "items", "retrieving");
    }
  }

  async findById(id: number): Promise<ServiceResponse<T | null>> {
    try {
      const entity = await this.repository.findById(id);
      if (!entity) {
        return ServiceResponse.failure("Item not found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<T>("Item found", entity);
    } catch (error) {
      return this.handleError(error, "item", "finding");
    }
  }
}
