import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  User, 
  Calendar,
  FileText,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

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

function getStatusIcon(status: string) {
  switch (status) {
    case 'scheduled':
      return <Clock className="w-4 h-4" />;
    case 'in_progress':
      return <AlertCircle className="w-4 h-4 text-blue-600" />;
    case 'completed':
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    case 'cancelled':
      return <AlertCircle className="w-4 h-4 text-red-600" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case 'scheduled':
      return 'secondary';
    case 'in_progress':
      return 'default';
    case 'completed':
      return 'secondary';
    case 'cancelled':
      return 'destructive';
    default:
      return 'secondary';
  }
}

function getPriorityColor(priority: string) {
  switch (priority) {
    case 'urgent':
      return 'destructive';
    case 'high':
      return 'destructive';
    case 'normal':
      return 'secondary';
    case 'low':
      return 'outline';
    default:
      return 'secondary';
  }
}

function formatDateTime(dateString: string | undefined) {
  if (!dateString) return 'Not scheduled';
  return new Date(dateString).toLocaleString();
}

export function ServiceSessionDashboard() {
  const { user } = useAuth();
  
  const { data: sessions, isLoading, error } = useQuery({
    queryKey: ['serviceSessions', user?.id],
    queryFn: fetchServiceSessions,
    enabled: !!user?.id,
    refetchInterval: 30000, // Refresh every 30 seconds for real-time updates
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-muted rounded w-1/4"></div>
          <div className="h-32 bg-muted rounded"></div>
          <div className="h-32 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Failed to load service sessions</p>
            <p className="text-sm text-muted-foreground mt-1">Please try refreshing the page</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!sessions || sessions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Service Sessions</CardTitle>
          <CardDescription>
            Track progress and view details for all your IT support sessions
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No service sessions yet</p>
            <p className="text-sm text-muted-foreground mt-1">Your support sessions will appear here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const activeSessions = sessions.filter(s => s.status === 'in_progress');
  const upcomingSessions = sessions.filter(s => s.status === 'scheduled');
  const recentSessions = sessions.filter(s => s.status === 'completed').slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSessions.length}</div>
            <p className="text-xs text-muted-foreground">Currently being serviced</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingSessions.length}</div>
            <p className="text-xs text-muted-foreground">Upcoming appointments</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sessions.filter(s => s.status === 'completed').length}
            </div>
            <p className="text-xs text-muted-foreground">Successfully resolved</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Sessions */}
      {activeSessions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Active Sessions</h3>
          {activeSessions.map((session) => (
            <Card key={session.id} className="border-blue-200 bg-blue-50/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{session.sessionTitle}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getPriorityColor(session.priority)}>
                      {session.priority}
                    </Badge>
                    <Badge variant={getStatusColor(session.status)}>
                      {getStatusIcon(session.status)}
                      <span className="ml-1 capitalize">{session.status.replace('_', ' ')}</span>
                    </Badge>
                  </div>
                </div>
                <CardDescription>{session.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Started: {formatDateTime(session.startedAt)}</span>
                  </div>
                  {session.estimatedDuration && (
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Est. {session.estimatedDuration}min</span>
                    </div>
                  )}
                </div>
                
                {/* Progress indication for active sessions */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Session Progress</span>
                    <span>In Progress</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Technician #{session.technicianId || 'Assigned'}
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Upcoming Sessions */}
      {upcomingSessions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Upcoming Sessions</h3>
          {upcomingSessions.map((session) => (
            <Card key={session.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{session.sessionTitle}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getPriorityColor(session.priority)}>
                      {session.priority}
                    </Badge>
                    <Badge variant={getStatusColor(session.status)}>
                      {getStatusIcon(session.status)}
                      <span className="ml-1 capitalize">{session.status}</span>
                    </Badge>
                  </div>
                </div>
                <CardDescription>{session.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Scheduled: {formatDateTime(session.scheduledAt)}</span>
                    </div>
                    {session.estimatedDuration && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>Est. {session.estimatedDuration}min</span>
                      </div>
                    )}
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Recent Completed Sessions */}
      {recentSessions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Recently Completed</h3>
          <div className="space-y-3">
            {recentSessions.map((session) => (
              <Card key={session.id} className="bg-green-50/30 border-green-200">
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-medium">{session.sessionTitle}</div>
                      <div className="text-sm text-muted-foreground">
                        Completed: {formatDateTime(session.completedAt)}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}