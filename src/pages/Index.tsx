
import { useState } from "react";
import Header from "@/components/Header";
import VideoForm from "@/components/VideoForm";
import VideoPreview from "@/components/VideoPreview";
import DownloadHistory from "@/components/DownloadHistory";

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

interface DownloadedVideo {
  id: string;
  title: string;
  thumbnail?: string;
  downloadDate: Date;
  format: VideoFormat;
}

const Index = () => {
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [downloadHistory, setDownloadHistory] = useState<DownloadedVideo[]>([]);

  const handleVideoInfoFetched = (data: VideoInfo) => {
    setVideoInfo(data);
  };

  const handleDownloadComplete = (format: VideoFormat) => {
    if (!videoInfo) return;
    
    setDownloadHistory((prev) => [
      {
        id: videoInfo.id,
        title: videoInfo.title,
        thumbnail: videoInfo.thumbnail,
        downloadDate: new Date(),
        format,
      },
      ...prev,
    ]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="gradient-background h-64 absolute top-0 left-0 right-0 z-0" />
      
      <Header />
      
      <main className="container flex-grow z-10 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 text-white">
            <h2 className="text-3xl font-bold mb-3">Download YouTube Videos</h2>
            <p>Enter a YouTube URL below to download videos in your preferred quality</p>
          </div>
          
          <VideoForm onVideoInfoFetched={handleVideoInfoFetched} />
          
          {videoInfo && (
            <div className="mt-8">
              <VideoPreview 
                videoInfo={videoInfo}
                onDownloadComplete={handleDownloadComplete}
              />
            </div>
          )}
          
          <DownloadHistory downloads={downloadHistory} />
        </div>
      </main>
      
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>ClipGrab - For demonstration purposes only. Not for production use.</p>
      </footer>
    </div>
  );
};

export default Index;
