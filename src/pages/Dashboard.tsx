
import React from 'react';
import { Briefcase, Users, Image, FileText } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentCases } from '@/components/dashboard/RecentCases';
import { ActivityTimeline } from '@/components/dashboard/ActivityTimeline';
import { CasesByStatus } from '@/components/dashboard/CasesByStatus';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of all crime records and recent activities.
        </p>
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Cases" 
          value="143" 
          description="+6 from last week" 
          icon={Briefcase}
        />
        <StatCard 
          title="Active Cases" 
          value="89" 
          description="62% of total cases" 
          icon={FileText}
        />
        <StatCard 
          title="Person Records" 
          value="256" 
          description="Suspects, Witnesses, Victims" 
          icon={Users}
        />
        <StatCard 
          title="Evidence Items" 
          value="412" 
          description="Photos, Documents, Objects" 
          icon={Image}
        />
      </div>
      
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-5">
        <RecentCases />
        <ActivityTimeline />
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <CasesByStatus />
        <div className="bg-card rounded-lg p-6 border">
          <h3 className="text-lg font-medium mb-4">Quick Access</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-md flex flex-col items-center justify-center text-center">
              <Briefcase className="h-8 w-8 text-primary mb-2" />
              <span className="font-medium">New Case</span>
            </div>
            <div className="bg-muted p-4 rounded-md flex flex-col items-center justify-center text-center">
              <Users className="h-8 w-8 text-primary mb-2" />
              <span className="font-medium">Add Person</span>
            </div>
            <div className="bg-muted p-4 rounded-md flex flex-col items-center justify-center text-center">
              <Image className="h-8 w-8 text-primary mb-2" />
              <span className="font-medium">Upload Evidence</span>
            </div>
            <div className="bg-muted p-4 rounded-md flex flex-col items-center justify-center text-center">
              <FileText className="h-8 w-8 text-primary mb-2" />
              <span className="font-medium">Generate Report</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
