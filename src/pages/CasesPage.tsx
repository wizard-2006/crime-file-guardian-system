
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, ChevronDown, Filter } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const MOCK_CASES = [
  { id: 'CR2023-001', title: 'Residential Burglary', status: 'Open', date: '2023-04-10', priority: 'High', officerAssigned: 'Det. Johnson' },
  { id: 'CR2023-002', title: 'Assault at Downtown Bar', status: 'Open', date: '2023-04-09', priority: 'Medium', officerAssigned: 'Det. Smith' },
  { id: 'CR2023-003', title: 'Vehicle Theft', status: 'Open', date: '2023-04-07', priority: 'Medium', officerAssigned: 'Ofc. Wilson' },
  { id: 'CR2023-004', title: 'Shoplifting', status: 'Closed', date: '2023-04-05', priority: 'Low', officerAssigned: 'Ofc. Brown' },
  { id: 'CR2023-005', title: 'Vandalism at City Park', status: 'Open', date: '2023-04-03', priority: 'Low', officerAssigned: 'Ofc. Davis' },
  { id: 'CR2023-006', title: 'Identity Theft', status: 'In Progress', date: '2023-04-01', priority: 'High', officerAssigned: 'Det. Miller' },
  { id: 'CR2023-007', title: 'Missing Person', status: 'Open', date: '2023-03-30', priority: 'Critical', officerAssigned: 'Det. Johnson' },
  { id: 'CR2023-008', title: 'DUI Incident', status: 'Closed', date: '2023-03-28', priority: 'Medium', officerAssigned: 'Ofc. Wilson' },
];

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'Open':
      return 'default';
    case 'In Progress':
      return 'secondary';
    case 'Closed':
      return 'outline';
    default:
      return 'default';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Critical':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'High':
      return 'text-orange-600 bg-orange-50 border-orange-200';
    case 'Medium':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'Low':
      return 'text-green-600 bg-green-50 border-green-200';
    default:
      return 'text-blue-600 bg-blue-50 border-blue-200';
  }
};

const CasesPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Cases</h2>
          <p className="text-muted-foreground">Manage and view all case records</p>
        </div>
        <Button className="flex items-center">
          <Plus className="mr-2 h-4 w-4" />
          New Case
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search cases..."
            className="w-full pl-8"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Case ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[100px]">Priority</TableHead>
              <TableHead className="w-[150px]">Assigned To</TableHead>
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_CASES.map((caseItem) => (
              <TableRow key={caseItem.id}>
                <TableCell className="font-medium">{caseItem.id}</TableCell>
                <TableCell>{caseItem.title}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(caseItem.status)}>
                    {caseItem.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(caseItem.priority)}`}>
                    {caseItem.priority}
                  </span>
                </TableCell>
                <TableCell>{caseItem.officerAssigned}</TableCell>
                <TableCell>{caseItem.date}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit case</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Assign officer</DropdownMenuItem>
                      <DropdownMenuItem>Add evidence</DropdownMenuItem>
                      <DropdownMenuItem>Add person</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Close case</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CasesPage;
