import { computed } from "vue";
import { siteData } from "@/constants/company";

export function useWhatsApp() {
  const localPhone = siteData.footer.phone.replace(/\D/g, "");
  const countryCode = siteData.whatsapp.countryCode.replace(/\D/g, "");
  const internationalPhone = localPhone.startsWith(countryCode)
    ? localPhone
    : `${countryCode}${localPhone}`;

  const createWhatsAppUrl = (message = siteData.whatsapp.defaultMessage) =>
    `https://wa.me/${internationalPhone}?text=${encodeURIComponent(message)}`;

  const whatsappUrl = computed(() => createWhatsAppUrl());

  return {
    createWhatsAppUrl,
    whatsappUrl,
  };
}
