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
    address: process.env.NEXT_PUBLIC_OFFICE_SYDNEY_ADDRESS || "Level 1, 1-3 Smail Street, Ultimo NSW 2007",
    mapLink: process.env.NEXT_PUBLIC_OFFICE_SYDNEY_MAP_LINK || "https://maps.google.com/?q=Level+1,+1-3+Smail+Street,+Ultimo+NSW+2007"
  },
  {
    id: "melbourne",
    name: process.env.NEXT_PUBLIC_OFFICE_MELBOURNE_NAME || "Melbourne",
    address: process.env.NEXT_PUBLIC_OFFICE_MELBOURNE_ADDRESS || "Level 1, 1-3 Smail Street, Ultimo NSW 2007",
    mapLink: process.env.NEXT_PUBLIC_OFFICE_MELBOURNE_MAP_LINK || "https://maps.google.com/?q=Level+1,+1-3+Smail+Street,+Ultimo+NSW+2007"
  },
  {
    id: "brisbane",
    name: process.env.NEXT_PUBLIC_OFFICE_BRISBANE_NAME || "Brisbane",
    address: process.env.NEXT_PUBLIC_OFFICE_BRISBANE_ADDRESS || "Level 1, 1-3 Smail Street, Ultimo NSW 2007",
    mapLink: process.env.NEXT_PUBLIC_OFFICE_BRISBANE_MAP_LINK || "https://maps.google.com/?q=Level+1,+1-3+Smail+Street,+Ultimo+NSW+2007"
  },
  {
    id: "perth",
    name: process.env.NEXT_PUBLIC_OFFICE_PERTH_NAME || "Perth",
    address: process.env.NEXT_PUBLIC_OFFICE_PERTH_ADDRESS || "Level 1, 1-3 Smail Street, Ultimo NSW 2007",
    mapLink: process.env.NEXT_PUBLIC_OFFICE_PERTH_MAP_LINK || "https://maps.google.com/?q=Level+1,+1-3+Smail+Street,+Ultimo+NSW+2007"
  },
  {
    id: "adelaide",
    name: process.env.NEXT_PUBLIC_OFFICE_ADELAIDE_NAME || "Adelaide",
    address: process.env.NEXT_PUBLIC_OFFICE_ADELAIDE_ADDRESS || "Level 1, 1-3 Smail Street, Ultimo NSW 2007",
    mapLink: process.env.NEXT_PUBLIC_OFFICE_ADELAIDE_MAP_LINK || "https://maps.google.com/?q=Level+1,+1-3+Smail+Street,+Ultimo+NSW+2007"
  },
  {
    id: "canberra",
    name: process.env.NEXT_PUBLIC_OFFICE_CANBERRA_NAME || "Canberra",
    address: process.env.NEXT_PUBLIC_OFFICE_CANBERRA_ADDRESS || "Level 1, 1-3 Smail Street, Ultimo NSW 2007",
    mapLink: process.env.NEXT_PUBLIC_OFFICE_CANBERRA_MAP_LINK || "https://maps.google.com/?q=Level+1,+1-3+Smail+Street,+Ultimo+NSW+2007"
  },
  {
    id: "darwin",
    name: process.env.NEXT_PUBLIC_OFFICE_DARWIN_NAME || "Darwin",
    address: process.env.NEXT_PUBLIC_OFFICE_DARWIN_ADDRESS || "Level 1, 1-3 Smail Street, Ultimo NSW 2007",
    mapLink: process.env.NEXT_PUBLIC_OFFICE_DARWIN_MAP_LINK || "https://maps.google.com/?q=Level+1,+1-3+Smail+Street,+Ultimo+NSW+2007"
  },
  {
    id: "hobart",
    name: process.env.NEXT_PUBLIC_OFFICE_HOBART_NAME || "Hobart",
    address: process.env.NEXT_PUBLIC_OFFICE_HOBART_ADDRESS || "Level 1, 1-3 Smail Street, Ultimo NSW 2007",
    mapLink: process.env.NEXT_PUBLIC_OFFICE_HOBART_MAP_LINK || "https://maps.google.com/?q=Level+1,+1-3+Smail+Street,+Ultimo+NSW+2007"
  }
]

export const DEFAULT_SIGNATURE_DATA = {
  name: process.env.NEXT_PUBLIC_DEFAULT_NAME || "DAMIAN PURVIS",
  title: process.env.NEXT_PUBLIC_DEFAULT_TITLE || "DIRECTOR",
  phone: process.env.NEXT_PUBLIC_DEFAULT_PHONE || "+61 234 567 890",
  office: process.env.NEXT_PUBLIC_DEFAULT_OFFICE || "sydney",
  primaryCTAText: process.env.NEXT_PUBLIC_DEFAULT_PRIMARY_CTA_TEXT || "BOOK MEETING",
  primaryCTAUrl: process.env.NEXT_PUBLIC_DEFAULT_PRIMARY_CTA_URL || "https://calendly.com/paved",
  secondaryCTAText: process.env.NEXT_PUBLIC_DEFAULT_SECONDARY_CTA_TEXT || "View LinkedIn",
  secondaryCTAUrl: process.env.NEXT_PUBLIC_DEFAULT_SECONDARY_CTA_URL || "https://linkedin.com/company/paved-digital"
}

export const COMPANY_LINKS = {
  website: process.env.NEXT_PUBLIC_COMPANY_WEBSITE || "https://paveddigital.com",
  linkedin: process.env.NEXT_PUBLIC_COMPANY_LINKEDIN || "https://linkedin.com/company/paved-digital"
}
