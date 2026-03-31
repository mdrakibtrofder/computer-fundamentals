
import CustomStore from 'devextreme/data/custom_store';
import { createGtmDataStore } from './gtm-datalayer';

/**
 * Example of a tracked data store using DevExtreme Data Layer
 * This can be used by DataGrid, List, etc. and will automatically
 * fire GTM events for all CRUD operations.
 */
export const createTrackedStore = (entityName: string) => {
  // 1. Initial Store Definition
  const store = new CustomStore({
    key: 'id',
    load: () => {
      // Simulate fetch - replace with your actual API endpoint
      return Promise.resolve([
        { id: 1, name: 'Sample Item 1', category: 'General' },
        { id: 2, name: 'Sample Item 2', category: 'Experimental' },
      ]);
    },
    insert: (values) => {
      console.log('Inserting', values);
      return Promise.resolve(values);
    },
    update: (key, values) => {
      console.log('Updating', key, values);
      return Promise.resolve(values);
    },
    remove: (key) => {
      console.log('Removing', key);
      return Promise.resolve();
    }
  });

  // 2. Wrap with GTM Tracking Bridge
  return createGtmDataStore(store, entityName);
};
