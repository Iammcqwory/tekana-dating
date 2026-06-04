"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Edit } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function EditProfileDialog() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false)
      setOpen(false)
      toast.success("Profile updated successfully")
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-4 w-full bg-rose-500 hover:bg-rose-600">
          <Edit className="mr-2 h-4 w-4" /> Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue="Alex Johnson"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                defaultValue="Nairobi, Kenya"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="profession" className="text-right">
                Profession
              </Label>
              <Input
                id="profession"
                defaultValue="Photographer"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <Textarea
                id="bio"
                defaultValue="Passionate photographer and outdoor enthusiast."
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="languages" className="text-right">
                Languages
              </Label>
              <Input
                id="languages"
                defaultValue="English, Swahili, Luganda"
                className="col-span-3"
                placeholder="e.g. English, Swahili"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="values" className="text-right">
                Values
              </Label>
              <Input
                id="values"
                defaultValue="Family-oriented, Traditional, Respectful"
                className="col-span-3"
                placeholder="e.g. Family-oriented, Modern"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="origin" className="text-right">
                Origin
              </Label>
              <Input
                id="origin"
                defaultValue="Kenya"
                className="col-span-3"
                placeholder="Your home country"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="residence" className="text-right">
                Residence
              </Label>
              <Input
                id="residence"
                defaultValue="London, UK"
                className="col-span-3"
                placeholder="Where you live now"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
