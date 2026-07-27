import { testimonialRepository } from "../repositories/testimonial.repository";

import type {
  Testimonial,
  TestimonialData,
} from "../types";

class TestimonialService {
  async getData(): Promise<TestimonialData> {
    const data = await testimonialRepository.getData();

    return {
  testimonials: data.map((testimonial): Testimonial => ({
    id: testimonial.id,
    name: testimonial.name,
    role: testimonial.role ?? "",
    institute: testimonial.institute ?? "",
    avatarUrl: testimonial.avatar_url,
    rating: testimonial.rating,
    quote: testimonial.quote,
    featured: testimonial.featured,
    displayOrder: testimonial.display_order,
  })),
};
  }
}

export const testimonialService = new TestimonialService();