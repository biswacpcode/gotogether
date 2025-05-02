import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";

const HomeDevelopers = () => {
  const developers = [
    
    {
      name: "Shlok Kumar Shaw",
      role: "Fullstack Developer",
      email: "21cs02008@iitbbs.ac.in",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya"
    },
    {
      name: "Biswajit Rout",
      role: "Fullstack Developer",
      email: "22mm01002@iitbbs.ac.in",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=chase"
    },
    {
      name: "Deshmukh Shahaji Pradeeep",
      role: "Fullstack Developer",
      email: "21me02036@iitbbs.ac.in",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya"
    },
    {
      name: "Varsha Swaraj",
      role: "Fullstack Developer",
      email: "22cs02005@iitbbs.ac.in",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=amit"
    }
  ];

  return (
    <div className="py-12 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {developers.map((dev) => (
            <Card key={dev.name} className="glass-card">
              <CardContent className="p-6 text-center">
                <img
                  src={dev.avatarUrl}
                  alt={dev.name}
                  className="w-24 h-24 mx-auto mb-4 rounded-full"
                />
                <h3 className="text-lg font-semibold mb-1">{dev.name}</h3>
                <p className="text-muted-foreground text-sm mb-3">{dev.role}</p>
                <a
                  href={`mailto:${dev.email}`}
                  className="inline-flex items-center text-sm text-primary hover:underline"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {dev.email}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeDevelopers;