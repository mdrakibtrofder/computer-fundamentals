
import React, { useState, useEffect } from 'react';
import { DataGrid, Column, Editing, HeaderFilter, SearchPanel } from 'devextreme-react/data-grid';
import { createTrackedStore } from '@/lib/data-layer-service';
import { pushToDataLayer } from '@/lib/gtm-datalayer';

/**
 * A demonstration of DevExtreme Datagrid integrated with the GTM Data Layer.
 * All operations like load, search, filter and editing are tracked.
 */
export const TrackingDemo = () => {
  const [dataSource] = useState(() => createTrackedStore('UserInteractions'));

  const handleToolbarPrepared = (e: any) => {
    // Custom tracking for toolbar actions
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'refresh',
        onClick: () => {
          pushToDataLayer('manual_data_refresh', { component: 'DataGrid' });
          dataSource.load();
        }
      }
    });
  };

  return (
    <div className="p-6 bg-slate-900 rounded-xl shadow-2xl space-y-4">
      <div className="flex justify-between items-center px-4">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
          DevExtreme Data Layer Integration
        </h2>
        <span className="text-xs font-mono px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30 animate-pulse">
            LIVE GTM TRACKING
        </span>
      </div>

      <div className="overflow-hidden rounded-lg bg-slate-800 p-2 shadow-inner">
        <DataGrid
          dataSource={dataSource}
          showBorders={true}
          focusedRowEnabled={true}
          onToolbarPreparing={handleToolbarPrepared}
          onRowClick={(e) => pushToDataLayer('row_click', { id: e.key, index: e.rowIndex })}
          className="rounded-lg overflow-hidden border-none text-slate-200"
          rowAlternationEnabled={true}
        >
          <SearchPanel visible={true} width={240} placeholder="Search data... (tracked)" />
          <HeaderFilter visible={true} />
          <Editing
            mode="row"
            allowUpdating={true}
            allowDeleting={true}
            allowAdding={true}
          />
          <Column dataField="id" caption="ID" width={50} alignment="center" />
          <Column dataField="name" caption="Item Name" />
          <Column dataField="category" caption="Category" />
        </DataGrid>
      </div>

      <div className="text-xs text-slate-500 italic px-4">
        * Every CRUD operation and selection is now automatically pushed to the window.dataLayer
      </div>
    </div>
  );
};
