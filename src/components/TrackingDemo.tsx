
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTrackedQuery } from '@/lib/data-layer-service';
import { pushToDataLayer } from '@/lib/gtm-datalayer';
import { RefreshCcw, Search, Plus, Trash2 } from "lucide-react";

const INITIAL_DATA = [
  { id: 1, name: "System Architecture", category: "Core" },
  { id: 2, name: "Memory Management", category: "OS" },
  { id: 3, name: "Network Protocols", category: "Networking" },
  { id: 4, name: "Compiler Design", category: "Language" },
];

/**
 * A free, high-performance Data Layer implementation using TanStack Query
 * and Shadcn/UI for a premium, license-free experience.
 */
export const TrackingDemo = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // 1. Data Layer integration using our generic Tracked Query
  const { data: items, isLoading, refetch } = useTrackedQuery(
    ['tracked-data'], 
    async () => {
        // Simulate an API delay
        await new Promise(r => setTimeout(r, 800));
        return INITIAL_DATA;
    }
  );

  const filteredItems = items?.filter((item: any) => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (val: string) => {
    setSearchTerm(val);
    if (val.length > 2) {
      pushToDataLayer('ui_search', { query: val, context: 'TrackingDemo' });
    }
  };

  const handleRefresh = () => {
    pushToDataLayer('ui_refresh', { context: 'TrackingDemo' });
    refetch();
  };

  const handleAction = (id: number, actionName: string) => {
    pushToDataLayer('ui_item_action', { item_id: id, action: actionName });
  };

  return (
    <div className="p-8 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-2">
        <div className="space-y-1">
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            Performance Data Layer
          </h2>
          <p className="text-slate-400 text-sm">
            Automatic GTM synchronization using open-source TanStack Query
          </p>
        </div>
        <div className="flex items-center gap-2">
           <span className="hidden sm:inline-flex text-[10px] uppercase tracking-widest font-bold py-1 px-2 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              GTM Active
           </span>
           <Button variant="outline" size="sm" onClick={handleRefresh} className="h-9 w-9 p-0 bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
             <RefreshCcw className={`h-4 w-4 text-slate-300 ${isLoading ? 'animate-spin' : ''}`} />
           </Button>
        </div>
      </div>

      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
        <Input 
          placeholder="Filter data layers... (tracked)" 
          className="pl-10 bg-slate-950/40 border-white/10 focus:border-blue-500/50 transition-all duration-300 text-slate-200"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-white/5 bg-slate-950/20 shadow-inner">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="w-[80px] text-slate-400 font-bold uppercase text-[10px] tracking-wider">ID</TableHead>
              <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Topic</TableHead>
              <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Category</TableHead>
              <TableHead className="text-right text-slate-400 font-bold uppercase text-[10px] tracking-wider">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <TableRow key={idx} className="border-white/5">
                  <TableCell colSpan={4} className="h-14 text-center text-slate-500 animate-pulse">
                     Loading synchronization data layer...
                  </TableCell>
                </TableRow>
              ))
            ) : filteredItems?.length === 0 ? (
               <TableRow className="border-white/5">
                  <TableCell colSpan={4} className="h-24 text-center text-slate-500 italic">No results found for your search.</TableCell>
               </TableRow>
            ) : (
                filteredItems?.map((item: any) => (
                    <TableRow key={item.id} className="border-white/5 hover:bg-white/[0.03] transition-colors group">
                      <TableCell className="font-mono text-slate-500">{item.id}</TableCell>
                      <TableCell className="font-medium text-slate-200 group-hover:text-blue-300 transition-colors">{item.name}</TableCell>
                      <TableCell>
                        <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                          {item.category}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                           <Button 
                             variant="ghost" 
                             size="icon" 
                             className="h-8 w-8 hover:bg-blue-500/10 hover:text-blue-400 text-slate-500 transition-all"
                             onClick={() => handleAction(item.id, 'edit')}
                           >
                             <Plus className="h-3.5 w-3.5" />
                           </Button>
                           <Button 
                             variant="ghost" 
                             size="icon" 
                             className="h-8 w-8 hover:bg-red-500/10 hover:text-red-400 text-slate-500 transition-all"
                             onClick={() => handleAction(item.id, 'delete')}
                           >
                             <Trash2 className="h-3.5 w-3.5" />
                           </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center px-2 py-1 gap-2 text-[11px] text-slate-500">
        <p>* Every search, filter, and action is automatically pushed to your custom GTM events</p>
        <p className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Synchronized with dataLayer
        </p>
      </div>
    </div>
  );
};
