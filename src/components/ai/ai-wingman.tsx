"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Sparkles, Send, MessageCircle, Lightbulb, ShieldCheck, Globe, Gift, ChevronLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export function AIWingman() {
    const [messages, setMessages] = useState([
        {
            role: "ai",
            content: "Hello! I'm your Tekana Wingman. How can I help you make meaningful connections today?",
        },
    ])
    const [input, setInput] = useState("")
    const [view, setView] = useState<"chat" | "culture">("chat")

    const CULTURE_TIPS = [
        { country: "Kenya", tip: "Being family-oriented is highly valued. Mentioning your relationship with your family can be a great plus.", gift: "A thoughtful artisanal basket or Kenyan-grown flowers." },
        { country: "Nigeria", tip: "Confidence and ambition are respected. Respect for elders is also a significant cultural pillar.", gift: "High-quality traditional fabric or a modern accessory from a local designer." },
        { country: "Ghana", tip: "Hospitality and politeness (the 'Akwaaba' spirit) are key. Modesty in speech is often appreciated.", gift: "Ethically sourced chocolates or a beautifully bound journal." },
    ]

    const handleSend = (overrideInput?: string) => {
        const textToSend = overrideInput || input
        if (!textToSend.trim()) return
        const newMessages = [...messages, { role: "user", content: textToSend }]
        setMessages(newMessages)
        if (!overrideInput) setInput("")

        // Simulate AI response
        setTimeout(() => {
            let response = "That's a great question! Based on African dating etiquette, I recommend starting with a respectful and genuine compliment about their interests rather than just their appearance."

            if (textToSend.toLowerCase().includes("kenya")) {
                response = "When dating someone from Kenya, respect and family values are central. Showing genuine interest in their community and career aspirations is always a good starting point."
            } else if (textToSend.toLowerCase().includes("gift")) {
                response = "For cultural gifts, small but meaningful items like locally-crafted jewelry, gourmet coffee beans, or tickets to a cultural event are often much more appreciated than expensive generic items."
            } else if (textToSend.toLowerCase().includes("nigeria")) {
                response = "In Nigerian dating culture, showing that you are ambitious and respectful of family traditions is key. Be prepared for lively conversation and don't be afraid to show your sense of humor!"
            }

            setMessages((prev) => [
                ...prev,
                {
                    role: "ai",
                    content: response,
                },
            ])
        }, 1000)
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    size="icon"
                    className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 shadow-lg transition-transform hover:scale-110 active:scale-95 z-50"
                >
                    <Sparkles className="h-6 w-6 text-white" />
                    <span className="sr-only">Open AI Wingman</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col sm:max-w-md">
                <SheetHeader className="border-b pb-4">
                    <div className="flex items-center gap-2">
                        {view === "culture" && (
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setView("chat")}>
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                        )}
                        <SheetTitle className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-rose-500" />
                            {view === "chat" ? "Tekana Wingman" : "Intercultural Guide"}
                        </SheetTitle>
                    </div>
                    <SheetDescription>
                        {view === "chat"
                            ? "Your AI assistant for profile tips and dating advice."
                            : "Navigate cross-cultural dating with confidence."}
                    </SheetDescription>
                </SheetHeader>

                {view === "chat" ? (
                    <>
                        <div className="flex-1 overflow-y-auto py-4 space-y-4">
                            {messages.map((m, i) => (
                                <div
                                    key={i}
                                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${m.role === "user"
                                            ? "bg-rose-500 text-white"
                                            : "bg-muted text-foreground"
                                            }`}
                                    >
                                        {m.content}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4">
                            <div className="grid grid-cols-2 gap-2 mb-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-xs h-auto py-2 flex flex-col items-center gap-1 border-rose-100 hover:bg-rose-50 hover:text-rose-600"
                                    onClick={() => handleSend("Give me an icebreaker")}
                                >
                                    <Lightbulb className="h-4 w-4 text-rose-500" />
                                    Icebreakers
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-xs h-auto py-2 flex flex-col items-center gap-1 border-rose-100 hover:bg-rose-50 hover:text-rose-600"
                                    onClick={() => setView("culture")}
                                >
                                    <Globe className="h-4 w-4 text-rose-500" />
                                    Culture Guide
                                </Button>
                            </div>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Ask anything..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                />
                                <Button size="icon" onClick={() => handleSend()} className="bg-rose-500 hover:bg-rose-600">
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 overflow-y-auto py-4 space-y-6">
                        {CULTURE_TIPS.map((tip) => (
                            <div key={tip.country} className="space-y-3 p-4 rounded-xl border border-rose-100 bg-rose-50/30">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-bold flex items-center gap-2">
                                        <Globe className="h-4 w-4 text-rose-500" /> {tip.country}
                                    </h4>
                                    <Badge className="bg-rose-500">Etiquette</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {tip.tip}
                                </p>
                                <div className="pt-2 border-t border-rose-100/50">
                                    <h5 className="text-[10px] font-bold uppercase tracking-widest text-rose-500 mb-2 flex items-center gap-1">
                                        <Gift className="h-3 w-3" /> Gift Suggestion
                                    </h5>
                                    <p className="text-xs italic text-muted-foreground">{tip.gift}</p>
                                </div>
                            </div>
                        ))}
                        <Button
                            className="w-full bg-gradient-to-r from-rose-500 to-rose-600 shadow-md"
                            onClick={() => {
                                setView("chat");
                                handleSend("Help me choose a gift for someone from Kenya");
                            }}
                        >
                            Ask AI for more countries
                        </Button>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}
