'use client'
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, ArrowLeft, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import RideMatchDialog from '@/components/shared/RideMatchDialog';
import { RideData } from '@/components/shared/RideCard';
import { useEffect, useState } from 'react';
import { getRideDetail } from '@/lib/action';
import { Skeleton } from '@/components/ui/skeleton';
import { useParams, useRouter } from 'next/navigation';

const RideDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useRouter();
    const [rideDetail, setRideDetail] = useState<RideData | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [showMatchDialog, setShowMatchDialog] = useState(false);
  
    useEffect(() => {
      if (id) {
        setIsLoading(true);
        getRideDetail(id)
          .then(data => {
            setRideDetail(data);
            setIsLoading(false);
          })
          .catch(error => {
            console.error('Error fetching ride details:', error);
            setIsLoading(false);
          });
      }
    }, [id]);
  
    const goBack = () => navigate.push('/history');
  
    if (isLoading) {
        return (
          <div className="max-w-2xl mx-auto animate-fade-in m-5">
            <Button 
              variant="ghost" 
              onClick={goBack} 
              className="mb-6 pl-0"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back
            </Button>
            
            <div className="glass-card p-8 rounded-lg space-y-6">
              <div>
                <Skeleton className="h-6 w-1/3 mb-2" />
                <Skeleton className="h-4 w-1/4" />
              </div>
      
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </div>
      
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        );
      }
      
  
    if (!rideDetail) {
      return (

          <div className="max-w-2xl mx-auto text-center py-12 m-5">
            <h1 className="text-2xl font-bold mb-4">Ride Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The ride you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={goBack}>Go Back</Button>
          </div>

      );
    }
  
    return (
        <section className='m-6'>


        <div className="max-w-2xl mx-auto animate-fade-in">
          <Button 
            variant="ghost" 
            onClick={goBack} 
            className="mb-6 pl-0"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to History
          </Button>
          
          <Card className="glass-card overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-2xl font-bold">{rideDetail.name}</h1>
                  <p className="text-muted-foreground">{rideDetail.email}</p>
                </div>
                <Badge variant={rideDetail.gender === 'Male' ? 'default' : 'secondary'}>
                  {rideDetail.gender}
                </Badge>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <MapPin size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">From</p>
                    <p className="font-medium">{rideDetail.direction==="from" ? "IIT Bhubaneswar" : rideDetail.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <MapPin size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">To</p>
                    <p className="font-medium">{rideDetail.direction==="to" ? "IIT Bhubaneswar" : rideDetail.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Calendar size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date & Time</p>
                    <p className="font-medium">{rideDetail.date} at {rideDetail.time}</p>
                  </div>
                </div>
                
                {rideDetail.cost && (
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Clock size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Cost Sharing</p>
                      <p className="font-medium">₹{rideDetail.cost}</p>
                    </div>
                  </div>
                )}
                
                {rideDetail.notes && (
                  <div className="bg-muted/50 p-3 rounded-md">
                    <p className="text-sm italic">{rideDetail.notes}</p>
                  </div>
                )}
              </div>
              
              <Button 
                className="w-full flex items-center justify-center"
                onClick={() => setShowMatchDialog(true)}
              >
                <Users size={16} className="mr-2" />
                Find Matching Rides
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <RideMatchDialog 
          open={showMatchDialog} 
          onOpenChange={setShowMatchDialog} 
          email={rideDetail.email!}
          gender={rideDetail.gender}
          direction={rideDetail.direction}
          date={ rideDetail.date}
            time={rideDetail.time} 
            genderPreference={rideDetail.genderPreference}
            location ={rideDetail.location}
        />
        </section>
    );
  };
  
  export default RideDetail;
  