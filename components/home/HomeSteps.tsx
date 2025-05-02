import { ArrowRight } from 'lucide-react';

const HomeSteps = () => {
  const steps = [
    {
      title: "Choose Direction",
      description: "Select whether you're traveling to or from IIT Bhubaneswar"
    },
    {
      title: "Enter Details",
      description: "Add your travel date, time, and any preferences"
    },
    {
      title: "Find Matches",
      description: "Get connected with others traveling the same way"
    },
    {
      title: "Contact & Coordinate",
      description: "Reach out to potential travel companions and plan together"
    }
  ];

  return (
    <div className="py-12 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        How It Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div key={index} className="glass-card p-6 rounded-lg relative">
            <div className="mb-4">
              <span className="text-4xl font-bold text-primary">
                {index + 1}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
            <p className="text-muted-foreground text-sm">{step.description}</p>
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                <ArrowRight className="text-primary" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeSteps;