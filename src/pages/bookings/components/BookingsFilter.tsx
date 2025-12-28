import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BookingsFilterProps {
  filter: string;
  onFilterChange: (filter: string) => void;
  count: number;
}

export function BookingsFilter({
  filter,
  onFilterChange,
  count,
}: BookingsFilterProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>My Bookings ({count})</CardTitle>
          <Tabs value={filter} onValueChange={onFilterChange}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="pt-0" />
    </Card>
  );
}
