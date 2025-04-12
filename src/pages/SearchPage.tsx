
import React, { useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    
    setIsSearching(true);
    
    // Simulate search with mock data
    setTimeout(() => {
      const mockCases = [
        { id: 'CR2023-001', title: 'Residential Burglary', type: 'case', date: '2023-04-10', status: 'Open' },
        { id: 'CR2023-003', title: 'Vehicle Theft', type: 'case', date: '2023-04-07', status: 'Open' }
      ];
      
      const mockPersons = [
        { id: 'P2023-001', name: 'John Smith', type: 'person', personType: 'Suspect', cases: ['CR2023-001'] },
        { id: 'P2023-005', name: 'David Lee', type: 'person', personType: 'Suspect', cases: ['CR2023-004'] }
      ];
      
      const mockEvidence = [
        { id: 'E2023-001', name: 'Crime Scene Photo 1', type: 'evidence', evidenceType: 'Photo', caseId: 'CR2023-001', date: '2023-04-10' },
        { id: 'E2023-002', name: 'Crime Scene Photo 2', type: 'evidence', evidenceType: 'Photo', caseId: 'CR2023-001', date: '2023-04-10' }
      ];
      
      setSearchResults([...mockCases, ...mockPersons, ...mockEvidence]);
      setIsSearching(false);
    }, 1000);
  };
  
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Search</h2>
        <p className="text-muted-foreground">Find cases, persons, and evidence</p>
      </div>
      
      <Card className="border-2 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Global Search</CardTitle>
          <CardDescription>
            Search across all records in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="relative">
            <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input 
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cases, persons, evidence..."
              className="pl-10 pr-10 py-6 text-lg"
            />
            {searchQuery && (
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="absolute right-3 top-3"
                onClick={clearSearch}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between border-t px-6 py-4">
          <div className="text-sm text-muted-foreground">
            Press Enter to search
          </div>
          <Button type="submit" onClick={handleSearch} disabled={!searchQuery}>
            <SearchIcon className="mr-2 h-4 w-4" />
            Search
          </Button>
        </CardFooter>
      </Card>
      
      {isSearching ? (
        <div className="flex justify-center p-8">
          <div className="animate-pulse text-center">
            <p className="text-lg font-medium">Searching...</p>
            <p className="text-muted-foreground">Looking for results matching "{searchQuery}"</p>
          </div>
        </div>
      ) : searchResults.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-xl font-bold tracking-tight">
            Search Results ({searchResults.length})
          </h3>
          
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="cases">Cases</TabsTrigger>
              <TabsTrigger value="persons">Persons</TabsTrigger>
              <TabsTrigger value="evidence">Evidence</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4 space-y-4">
              {searchResults.map((result) => (
                <SearchResultCard key={result.id} result={result} />
              ))}
            </TabsContent>
            
            <TabsContent value="cases" className="mt-4 space-y-4">
              {searchResults
                .filter((result) => result.type === 'case')
                .map((result) => (
                  <SearchResultCard key={result.id} result={result} />
                ))}
            </TabsContent>
            
            <TabsContent value="persons" className="mt-4 space-y-4">
              {searchResults
                .filter((result) => result.type === 'person')
                .map((result) => (
                  <SearchResultCard key={result.id} result={result} />
                ))}
            </TabsContent>
            
            <TabsContent value="evidence" className="mt-4 space-y-4">
              {searchResults
                .filter((result) => result.type === 'evidence')
                .map((result) => (
                  <SearchResultCard key={result.id} result={result} />
                ))}
            </TabsContent>
          </Tabs>
        </div>
      ) : searchQuery && !isSearching ? (
        <div className="text-center p-8 border rounded-lg bg-muted/10">
          <p className="text-lg font-medium">No results found</p>
          <p className="text-muted-foreground">
            No matches found for "{searchQuery}"
          </p>
        </div>
      ) : null}
    </div>
  );
};

interface SearchResultProps {
  result: any;
}

const SearchResultCard = ({ result }: SearchResultProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant={
              result.type === 'case' ? 'default' :
              result.type === 'person' ? 'secondary' : 'outline'
            }>
              {result.type === 'case' ? 'Case' :
              result.type === 'person' ? 'Person' : 'Evidence'}
            </Badge>
            <span className="text-sm font-medium text-muted-foreground">{result.id}</span>
          </div>
          {result.status && (
            <Badge variant={result.status === 'Open' ? 'default' : 'outline'}>
              {result.status}
            </Badge>
          )}
          {result.personType && (
            <Badge variant={
              result.personType === 'Suspect' ? 'destructive' :
              result.personType === 'Victim' ? 'secondary' : 'outline'
            }>
              {result.personType}
            </Badge>
          )}
          {result.evidenceType && (
            <Badge variant="outline">{result.evidenceType}</Badge>
          )}
        </div>
        <CardTitle className="text-lg">
          {result.title || result.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        {result.type === 'case' && (
          <p className="text-sm text-muted-foreground">
            Case opened on {result.date}
          </p>
        )}
        {result.type === 'person' && (
          <div className="text-sm text-muted-foreground">
            Related to cases: 
            {result.cases.map((caseId: string) => (
              <span key={caseId} className="ml-1 bg-muted px-1.5 py-0.5 rounded text-xs">
                {caseId}
              </span>
            ))}
          </div>
        )}
        {result.type === 'evidence' && (
          <p className="text-sm text-muted-foreground">
            From case {result.caseId}, added on {result.date}
          </p>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="secondary" size="sm">View Details</Button>
      </CardFooter>
    </Card>
  );
};

export default SearchPage;
