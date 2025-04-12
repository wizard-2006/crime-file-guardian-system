
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, ChevronDown, Filter } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const MOCK_PERSONS = [
  { id: 'P2023-001', name: 'John Smith', type: 'Suspect', dob: '1985-06-12', gender: 'Male', cases: ['CR2023-001'], address: '123 Main St' },
  { id: 'P2023-002', name: 'Jane Doe', type: 'Victim', dob: '1990-03-25', gender: 'Female', cases: ['CR2023-001'], address: '456 Oak Ave' },
  { id: 'P2023-003', name: 'Robert Johnson', type: 'Witness', dob: '1978-11-08', gender: 'Male', cases: ['CR2023-002'], address: '789 Pine Rd' },
  { id: 'P2023-004', name: 'Maria Garcia', type: 'Victim', dob: '1992-07-30', gender: 'Female', cases: ['CR2023-003'], address: '101 Elm St' },
  { id: 'P2023-005', name: 'David Lee', type: 'Suspect', dob: '1988-09-15', gender: 'Male', cases: ['CR2023-004'], address: '202 Cedar Ln' },
  { id: 'P2023-006', name: 'Sarah Wilson', type: 'Witness', dob: '1975-04-22', gender: 'Female', cases: ['CR2023-002', 'CR2023-005'], address: '303 Maple Dr' },
  { id: 'P2023-007', name: 'Michael Brown', type: 'Suspect', dob: '1982-12-10', gender: 'Male', cases: ['CR2023-006'], address: '404 Birch Ave' },
  { id: 'P2023-008', name: 'Emily Taylor', type: 'Victim', dob: '1995-01-18', gender: 'Female', cases: ['CR2023-006'], address: '505 Walnut St' },
];

const getPersonTypeBadge = (type: string) => {
  switch (type) {
    case 'Suspect':
      return <Badge variant="destructive">{type}</Badge>;
    case 'Victim':
      return <Badge variant="secondary">{type}</Badge>;
    case 'Witness':
      return <Badge variant="outline">{type}</Badge>;
    default:
      return <Badge>{type}</Badge>;
  }
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

const PersonsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Persons</h2>
          <p className="text-muted-foreground">Manage suspects, victims, and witnesses</p>
        </div>
        <Button className="flex items-center">
          <Plus className="mr-2 h-4 w-4" />
          Add Person
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search persons..."
            className="w-full pl-8"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="suspect">Suspect</SelectItem>
              <SelectItem value="victim">Victim</SelectItem>
              <SelectItem value="witness">Witness</SelectItem>
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
              <TableHead className="w-[120px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="w-[100px]">Type</TableHead>
              <TableHead className="w-[100px]">Gender</TableHead>
              <TableHead className="w-[120px]">Date of Birth</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="w-[120px]">Related Cases</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_PERSONS.map((person) => (
              <TableRow key={person.id}>
                <TableCell className="font-medium">{person.id}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">{getInitials(person.name)}</AvatarFallback>
                    </Avatar>
                    <span>{person.name}</span>
                  </div>
                </TableCell>
                <TableCell>{getPersonTypeBadge(person.type)}</TableCell>
                <TableCell>{person.gender}</TableCell>
                <TableCell>{person.dob}</TableCell>
                <TableCell className="max-w-[200px] truncate">{person.address}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {person.cases.map((caseId) => (
                      <span key={caseId} className="bg-muted text-xs px-1.5 py-0.5 rounded">
                        {caseId}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit information</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Add to case</DropdownMenuItem>
                      <DropdownMenuItem>Update status</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Delete record</DropdownMenuItem>
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

export default PersonsPage;
