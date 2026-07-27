import { createClient } from "@/lib/supabase/server";

/**
 * ============================================================================
 * Repository Error
 * ============================================================================
 */

export class RepositoryError extends Error {
  readonly repository: string;
  readonly cause?: unknown;

  constructor(
    repository: string,
    message: string,
    cause?: unknown
  ) {
    super(`[${repository}] ${message}`);

    this.name = "RepositoryError";
    this.repository = repository;
    this.cause = cause;
  }
}

/**
 * ============================================================================
 * Base Repository
 * ============================================================================
 *
 * Every repository in the landing module extends this class.
 *
 * Responsibilities:
 * - Create a Supabase server client
 * - Provide standardized error handling
 * - Keep repository implementations consistent
 *
 * Repositories must NOT:
 * - Format UI data
 * - Contain business logic
 * - Call other repositories
 *
 * Repositories SHOULD:
 * - Read data
 * - Aggregate database results
 * - Return typed DTOs
 * ============================================================================
 */

export abstract class BaseRepository {
  /**
   * Returns a server-side Supabase client.
   */
  protected async db() {
    return createClient();
  }

  /**
   * Throws a standardized repository error.
   */
  protected fail(
    repository: string,
    error: unknown,
    message = "Database operation failed"
  ): never {
    throw new RepositoryError(
      repository,
      message,
      error
    );
  }

  /**
   * Ensures a query completed successfully and returns its data.
   * This keeps repositories concise and standardizes error handling.
   */
  protected ensure<T>(
    repository: string,
    result: {
      data: T | null;
      error: unknown;
    },
    message: string
  ): T {
    if (result.error) {
      this.fail(repository, result.error, message);
    }

    return result.data as T;
  }

  /**
   * Returns an exact count from a Supabase count query.
   */
  protected count(
    repository: string,
    result: {
      count: number | null;
      error: unknown;
    },
    message: string
  ): number {
    if (result.error) {
      this.fail(repository, result.error, message);
    }

    return result.count ?? 0;
  }
}