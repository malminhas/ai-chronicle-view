
import { useState } from "react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const About = () => {
  const [open, setOpen] = useState(false);

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
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
