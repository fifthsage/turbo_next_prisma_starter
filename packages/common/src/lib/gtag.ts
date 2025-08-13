export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GTM_ID;

type GTagEvent = {
  category: string;
  label: string;
  value: number | string;
} & Record<string, unknown>;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export function pageview(url: string) {
  window.gtag("config", GA_TRACKING_ID as string, {
    page_path: url,
  });
}

export function setUser(userId: string) {
  window.gtag("config", GA_TRACKING_ID as string, {
    user_id: userId,
  });
}

export function event(
  action: string,
  { category, label, value, ...rest }: GTagEvent,
) {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
    ...rest,
  });
}
