
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, Image, FileText, PenTool, Film, MoreHorizontal, Eye } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const MOCK_EVIDENCE = [
  { id: 'E2023-001', type: 'Photo', name: 'Crime Scene Photo 1', caseId: 'CR2023-001', date: '2023-04-10', tags: ['Scene', 'Property'], file: 'photo1.jpg' },
  { id: 'E2023-002', type: 'Photo', name: 'Crime Scene Photo 2', caseId: 'CR2023-001', date: '2023-04-10', tags: ['Scene', 'Damage'], file: 'photo2.jpg' },
  { id: 'E2023-003', type: 'Document', name: 'Witness Statement', caseId: 'CR2023-002', date: '2023-04-09', tags: ['Statement', 'Witness'], file: 'statement.pdf' },
  { id: 'E2023-004', type: 'Document', name: 'Police Report', caseId: 'CR2023-002', date: '2023-04-09', tags: ['Report'], file: 'report.pdf' },
  { id: 'E2023-005', type: 'Physical', name: 'Weapon', caseId: 'CR2023-002', date: '2023-04-09', tags: ['Weapon', 'Critical'], file: 'weapon_photo.jpg' },
  { id: 'E2023-006', type: 'Video', name: 'CCTV Footage', caseId: 'CR2023-003', date: '2023-04-07', tags: ['Video', 'Scene'], file: 'footage.mp4' },
  { id: 'E2023-007', type: 'Photo', name: 'Vehicle Photo', caseId: 'CR2023-003', date: '2023-04-07', tags: ['Vehicle'], file: 'vehicle.jpg' },
  { id: 'E2023-008', type: 'Document', name: 'Property List', caseId: 'CR2023-004', date: '2023-04-05', tags: ['Property'], file: 'property.pdf' },
];

const getEvidenceIcon = (type: string) => {
  switch (type) {
    case 'Photo':
      return <Image className="h-8 w-8 text-blue-500" />;
    case 'Document':
      return <FileText className="h-8 w-8 text-orange-500" />;
    case 'Physical':
      return <PenTool className="h-8 w-8 text-green-500" />;
    case 'Video':
      return <Film className="h-8 w-8 text-purple-500" />;
    default:
      return <FileText className="h-8 w-8 text-gray-500" />;
  }
};

const EvidencePage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Evidence</h2>
          <p className="text-muted-foreground">Manage and track case evidence</p>
        </div>
        <Button className="flex items-center">
          <Plus className="mr-2 h-4 w-4" />
          Add Evidence
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search evidence..."
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
              <SelectItem value="photo">Photos</SelectItem>
              <SelectItem value="document">Documents</SelectItem>
              <SelectItem value="physical">Physical</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        <TabsContent value="grid" className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {MOCK_EVIDENCE.map((evidence) => (
              <Card key={evidence.id} className="overflow-hidden">
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-sm font-medium">{evidence.name}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem>Download</DropdownMenuItem>
                        <DropdownMenuItem>Add to case</DropdownMenuItem>
                        <DropdownMenuItem>Edit information</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
                    <Badge variant="outline">{evidence.type}</Badge>
                    <span>•</span>
                    <span>Case {evidence.caseId}</span>
                  </div>
                  <div className="h-40 bg-muted rounded-md flex items-center justify-center mb-2">
                    {getEvidenceIcon(evidence.type)}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {evidence.tags.map((tag) => (
                      <span key={tag} className="bg-muted text-xs px-1.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between text-xs text-muted-foreground">
                  <span>{evidence.id}</span>
                  <span>{evidence.date}</span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="list" className="w-full">
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">ID</th>
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Type</th>
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Case</th>
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Tags</th>
                  <th className="h-10 px-4 text-center align-middle font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_EVIDENCE.map((evidence) => (
                  <tr key={evidence.id} className="border-b">
                    <td className="p-4 align-middle">{evidence.id}</td>
                    <td className="p-4 align-middle font-medium">{evidence.name}</td>
                    <td className="p-4 align-middle">
                      <Badge variant="outline">{evidence.type}</Badge>
                    </td>
                    <td className="p-4 align-middle">{evidence.caseId}</td>
                    <td className="p-4 align-middle">{evidence.date}</td>
                    <td className="p-4 align-middle">
                      <div className="flex flex-wrap gap-1">
                        {evidence.tags.map((tag) => (
                          <span key={tag} className="bg-muted text-xs px-1.5 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 align-middle text-center">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EvidencePage;
