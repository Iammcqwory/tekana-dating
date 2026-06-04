import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Send,
    Mic,
    Phone,
    Video,
    MoreVertical,
    ChevronLeft,
    Sparkles,
    Lightbulb,
    Gift,
    ShieldCheck,
    Play
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const MOCK_MESSAGES = [
    { id: 1, sender: "them", text: "Hey! I saw your profile and noticed we both love Afro-fusion cooking. 🍲", time: "10:30 AM" },
    { id: 2, sender: "me", text: "Hi Sarah! Yes, I love experimenting with spices. Have you tried making Jollof with a twist?", time: "10:32 AM" },
    { id: 3, sender: "them", text: "Not yet! Tell me more...", time: "10:33 AM" },
    { id: 4, sender: "them", type: "voice", duration: "0:12", time: "10:35 AM" },
]

export function MessageDetailPage({ id }: { id: string }) {
    const [messages, setMessages] = useState(MOCK_MESSAGES)
    const [input, setInput] = useState("")
    const [isRecording, setIsRecording] = useState(false)

    const handleSend = () => {
        if (!input.trim()) return
        const newMessage = {
            id: messages.length + 1,
            sender: "me",
            text: input,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        setMessages([...messages, newMessage])
        setInput("")
    }

    return (
        <div className="flex h-[calc(100vh-4rem)] bg-background overflow-hidden">
            {/* Chat Area */}
            <div className="flex-1 flex flex-col border-r relative bg-zinc-50/30 dark:bg-zinc-950/20">
                {/* Header */}
                <div className="h-16 border-b flex items-center justify-between px-4 bg-background/95 backdrop-blur z-20">
                    <div className="flex items-center gap-3">
                        <a href="/messages">
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <ChevronLeft className="h-5 w-5" />
                            </Button>
                        </a>
                        <Avatar className="h-10 w-10 border-2 border-rose-500">
                            <AvatarImage src={`https://i.pravatar.cc/150?u=${id}`} />
                            <AvatarFallback>S</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex items-center gap-1">
                                <span className="font-bold">Sarah</span>
                                <Badge className="bg-rose-500 h-4 text-[8px] font-black uppercase">Online</Badge>
                            </div>
                            <p className="text-[10px] text-muted-foreground font-medium">Originally from Kenya</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon"><Phone className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon"><Video className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                    </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4 max-w-2xl mx-auto">
                        <div className="text-center py-4">
                            <Badge variant="outline" className="text-muted-foreground font-normal">Today</Badge>
                        </div>

                        {messages.map((m) => (
                            <div key={m.id} className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[80%] space-y-1`}>
                                    {m.type === "voice" ? (
                                        <div className="bg-rose-100 dark:bg-rose-900/30 rounded-2xl p-4 flex items-center gap-4 border border-rose-200 shadow-sm">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-rose-500 text-white hover:bg-rose-600">
                                                <Play className="h-4 w-4 fill-white" />
                                            </Button>
                                            <div className="flex-1 space-y-1">
                                                <div className="h-1 bg-rose-200 dark:bg-rose-800 rounded-full w-32 relative">
                                                    <div className="absolute top-0 left-0 h-full bg-rose-500 rounded-full w-1/3" />
                                                </div>
                                                <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest">{m.duration}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={`px-4 py-2 rounded-2xl text-sm shadow-sm ${m.sender === "me"
                                                ? "bg-rose-500 text-white"
                                                : "bg-background border border-border"
                                            }`}>
                                            {m.text}
                                        </div>
                                    )}
                                    <p className={`text-[8px] font-bold uppercase tracking-tighter text-muted-foreground px-1 ${m.sender === "me" ? "text-right" : ""}`}>
                                        {m.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-4 border-t bg-background">
                    <div className="max-w-2xl mx-auto flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className={`rounded-full transition-all ${isRecording ? "bg-red-500 text-white animate-pulse" : "hover:bg-rose-50"}`}
                            onClick={() => setIsRecording(!isRecording)}
                        >
                            <Mic className="h-5 w-5" />
                        </Button>
                        <div className="flex-1 relative">
                            <Input
                                placeholder={isRecording ? "Recording..." : "Type a message..."}
                                className="rounded-full pr-10 focus-visible:ring-rose-500"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                disabled={isRecording}
                            />
                            <Sparkles className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-rose-500 opacity-50" />
                        </div>
                        <Button
                            size="icon"
                            className="rounded-full bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-500/20"
                            onClick={handleSend}
                            disabled={isRecording || !input.trim()}
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Sidebar: AI Wingman Tips */}
            <aside className="hidden lg:flex w-80 flex-col border-l bg-rose-50/10 dark:bg-zinc-950/20">
                <div className="p-6 border-b flex items-center justify-between">
                    <h3 className="font-bold flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-rose-500" /> Wingman Assistant
                    </h3>
                    <Badge variant="outline" className="text-rose-500 border-rose-200">Pro</Badge>
                </div>
                <ScrollArea className="flex-1 p-6">
                    <div className="space-y-6">
                        <Card className="border-rose-100 bg-rose-50/50">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm flex items-center gap-2">
                                    <Lightbulb className="h-4 w-4 text-rose-500" /> Next Move Tips
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="text-xs p-3 rounded-lg bg-white border border-rose-100 shadow-sm leading-relaxed">
                                    "Since Sarah mentioned Kenyan spices, ask her what her favorite dish to cook for family is. It shows interest in both her passions and values."
                                </div>
                                <Button variant="outline" size="sm" className="w-full text-[10px] font-bold uppercase tracking-wider h-8">
                                    Get Another Tip
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm flex items-center gap-2">
                                    <Gift className="h-4 w-4 text-amber-500" /> Virtual Gifts
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 gap-2">
                                <Button variant="ghost" className="flex flex-col h-auto py-2 gap-1 border border-transparent hover:border-rose-100 hover:bg-rose-50">
                                    <span className="text-lg">🌹</span>
                                    <span className="text-[10px] font-bold">Rose (10 ZP)</span>
                                </Button>
                                <Button variant="ghost" className="flex flex-col h-auto py-2 gap-1 border border-transparent hover:border-rose-100 hover:bg-rose-50">
                                    <span className="text-lg">☕</span>
                                    <span className="text-[10px] font-bold">Coffee (25 ZP)</span>
                                </Button>
                            </CardContent>
                        </Card>

                        <div className="p-4 rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 text-white space-y-2 shadow-lg">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5" />
                                <span className="font-bold text-sm text-rose-100">Safe Meet Tip</span>
                            </div>
                            <p className="text-[10px] opacity-90 leading-relaxed">
                                If you're planning to meet Sarah, use our **Safe Date** feature to share your live location with a trusted friend.
                            </p>
                        </div>

                        <div className="pt-4 border-t">
                            <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Mutual Interests</h4>
                            <div className="flex flex-wrap gap-2">
                                {["Cooking", "Travel", "Music", "Photography"].map((i) => (
                                    <Badge key={i} variant="secondary" className="bg-white text-[10px] font-bold">{i}</Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </aside>
        </div>
    )
}
