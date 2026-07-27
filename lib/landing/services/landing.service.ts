import { heroService } from "./hero.service";

import { examService } from "./exam.service";
import { competitionService } from "./competition.service";
import { rewardsService } from "./rewards.service";
import { instituteService } from "./institute.service";
import { aiService } from "./ai.service";
import { testimonialService } from "./testimonial.service";
import { faqService } from "./faq.service";

import type { LandingData } from "../types";

class LandingService {
  async getData(): Promise<LandingData> {
   const [
  hero,
  exams,
  competition,
  rewards,
  institutes,
  ai,
  testimonials,
  faq,
] = await Promise.all([
  heroService.getData(),
  examService.getData(),
  competitionService.getData(),
  rewardsService.getData(),
  instituteService.getData(),
  aiService.getData(),
  testimonialService.getData(),
  faqService.getData(),
]);

   return {
  hero,
  exams,
  competition,
  rewards,
  institutes,
  ai,
  testimonials,
  faq,
};
  }
}

export const landingService = new LandingService();