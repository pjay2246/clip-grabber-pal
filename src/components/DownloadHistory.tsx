
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileVideo, Video } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface DownloadedVideo {
  id: string;
  title: string;
  thumbnail?: string;
  downloadDate: Date;
  format: {
    label: string;
    value: string;
    format: string;
  };
}

const DownloadHistory = ({ downloads }: { downloads: DownloadedVideo[] }) => {
  if (downloads.length === 0) {
    return null;
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Video className="h-5 w-5" /> Download History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {downloads.map((video) => (
            <div key={`${video.id}-${video.downloadDate.getTime()}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="w-16 h-12 flex-shrink-0 rounded overflow-hidden bg-slate-100">
                {video.thumbnail ? (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if thumbnail fails to load
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "https://placehold.co/320x180/gray/white?text=Video";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-200">
                    <FileVideo size={20} className="text-slate-400" />
                  </div>
                )}
              </div>
              <div className="flex-grow min-w-0">
                <div className="font-medium truncate" title={video.title}>{video.title}</div>
                <div className="flex text-xs text-muted-foreground">
                  <span>{video.format.label}</span>
                  <span className="mx-1">•</span>
                  <span>{formatDistanceToNow(video.downloadDate, { addSuffix: true })}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DownloadHistory;
