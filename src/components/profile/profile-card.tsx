"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageSquare, X, Check, MapPin, Briefcase, GraduationCap, Music, Film, BookOpen, Coffee, Utensils, Wine, ShieldAlert, Gift, Verified, Globe } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

interface ProfileCardProps {
  profile: {
    id: string
    name: string
    age: number
    location: string
    distance: string
    profession: string
    education?: string
    bio: string
    interests: string[]
    photos: string[]
    verified: boolean
    origin?: string
    residence?: string
    compatibility?: number
  }
  onLike?: (id: string) => void
  onDislike?: (id: string) => void
  onMessage?: (id: string) => void
  detailed?: boolean
}

export function ProfileCard({
  profile,
  onLike,
  onDislike,
  onMessage,
  detailed = false,
}: ProfileCardProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = React.useState(0)

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % profile.photos.length)
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + profile.photos.length) % profile.photos.length)
  }

  // For demo purposes, use a placeholder image if the photos array is empty
  const currentPhoto = profile.photos.length > 0
    ? profile.photos[currentPhotoIndex]
    : ""

  const getInterestIcon = (interest: string) => {
    switch (interest.toLowerCase()) {
      case "music":
        return <Music className="h-3 w-3" />
      case "movies":
        return <Film className="h-3 w-3" />
      case "reading":
        return <BookOpen className="h-3 w-3" />
      case "coffee":
        return <Coffee className="h-3 w-3" />
      case "dining":
        return <Utensils className="h-3 w-3" />
      case "wine":
        return <Wine className="h-3 w-3" />
      default:
        return null
    }
  }

  return (
    <Card className="overflow-hidden">
      {detailed ? (
        <Tabs defaultValue="photos" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          <TabsContent value="photos" className="m-0">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
              {currentPhoto ? (
                <div className="relative h-full w-full">
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${currentPhoto})` }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold">{profile.name}, {profile.age}</h3>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3" /> {profile.location} • {profile.distance} away
                        </div>
                        {profile.origin && profile.origin !== profile.location && (
                          <div className="flex items-center gap-1 mt-1 text-[10px] font-bold uppercase text-rose-200">
                            <Globe className="h-2 w-2" /> From {profile.origin}
                          </div>
                        )}
                      </div>
                      {profile.verified && (
                        <div className="flex items-center gap-1 rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                          <Verified className="h-3 w-3" />
                          Verified
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/20 text-white hover:bg-black/40 hover:text-rose-400"
                    onClick={() => toast.error("Report submitted. Our team will review this profile.")}
                  >
                    <ShieldAlert className="h-4 w-4" />
                  </Button>
                  {profile.photos.length > 1 && (
                    <>
                      <button
                        onClick={prevPhoto}
                        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50"
                        aria-label="Previous photo"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 18l-6-6 6-6" />
                        </svg>
                      </button>
                      <button
                        onClick={nextPhoto}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50"
                        aria-label="Next photo"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Avatar className="h-24 w-24">
                    <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
              )}
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1">
                {profile.photos.map((photo, index) => (
                  <span
                    key={`photo-indicator-detailed-${photo}-${index}`}
                    className={`block h-1.5 w-6 rounded-full ${index === currentPhotoIndex ? "bg-white" : "bg-white/30"}`}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="about" className="m-0 p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">About Me</h3>
                <p className="text-muted-foreground">{profile.bio}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Details</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span>{profile.profession}</span>
                  </div>
                  {profile.education && (
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <span>{profile.education}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{profile.location}</span>
                  </div>
                  {profile.origin && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-rose-500" />
                      <span>Originally from <span className="font-semibold text-rose-600">{profile.origin}</span></span>
                    </div>
                  )}
                  {profile.residence && profile.residence !== profile.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-500" />
                      <span>Currently in <span className="font-semibold text-blue-600">{profile.residence}</span></span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Interests</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {profile.interests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="flex items-center gap-1">
                      {getInterestIcon(interest)} {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
          {currentPhoto ? (
            <div className="relative h-full w-full">
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${currentPhoto})` }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{profile.name}, {profile.age}</h3>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3" /> {profile.location} • {profile.distance} away
                    </div>
                    {profile.origin && profile.origin !== profile.location && (
                      <div className="flex items-center gap-1 mt-1 text-[10px] font-bold uppercase text-rose-200">
                        <Globe className="h-2 w-2" /> From {profile.origin}
                      </div>
                    )}
                  </div>
                  {profile.verified && (
                    <div className="flex items-center gap-1 rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                      <Verified className="h-3 w-3" />
                      Verified
                    </div>
                  )}
                  {profile.compatibility && (
                    <div className="flex items-center gap-1 rounded-full bg-amber-500/90 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-lg border border-white/20">
                      <Zap className="h-3 w-3 fill-white" />
                      {profile.compatibility}% Match
                    </div>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/20 text-white hover:bg-black/40 hover:text-rose-400"
                onClick={() => toast.error("Report submitted. Our team will review this profile.")}
              >
                <ShieldAlert className="h-4 w-4" />
              </Button>
              {profile.photos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50"
                    aria-label="Previous photo"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50"
                    aria-label="Next photo"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Avatar className="h-24 w-24">
                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          )}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1">
            {profile.photos.map((photo, index) => (
              <span
                key={`photo-indicator-${photo}-${index}`}
                className={`block h-1.5 w-6 rounded-full ${index === currentPhotoIndex ? "bg-white" : "bg-white/30"}`}
              />
            ))}
          </div>
        </div>
      )}

      {!detailed && (
        <CardContent className="p-4">
          <div className="line-clamp-2 text-sm text-muted-foreground">
            {profile.bio}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {profile.interests.slice(0, 3).map((interest) => (
              <Badge key={interest} variant="secondary" className="flex items-center gap-1">
                {getInterestIcon(interest)} {interest}
              </Badge>
            ))}
            {profile.interests.length > 3 && (
              <Badge variant="secondary">+{profile.interests.length - 3}</Badge>
            )}
          </div>
        </CardContent>
      )}

      <CardFooter className="flex justify-between gap-2 p-4">
        {onDislike && (
          <Button
            onClick={() => onDislike(profile.id)}
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full border-rose-200 text-rose-500 hover:bg-rose-50 hover:text-rose-600"
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Dislike</span>
          </Button>
        )}
        <Button
          onClick={() => toast.success(`Gift sent to ${profile.name}!`)}
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full border-amber-200 text-amber-500 hover:bg-amber-50 hover:text-amber-600"
        >
          <Gift className="h-6 w-6" />
          <span className="sr-only">Send Gift</span>
        </Button>
        {onMessage && (
          <Button
            onClick={() => onMessage(profile.id)}
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full border-blue-200 text-blue-500 hover:bg-blue-50 hover:text-blue-600"
          >
            <MessageSquare className="h-6 w-6" />
            <span className="sr-only">Message</span>
          </Button>
        )}
        {onLike && (
          <Button
            onClick={() => onLike(profile.id)}
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full border-rose-200 text-rose-500 hover:bg-rose-50 hover:text-rose-600"
          >
            <Heart className="h-6 w-6" />
            <span className="sr-only">Like</span>
          </Button>
        )}
        {detailed && (
          <Button
            className="flex-1 bg-rose-500 hover:bg-rose-600"
            onClick={() => onLike?.(profile.id)}
          >
            <Heart className="mr-2 h-5 w-5" /> Connect
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
