
// Extend the Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
  }
}

/**
 * Push a standard event to the GTM Data Layer
 * @param eventName The name of the event for GTM triggers
 * @param eventProps Additional data to push
 */
export const pushToDataLayer = (eventName: string, eventProps: Record<string, any> = {}) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...eventProps,
      timestamp: new Date().toISOString(),
    });
    console.debug(`[GTM Trace] Event: ${eventName}`, eventProps);
  }
};

/**
 * Tracks a virtual page view for SPAs
 * @param path The relative path of the page
 * @param title The page title
 */
export const trackPageView = (path: string, title?: string) => {
  pushToDataLayer('page_view', {
    page_path: path,
    page_title: title || document.title,
    page_location: window.location.href,
  });
};

/**
 * DevExtreme Data Layer Bridge
 * This utility wraps DevExtreme DataSource/CustomStore events to track them in GTM
 */
export const createGtmDataStore = (storeConfig: any, entityName: string) => {
  const originalOnLoaded = storeConfig.onLoaded;
  const originalOnInserted = storeConfig.onInserted;
  const originalOnUpdated = storeConfig.onUpdated;
  const originalOnRemoved = storeConfig.onRemoved;

  return {
    ...storeConfig,
    onLoaded: (result: any) => {
      pushToDataLayer('dx_data_loaded', {
        entity: entityName,
        count: Array.isArray(result) ? result.length : 1,
      });
      if (originalOnLoaded) originalOnLoaded(result);
    },
    onInserted: (values: any, key: any) => {
      pushToDataLayer('dx_data_inserted', {
        entity: entityName,
        key: key,
      });
      if (originalOnInserted) originalOnInserted(values, key);
    },
    onUpdated: (key: any, values: any) => {
      pushToDataLayer('dx_data_updated', {
        entity: entityName,
        key: key,
      });
      if (originalOnUpdated) originalOnUpdated(key, values);
    },
    onRemoved: (key: any) => {
      pushToDataLayer('dx_data_removed', {
        entity: entityName,
        key: key,
      });
      if (originalOnRemoved) originalOnRemoved(key);
    }
  };
};
