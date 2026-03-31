
// Extend the Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
  }
}

/**
 * Standard utility to push a data event to GTM's dataLayer.
 * @param eventName The event identifier in GTM.
 * @param payload Key-value pairs of context to attach.
 */
export const pushToDataLayer = (eventName: string, payload: Record<string, any> = {}) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...payload,
      timestamp: new Date().toISOString(),
    });
    console.debug(`[GTM Trace] ${eventName}`, payload);
  }
};

/**
 * Helper specifically for page path tracking.
 */
export const trackPageView = (path: string, pageData: Record<string, any> = {}) => {
  pushToDataLayer('page_view', {
    page_path: path,
    page_title: document.title,
    ...pageData,
  });
};

/**
 * A generic data event tracker that can be used everywhere.
 */
export const trackComponentAction = (componentName: string, actionName: string, meta: any = {}) => {
  pushToDataLayer('ui_interaction', {
    component: componentName,
    action: actionName,
    meta,
  });
};
