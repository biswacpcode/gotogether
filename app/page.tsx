
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import HomeSteps from '@/components/home/HomeSteps';
import HomeDevelopers from '@/components/home/HomeDevelopers';
import Link from 'next/link';

const Home = () => {
  return (
    <section className='mt-10 m-6'>
      <div className="flex flex-col items-center justify-center min-h-[80vh] animate-fade-in">
        <div className="text-center mb-12 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Go<span className="text-primary">Together</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Share your ride with fellow IIT Bhubaneswar students and travel together
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 mb-8 mx-8">
            <div className="relative rounded-lg p-[2px] animate-borderPulse bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 animate-float">
              <div className="glass-card rounded-lg p-6 flex flex-col items-center text-center bg-white dark:bg-gray-950">
                <div className="rounded-full bg-primary/20 p-3 mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Heading to Campus?</h3>
                <p className="text-muted-foreground mb-4">Find students traveling to IIT Bhubaneswar</p>
                <Link href="/share?direction=to">
                  <Button variant="outline" className="w-full">To Campus</Button>
                </Link>
              </div>
            </div>

            <div className="relative rounded-lg p-[2px] animate-borderPulse bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 animate-float" style={{ animationDelay: "0.3s" }}>
              <div className="glass-card rounded-lg p-6 flex flex-col items-center text-center bg-white dark:bg-gray-950">
                <div className="rounded-full bg-primary/20 p-3 mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Leaving Campus?</h3>
                <p className="text-muted-foreground mb-4">Find students traveling from IIT Bhubaneswar</p>
                <Link href="/share?direction=from">
                  <Button variant="outline" className="w-full">From Campus</Button>
                </Link>
              </div>
            </div>
          </div>

          
          <Link href="/share">
            <Button className="mt-4">Share Your Ride</Button>
          </Link>
          
          <div className="mt-6">
            <Link href="/history" className="text-primary hover:underline text-sm">
              View your ride history
            </Link>
          </div>
        </div>
      </div>

      <HomeSteps />
      <HomeDevelopers />

      </section>
  );
};

export default Home;