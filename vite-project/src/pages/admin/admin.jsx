import React, { useState } from 'react';
import { 
  Card, 
  CardHeader,
  CardTitle, 
  CardContent,
  CardDescription 
} from '../../components/card/card'; ; 
import { 
  Users,
  UserPlus,
  ShieldCheck,
  Dumbbell,
  Calendar,
  Trophy,
  Activity,
  Bell
} from 'lucide-react';

const AdminDashboard = () => {
  const [notifications] = useState(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      {/* Top Navigation Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <ShieldCheck className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Sports Management Admin</h1>
            <p className="text-sm text-gray-500">Welcome back, Administrator</p>
          </div>
        </div>
        <div className="relative">
          <Bell className="h-6 w-6 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notifications}
            </span>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white hover:shadow-lg transition-shadow">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <h3 className="text-2xl font-bold text-gray-800">1,234</h3>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
            <div className="mt-4 text-xs text-green-600">
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white hover:shadow-lg transition-shadow">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Coordinators</p>
                <h3 className="text-2xl font-bold text-gray-800">8</h3>
              </div>
              <UserPlus className="h-8 w-8 text-purple-500" />
            </div>
            <div className="mt-4 text-xs text-blue-600">
              2 pending approvals
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white hover:shadow-lg transition-shadow">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Equipment Items</p>
                <h3 className="text-2xl font-bold text-gray-800">156</h3>
              </div>
              <Dumbbell className="h-8 w-8 text-green-500" />
            </div>
            <div className="mt-4 text-xs text-orange-600">
              12 items checked out
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white hover:shadow-lg transition-shadow">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Tournaments</p>
                <h3 className="text-2xl font-bold text-gray-800">3</h3>
              </div>
              <Trophy className="h-8 w-8 text-yellow-500" />
            </div>
            <div className="mt-4 text-xs text-purple-600">
              2 upcoming this week
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { text: "Suman upgraded to Cricket Coordinator", time: "2 hours ago", type: "role" },
                  { text: "New equipment request from Football team", time: "4 hours ago", type: "equipment" },
                  { text: "Tournament schedule updated", time: "1 day ago", type: "tournament" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full ${
                        activity.type === 'role' ? 'bg-blue-500' :
                        activity.type === 'equipment' ? 'bg-green-500' :
                        'bg-purple-500'
                      }`} />
                      <span className="text-sm text-gray-700">{activity.text}</span>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-500" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Inter-College Football Tournament", date: "Dec 25", status: "Pending" },
                  { title: "Cricket Equipment Inspection", date: "Dec 27", status: "Confirmed" },
                  { title: "New Coordinator Training", date: "Dec 30", status: "Scheduled" }
                ].map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div>
                      <p className="font-medium text-gray-800">{event.title}</p>
                      <p className="text-sm text-gray-500">{event.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      event.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      event.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-green-500" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { icon: UserPlus, text: "Add New Coordinator", color: "text-blue-500" },
                  { icon: Dumbbell, text: "Equipment Check-out", color: "text-green-500" },
                //   { icon: Trophy, text: "Create Tournament", color: "text-yellow-500" },
                  { icon: Activity, text: "Generate Reports", color: "text-purple-500" }
                ].map((action, index) => (
                  <div key={index} 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <action.icon className={`h-5 w-5 ${action.color}`} />
                    <span className="text-sm font-medium text-gray-700">{action.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold">System Status</CardTitle>
              <CardDescription className="text-blue-100">All systems operational</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Server Status</span>
                  <span className="text-xs bg-green-400 px-2 py-1 rounded-full">Online</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Last Backup</span>
                  <span className="text-xs">2 hours ago</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Storage</span>
                  <span className="text-xs">75% used</span>
                </div>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;