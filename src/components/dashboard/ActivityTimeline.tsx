
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight, UserPlus, FileText, Folder, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const MOCK_ACTIVITIES = [
  {
    id: 1,
    type: 'evidence',
    icon: Image,
    title: 'Evidence Added',
    description: 'Photo evidence added to Case CR2023-001',
    time: '2 hours ago',
    user: 'Ofc. Smith',
  },
  {
    id: 2,
    type: 'case',
    icon: FileText,
    title: 'Case Updated',
    description: 'Case CR2023-002 marked as priority',
    time: '3 hours ago',
    user: 'Det. Johnson',
  },
  {
    id: 3,
    type: 'person',
    icon: UserPlus,
    title: 'Person Added',
    description: 'New witness added to Case CR2023-003',
    time: '5 hours ago',
    user: 'Ofc. Wilson',
  },
  {
    id: 4,
    type: 'case',
    icon: Folder,
    title: 'Case Created',
    description: 'New case CR2023-004 created',
    time: 'Yesterday',
    user: 'Sgt. Miller',
  },
];

export function ActivityTimeline() {
  const getIconColor = (type: string) => {
    switch (type) {
      case 'evidence':
        return 'text-blue-500';
      case 'case':
        return 'text-purple-500';
      case 'person':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
        <Button variant="ghost" size="icon">
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">View all activity</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {MOCK_ACTIVITIES.map((activity, index) => (
            <React.Fragment key={activity.id}>
              <div className="flex gap-3">
                <div className={cn("mt-1 flex h-7 w-7 items-center justify-center rounded-full", 
                  activity.type === 'evidence' ? "bg-blue-100" : 
                  activity.type === 'case' ? "bg-purple-100" : 
                  "bg-green-100")}>
                  <activity.icon className={cn("h-4 w-4", getIconColor(activity.type))} />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{activity.title}</p>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">By {activity.user}</p>
                </div>
              </div>
              {index < MOCK_ACTIVITIES.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
