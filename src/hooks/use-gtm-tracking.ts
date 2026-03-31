
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/gtm-datalayer';

/**
 * Tracks route changes in GTM
 * Use this hook at the top level of the app inside a Router context.
 */
export const useGtmTracking = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);
};
