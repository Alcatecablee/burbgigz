import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  FileText, 
  Download, 
  Eye, 
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Printer,
  Share2,
  Edit
} from 'lucide-react';
import { toast } from 'sonner';

interface ServiceReport {
  id: number;
  sessionId: number;
  sessionTitle: string;
  customerName: string;
  technicianName?: string;
  reportType: 'session_summary' | 'technical_report' | 'completion_report';
  status: 'draft' | 'completed' | 'approved';
  title: string;
  executiveSummary?: string;
  issuesFound?: string;
  workPerformed?: string;
  recommendations?: string;
  nextSteps?: string;
  filesGenerated?: string[];
  generatedAt: string;
  completedAt?: string;
  isCustomerVisible: boolean;
}

interface DocumentationSystemProps {
  sessionId?: number;
  showCustomerView?: boolean;
}

async function fetchServiceReports(customerId?: number): Promise<ServiceReport[]> {
  const url = customerId ? `/api/reports?customerId=${customerId}` : '/api/reports';
  const response = await fetch(url, {
    credentials: 'include',
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch service reports');
  }
  
  return response.json();
}

async function generateReport(sessionId: number): Promise<ServiceReport> {
  const response = await fetch('/api/reports/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ sessionId }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to generate report');
  }
  
  return response.json();
}

async function downloadReport(reportId: number): Promise<void> {
  const response = await fetch(`/api/reports/${reportId}/download`, {
    credentials: 'include',
  });
  
  if (!response.ok) {
    throw new Error('Failed to download report');
  }
  
  // Get filename from response headers or generate one
  const contentDisposition = response.headers.get('Content-Disposition');
  const filename = contentDisposition 
    ? contentDisposition.split('filename=')[1]?.replace(/"/g, '') 
    : `service-report-${reportId}.pdf`;
  
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

function getReportIcon(reportType: string) {
  switch (reportType) {
    case 'session_summary':
      return <FileText className="w-4 h-4" />;
    case 'technical_report':
      return <AlertCircle className="w-4 h-4" />;
    case 'completion_report':
      return <CheckCircle className="w-4 h-4" />;
    default:
      return <FileText className="w-4 h-4" />;
  }
}

function getReportTypeLabel(reportType: string) {
  switch (reportType) {
    case 'session_summary':
      return 'Session Summary';
    case 'technical_report':
      return 'Technical Report';
    case 'completion_report':
      return 'Completion Report';
    default:
      return reportType.replace('_', ' ');
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case 'draft':
      return 'text-orange-600 bg-orange-50 border-orange-200';
    case 'completed':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'approved':
      return 'text-green-600 bg-green-50 border-green-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
}

export function DocumentationSystem({ sessionId, showCustomerView = false }: DocumentationSystemProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedReport, setSelectedReport] = useState<ServiceReport | null>(null);

  // Fetch reports
  const { data: reports, isLoading, error } = useQuery({
    queryKey: ['serviceReports', user?.id, sessionId],
    queryFn: () => fetchServiceReports(user?.id),
    enabled: !!user?.id,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Generate report mutation
  const generateReportMutation = useMutation({
    mutationFn: generateReport,
    onSuccess: (newReport) => {
      queryClient.setQueryData(
        ['serviceReports', user?.id, sessionId],
        (old: ServiceReport[]) => [newReport, ...(old || [])]
      );
      toast.success('Report generated successfully!');
    },
    onError: (error) => {
      toast.error('Failed to generate report: ' + error.message);
    },
  });

  // Filter reports for specific session or show all
  const filteredReports = sessionId 
    ? reports?.filter(r => r.sessionId === sessionId)
    : reports?.filter(r => showCustomerView ? r.isCustomerVisible : true);

  // Customer visible reports only
  const customerReports = reports?.filter(r => r.isCustomerVisible) || [];

  const handleDownload = async (reportId: number) => {
    try {
      await downloadReport(reportId);
      toast.success('Report downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download report');
    }
  };

  const handleGenerateReport = () => {
    if (!sessionId) {
      toast.error('Please select a session to generate report for');
      return;
    }
    generateReportMutation.mutate(sessionId);
  };

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
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <p className="text-red-600">Failed to load service reports</p>
            <p className="text-sm text-muted-foreground mt-1">Please try refreshing the page</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showCustomerView) {
    // Customer view - simplified interface showing only approved reports
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Service Reports</h3>
            <p className="text-sm text-muted-foreground">
              Download your completed service reports and documentation
            </p>
          </div>
          <Badge variant="secondary">
            {customerReports.length} available
          </Badge>
        </div>

        {customerReports.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center py-8">
              <div className="text-center">
                <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No reports available yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Reports will appear here after service completion
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {customerReports.map((report) => (
              <Card key={report.id} className="bg-green-50/30 border-green-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm flex items-center space-x-2">
                      {getReportIcon(report.reportType)}
                      <span>{getReportTypeLabel(report.reportType)}</span>
                    </CardTitle>
                    <Badge variant="outline" className="bg-green-100 text-green-700">
                      Available
                    </Badge>
                  </div>
                  <CardDescription>{report.sessionTitle}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    Generated: {new Date(report.generatedAt).toLocaleDateString()}
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleDownload(report.id)}
                      className="flex-1"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{report.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          {report.executiveSummary && (
                            <div>
                              <h4 className="font-semibold mb-2">Executive Summary</h4>
                              <p className="text-sm text-muted-foreground">
                                {report.executiveSummary}
                              </p>
                            </div>
                          )}
                          {report.workPerformed && (
                            <div>
                              <h4 className="font-semibold mb-2">Work Performed</h4>
                              <p className="text-sm text-muted-foreground">
                                {report.workPerformed}
                              </p>
                            </div>
                          )}
                          {report.recommendations && (
                            <div>
                              <h4 className="font-semibold mb-2">Recommendations</h4>
                              <p className="text-sm text-muted-foreground">
                                {report.recommendations}
                              </p>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Full technician/admin view
  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Documentation System</h3>
          <p className="text-sm text-muted-foreground">
            Generate and manage professional service reports
          </p>
        </div>
        {sessionId && (
          <Button 
            onClick={handleGenerateReport}
            disabled={generateReportMutation.isPending}
          >
            <Plus className="w-4 h-4 mr-2" />
            {generateReportMutation.isPending ? 'Generating...' : 'Generate Report'}
          </Button>
        )}
      </div>

      {/* Reports Statistics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredReports?.length || 0}</div>
            <p className="text-xs text-muted-foreground">Generated reports</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available to Customer</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customerReports.length}</div>
            <p className="text-xs text-muted-foreground">Customer accessible</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Draft</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredReports?.filter(r => r.status === 'draft').length || 0}
            </div>
            <p className="text-xs text-muted-foreground">Pending completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Reports List */}
      {!filteredReports || filteredReports.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <div className="text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No reports generated yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Generate reports for completed service sessions
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <Card key={report.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center space-x-2">
                    {getReportIcon(report.reportType)}
                    <span>{report.title}</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                    {report.isCustomerVisible && (
                      <Badge variant="secondary">Customer Visible</Badge>
                    )}
                  </div>
                </div>
                <CardDescription>{report.sessionTitle}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Type</div>
                    <div>{getReportTypeLabel(report.reportType)}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Generated</div>
                    <div>{new Date(report.generatedAt).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Technician</div>
                    <div>{report.technicianName || 'Unassigned'}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Customer</div>
                    <div>{report.customerName}</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownload(report.id)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedReport(report)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}