import siteData from "@/data/locations.json";

export const COMPANY_INFO = {
  ...siteData.brand,
  phone: siteData.footer.phone,
  phoneDisplay: siteData.footer.phone,
  email: siteData.footer.email,
  description: siteData.contact?.description || siteData.brand?.tagline || "",
};

export { siteData };
