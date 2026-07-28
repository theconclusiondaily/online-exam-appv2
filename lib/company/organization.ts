// lib/company/organization.ts

import { COMPANY } from "./identity";
import { CONTACT } from "./contact";
import { SOCIAL } from "./social";

export const organizationSchema = {
  "@context": "https://schema.org",

  "@type": "Organization",

  name: COMPANY.name,

  alternateName: COMPANY.shortName,

  url: COMPANY.website,

  logo: `${COMPANY.website}${COMPANY.logo}`,

  description: COMPANY.shortDescription,

  email: CONTACT.contactEmail,

  address: {
    "@type": "PostalAddress",
    addressLocality: CONTACT.city,
    addressRegion: CONTACT.state,
    addressCountry: CONTACT.country,
  },

  sameAs: Object.values(SOCIAL).filter(Boolean),
};