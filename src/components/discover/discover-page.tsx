import React, { useState } from "react"
import { ProfileCard } from "@/components/profile/profile-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Sliders, Filter, Globe, Crown, MapPin, Heart, Zap } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

// Mock data for profiles
const MOCK_PROFILES = [
  {
    id: "1",
    name: "Sarah",
    age: 28,
    location: "Nairobi",
    distance: "5 km",
    profession: "Marketing Manager",
    education: "University of Nairobi",
    bio: "Passionate about photography, travel, and good conversations. Looking for someone who enjoys exploring new places and trying new cuisines.",
    interests: ["Photography", "Travel", "Coffee", "Reading", "Hiking"],
    photos: [],
    verified: true,
    compatibility: 95,
  },
  {
    id: "2",
    name: "David",
    age: 31,
    location: "Nairobi",
    distance: "8 km",
    profession: "Software Engineer",
    education: "Strathmore University",
    bio: "Tech enthusiast who enjoys coding, hiking, and playing guitar. Looking for someone to share adventures with.",
    interests: ["Music", "Hiking", "Technology", "Coffee"],
    photos: [],
    verified: true,
    compatibility: 87,
  },
  {
    id: "3",
    name: "Grace",
    age: 26,
    location: "Nairobi",
    distance: "3 km",
    profession: "Graphic Designer",
    education: "Kenya Polytechnic",
    bio: "Creative soul with a passion for art, design, and photography. Love exploring local art scenes and trying new restaurants.",
    interests: ["Art", "Design", "Movies", "Dining"],
    photos: [],
    verified: false,
    compatibility: 72,
  },
  {
    id: "4",
    name: "Michael",
    age: 30,
    location: "Nairobi",
    distance: "12 km",
    profession: "Financial Analyst",
    education: "Kenyatta University",
    bio: "Finance professional by day, foodie by night. Enjoy running, reading, and exploring the outdoors.",
    interests: ["Finance", "Running", "Reading", "Cooking"],
    photos: [],
    verified: true,
    compatibility: 81,
  },
  {
    id: "5",
    name: "Linda",
    age: 27,
    location: "Nairobi",
    distance: "7 km",
    profession: "Teacher",
    bio: "Passionate educator who loves to travel during school breaks. Looking for someone who values education and adventure.",
    interests: ["Education", "Travel", "Reading", "Movies"],
    photos: [],
    verified: true,
    compatibility: 94,
  },
  {
    id: "6",
    name: "Daniel",
    age: 32,
    location: "Nairobi",
    distance: "15 km",
    profession: "Doctor",
    education: "University of Nairobi Medical School",
    bio: "Medical professional who enjoys staying active, listening to podcasts, and traveling whenever possible.",
    interests: ["Medicine", "Fitness", "Podcasts", "Travel"],
    photos: [],
    verified: true,
    compatibility: 89,
    origin: "Kenya",
    residence: "Nairobi, Kenya",
  },
  {
    id: "7",
    name: "Kofi",
    age: 29,
    location: "London, UK",
    distance: "6500 km",
    profession: "Project Manager",
    bio: "London-based Ghanaian guy looking to connect with my roots and possibly find someone special from home.",
    interests: ["Afrobeats", "Cooking", "Football"],
    photos: [],
    verified: true,
    compatibility: 97,
    origin: "Ghana",
    residence: "London, UK",
  },
  {
    id: "8",
    name: "Amina",
    age: 25,
    location: "Toronto, Canada",
    distance: "12000 km",
    profession: "Nurse",
    bio: "Kenyan in Canada! Missing home and looking for someone who understands my culture and values.",
    interests: ["Travel", "Music", "Photography"],
    photos: [],
    verified: true,
    compatibility: 91,
    origin: "Kenya",
    residence: "Toronto, Canada",
  },
];

export function DiscoverPage() {
  const [profiles, setProfiles] = useState(MOCK_PROFILES);
  const [activeTab, setActiveTab] = useState("discover");
  const [diasporaMode, setDiasporaMode] = useState(false);

  const filteredProfiles = diasporaMode
    ? profiles.filter(p => p.location.includes("UK") || p.location.includes("Canada") || p.location.includes("USA"))
    : profiles.filter(p => !p.location.includes("UK") && !p.location.includes("Canada") && !p.location.includes("USA"));

  const handleLike = (id: string) => {
    toast.success("You liked this profile!");
    setProfiles(profiles.filter(profile => profile.id !== id));
  };

  const handleDislike = (id: string) => {
    toast("Profile passed");
    setProfiles(profiles.filter(profile => profile.id !== id));
  };

  const handleMessage = (id: string) => {
    toast.success("Opening chat...");
    window.location.href = `/messages/${id}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Discover</h1>
        <div className="flex items-center gap-6">
          <div className="flex items-center space-x-2 bg-rose-50 dark:bg-rose-950/20 px-4 py-2 rounded-full border border-rose-100">
            <Globe className="h-4 w-4 text-rose-500" />
            <Label htmlFor="diaspora-mode" className="text-sm font-medium text-rose-700 dark:text-rose-300">Diaspora Bridge</Label>
            <Switch
              id="diaspora-mode"
              checked={diasporaMode}
              onCheckedChange={setDiasporaMode}
            />
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Sliders className="h-4 w-4" /> Filters
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="discover"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="mt-0">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProfiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile as any}
                onLike={handleLike}
                onDislike={handleDislike}
              />
            ))}

            {filteredProfiles.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 rounded-full bg-rose-100 p-4 text-rose-500 dark:bg-rose-900/30">
                  <Filter className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-medium">No more profiles</h3>
                <p className="mb-6 text-muted-foreground">
                  We've run out of profiles to show you. Adjust your filters or check back later.
                </p>
                <Button className="bg-rose-500 hover:bg-rose-600">
                  Adjust Filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="matches" className="mt-0">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {profiles.slice(0, 2).map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onMessage={handleMessage}
              />
            ))}

            {profiles.slice(0, 2).length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 rounded-full bg-rose-100 p-4 text-rose-500 dark:bg-rose-900/30">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-medium">No matches yet</h3>
                <p className="mb-6 text-muted-foreground">
                  Keep discovering profiles to find your matches.
                </p>
                <Button className="bg-rose-500 hover:bg-rose-600" onClick={() => setActiveTab("discover")}>
                  Discover Profiles
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
