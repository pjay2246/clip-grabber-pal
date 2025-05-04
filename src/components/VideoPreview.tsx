
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Download, FileVideo } from "lucide-react";

interface VideoFormat {
  label: string;
  value: string;
  format: string;
}

interface VideoInfo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  author: string;
  formats: VideoFormat[];
}

const VideoPreview = ({ 
  videoInfo,
  onDownloadComplete
}: { 
  videoInfo: VideoInfo;
  onDownloadComplete: (format: VideoFormat) => void;
}) => {
  const [selectedFormat, setSelectedFormat] = useState<string>(videoInfo.formats[0].value);
  const [downloading, setDownloading] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    setDownloading(true);
    
    const format = videoInfo.formats.find(f => f.value === selectedFormat);
    
    if (!format) {
      toast({
        title: "Error",
        description: "Please select a format first",
        variant: "destructive",
      });
      setDownloading(false);
      return;
    }

    // In a real application, this would trigger the actual download
    // For this demo, we'll simulate the download process
    try {
      // Simulate download time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Download Complete",
        description: `Successfully downloaded in ${format.label} format`,
      });
      
      onDownloadComplete(format);
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error during download",
        variant: "destructive",
      });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="truncate text-lg">{videoInfo.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative w-full md:w-64 h-48 overflow-hidden rounded-md bg-slate-100">
            {videoInfo.thumbnail ? (
              <img 
                src={videoInfo.thumbnail} 
                alt={videoInfo.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if thumbnail fails to load
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "https://placehold.co/640x360/gray/white?text=Video+Thumbnail";
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-200">
                <FileVideo size={48} className="text-slate-400" />
              </div>
            )}
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
              {videoInfo.duration}
            </div>
          </div>
          <div className="flex-grow space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Creator</p>
              <p className="font-medium">{videoInfo.author}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Video ID</p>
              <p className="font-mono text-sm truncate">{videoInfo.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Format</p>
              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  {videoInfo.formats.map((format) => (
                    <SelectItem key={format.value} value={format.value}>
                      {format.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleDownload} 
          disabled={downloading} 
          className="w-full bg-brand-purple hover:bg-brand-purple/90 gap-2"
        >
          <Download size={18} />
          {downloading ? "Downloading..." : "Download Now"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VideoPreview;
