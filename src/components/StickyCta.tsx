import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";

const StickyCta = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 md:hidden">
      <div className="m-3 rounded-lg border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="flex gap-2 p-2">
          <Button asChild variant="outline" className="flex-1">
            <a href="tel:+27670494876">
              <Phone className="h-4 w-4 mr-2" /> Call
            </a>
          </Button>
          <Button asChild className="flex-1">
            <a href="https://wa.me/27670494876" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StickyCta;
