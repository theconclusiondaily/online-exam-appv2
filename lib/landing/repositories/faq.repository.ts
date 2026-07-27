import { BaseRepository } from "./base.repository";
import { TABLES } from "@/lib/database/tables";

export interface FAQRepositoryData {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  display_order: number;
}

class FAQRepository extends BaseRepository {
  private readonly repository = "FAQRepository";

  async getData(): Promise<FAQRepositoryData[]> {
    const db = await this.db();

    const result = await db
      .from(TABLES.FAQS)
      .select("*")
      .eq("active", true)
      .order("display_order", { ascending: true });

    return this.ensure(
      this.repository,
      result,
      "Failed to load FAQs."
    );
  }
}

export const faqRepository = new FAQRepository();