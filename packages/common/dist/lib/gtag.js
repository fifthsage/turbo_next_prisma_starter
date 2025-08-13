export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GTM_ID;
// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export function pageview(url) {
    window.gtag("config", GA_TRACKING_ID, {
        page_path: url,
    });
}
export function setUser(userId) {
    window.gtag("config", GA_TRACKING_ID, {
        user_id: userId,
    });
}
export function event(action, { category, label, value, ...rest }) {
    window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
        ...rest,
    });
}
