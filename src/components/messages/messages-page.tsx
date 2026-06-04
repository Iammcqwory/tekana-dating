import React, { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Send, Image, Smile, MoreVertical, Phone, VideoIcon } from "lucide-react"
import { format } from "date-fns"

// Mock data for conversations
const MOCK_CONVERSATIONS = [
  {
    id: "1",
    user: {
      id: "user1",
      name: "Sarah Johnson",
      avatar: "",
      online: true,
      lastSeen: new Date(),
    },
    messages: [
      {
        id: "m1",
        content: "Hi there! I noticed we both enjoy hiking. What's your favorite trail?",
        sender: "user1",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      },
      {
        id: "m2",
        content: "Hey Sarah! Nice to meet you. I love Mount Kenya trails. Have you been there?",
        sender: "me",
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      },
      {
        id: "m3",
        content: "Yes, I went there last summer! The views were breathtaking. We should go sometime.",
        sender: "user1",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      },
    ],
  },
  {
    id: "2",
    user: {
      id: "user2",
      name: "David Kimani",
      avatar: "",
      online: false,
      lastSeen: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    },
    messages: [
      {
        id: "m4",
        content: "Hello! I see you're interested in photography too. What kind of camera do you use?",
        sender: "user2",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      },
      {
        id: "m5",
        content: "Hi David! I have a Canon EOS R6. What about you?",
        sender: "me",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23), // 23 hours ago
      },
    ],
  },
  {
    id: "3",
    user: {
      id: "user3",
      name: "Grace Mwangi",
      avatar: "",
      online: true,
      lastSeen: new Date(),
    },
    messages: [
      {
        id: "m6",
        content: "Would you like to join me for coffee this weekend?",
        sender: "user3",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      },
    ],
  },
];

