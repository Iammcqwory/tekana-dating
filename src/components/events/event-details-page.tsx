import React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, ArrowLeft, Share2, Heart } from "lucide-react"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data (in a real app this would come from an API based on ID)
const EVENT = {
    id: "1",
    title: "Coffee Connections",
    description: "Meet other singles over coffee in a relaxed environment. This event is perfect for those who prefer casual conversations in a comfortable setting. We will have icebreaker questions provided at each table to help get the conversation started. Come ready to meet new people and have great coffee!",
    date: "May 15, 2025",
    time: "5:30 PM - 7:30 PM",
    location: "Java House, Nairobi CBD",
    address: "Mama Ngina Street, Nairobi",
    category: "in-person",
    attendees: 24,
    capacity: 30,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2574&auto=format&fit=crop",
    host: {
        name: "Tekana Team",
        image: "",
    },
    registeredAttendees: [
        { name: "Sarah", image: "" },
        { name: "David", image: "" },
        { name: "Grace", image: "" },
        { name: "Michael", image: "" },
    ]
}

export function EventDetailsPage() {
    const handleRegister = () => {
        toast.success("You've successfully registered for this event!")
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <a href="/events">
                <Button variant="ghost" className="mb-6 pl-0 hover:bg-transparent hover:text-rose-500">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
                </Button>
            </a>

            <div className="rounded-xl overflow-hidden border bg-card text-card-foreground shadow">
                {/* Hero Image */}
                <div className="relative h-64 md:h-96 w-full bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center bg-rose-100 text-rose-500">
                        <span className="text-4xl font-bold opacity-20">Event Image</span>
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2">
                        <Button variant="secondary" size="icon" className="rounded-full bg-white/80 hover:bg-white">
                            <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="secondary" size="icon" className="rounded-full bg-white/80 hover:bg-white text-rose-500">
                            <Heart className="h-4 w-4 fill-current" />
                        </Button>
                    </div>
                </div>

                <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div>
                            <Badge variant={EVENT.category === "virtual" ? "default" : "secondary"} className="mb-2">
                                {EVENT.category === "virtual" ? "Virtual Event" : "In-Person Event"}
                            </Badge>
                            <h1 className="text-3xl font-bold">{EVENT.title}</h1>
                            <div className="mt-2 flex items-center text-muted-foreground">
                                <Avatar className="h-6 w-6 mr-2">
                                    <AvatarFallback>TT</AvatarFallback>
                                </Avatar>
                                <span className="text-sm">Hosted by <span className="font-medium text-foreground">{EVENT.host.name}</span></span>
                            </div>
                        </div>
                        <Button size="lg" className="bg-rose-500 hover:bg-rose-600 md:w-auto w-full" onClick={handleRegister}>
                            Register for Event
                        </Button>
                    </div>

                    <div className="mt-8 grid gap-8 md:grid-cols-3">
                        <div className="md:col-span-2 space-y-8">
                            <div>
                                <h2 className="text-xl font-semibold mb-3">About this Event</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {EVENT.description}
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-3">Attendees ({EVENT.registeredAttendees.length} friends going)</h2>
                                <div className="flex -space-x-3">
                                    {EVENT.registeredAttendees.map((attendee, i) => (
                                        <Avatar key={i} className="border-2 border-background w-10 h-10">
                                            <AvatarFallback title={attendee.name}>{attendee.name[0]}</AvatarFallback>
                                        </Avatar>
                                    ))}
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-background bg-muted text-xs font-medium">
                                        +{EVENT.attendees - 4}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="rounded-lg border p-4 bg-muted/30 space-y-4">
                                <div className="flex items-start">
                                    <Calendar className="mr-3 h-5 w-5 text-rose-500 mt-0.5" />
                                    <div>
                                        <p className="font-medium">Date</p>
                                        <p className="text-sm text-muted-foreground">{EVENT.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Clock className="mr-3 h-5 w-5 text-rose-500 mt-0.5" />
                                    <div>
                                        <p className="font-medium">Time</p>
                                        <p className="text-sm text-muted-foreground">{EVENT.time}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <MapPin className="mr-3 h-5 w-5 text-rose-500 mt-0.5" />
                                    <div>
                                        <p className="font-medium">Location</p>
                                        <p className="text-sm text-muted-foreground">{EVENT.location}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{EVENT.address}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Users className="mr-3 h-5 w-5 text-rose-500 mt-0.5" />
                                    <div>
                                        <p className="font-medium">Capacity</p>
                                        <p className="text-sm text-muted-foreground">{EVENT.attendees} / {EVENT.capacity} filled</p>
                                    </div>
                                </div>
                            </div>

                            {/* Mock Map Placeholder */}
                            <div className="h-48 w-full bg-muted rounded-lg flex items-center justify-center border text-muted-foreground text-sm">
                                Map View Placeholder
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
