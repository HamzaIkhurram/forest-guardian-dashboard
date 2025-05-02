
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Detections() {
  const events = [
    { id: 1, type: "Chainsaw", date: "2025-05-02", time: "10:32:14", confidence: 94, location: "North Ridge" },
    { id: 2, type: "Fire", date: "2025-05-02", time: "10:15:42", confidence: 98, location: "South Point" },
    { id: 3, type: "Bird", date: "2025-05-02", time: "09:57:23", confidence: 89, location: "East Valley" },
    { id: 4, type: "Chainsaw", date: "2025-05-02", time: "09:45:10", confidence: 76, location: "West Hill" },
    { id: 5, type: "Animal", date: "2025-05-02", time: "09:32:45", confidence: 85, location: "Central Node" },
    { id: 6, type: "Fire", date: "2025-05-01", time: "17:17:20", confidence: 92, location: "South Point" },
    { id: 7, type: "Bird", date: "2025-05-01", time: "16:05:12", confidence: 95, location: "East Valley" },
    { id: 8, type: "Chainsaw", date: "2025-05-01", time: "15:52:38", confidence: 89, location: "North Ridge" },
    { id: 9, type: "Animal", date: "2025-05-01", time: "14:43:19", confidence: 72, location: "West Hill" },
    { id: 10, type: "Bird", date: "2025-05-01", time: "12:28:54", confidence: 88, location: "Central Node" },
  ];

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Detections & Alerts</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Events</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.type}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.time}</TableCell>
                  <TableCell>{event.confidence}%</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell className="text-right">
                    <button className="text-primary hover:underline">View Clip</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
