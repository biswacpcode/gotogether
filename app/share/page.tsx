'use client'
import { useState, useEffect } from 'react';
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import RideMatchDialog from '@/components/shared/RideMatchDialog';
import { insertRide } from '@/lib/action';
import { useSession } from 'next-auth/react';

// Common locations around Bhubaneswar
const commonLocations = [
  "Bhubaneswar Railway Station",
  "Khurda Road Junction",
  "DN Regalia Mall",
  "Bhubaneswar Airport",
  "Esplanade One Mall",
  "Nandankanan Zoo",
  "Khandagiri Caves",
  "Lingaraj Temple",
];

const ShareRide = () => {
  
  // Form states
  const [direction, setDirection] = useState<'from' | 'to'>('from');

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const param = params.get('direction');
  if (param === 'to' || param === 'from') {
    setDirection(param);
  }
}, []);

  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>("12:00");
  const [gender, setGender] = useState<string>("");
  const [genderPreference, setGenderPreference] = useState<string>("any");
  const [notes, setNotes] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const {data: session} = useSession();

  
  // UI states
  const [showDialog, setShowDialog] = useState(false);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    


    insertRide({
      direction,
      location,
      date: date ? format(date, "yyyy-MM-dd") : '',
      time,
      gender,
      genderPreference,
      notes,
      phone,
    });
    
    
    // Show the matching dialog
    setShowDialog(true);
  };

  return (
    <section className='mt-10 m-6'>
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Share Your Ride</h1>
          <p className="text-muted-foreground">
            Fill the details below to find people traveling in the same direction
          </p>
        </div>

        <div className="glass-card rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            {/* Direction Selection */}
            <div className="form-group mb-6">
              <Label>Travel Direction</Label>
              <div className="grid grid-cols-2 gap-4 mt-1">
                <Button
                  type="button"
                  variant={direction === 'from' ? 'default' : 'outline'}
                  className={`flex items-center justify-center gap-2 ${
                    direction === 'from' ? 'border-primary' : ''
                  }`}
                  onClick={() => setDirection('from')}
                >
                  <MapPin size={16} />
                  From IIT BBSR
                </Button>
                <Button
                  type="button"
                  variant={direction === 'to' ? 'default' : 'outline'}
                  className={`flex items-center justify-center gap-2 ${
                    direction === 'to' ? 'border-primary' : ''
                  }`}
                  onClick={() => setDirection('to')}
                >
                  <MapPin size={16} />
                  To IIT BBSR
                </Button>
              </div>
            </div>

            {/* Location Selection */}
            <div className="form-group">
              <Label htmlFor="location">
                {direction === 'from' ? 'Destination' : 'Starting Point'}
              </Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {commonLocations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="form-group">
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="form-group">
                <Label htmlFor="time">Time</Label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }).map((_, hour) => (
                      <>
                        <SelectItem value={`${hour.toString().padStart(2, '0')}:00`}>
                          {`${hour.toString().padStart(2, '0')}:00`}
                        </SelectItem>
                        <SelectItem value={`${hour.toString().padStart(2, '0')}:30`}>
                          {`${hour.toString().padStart(2, '0')}:30`}
                        </SelectItem>
                      </>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Personal Info & Preferences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="form-group">
                <Label htmlFor="gender">Your Gender</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="form-group">
                <Label htmlFor="genderPreference">Gender Preference</Label>
                <Select value={genderPreference} onValueChange={setGenderPreference}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="male">Male only</SelectItem>
                    <SelectItem value="female">Female only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            


            {/* Cost and Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="form-group">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                type="tel"
                id="phone"
                placeholder="Your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

              <div className="form-group">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any special requirements..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="h-[38px] resize-none"
                />
              </div>
            </div>

            <Button type="submit" className="w-full mt-4">
              Share Ride
            </Button>
          </form>
        </div>
      </div>

      <RideMatchDialog 
        open={showDialog} 
        onOpenChange={setShowDialog} 
        email={session?.user?.email!}
  date={ date ? format(date, "yyyy-MM-dd") : ''}
  time={time}
  direction={direction}
  gender={gender}
  genderPreference={genderPreference}
  location ={location}
      />
    </section>
  );
};

export default ShareRide;


