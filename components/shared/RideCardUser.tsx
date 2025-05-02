import { Calendar, Clock, MapPin, User, Mail, Phone } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from 'react';
import { Skeleton } from '../ui/skeleton';
import Link from 'next/link';
import { DeleteRide } from '@/lib/action';

export interface RideData {
  id: string;
  name: string;
  gender: string;
  direction: string;
  location: string;
  date: string;
  time: string;
  cost?: number;
  notes?: string;
  phone?: string;
  email?: string;
}

interface RideCardProps {
  ride: RideData;
  onClick?: () => void;
  isLoading?: boolean;
}

const RideCardUser = ({ ride, onClick, isLoading = false }: RideCardProps) => {
  const [showContact, setShowContact] = useState(false);
  if (isLoading) {
    return (
      <Card className="glass-card w-full overflow-hidden transition-all duration-200 m-5">
        <CardContent className="p-4 space-y-4">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
  
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Skeleton className="w-5 h-5 rounded-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="w-5 h-5 rounded-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="w-5 h-5 rounded-full" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Link href={`/history/${ride.id}`}>
      <Card 
        className={`glass-card w-full overflow-hidden hover:shadow-lg transition-all duration-200 mb-5 ${
          onClick ? 'cursor-pointer' : ''
        }`}
        onClick={onClick}
      >
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-lg">{ride.name}</h3>
              <p className="text-sm text-muted-foreground">{ride.email}</p>
            </div>
            <Badge variant={ride.gender === 'Male' ? 'default' : 'secondary'}>
              {ride.gender}
            </Badge>
          </div>

          <div className="space-y-2 mt-3">
            <div className="flex items-center space-x-2">
              <MapPin size={16} className="text-primary" />
              <span className="text-sm">{ride.direction==="from" ? "IIT Bhubaneswar" : ride.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={16} className="text-primary" />
              <span className="text-sm">{ride.direction==="to" ? "IIT Bhubaneswar" : ride.location}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{ride.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{ride.time}</span>
              </div>
            </div>
          </div>

          
        </CardContent>

        <CardFooter className="flex justify-between items-center bg-secondary/10 px-4 py-2 text-xs">
  <div>
    {ride.cost !== undefined && (
      <span className="mr-2">Cost sharing: ₹{ride.cost}</span>
    )}
    {ride.notes && (
      <span className="text-muted-foreground italic">{ride.notes}</span>
    )}
  </div>
  <Button
    variant="destructive"
    size="sm"
    className="text-xs"
    onClick={async (e) => {
      e.preventDefault(); // Prevent Link navigation
      const confirmDelete = confirm("Are you sure you want to delete this ride?");
      if (!confirmDelete) return;

      const res = await DeleteRide(ride.id);

     
    }}
  >
    Delete
  </Button>
</CardFooter>

      </Card>

      <Dialog open={showContact} onOpenChange={setShowContact}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Information</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {ride.phone && (
              <div className="flex items-center space-x-3">
                <Phone className="text-primary" />
                <span>{ride.phone}</span>
              </div>
            )}
            {ride.email && (
              <div className="flex items-center space-x-3">
                <Mail className="text-primary" />
                <span>{ride.email}</span>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Link>
  );
};

export default RideCardUser;