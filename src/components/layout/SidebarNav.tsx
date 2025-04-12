
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from '@/components/ui/button';
import { Shield, FileText, Users, Search, PieChart, Briefcase, Image, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SidebarNav() {
  const location = useLocation();
  
  const menuItems = [
    { icon: PieChart, label: 'Dashboard', path: '/' },
    { icon: Briefcase, label: 'Cases', path: '/cases' },
    { icon: Users, label: 'Persons', path: '/persons' },
    { icon: Image, label: 'Evidence', path: '/evidence' },
    { icon: Search, label: 'Search', path: '/search' },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold text-white">CrimeGuard</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton asChild className={cn(
                location.pathname === item.path ? "bg-sidebar-accent text-white" : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}>
                <Link to={item.path} className="flex items-center gap-2">
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
