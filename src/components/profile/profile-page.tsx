import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Edit, Settings, Heart, MessageSquare, Shield, Verified, Globe, Calendar, ChevronRight, LogOut, MapPin } from "lucide-react"
import { EditProfileDialog } from "@/components/profile/edit-profile-dialog"

// Mock user data
const USER = {
  id: "user123",
  name: "Alex Johnson",
  age: 28,
  location: "Nairobi, Kenya",
  bio: "Passionate photographer and outdoor enthusiast. I love hiking, exploring new places, and enjoying good coffee. Looking for someone to share adventures with.",
  profession: "Photographer & Digital Marketer",
  education: "University of Nairobi",
  joinDate: "January 2023",
  photos: [],
  interests: ["Photography", "Hiking", "Coffee", "Travel", "Music", "Reading"],
  profileComplete: 85,
  membership: "Tekana Basic",
  verified: true,
};

// Mock stats data
const USER_STATS = {
  views: 128,
  likes: 47,
  matches: 12,
  conversations: 5,
};

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Profile</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Left Sidebar - Profile Summary */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarFallback className="text-2xl">{USER.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {USER.verified && (
                    <div className="absolute -right-1 -bottom-1 rounded-full bg-rose-500 p-1 text-white">
                      <Verified className="h-4 w-4" />
                    </div>
                  )}
                </div>

                <h2 className="mt-4 text-xl font-bold">{USER.name}, {USER.age}</h2>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Globe className="mr-1 h-3 w-3" /> {USER.location}
                </div>
                <div className="mt-4 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-rose-500"
                    style={{ width: `${USER.profileComplete}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Profile {USER.profileComplete}% complete
                </p>

                <EditProfileDialog />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Membership</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="font-medium">{USER.membership}</span>
                <a href="/premium">
                  <Button variant="outline" size="sm">
                    Upgrade
                  </Button>
                </a>
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Heart className="mr-2 h-4 w-4" /> 5 likes per day
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MessageSquare className="mr-2 h-4 w-4" /> Basic messaging
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Shield className="mr-2 h-4 w-4" /> Standard privacy controls
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Account</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                <a href="/settings" className="block w-full">
                  <Button variant="ghost" className="flex w-full justify-between rounded-none p-4">
                    <div className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </a>
                <Button variant="ghost" className="flex w-full justify-between rounded-none p-4">
                  <div className="flex items-center">
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Privacy & Safety</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="ghost" className="flex w-full justify-between rounded-none p-4" onClick={() => {
                  window.location.href = "/auth/login";
                }}>
                  <div className="flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">My Profile</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About Me</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{USER.bio}</p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div>
                        <h4 className="mb-2 text-sm font-medium">Profession</h4>
                        <p className="text-muted-foreground">{USER.profession}</p>
                      </div>
                      <div>
                        <h4 className="mb-2 text-sm font-medium">Education</h4>
                        <p className="text-muted-foreground">{USER.education}</p>
                      </div>
                      <div>
                        <h4 className="mb-2 text-sm font-medium">Location</h4>
                        <p className="text-muted-foreground">{USER.location}</p>
                      </div>
                      <div>
                        <h4 className="mb-2 text-sm font-medium">Joined</h4>
                        <p className="text-muted-foreground">{USER.joinDate}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Interests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {USER.interests.map((interest) => (
                        <Badge key={interest} variant="secondary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cultural & Diaspora</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <h4 className="mb-2 text-sm font-medium">Heritage</h4>
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">Origin</p>
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4 text-rose-500" />
                              <span className="text-sm font-semibold">Kenya</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">Current Residence</p>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-blue-500" />
                              <span className="text-sm font-semibold">London, UK</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="mb-2 text-sm font-medium">Languages</h4>
                        <div className="flex flex-wrap gap-2">
                          {["English", "Swahili", "Luganda"].map((lang) => (
                            <Badge key={lang} variant="outline" className="text-rose-500 border-rose-200">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                        <h4 className="mb-2 mt-4 text-sm font-medium">Values</h4>
                        <div className="flex flex-wrap gap-2">
                          {["Family-oriented", "Traditional", "Respectful"].map((value) => (
                            <Badge key={value} variant="secondary" className="bg-rose-50 text-rose-600 border-none">
                              {value}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Photos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {USER.photos.length > 0 ? (
                      <div className="grid grid-cols-3 gap-4">
                        {USER.photos.map((photo, index) => (
                          <div key={index} className="aspect-square overflow-hidden rounded-md">
                            <img
                              src={photo}
                              alt={`Profile photo ${index + 1}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-muted-foreground">
                        <p className="mb-4 text-center">No photos uploaded yet</p>
                        <Button className="bg-rose-500 hover:bg-rose-600">
                          <Edit className="mr-2 h-4 w-4" /> Add Photos
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    See who interacted with your profile
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No Recent Activity</h3>
                    <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                      Check back later to see likes, views, and other activity on your profile.
                      Completing your profile increases your chances of getting matches!
                    </p>
                    <a href="/discover">
                      <Button className="mt-6 bg-rose-500 hover:bg-rose-600">
                        Discover People
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stats" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Statistics</CardTitle>
                  <CardDescription>
                    How your profile is performing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-md border p-4">
                      <div className="text-2xl font-bold">{USER_STATS.views}</div>
                      <div className="text-sm text-muted-foreground">Profile Views</div>
                    </div>
                    <div className="rounded-md border p-4">
                      <div className="text-2xl font-bold">{USER_STATS.likes}</div>
                      <div className="text-sm text-muted-foreground">Likes Received</div>
                    </div>
                    <div className="rounded-md border p-4">
                      <div className="text-2xl font-bold">{USER_STATS.matches}</div>
                      <div className="text-sm text-muted-foreground">Matches</div>
                    </div>
                    <div className="rounded-md border p-4">
                      <div className="text-2xl font-bold">{USER_STATS.conversations}</div>
                      <div className="text-sm text-muted-foreground">Active Conversations</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
