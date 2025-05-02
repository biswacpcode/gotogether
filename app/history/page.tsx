// app/history/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import RideCard, { RideData } from '@/components/shared/RideCard';
import { Getrides } from '@/lib/action';
import RideCardUser from '@/components/shared/RideCardUser';

export default function HistoryPage() {
  const { data: session } = useSession();
  const [rides, setRides] = useState<RideData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchUserRides = async () => {
      setLoading(true);

      const data = await Getrides();
      setRides(data);
      setLoading(false);
    };

    fetchUserRides();
  }, [session]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 m-10 overflow-hidden">
      <h1 className="text-2xl font-semibold mb-4">Your Ride History</h1>
      {loading ? (
        Array(3).fill(0).map((_, i) => (
            <RideCard key={`skeleton-${i}`} ride={{} as RideData} isLoading />
          ))
      ) : rides.length === 0 ? (
        <p className="text-muted-foreground">No rides found.</p>
      ) : (
        <div className="space-y-4">
          {rides.map((ride) => (
            <RideCardUser key={ride.id} ride={ride} />
          ))}
        </div>
      )}
    </div>
  );
}
