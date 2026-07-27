import { BaseRepository } from "./base.repository";
import { TABLES } from "@/lib/database/tables";

export interface TestimonialRepositoryData {
  id: string;
  name: string;
  role: string | null;
  institute: string | null;
  avatar_url: string | null;
  rating: number;
  quote: string;
  featured: boolean;
  display_order: number;
}

class TestimonialRepository extends BaseRepository {
  private readonly repository = "TestimonialRepository";

  async getData(): Promise<TestimonialRepositoryData[]> {
    const db = await this.db();

    const result = await db
      .from(TABLES.TESTIMONIALS)
      .select("*")
      .order("featured", { ascending: false })
      .order("display_order", { ascending: true });

    return this.ensure(
      this.repository,
      result,
      "Failed to load testimonials."
    );
  }
}

export const testimonialRepository =
  new TestimonialRepository();