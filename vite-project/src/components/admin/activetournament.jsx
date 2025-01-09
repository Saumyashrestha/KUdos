import React from 'react';
import { 
  Trophy, 
  Users, 
  Calendar,
  MapPin,
  Search,
  Filter
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../card/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

const ActiveTournamentsPage = () => {
  const tournaments = [
    {
      id: 1,
      name: "Inter-College Football Championship",
      sport: "Football",
      participants: 12,
      startDate: "2025-01-15",
      endDate: "2025-01-20",
      venue: "Main Stadium",
      status: "In Progress"
    },
    {
      id: 2,
      name: "Winter Cricket League",
      sport: "Cricket",
      participants: 8,
      startDate: "2025-01-10",
      endDate: "2025-02-10",
      venue: "Cricket Ground",
      status: "Upcoming"
    },
    {
      id: 3,
      name: "Basketball Tournament",
      sport: "Basketball",
      participants: 16,
      startDate: "2025-01-12",
      endDate: "2025-01-18",
      venue: "Indoor Court",
      status: "Registration Open"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center space-x-4">
          <Trophy className="h-8 w-8 text-yellow-500" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Active Tournaments</h1>
            <p className="text-sm text-gray-500">Manage ongoing and upcoming tournaments</p>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                className="pl-10" 
                placeholder="Search tournaments..."
              />
            </div>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            Create Tournament
          </Button>
        </div>
      </div>

      {/* Tournament Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tournaments.map((tournament) => (
          <Card key={tournament.id} className="bg-white hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{tournament.name}</h3>
                  <p className="text-sm text-gray-500">{tournament.sport}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs ${
                  tournament.status === 'In Progress' ? 'bg-green-100 text-green-800' :
                  tournament.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {tournament.status}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">
                    {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{tournament.venue}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">{tournament.participants} Teams</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" className="flex-1">View Details</Button>
                  <Button className="flex-1 bg-blue-600 text-white hover:bg-blue-700">Manage</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ActiveTournamentsPage;