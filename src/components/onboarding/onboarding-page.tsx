import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Globe,
  MapPin,
  Heart,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Zap,
  Star,
  Users
} from "lucide-react"
import { toast } from "sonner"

const STEPS = [
  { id: 1, title: "Welcome", description: "Let's start your journey" },
  { id: 2, title: "Heritage", description: "Your cultural roots" },
  { id: 3, title: "Values", description: "What matters to you" },
  { id: 4, title: "Interests", description: "Finding shared passions" },
]

export function OnboardingPage() {
  const [step, setStep] = useState(1)

  const nextStep = () => setStep((s) => Math.min(s + 1, 5))
  const prevStep = () => setStep((s) => Math.max(s - 1, 1))

  const handleComplete = () => {
    toast.success("Onboarding complete! You've earned 500 Zenith Points.")
    window.location.href = "/discover"
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gradient-to-b from-rose-50/50 to-white dark:from-rose-950/10 py-12 px-4">
      {/* Progress Bar */}
      <div className="w-full max-w-2xl mb-12 flex justify-between items-center relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -translate-y-1/2 z-0" />
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-rose-500 -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${(step - 1) * 33.33}%` }}
        />
        {STEPS.map((s) => (
          <div key={s.id} className="relative z-10 flex flex-col items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${step >= s.id ? "bg-rose-500 border-rose-500 text-white" : "bg-background border-muted text-muted-foreground"
                }`}
            >
              {step > s.id ? <CheckCircle2 className="h-6 w-6" /> : s.id}
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-wider hidden sm:block ${step >= s.id ? "text-rose-600" : "text-muted-foreground"}`}>
              {s.title}
            </span>
          </div>
        ))}
      </div>

      <div className="w-full max-w-2xl">
        {step === 1 && (
          <Card className="animate-in fade-in slide-in-from-bottom-8 duration-500 border-none shadow-2xl overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-rose-500 to-rose-600 flex items-center justify-center relative overflow-hidden">
              <Heart className="h-24 w-24 text-white opacity-20 absolute -right-4 -bottom-4 rotate-12" />
              <Sparkles className="h-12 w-12 text-white" />
            </div>
            <CardHeader className="text-center pt-8">
              <CardTitle className="text-3xl font-black">Welcome to Tekana</CardTitle>
              <CardDescription className="text-lg">Where meaningful connections meet cultural heritage.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 px-8">
              <p className="text-center text-muted-foreground">
                We're excited to have you here! Let's personalize your profile to help you find the perfect match.
                Completing this wizard will earn you <strong>500 Zenith Points</strong>!
              </p>
              <div className="grid gap-4 pt-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-muted transition-colors hover:border-rose-200">
                  <Users className="h-6 w-6 text-rose-500" />
                  <div>
                    <p className="font-bold">Real Connections</p>
                    <p className="text-sm text-muted-foreground">Community-vetted profiles and verified users.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-muted transition-colors hover:border-rose-200">
                  <Globe className="h-6 w-6 text-rose-500" />
                  <div>
                    <p className="font-bold">Global Diaspora</p>
                    <p className="text-sm text-muted-foreground">Connect with people from your home country, wherever you are.</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="px-8 pb-8">
              <Button className="w-full h-12 bg-rose-500 hover:bg-rose-600 text-lg font-bold" onClick={nextStep}>
                Get Started <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
          <Card className="animate-in fade-in slide-in-from-right-8 duration-500">
            <CardHeader>
              <CardTitle>Your Heritage</CardTitle>
              <CardDescription>Tell us about your roots and where you are now.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="origin" className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-rose-500" /> Origin (Home Country)
                </Label>
                <Input id="origin" placeholder="e.g. Kenya, Nigeria, Ghana" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="residence" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-rose-500" /> Current Residence
                </Label>
                <Input id="residence" placeholder="e.g. London, Nairobi, Toronto" />
              </div>
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 flex items-start gap-3">
                <Zap className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-blue-700 dark:text-blue-300">Diaspora Bridge Active</p>
                  <p className="text-xs text-blue-600/80 dark:text-blue-400/80">
                    Based on your heritage, we'll suggest matches who share your cultural background or live in your area.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" onClick={prevStep}>Back</Button>
              <Button className="bg-rose-500 hover:bg-rose-600" onClick={nextStep}>Continue <ChevronRight className="ml-2 h-4 w-4" /></Button>
            </CardFooter>
          </Card>
        )}

        {step === 3 && (
          <Card className="animate-in fade-in slide-in-from-right-8 duration-500">
            <CardHeader>
              <CardTitle>Values & Languages</CardTitle>
              <CardDescription>What defines you culturally?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Core Values</Label>
                <div className="flex flex-wrap gap-2">
                  {["Family-Oriented", "Traditional", "Career-Driven", "Modern", "Respectful", "Community-Focused"].map((v) => (
                    <Badge
                      key={v}
                      variant="outline"
                      className="py-2 px-4 cursor-pointer hover:border-rose-500 hover:text-rose-500 transition-colors"
                    >
                      {v}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <Label>Languages Spoken</Label>
                <div className="flex flex-wrap gap-2">
                  {["English", "Swahili", "Yoruba", "Igbo", "Twi", "French", "Luganda"].map((l) => (
                    <Badge
                      key={l}
                      variant="secondary"
                      className="py-2 px-4 cursor-pointer hover:bg-rose-100 dark:hover:bg-rose-900 transition-colors"
                    >
                      {l}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" onClick={prevStep}>Back</Button>
              <Button className="bg-rose-500 hover:bg-rose-600" onClick={nextStep}>Continue <ChevronRight className="ml-2 h-4 w-4" /></Button>
            </CardFooter>
          </Card>
        )}

        {step === 4 && (
          <Card className="animate-in fade-in slide-in-from-right-8 duration-500 overflow-hidden">
            <CardHeader>
              <CardTitle>Finding Common Ground</CardTitle>
              <CardDescription>What are you passionate about?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {["Music", "Cooking", "Photography", "Travel", "Fitness", "Art", "Technology", "Fashion", "Nature"].map((interest) => (
                  <div key={interest} className="group relative rounded-xl overflow-hidden aspect-square cursor-pointer">
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center p-2 text-center">
                      <span className="text-white font-black text-sm uppercase tracking-wider">{interest}</span>
                    </div>
                    <div className="h-full w-full bg-muted" />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100">
                <Star className="h-5 w-5 text-amber-500" />
                <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
                  Selecting 5+ interests boosts your <strong>Compatibility Score</strong>!
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" onClick={prevStep}>Back</Button>
              <Button className="bg-rose-500 hover:bg-rose-600" onClick={nextStep}>Analyze Profile <ChevronRight className="ml-2 h-4 w-4" /></Button>
            </CardFooter>
          </Card>
        )}

        {step === 5 && (
          <Card className="animate-in zoom-in duration-500 border-rose-500 border-2 shadow-rose-200 dark:shadow-rose-900">
            <CardHeader className="text-center pt-12">
              <div className="mx-auto w-20 h-20 rounded-full bg-rose-500 flex items-center justify-center mb-6 shadow-xl shadow-rose-500/20">
                <CheckCircle2 className="h-12 w-12 text-white" />
              </div>
              <CardTitle className="text-4xl font-black">You're All Set!</CardTitle>
              <CardDescription className="text-xl">Welcome to the Tekana community.</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6 px-8">
              <div className="flex justify-center gap-4">
                <div className="p-4 rounded-2xl bg-muted/50 border border-muted flex flex-col items-center">
                  <Zap className="h-8 w-8 text-amber-500 mb-2" />
                  <span className="text-2xl font-black">+500</span>
                  <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Points</span>
                </div>
                <div className="p-4 rounded-2xl bg-muted/50 border border-muted flex flex-col items-center">
                  <Star className="h-8 w-8 text-rose-500 mb-2" />
                  <span className="text-2xl font-black">Level 2</span>
                  <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Rank</span>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Your profile is now culturally enriched and ready for discovery. We've applied your preferences to the <strong>Diaspora Bridge</strong> and boosted your visibility.
              </p>
            </CardContent>
            <CardFooter className="px-8 pb-12 pt-4">
              <Button className="w-full h-14 bg-gradient-to-r from-rose-500 to-rose-600 text-xl font-black shadow-xl" onClick={handleComplete}>
                Start Exploring <ChevronRight className="ml-2 h-6 w-6" />
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}
