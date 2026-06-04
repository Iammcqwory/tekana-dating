import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Calendar, MapPin, Clock, Users, Filter, Map as MapIcon, LayoutGrid, Ticket, QrCode } from "lucide-react"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"

// Mock data for events
const UPCOMING_EVENTS = [
  {
    id: "1",
    title: "Coffee Connections",
    description: "Meet other singles over coffee in a relaxed environment. This event is perfect for those who prefer casual conversations in a comfortable setting.",
    date: "May 15, 2025",
    time: "5:30 PM - 7:30 PM",
    location: "Java House, Nairobi CBD",
    category: "in-person",
    attendees: 24,
    capacity: 30,
    image: "",
  },
  {
    id: "2",
    title: "Hiking Adventure",
    description: "Join us for a scenic hike at Karura Forest. Connect with like-minded outdoor enthusiasts while enjoying nature.",
    date: "May 22, 2025",
    time: "9:00 AM - 12:00 PM",
    location: "Karura Forest, Nairobi",
    category: "in-person",
    attendees: 18,
    capacity: 20,
    image: "",
  },
  {
    id: "3",
    title: "Virtual Game Night",
    description: "Have fun playing interactive online games with other singles. A great way to break the ice and showcase your playful side.",
    date: "May 10, 2025",
    time: "8:00 PM - 9:30 PM",
    location: "Zoom",
    category: "virtual",
    attendees: 36,
    capacity: 50,
    image: "",
  },
  {
    id: "4",
    title: "Wine Tasting Social",
    description: "Explore different wines while meeting new people. Perfect for those who appreciate fine dining and good conversations.",
    date: "June 5, 2025",
    time: "6:00 PM - 8:00 PM",
    location: "Artcaffe, Westlands",
    category: "in-person",
    attendees: 22,
    capacity: 25,
    image: "",
  },
  {
    id: "5",
    title: "Photography Walk",
    description: "Capture beautiful moments while connecting with other photography enthusiasts. All skill levels welcome.",
    date: "May 29, 2025",
    time: "3:00 PM - 5:00 PM",
    location: "Nairobi Arboretum",
    category: "in-person",
    attendees: 15,
    capacity: 20,
    image: "",
  },
  {
    id: "6",
    title: "Speed Dating Night",
    description: "Meet multiple singles in one evening. Quick conversations to help you find potential matches based on first impressions.",
    date: "June 12, 2025",
    time: "7:00 PM - 9:00 PM",
    location: "Kempinski Hotel, Nairobi",
    category: "in-person",
    attendees: 30,
    capacity: 40,
    image: "",
  },
  {
    id: "7",
    title: "Virtual Cooking Class",
    description: "Learn to cook a delicious meal alongside other singles. A fun way to showcase your culinary skills and connect over food.",
    date: "May 18, 2025",
    time: "6:00 PM - 7:30 PM",
    location: "Zoom",
    category: "virtual",
    attendees: 25,
    capacity: 30,
    image: "",
  },
];

const MY_EVENTS = [
  {
    id: "2",
    title: "Hiking Adventure",
    description: "Join us for a scenic hike at Karura Forest. Connect with like-minded outdoor enthusiasts while enjoying nature.",
    date: "May 22, 2025",
    time: "9:00 AM - 12:00 PM",
    location: "Karura Forest, Nairobi",
    category: "in-person",
    attendees: 18,
    capacity: 20,
    image: "",
  },
  {
    id: "7",
    title: "Virtual Cooking Class",
    description: "Learn to cook a delicious meal alongside other singles. A fun way to showcase your culinary skills and connect over food.",
    date: "May 18, 2025",
    time: "6:00 PM - 7:30 PM",
    location: "Zoom",
    category: "virtual",
    attendees: 25,
    capacity: 30,
    image: "",
  },
];

