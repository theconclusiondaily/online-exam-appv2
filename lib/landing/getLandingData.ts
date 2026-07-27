import { landingService } from "./services/landing.service";

export async function getLandingData() {
  return landingService.getData();
}