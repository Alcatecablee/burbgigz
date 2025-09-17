import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Textarea } from './ui/textarea';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  User, 
  MessageSquare,
  Bell,
  Activity,
  Settings,
  FileText,
  Zap
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'sonner';

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

interface StatusUpdate {
  id: number;
  sessionId: number;
  technicianId?: number;
  updateType: 'status_change' | 'progress' | 'note' | 'milestone';
  title: string;
  description?: string;
  progress?: number;
  timestamp: string;
  isVisible: boolean;
}

interface ServiceStatusTrackerProps {
  sessionId?: number;
  compact?: boolean;
}

async function fetchSessionUpdates(sessionId: number): Promise<StatusUpdate[]> {
  const response = await fetch(`/api/sessions/${sessionId}/updates`, {
    credentials: 'include',
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch session updates');
  }
  
  return response.json();
}

async function fetchSessionDetails(sessionId: number): Promise<ServiceSession> {
  const response = await fetch(`/api/sessions/${sessionId}`, {
    credentials: 'include',
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch session details');
  }
  
  return response.json();
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'scheduled':
      return <Clock className="w-4 h-4 text-orange-600" />;
    case 'in_progress':
      return <Activity className="w-4 h-4 text-blue-600" />;
    case 'paused':
      return <Settings className="w-4 h-4 text-yellow-600" />;
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
      return 'text-orange-600 bg-orange-50 border-orange-200';
    case 'in_progress':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'paused':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'completed':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'cancelled':
      return 'text-red-600 bg-red-50 border-red-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
}

function getUpdateIcon(updateType: string) {
  switch (updateType) {
    case 'status_change':
      return <Activity className="w-4 h-4" />;
    case 'progress':
      return <Zap className="w-4 h-4" />;
    case 'note':
      return <MessageSquare className="w-4 h-4" />;
    case 'milestone':
      return <CheckCircle className="w-4 h-4" />;
    default:
      return <Bell className="w-4 h-4" />;
  }
}

export function ServiceStatusTracker({ sessionId, compact = false }: ServiceStatusTrackerProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [lastUpdateTime, setLastUpdateTime] = useState<string | null>(null);

  // Fetch session details
  const { 
    data: session, 
    isLoading: sessionLoading, 
    error: sessionError 
  } = useQuery({
    queryKey: ['session', sessionId],
    queryFn: () => fetchSessionDetails(sessionId!),
    enabled: !!sessionId && !!user?.id,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Fetch session updates
  const { 
    data: updates, 
    isLoading: updatesLoading, 
    error: updatesError 
  } = useQuery({
    queryKey: ['sessionUpdates', sessionId],
    queryFn: () => fetchSessionUpdates(sessionId!),
    enabled: !!sessionId && !!user?.id,
    refetchInterval: 15000, // Refresh every 15 seconds for more real-time feel
  });

  // Show toast notifications for new updates
  useEffect(() => {
    if (updates && updates.length > 0 && !compact) {
      const latestUpdate = updates[0];
      const latestTimestamp = latestUpdate.timestamp;
      
      if (lastUpdateTime && latestTimestamp > lastUpdateTime) {
        toast.success(`Service Update: ${latestUpdate.title}`, {
          description: latestUpdate.description,
          duration: 5000,
        });
      }
      
      if (!lastUpdateTime) {
        setLastUpdateTime(latestTimestamp);
      } else if (latestTimestamp > lastUpdateTime) {
        setLastUpdateTime(latestTimestamp);
      }
    }
  }, [updates, lastUpdateTime, compact]);

  // Auto-refresh on window focus for better real-time updates
  useEffect(() => {
    const handleFocus = () => {
      if (sessionId) {
        queryClient.invalidateQueries({ queryKey: ['session', sessionId] });
        queryClient.invalidateQueries({ queryKey: ['sessionUpdates', sessionId] });
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [sessionId, queryClient]);

  if (!sessionId) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Select a session to track status</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (sessionLoading || updatesLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-muted rounded w-1/3"></div>
          <div className="h-32 bg-muted rounded"></div>
          <div className="h-24 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (sessionError || updatesError) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <p className="text-red-600">Failed to load session status</p>
            <p className="text-sm text-muted-foreground mt-1">Please try refreshing the page</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!session) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Session not found</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentProgress = session.status === 'completed' ? 100 : 
                          session.status === 'in_progress' ? 65 : 
                          session.status === 'scheduled' ? 0 : 0;

  const visibleUpdates = updates?.filter(u => u.isVisible) || [];

  if (compact) {
    return (
      <Card className={`${getStatusColor(session.status)} border`}>
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getStatusIcon(session.status)}
              <div>
                <div className="font-medium">{session.sessionTitle}</div>
                <div className="text-sm opacity-75 capitalize">
                  {session.status.replace('_', ' ')}
                </div>
              </div>
            </div>
            {session.status === 'in_progress' && (
              <div className="flex items-center space-x-2">
                <div className="w-20">
                  <Progress value={currentProgress} className="h-2" />
                </div>
                <span className="text-sm font-medium">{currentProgress}%</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Session Status Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                {getStatusIcon(session.status)}
                <span>{session.sessionTitle}</span>
              </CardTitle>
              <CardDescription>{session.description}</CardDescription>
            </div>
            <Badge variant="outline" className={getStatusColor(session.status)}>
              {session.status.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Session Progress</span>
              <span>{currentProgress}% Complete</span>
            </div>
            <Progress value={currentProgress} className="h-3" />
          </div>

          {/* Session Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Priority</div>
              <Badge variant="outline" className={
                session.priority === 'urgent' ? 'text-red-600' :
                session.priority === 'high' ? 'text-orange-600' : 
                'text-blue-600'
              }>
                {session.priority}
              </Badge>
            </div>
            {session.technicianId && (
              <div>
                <div className="text-muted-foreground">Technician</div>
                <div className="flex items-center space-x-1">
                  <User className="w-3 h-3" />
                  <span>Tech #{session.technicianId}</span>
                </div>
              </div>
            )}
            {session.estimatedDuration && (
              <div>
                <div className="text-muted-foreground">Est. Duration</div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{session.estimatedDuration} min</span>
                </div>
              </div>
            )}
            <div>
              <div className="text-muted-foreground">Last Updated</div>
              <span>{new Date(session.updatedAt).toLocaleTimeString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Updates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>Live Updates</span>
            <Badge variant="secondary" className="ml-2">
              {visibleUpdates.length} updates
            </Badge>
          </CardTitle>
          <CardDescription>
            Real-time progress updates from your technician
          </CardDescription>
        </CardHeader>
        <CardContent>
          {visibleUpdates.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No updates yet</p>
              <p className="text-sm">Updates will appear here as work progresses</p>
            </div>
          ) : (
            <div className="space-y-4">
              {visibleUpdates.map((update, index) => (
                <div key={update.id} className={`flex space-x-4 ${index === 0 ? 'border-2 border-blue-200 bg-blue-50/50 rounded-lg p-4' : 'border-l-2 border-muted pl-4'}`}>
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index === 0 ? 'bg-blue-100 text-blue-600' : 'bg-muted text-muted-foreground'}`}>
                      {getUpdateIcon(update.updateType)}
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{update.title}</h4>
                      <span className="text-xs text-muted-foreground">
                        {new Date(update.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    {update.description && (
                      <p className="text-sm text-muted-foreground">{update.description}</p>
                    )}
                    {update.progress !== undefined && (
                      <div className="flex items-center space-x-2">
                        <Progress value={update.progress} className="h-2 flex-1" />
                        <span className="text-xs font-medium">{update.progress}%</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}