export function EventsPage() {
  const [viewMode, setViewMode] = React.useState<"grid" | "map">("grid")
  const [selectedEvent, setSelectedEvent] = React.useState<typeof UPCOMING_EVENTS[0] | null>(null)

  const handleRegister = (eventId: string) => {
    toast.success("You've successfully registered for this event!");
  };

  const handleCancel = (eventId: string) => {
    toast.success("Your registration has been canceled.");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Events</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-md p-1 bg-muted/50">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "map" ? "secondary" : "ghost"}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setViewMode("map")}
            >
              <MapIcon className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="h-4 w-4" /> Filter
          </Button>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="myevents">My Events</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          {viewMode === "map" ? (
            <div className="relative aspect-video w-full rounded-xl bg-muted overflow-hidden border border-border/50">
              <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/36.8219,1.2921,12,0/1000x600?access_token=pk.eyJ1IjoiYW50aWdyYXZpdHkiLCJhIjoiY2x4bXd3Z2N3MGx6bzJpcXp6eDlxZ2RneCJ9.1')] bg-cover bg-center opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center p-8 text-center bg-background/20 backdrop-blur-[2px]">
                <div className="bg-background/90 p-6 rounded-lg shadow-xl max-w-sm border border-rose-100">
                  <MapPin className="h-10 w-10 text-rose-500 mx-auto mb-4" />
                  <h3 className="text-lg font-bold mb-2">Interactive Map View</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Explore events happening near you in Nairobi. Pin icons show exact locations.
                  </p>
                  <Button onClick={() => setViewMode("grid")} size="sm" variant="outline" className="border-rose-200 text-rose-500">
                    Switch to Grid View
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {UPCOMING_EVENTS.map((event) => (
                <Card key={event.id} className="overflow-hidden group hover:shadow-lg transition-all">
                  <div className="aspect-video bg-muted relative">
                    <a href={`/events/${event.id}`} className="absolute inset-0 z-10">
                      <span className="sr-only">View Event</span>
                    </a>
                    {event.image ? (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-muted-foreground bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-950/10 dark:to-rose-900/10">
                        {event.category === "virtual" ? "Virtual Event" : "In-Person Event"}
                      </div>
                    )}
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="line-clamp-1 text-xl">{event.title}</CardTitle>
                      <span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${event.category === "virtual"
                        ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                        : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                        }`}>
                        {event.category === "virtual" ? "Virtual" : "In-Person"}
                      </span>
                    </div>
                    <CardDescription className="line-clamp-2 mt-2">
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-2 h-4 w-4 text-rose-500" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-2 h-4 w-4 text-rose-500" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="mr-2 h-4 w-4 text-rose-500" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="mr-2 h-4 w-4 text-rose-500" />
                        <span>{event.attendees} / {event.capacity} attending</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      className="w-full bg-rose-500 hover:bg-rose-600"
                      onClick={() => handleRegister(event.id)}
                      disabled={event.attendees >= event.capacity}
                    >
                      {event.attendees >= event.capacity ? "Event Full" : "Register Now"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="myevents" className="mt-6">
          {MY_EVENTS.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {MY_EVENTS.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="aspect-video bg-muted">
                    {event.image ? (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                        {event.category === "virtual" ? "Virtual Event" : "In-Person Event"}
                      </div>
                    )}
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="line-clamp-1 text-xl">{event.title}</CardTitle>
                      <span className={`rounded-full px-2 py-1 text-xs ${event.category === "virtual"
                        ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                        : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                        }`}>
                        {event.category === "virtual" ? "Virtual" : "In-Person"}
                      </span>
                    </div>
                    <CardDescription className="line-clamp-2 mt-2">
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{event.attendees} / {event.capacity} attending</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex-1 border-rose-200 text-rose-500 hover:bg-rose-50 hover:text-rose-600"
                          onClick={() => setSelectedEvent(event)}
                        >
                          <Ticket className="mr-2 h-4 w-4" /> View Ticket
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Event Ticket</DialogTitle>
                          <DialogDescription>
                            Present this QR code at the entrance of {event.title}.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col items-center justify-center p-6 space-y-4">
                          <div className="p-4 bg-white rounded-xl border-2 border-rose-100 shadow-inner">
                            <QrCode className="h-48 w-48 text-rose-500" />
                          </div>
                          <div className="text-center space-y-1">
                            <p className="font-bold text-lg">{event.title}</p>
                            <p className="text-sm text-muted-foreground">{event.date} • {event.time}</p>
                            <p className="text-xs font-mono text-muted-foreground pt-2">TICKET-ID: {event.id}-99XJ2</p>
                          </div>
                        </div>
                        <Button className="w-full bg-rose-500 hover:bg-rose-600">
                          Download PDF
                        </Button>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      className="text-muted-foreground hover:text-rose-500 hover:bg-rose-50"
                      onClick={() => handleCancel(event.id)}
                    >
                      Cancel
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 rounded-full bg-rose-100 p-4 text-rose-500 dark:bg-rose-900/30">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-medium">No registered events</h3>
              <p className="mb-6 text-muted-foreground max-w-md">
                You haven't registered for any events yet. Browse upcoming events to find
                activities that interest you.
              </p>
              <Button className="bg-rose-500 hover:bg-rose-600">
                Browse Events
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
