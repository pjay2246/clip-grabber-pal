
import { Youtube } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full py-6">
      <div className="container flex justify-center">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-brand-purple flex items-center justify-center">
            <Youtube className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">ClipGrab</h1>
            <p className="text-sm text-muted-foreground">YouTube Video Downloader</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
