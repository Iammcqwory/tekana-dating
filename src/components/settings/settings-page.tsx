import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Lock, User, Shield, Moon } from "lucide-react"
import { toast } from "sonner"

export function SettingsPage() {
    const handleSave = () => {
        toast.success("Settings saved successfully")
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings and preferences.</p>
            </div>

            <Tabs defaultValue="account" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="privacy">Privacy</TabsTrigger>
                </TabsList>

                <TabsContent value="account" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Information</CardTitle>
                            <CardDescription>
                                Update your account details here.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" defaultValue="alex.johnson@example.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" value="********" readOnly />
                                <Button variant="outline" size="sm" className="mt-2">Change Password</Button>
                            </div>
                            <div className="space-y-2">
                                <Label>Language</Label>
                                <div className="flex items-center space-x-2">
                                    <Button variant="outline" size="sm">English</Button>
                                    <Button variant="ghost" size="sm">Kiswahili</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <div className="flex justify-end">
                        <Button onClick={handleSave} className="bg-rose-500 hover:bg-rose-600">Save Changes</Button>
                    </div>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>
                                Choose what you want to be notified about.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="matches" className="flex flex-col space-y-1">
                                    <span>New Matches</span>
                                    <span className="font-normal text-muted-foreground">
                                        Receive notifications when you match with someone.
                                    </span>
                                </Label>
                                <Switch id="matches" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="messages" className="flex flex-col space-y-1">
                                    <span>Messages</span>
                                    <span className="font-normal text-muted-foreground">
                                        Receive notifications when you receive a new message.
                                    </span>
                                </Label>
                                <Switch id="messages" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="events" className="flex flex-col space-y-1">
                                    <span>Event Reminders</span>
                                    <span className="font-normal text-muted-foreground">
                                        Receive reminders for upcoming events.
                                    </span>
                                </Label>
                                <Switch id="events" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="marketing" className="flex flex-col space-y-1">
                                    <span>Marketing Emails</span>
                                    <span className="font-normal text-muted-foreground">
                                        Receive emails about new features and offers.
                                    </span>
                                </Label>
                                <Switch id="marketing" />
                            </div>
                        </CardContent>
                    </Card>
                    <div className="flex justify-end">
                        <Button onClick={handleSave} className="bg-rose-500 hover:bg-rose-600">Save Preferences</Button>
                    </div>
                </TabsContent>

                <TabsContent value="privacy" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Privacy Settings</CardTitle>
                            <CardDescription>
                                Control who can see your profile and activity.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="public-profile" className="flex flex-col space-y-1">
                                    <span>Public Profile</span>
                                    <span className="font-normal text-muted-foreground">
                                        Allow your profile to be seen by non-registered users.
                                    </span>
                                </Label>
                                <Switch id="public-profile" />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="online-status" className="flex flex-col space-y-1">
                                    <span>Show Online Status</span>
                                    <span className="font-normal text-muted-foreground">
                                        Let others know when you are active.
                                    </span>
                                </Label>
                                <Switch id="online-status" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="read-receipts" className="flex flex-col space-y-1">
                                    <span>Read Receipts</span>
                                    <span className="font-normal text-muted-foreground">
                                        Let others know when you've read their messages.
                                    </span>
                                </Label>
                                <Switch id="read-receipts" defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                    <div className="flex justify-end">
                        <Button onClick={handleSave} className="bg-rose-500 hover:bg-rose-600">Save Settings</Button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
