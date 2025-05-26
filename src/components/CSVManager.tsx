import { useState, useRef } from "react";
import { TimelineEventData } from "@/data/timelineData";
import { exportToCSV, validateCSVContent } from "@/utils/csvUtils";
import { Button } from "@/components/ui/button";
import { Download, Upload, AlertCircle, CheckCircle, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CSVManagerProps {
  events: TimelineEventData[];
  onImport: (events: TimelineEventData[]) => void;
  onReset?: () => void;
}

export const CSVManager = ({ events, onImport, onReset }: CSVManagerProps) => {
  const [isImporting, setIsImporting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleExport = () => {
    try {
      exportToCSV(events);
      toast({
        title: "Export Successful",
        description: "Timeline data exported to CSV file",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "An error occurred while exporting the data",
        variant: "destructive",
      });
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleReset = () => {
    if (onReset) {
      onReset();
      toast({
        title: "Reset Successful",
        description: "Timeline data restored to original version",
      });
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.name.toLowerCase().endsWith('.csv')) {
      toast({
        title: "Invalid File Type",
        description: "Please select a CSV file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "File size must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    setIsImporting(true);
    setValidationErrors([]);

    try {
      const content = await file.text();
      
      // Validate content
      const validation = validateCSVContent(content);
      
      if (!validation.isValid) {
        setValidationErrors(validation.errors);
        toast({
          title: "Validation Failed",
          description: `Found ${validation.errors.length} errors in the CSV file`,
          variant: "destructive",
        });
        return;
      }

      if (validation.data) {
        onImport(validation.data);
        toast({
          title: "Import Successful",
          description: `Imported ${validation.data.length} timeline events`,
        });
        setValidationErrors([]);
      }
    } catch (error) {
      toast({
        title: "Import Failed",
        description: "An error occurred while reading the file",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">CSV Data Management</h3>
        <div className="flex gap-2">
          <Button
            onClick={handleExport}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
          
          <Button
            onClick={handleImportClick}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            disabled={isImporting}
          >
            <Upload className="w-4 h-4" />
            {isImporting ? "Importing..." : "Import CSV"}
          </Button>

          {onReset && (
            <Button
              onClick={handleReset}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset to Original
            </Button>
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileSelect}
        className="hidden"
      />

      {validationErrors.length > 0 && (
        <div className="bg-red-900/30 border border-red-600 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <h4 className="font-semibold text-red-400">Validation Errors</h4>
          </div>
          <ul className="space-y-1 text-sm text-red-300">
            {validationErrors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="text-sm text-slate-400">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span className="font-medium">CSV Format Requirements:</span>
        </div>
        <ul className="ml-6 space-y-1">
          <li>• Headers: year, event, description, category, references (optional)</li>
          <li>• Year format: YYYY, YYYY-YYYY, or YYYYs</li>
          <li>• Valid categories: philosophical-foundations, early-ai, symbolic-ai, etc.</li>
          <li>• References: Multiple URLs separated by semicolons (;)</li>
          <li>• Maximum file size: 5MB</li>
        </ul>
      </div>
    </div>
  );
};
