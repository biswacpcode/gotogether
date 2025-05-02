import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import RideCard, { RideData } from './RideCard';
import { getMatches } from '@/lib/action';


interface RideMatchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rideId?: string;
  email: string;
  date: string;
  time: string;
  direction: string;
  gender: string;
  genderPreference: string;
  location:string;
}

const RideMatchDialog = ({ open, onOpenChange, rideId, email, date, time, direction, gender, genderPreference , location}: RideMatchDialogProps) => {
  const [matches, setMatches] = useState<RideData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (open) {
      setIsLoading(true);
      getMatches({email, date, time, direction, gender, genderPreference, location})
        .then((data) => {
          setMatches(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching matches:', error);
          setIsLoading(false);
        });
    }
  }, [open, rideId]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`glass sm:max-w-md ${isMobile ? 'w-[100vw] h-[100vh] p-4 rounded-none' : 'max-h-[80vh]'}`}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center justify-between">
            <span>Potential Matches</span>
           
          </DialogTitle>
          <DialogDescription>
            People traveling in the same direction around the same time
          </DialogDescription>
        </DialogHeader>
        
        <div className={`overflow-y-auto ${isMobile ? 'h-[calc(100vh-160px)]' : 'max-h-[60vh]'} py-2 pr-1`}>
          <div className="space-y-6">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <RideCard key={`skeleton-${i}`} ride={{} as RideData} isLoading />
              ))
            ) : matches.length > 0 ? (
              matches.map((ride) => (
                <RideCard 
                  key={ride.id} 
                  ride={ride} 
                />
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No matching rides found</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RideMatchDialog;