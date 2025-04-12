
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const MOCK_CASES = [
  { id: 'CR2023-001', title: 'Residential Burglary', status: 'Open', date: '2023-04-10', priority: 'High' },
  { id: 'CR2023-002', title: 'Assault at Downtown Bar', status: 'Open', date: '2023-04-09', priority: 'Medium' },
  { id: 'CR2023-003', title: 'Vehicle Theft', status: 'Open', date: '2023-04-07', priority: 'Medium' },
  { id: 'CR2023-004', title: 'Shoplifting', status: 'Closed', date: '2023-04-05', priority: 'Low' },
];

export function RecentCases() {
  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Recent Cases</CardTitle>
        <Button asChild variant="ghost" size="icon">
          <Link to="/cases">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">View all cases</span>
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {MOCK_CASES.map((caseItem) => (
            <div key={caseItem.id} className="flex items-center">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{caseItem.title}</p>
                  <Badge variant={caseItem.status === 'Open' ? 'default' : 'secondary'}>
                    {caseItem.status}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span className="mr-2">{caseItem.id}</span>
                  <span>•</span>
                  <span className="ml-2">{caseItem.date}</span>
                  <span>•</span>
                  <span className="ml-2">Priority: {caseItem.priority}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