export function MessagesPage() {
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);
  const [activeConversation, setActiveConversation] = useState<typeof MOCK_CONVERSATIONS[0] | null>(conversations[0]);
  const [messageInput, setMessageInput] = useState("");

  const handleSendMessage = () => {
    if (!messageInput.trim() || !activeConversation) return;

    const newMessage = {
      id: `m${Math.random().toString(36).substring(2, 9)}`,
      content: messageInput,
      sender: "me",
      timestamp: new Date(),
    };

    const updatedConversation = {
      ...activeConversation,
      messages: [...activeConversation.messages, newMessage],
    };

    setActiveConversation(updatedConversation);
    setConversations(
      conversations.map((conv) =>
        conv.id === activeConversation.id ? updatedConversation : conv
      )
    );

    setMessageInput("");
  };

  const formatTime = (date: Date) => {
    return format(date, "h:mm a");
  };

  const getLastMessage = (conversation: typeof conversations[0]) => {
    return conversation.messages[conversation.messages.length - 1];
  };

  return (
    <div className="container mx-auto h-[calc(100vh-16rem)] max-w-screen-xl overflow-hidden">
      <div className="flex h-full border-t">
        {/* Conversation List */}
        <div className="w-full border-r md:w-1/3 lg:w-1/4">
          <div className="flex h-16 items-center justify-between border-b p-4">
            <h2 className="text-xl font-semibold">Messages</h2>
            <button className="rounded-full p-2 text-muted-foreground hover:bg-muted">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>

          <div className="p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search conversations"
              />
            </div>
          </div>

          <div className="h-[calc(100%-8rem)] overflow-y-auto">
            {conversations.map((conversation) => {
              const lastMessage = getLastMessage(conversation);
              return (
                <div
                  key={conversation.id}
                  className={`flex cursor-pointer gap-3 border-b p-4 transition-colors hover:bg-muted/50 ${
                    activeConversation?.id === conversation.id ? "bg-muted" : ""
                  }`}
                  onClick={() => setActiveConversation(conversation)}
                >
                  <div className="relative flex-shrink-0">
                    <Avatar>
                      <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {conversation.user.online && (
                      <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-background" />
                    )}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{conversation.user.name}</h4>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(lastMessage.timestamp)}
                      </span>
                    </div>
                    <p className="truncate text-sm text-muted-foreground">
                      {lastMessage.sender === "me" ? "You: " : ""}
                      {lastMessage.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Conversation */}
        {activeConversation ? (
          <div className="hidden flex-1 flex-col md:flex">
            <div className="flex h-16 items-center justify-between border-b p-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{activeConversation.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{activeConversation.user.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {activeConversation.user.online
                      ? "Online"
                      : `Last seen ${format(activeConversation.user.lastSeen, "h:mm a")}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="rounded-full p-2 text-muted-foreground hover:bg-muted">
                  <Phone className="h-5 w-5" />
                </button>
                <button className="rounded-full p-2 text-muted-foreground hover:bg-muted">
                  <VideoIcon className="h-5 w-5" />
                </button>
                <button className="rounded-full p-2 text-muted-foreground hover:bg-muted">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {activeConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "me" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs rounded-lg p-3 ${
                        message.sender === "me"
                          ? "bg-rose-500 text-white"
                          : "bg-muted"
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className={`mt-1 text-right text-xs ${
                        message.sender === "me"
                          ? "text-rose-200"
                          : "text-muted-foreground"
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t p-4">
              <div className="flex gap-2">
                <button className="rounded-full p-2 text-muted-foreground hover:bg-muted">
                  <Image className="h-5 w-5" />
                </button>
                <button className="rounded-full p-2 text-muted-foreground hover:bg-muted">
                  <Smile className="h-5 w-5" />
                </button>
                <div className="relative flex-1">
                  <Input
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage();
                      }
                    }}
                  />
                </div>
                <Button
                  size="icon"
                  className="h-10 w-10 rounded-full bg-rose-500 hover:bg-rose-600"
                  onClick={handleSendMessage}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden flex-1 items-center justify-center md:flex">
            <div className="text-center">
              <h3 className="mb-2 text-xl font-medium">Select a conversation</h3>
              <p className="text-muted-foreground">
                Choose a conversation from the list to start chatting
              </p>
            </div>
          </div>
        )}

        {/* Mobile: Show empty state or conversation based on selection */}
        <div className="flex flex-1 flex-col md:hidden">
          {activeConversation ? (
            <>
              <div className="flex h-16 items-center justify-between border-b p-4">
                <div className="flex items-center gap-3">
                  <button
                    className="mr-2"
                    onClick={() => setActiveConversation(null)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <Avatar>
                    <AvatarFallback>{activeConversation.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{activeConversation.user.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {activeConversation.user.online
                        ? "Online"
                        : `Last seen ${format(activeConversation.user.lastSeen, "h:mm a")}`}
                    </p>
                  </div>
                </div>
                <button className="rounded-full p-2 text-muted-foreground hover:bg-muted">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {activeConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "me" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs rounded-lg p-3 ${
                          message.sender === "me"
                            ? "bg-rose-500 text-white"
                            : "bg-muted"
                        }`}
                      >
                        <p>{message.content}</p>
                        <p className={`mt-1 text-right text-xs ${
                          message.sender === "me"
                            ? "text-rose-200"
                            : "text-muted-foreground"
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t p-4">
                <div className="flex gap-2">
                  <button className="rounded-full p-2 text-muted-foreground hover:bg-muted">
                    <Image className="h-5 w-5" />
                  </button>
                  <div className="relative flex-1">
                    <Input
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>
                  <Button
                    size="icon"
                    className="h-10 w-10 rounded-full bg-rose-500 hover:bg-rose-600"
                    onClick={handleSendMessage}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-4">
              <h2 className="mb-4 text-xl font-semibold">Messages</h2>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-9"
                  placeholder="Search conversations"
                />
              </div>

              {conversations.map((conversation) => {
                const lastMessage = getLastMessage(conversation);
                return (
                  <div
                    key={conversation.id}
                    className="flex cursor-pointer gap-3 border-b p-4 transition-colors hover:bg-muted/50"
                    onClick={() => setActiveConversation(conversation)}
                  >
                    <div className="relative flex-shrink-0">
                      <Avatar>
                        <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {conversation.user.online && (
                        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-background" />
                      )}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{conversation.user.name}</h4>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(lastMessage.timestamp)}
                        </span>
                      </div>
                      <p className="truncate text-sm text-muted-foreground">
                        {lastMessage.sender === "me" ? "You: " : ""}
                        {lastMessage.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
