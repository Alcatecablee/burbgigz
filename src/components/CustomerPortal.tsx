import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ServiceSessionDashboard } from './ServiceSessionDashboard';
import { 
  FileText, 
  Upload, 
  Settings, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  User,
  LogOut
} from 'lucide-react';

interface ServiceSession {
  id: number;
  sessionTitle: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  customerId: number;
  technicianId?: number;
  description?: string;
  sessionType?: string;
  estimatedDuration?: number;
  actualDuration?: number;
  scheduledAt?: string;
  startedAt?: string;
  completedAt?: string;
  notes?: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  createdAt: string;
  updatedAt: string;
}

async function fetchServiceSessions(): Promise<ServiceSession[]> {
  const response = await fetch('/api/sessions', {
    credentials: 'include',
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch service sessions');
  }
  
  return response.json();
}

export function CustomerPortal() {
  const { user, isLoading, isAuthenticated } = useAuth();
  
  // Fetch sessions data for overview statistics
  const { data: sessions } = useQuery({
    queryKey: ['serviceSessions', user?.id],
    queryFn: fetchServiceSessions,
    enabled: !!user?.id && isAuthenticated,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Calculate statistics from sessions data
  const activeSessions = sessions?.filter(s => s.status === 'in_progress') || [];
  const completedSessions = sessions?.filter(s => s.status === 'completed') || [];
  const pendingSessions = sessions?.filter(s => s.status === 'scheduled') || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Customer Portal Access</CardTitle>
            <CardDescription>
              Please log in to access your BurbGigz customer portal
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={() => window.location.href = '/api/login'}>
              Log In to Portal
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">BurbGigz Portal</h1>
              <Badge variant="secondary">Customer Dashboard</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{user?.name || user?.email}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.location.href = '/api/logout'}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sessions">Service Sessions</TabsTrigger>
            <TabsTrigger value="files">Files & Reports</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Active Sessions */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Sessions
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeSessions.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Currently being serviced
                  </p>
                </CardContent>
              </Card>

              {/* Completed Sessions */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Completed Sessions
                  </CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{completedSessions.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Successfully resolved
                  </p>
                </CardContent>
              </Card>

              {/* Pending Issues */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pending Issues
                  </CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pendingSessions.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Awaiting attention
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest service interactions and updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Windows 11 Cleanup Completed</p>
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                  </div>
                  <Badge variant="secondary">Completed</Badge>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">SSD Installation In Progress</p>
                    <p className="text-sm text-muted-foreground">4 hours ago</p>
                  </div>
                  <Badge variant="outline">Active</Badge>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Remote Support Session Started</p>
                    <p className="text-sm text-muted-foreground">6 hours ago</p>
                  </div>
                  <Badge variant="outline">Started</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <ServiceSessionDashboard />
          </TabsContent>

          <TabsContent value="files" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Files & Reports</CardTitle>
                <CardDescription>
                  Upload screenshots, view reports, and manage shared documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Upload className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>File management interface will be implemented here</p>
                  <p className="text-sm">Secure file uploads and downloads</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your profile and portal preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Settings panel will be implemented here</p>
                  <p className="text-sm">Profile, notifications, and preferences</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}