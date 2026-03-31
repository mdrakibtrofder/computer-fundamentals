
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pushToDataLayer } from './gtm-datalayer';

/**
 * A "Data Layer" wrapper for TanStack Query that automatically tracks 
 * CRUD operations and data states in GTM.
 * 
 * @param queryKey The TanStack Query key.
 * @param fetchFn The function that returns the data.
 */
export const useTrackedQuery = (queryKey: string[], fetchFn: () => Promise<any>) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const data = await fetchFn();
        // Automatic tracking of successful data loads
        pushToDataLayer('data_loaded', {
          query_key: queryKey.join('/'),
          data_count: Array.isArray(data) ? data.length : 1,
        });
        return data;
      } catch (error: any) {
        // Automatic error tracking
        pushToDataLayer('data_error', {
          query_key: queryKey.join('/'),
          error_message: error.message,
        });
        throw error;
      }
    },
  });
};

/**
 * Standard tracked mutation for all data modifications.
 */
export const useTrackedMutation = (
  entityName: string, 
  mutationFn: (variables: any) => Promise<any>,
  onSuccess?: (data: any) => void
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (variables) => {
      const result = await mutationFn(variables);
      pushToDataLayer('data_modified', {
        entity: entityName,
        action: 'modification',
        variables,
      });
      return result;
    },
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data);
      // Invalidate queries to refresh UI
      queryClient.invalidateQueries();
    }
  });
};
