import { faqRepository } from "../repositories/faq.repository";

import type {
  FAQData,
  FAQItem,
} from "../types";

class FAQService {
  async getData(): Promise<FAQData> {
    const data = await faqRepository.getData();

    return {
      faqs: data.map((faq): FAQItem => ({
        id: faq.id,

        question: faq.question,

        answer: faq.answer,

        category: faq.category ?? "General",

        displayOrder: faq.display_order,
      })),
    };
  }
}

export const faqService = new FAQService();