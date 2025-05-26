
import { useState } from "react";
import { Info, Bug } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { extractDataFromLocalStorage } from "@/utils/syncLocalStorageToJson";

const STORAGE_KEY = 'ai-timeline-data';

export const About = () => {
  const [open, setOpen] = useState(false);

  const handleSyncToJson = () => {
    console.log('=== Debug Storage Button Clicked ===');
    
    try {
      const storageData = extractDataFromLocalStorage();
      console.log('Raw storage data result:', storageData);
      
      if (storageData && storageData.length > 0) {
        console.log('=== COPY THIS DATA TO UPDATE timelineEvents.json ===');
        console.log(JSON.stringify(storageData, null, 2));
        console.log('=== END OF DATA ===');
        
        // Show summary
        const withRefs = storageData.filter(event => event.references && event.references.length > 0);
        console.log(`📊 Summary: ${storageData.length} total events, ${withRefs.length} events with references`);
        
        // Show a sample event with references for verification
        const sampleWithRefs = storageData.find(event => event.references && event.references.length > 0);
        if (sampleWithRefs) {
          console.log('📋 Sample event with references:', sampleWithRefs);
        }
      } else {
        console.log('❌ No localStorage data found to sync');
        console.log('Current localStorage content:', localStorage.getItem(STORAGE_KEY));
      }
    } catch (error) {
      console.error('❌ Error in handleSyncToJson:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="fixed bottom-4 right-4 text-slate-400 hover:text-white opacity-60 hover:opacity-100 transition-all duration-200"
        >
          <Info className="h-4 w-4 mr-1" />
          About
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-400" />
            About AI Timeline Explorer
          </DialogTitle>
          <DialogDescription className="space-y-3 pt-2">
            <div>
              <strong>Version:</strong> v1.0
            </div>
            <div>
              <strong>Created:</strong> {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <div>
              <strong>Author:</strong> Mal Minhas with help from{" "}
              <a 
                href="https://lovable.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Lovable
              </a>
            </div>
            <div className="pt-2 text-sm">
              An interactive web application for exploring the history of Artificial Intelligence 
              through multiple timeline visualizations. Features CSV data management, responsive 
              design, and comprehensive event details.
            </div>
            <div className="pt-2">
              <a 
                href="https://github.com/malminhas/ai-chronicle-view" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline text-sm"
              >
                View Source Code →
              </a>
            </div>
            <div className="pt-4 border-t border-slate-600">
              <Button
                onClick={handleSyncToJson}
                variant="outline"
                size="sm"
                className="w-full flex items-center gap-2"
              >
                <Bug className="h-4 w-4" />
                Debug Storage Data
              </Button>
              <p className="text-xs text-slate-500 mt-2">
                Logs localStorage data to console for development
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
