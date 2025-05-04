
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Youtube } from "lucide-react";

const VideoForm = ({ onVideoInfoFetched }: { onVideoInfoFetched: (data: any) => void }) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateYouTubeUrl = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return youtubeRegex.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateYouTubeUrl(url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // In a real application, this would make an API call to fetch video information
    // For this demo, we'll simulate a response with mock data
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Extract video ID (this is a simplified version)
      const videoId = url.includes('youtu.be') 
        ? url.split('/').pop() 
        : url.includes('v=') 
          ? new URLSearchParams(url.split('?')[1]).get('v')
          : null;
          
      if (!videoId) {
        throw new Error("Could not extract video ID");
      }
      
      // Mock data for demonstration
      const mockData = {
        id: videoId,
        title: "Sample YouTube Video",
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        duration: "10:30",
        author: "YouTube Creator",
        formats: [
          { label: "720p (mp4)", value: "720p", format: "mp4" },
          { label: "480p (mp4)", value: "480p", format: "mp4" },
          { label: "360p (mp4)", value: "360p", format: "mp4" },
          { label: "Audio only (mp3)", value: "audio", format: "mp3" }
        ]
      };
      
      onVideoInfoFetched(mockData);
      toast({
        title: "Video found",
        description: "Video information retrieved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get video information",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Paste YouTube URL here"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <Button 
            type="submit" 
            disabled={isLoading} 
            className="h-12 px-8 bg-brand-purple hover:bg-brand-purple/90"
          >
            {isLoading ? "Loading..." : "Analyze"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default VideoForm;
