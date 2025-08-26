export interface IOffice {
  id: string
  name: string
  address: string
  mapLink: string
}

export const OFFICES: IOffice[] = [
  {
    id: "sydney",
    name: process.env.NEXT_PUBLIC_OFFICE_SYDNEY_NAME || "Sydney",
    address: process.env.NEXT_PUBLIC_OFFICE_SYDNEY_ADDRESS || "Level 3, 7 Macquarie Place, Sydney, NSW, 2000",
    mapLink: process.env.NEXT_PUBLIC_OFFICE_SYDNEY_MAP_LINK || "https://maps.google.com/?q=Level+1,+1-3+Smail+Street,+Ultimo+NSW+2007"
  },
  {
    id: "hcmc",
    name: process.env.NEXT_PUBLIC_OFFICE_HCMC_NAME || "HCMC",
    address: process.env.NEXT_PUBLIC_OFFICE_HCMC_ADDRESS || "71A Rach Bung Binh, Ward 9, District 3, Ho Chi Minh City, Vietnam",
    mapLink: process.env.NEXT_PUBLIC_OFFICE_HCMC_MAP_LINK || "https://maps.app.goo.gl/ZaG3ADrPGUJjc1Lv9"
  },
]

export const DEFAULT_SIGNATURE_DATA = {
  name: process.env.NEXT_PUBLIC_DEFAULT_NAME || "DAMIAN PURVIS",
  title: process.env.NEXT_PUBLIC_DEFAULT_TITLE || "DIRECTOR",
  phone: process.env.NEXT_PUBLIC_DEFAULT_PHONE || "+61 234 567 890",
  office: process.env.NEXT_PUBLIC_DEFAULT_OFFICE || "sydney",
  primaryCTAText: process.env.NEXT_PUBLIC_DEFAULT_PRIMARY_CTA_TEXT || "BOOK MEETING",
  primaryCTAUrl: process.env.NEXT_PUBLIC_DEFAULT_PRIMARY_CTA_URL || "https://calendly.com/paved",
  secondaryCTAText: process.env.NEXT_PUBLIC_DEFAULT_SECONDARY_CTA_TEXT || "View LinkedIn",
  secondaryCTAUrl: process.env.NEXT_PUBLIC_DEFAULT_SECONDARY_CTA_URL || "https://linkedin.com/company/paved-digital",
  compactMode: false
}

export const COMPANY_LINKS = {
  website: process.env.NEXT_PUBLIC_COMPANY_WEBSITE || "https://paveddigital.com",
  linkedin: process.env.NEXT_PUBLIC_COMPANY_LINKEDIN || "https://linkedin.com/company/paved-digital"
}
