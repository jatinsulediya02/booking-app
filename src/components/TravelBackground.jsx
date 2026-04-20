import { Plane, MapPin, Compass, Cloud, Globe } from 'lucide-react';

export default function TravelBackground() {
  return (
    <div className="travel-background">
      <Plane className="bg-icon plane" size={80} />
      <Cloud className="bg-icon cloud-1" size={100} />
      <Cloud className="bg-icon cloud-2" size={120} />
      <MapPin className="bg-icon map-pin" size={64} />
      <Compass className="bg-icon compass" size={72} />
      <Globe className="bg-icon globe" size={200} />
      <Plane className="bg-icon plane-2" size={60} />
    </div>
  );
}
