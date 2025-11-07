import { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSupabaseAuth } from '../hooks/useSupabaseAuth';
import { AuthForm } from './AuthForm';
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
  LogOut,
  Download,
  Trash2,
  FileIcon,
  X
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

async function fetchUserFiles() {
  const response = await fetch('/api/files', {
    credentials: 'include',
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch files');
  }
  
  return response.json();
}

// Settings Tab Component
function SettingsTab({ user }: { user: any }) {
  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Your account details and contact information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="text-sm font-medium">{user?.email || 'Not provided'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Full Name</label>
              <p className="text-sm font-medium">{user?.user_metadata?.full_name || user?.name || 'Not provided'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Phone</label>
              <p className="text-sm font-medium">{user?.phone || 'Not provided'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Account Created</label>
              <p className="text-sm font-medium">
                {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Not available'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Portal Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Portal Preferences</CardTitle>
          <CardDescription>
            Customize your portal experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Email Notifications</label>
                <p className="text-sm text-muted-foreground">Receive updates about your service sessions</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">SMS Notifications</label>
                <p className="text-sm text-muted-foreground">Get text messages for urgent updates</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Session Reminders</label>
                <p className="text-sm text-muted-foreground">Receive reminders before scheduled sessions</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support Information */}
      <Card>
        <CardHeader>
          <CardTitle>Support & Contact</CardTitle>
          <CardDescription>
            Get help and contact my support team
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium">Business Hours</h4>
              <p className="text-sm text-muted-foreground">
                Monday - Friday: 8:00 AM - 6:00 PM<br />
                Saturday: 9:00 AM - 2:00 PM<br />
                Sunday: Emergency only
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Contact Methods</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>📞 Phone: (011) 123-4567</p>
                <p>📱 WhatsApp: (011) 123-4567</p>
                <p>✉️ Email: support@burbgigz.co.za</p>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t">
            <Button variant="outline" className="w-full">
              <Settings className="w-4 h-4 mr-2" />
              Contact Support Team
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// File Management Tab Component
function FileManagementTab({ files }: { files: any[] }) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileType', file.type);
      formData.append('description', `User uploaded ${file.name}`);

      const response = await fetch('/api/files/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      // Refresh the page to show the new file
      window.location.reload();
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileDelete = async (fileId: number) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      const response = await fetch(`/api/files/${fileId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Delete failed');
      }

      // Refresh the page to remove the deleted file
      window.location.reload();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Delete failed');
    }
  };

  const handleFileDownload = async (fileId: number, fileName: string) => {
    try {
      const response = await fetch(`/api/files/${fileId}/download`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Download failed');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Files</CardTitle>
          <CardDescription>
            Upload screenshots, documents, or reports related to your IT support sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                disabled={isUploading}
                accept=".jpg,.jpeg,.png,.gif,.pdf,.txt,.doc,.docx,.zip,.rar,.log"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              {isUploading && (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
              )}
            </div>
            {uploadError && (
              <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-destructive">{uploadError}</p>
              </div>
            )}
            <p className="text-sm text-muted-foreground">
              Supported formats: Images (JPG, PNG, GIF), Documents (PDF, DOC, TXT), Archives (ZIP, RAR), Log files
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Files List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Files</CardTitle>
          <CardDescription>
            Manage your uploaded files and downloads
          </CardDescription>
        </CardHeader>
        <CardContent>
          {files && files.length > 0 ? (
            <div className="space-y-4">
              {files.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <FileIcon className="w-8 h-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{file.originalName}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(file.fileSize)} • {formatDate(file.createdAt)}
                      </p>
                      {file.description && (
                        <p className="text-sm text-muted-foreground">{file.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFileDownload(file.id, file.originalName)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFileDelete(file.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No files uploaded yet</p>
              <p className="text-sm">Upload your first file using the form above</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function CustomerPortal() {
  const { user, isLoading, isAuthenticated, signOut } = useSupabaseAuth();
  
  // Fetch sessions data for overview statistics
  const { data: sessions } = useQuery({
    queryKey: ['serviceSessions', user?.id],
    queryFn: fetchServiceSessions,
    enabled: !!user?.id && isAuthenticated,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Fetch user files
  const { data: files } = useQuery({
    queryKey: ['userFiles', user?.id],
    queryFn: fetchUserFiles,
    enabled: !!user?.id && isAuthenticated,
    refetchInterval: 60000, // Refresh every 60 seconds
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
        <AuthForm onSuccess={() => window.location.reload()} />
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
                <span className="font-medium">{user?.user_metadata?.full_name || user?.email}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => signOut()}
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
                {sessions && sessions.length > 0 ? (
                  sessions
                    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                    .slice(0, 5)
                    .map((session) => {
                      const getStatusColor = (status: string) => {
                        switch (status) {
                          case 'completed': return 'bg-green-500';
                          case 'in_progress': return 'bg-blue-500';
                          case 'scheduled': return 'bg-orange-500';
                          case 'cancelled': return 'bg-red-500';
                          default: return 'bg-gray-500';
                        }
                      };
                      
                      const getStatusBadge = (status: string) => {
                        switch (status) {
                          case 'completed': return <Badge variant="secondary">Completed</Badge>;
                          case 'in_progress': return <Badge variant="outline">Active</Badge>;
                          case 'scheduled': return <Badge variant="outline">Scheduled</Badge>;
                          case 'cancelled': return <Badge variant="destructive">Cancelled</Badge>;
                          default: return <Badge variant="outline">{status}</Badge>;
                        }
                      };
                      
                      const timeAgo = (date: string) => {
                        const now = new Date();
                        const sessionDate = new Date(date);
                        const diffInHours = Math.floor((now.getTime() - sessionDate.getTime()) / (1000 * 60 * 60));
                        
                        if (diffInHours < 1) return 'Less than an hour ago';
                        if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
                        const diffInDays = Math.floor(diffInHours / 24);
                        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
                      };
                      
                      return (
                        <div key={session.id} className="flex items-center space-x-4">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(session.status)}`}></div>
                          <div className="flex-1">
                            <p className="font-medium">{session.sessionTitle}</p>
                            <p className="text-sm text-muted-foreground">{timeAgo(session.updatedAt)}</p>
                          </div>
                          {getStatusBadge(session.status)}
                        </div>
                      );
                    })
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    <p>No recent activity</p>
                    <p className="text-sm">Service sessions will appear here once created</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <ServiceSessionDashboard />
          </TabsContent>

          <TabsContent value="files" className="space-y-6">
            <FileManagementTab files={files} />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <SettingsTab user={user} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}