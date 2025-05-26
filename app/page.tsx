"use client"

import { useChat } from "ai/react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { MessageSquare, Plus, Settings, User, TrendingUp, FolderOpen, MoreHorizontal, Send, Cross } from "lucide-react"

interface Conversation {
  id: string
  title: string
  lastMessage: string
  timestamp: string
}

interface Project {
  id: string
  name: string
  description: string
}

export default function CatholicChatEngine() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
  const [isTemporaryChat, setIsTemporaryChat] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [/*showTemporaryModal,*/ setShowTemporaryModal] = useState(false)

  // Mock data for conversations
  const conversations: Conversation[] = [
    {
      id: "1",
      title: "Understanding the Trinity",
      lastMessage: "Thank you for explaining...",
      timestamp: "2 hours ago",
    },
    { id: "2", title: "Saints and Intercession", lastMessage: "How do saints intercede...", timestamp: "1 day ago" },
    { id: "3", title: "Catholic Social Teaching", lastMessage: "What are the principles...", timestamp: "3 days ago" },
    { id: "4", title: "Mass and Eucharist", lastMessage: "Explain transubstantiation...", timestamp: "1 week ago" },
  ]

  // Mock data for projects
  const projects: Project[] = [
    { id: "1", name: "Bible Study Guide", description: "Comprehensive study materials" },
    { id: "2", name: "Saint Biographies", description: "Lives of the saints research" },
    { id: "3", name: "Catechism Summary", description: "Key teachings compilation" },
  ]

  // Mock trending topics
  const trendingTopics = [
    "Advent Preparation",
    "Pope Francis Teachings",
    "Catholic Marriage",
    "Lenten Practices",
    "Marian Devotions",
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed lg:relative lg:translate-x-0 w-80 lg:w-80 h-full transition-transform duration-300 bg-gray-900 text-white flex flex-col z-50 lg:z-auto`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Cross className="h-6 w-6" />
              Catholic AI
            </h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-white lg:hidden"
            >
              ×
            </Button>
          </div>
          <Button className="w-full mt-3 bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 h-10">
            <Plus className="h-4 w-4 mr-2" />
            New Conversation
          </Button>
        </div>

        {/* Navigation Sections */}
        <ScrollArea className="flex-1 p-4">
          {/* Trending */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Trending Topics
            </h3>
            <div className="space-y-2">
              {trendingTopics.map((topic, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-gray-800 hover:bg-gray-700 cursor-pointer transition-colors text-sm min-h-[44px] flex items-center"
                >
                  {topic}
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-gray-700 mb-6" />

          {/* Projects */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
              <FolderOpen className="h-4 w-4" />
              Projects
            </h3>
            <div className="space-y-2">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="p-3 rounded-lg bg-gray-800 hover:bg-gray-700 cursor-pointer transition-colors min-h-[44px]"
                >
                  <div className="font-medium text-sm">{project.name}</div>
                  <div className="text-xs text-gray-400">{project.description}</div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-gray-700 mb-6" />

          {/* Recent Conversations */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Recent Conversations
            </h3>
            <div className="space-y-2">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className="p-3 rounded-lg bg-gray-800 hover:bg-gray-700 cursor-pointer transition-colors min-h-[44px] flex items-center"
                >
                  <div className="font-medium text-sm truncate">{conv.title}</div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-gray-700 mb-6" />
        </ScrollArea>

        {/* Account Section */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 cursor-pointer transition-colors min-h-[44px]">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm">John Doe</div>
              <div className="text-xs text-gray-400">Premium Member</div>
            </div>
            <MoreHorizontal className="h-4 w-4 text-gray-400" />
          </div>
          <Button variant="ghost" className="w-full mt-2 text-gray-400 hover:text-white justify-start h-10">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="mr-4 lg:hidden h-10 w-10 p-0"
          >
            ☰
          </Button>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-gray-800 truncate">
              {isTemporaryChat ? "Temporary Chat" : "Catholic AI Assistant"}
            </h2>
            <p className="text-sm text-gray-600 hidden sm:block">
              Ask questions about Catholic faith, doctrine, and traditions
            </p>
          </div>

          {/* Temporary Chat Dotted Bubble */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsTemporaryChat(!isTemporaryChat)}
              className={`ml-2 w-10 h-10 rounded-full border-2 border-dashed ${
                isTemporaryChat
                  ? "border-orange-400 bg-orange-50 hover:bg-orange-100"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              }`}
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4 lg:p-6 relative">
          {isTemporaryChat && (
            <div className="absolute inset-0 bg-orange-50/30 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4">
                <div className="text-orange-300 text-4xl lg:text-6xl font-light mb-4">Temporary Chat</div>
                <div className="text-orange-400 text-sm max-w-md">
                  This conversation won't be saved to your history and will be deleted when you end your session
                </div>
              </div>
            </div>
          )}

          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-10 lg:mt-20 relative z-10">
              {!isTemporaryChat && (
                <>
                  <Cross className="h-12 w-12 lg:h-16 lg:w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg lg:text-xl font-semibold mb-2">Welcome to Catholic AI</h3>
                  <p className="text-gray-600 max-w-lg mx-auto px-4">
                    This tool uses AI to help you quickly find clear, accurate answers to your questions about the
                    Catholic faith. Every response is drawn only from the Bible, the Catechism of the Catholic Church,
                    and other trusted Catholic sources — nothing is generated or invented. The AI simply helps locate
                    and organize what the Church already teaches.
                  </p>
                  <div className="mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 max-w-2xl mx-auto px-4">
                    <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer min-h-[80px]">
                      <h4 className="font-medium mb-2">Scripture Questions</h4>
                      <p className="text-sm text-gray-600">Ask about biblical passages, interpretations, and context</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer min-h-[80px]">
                      <h4 className="font-medium mb-2">Catholic Doctrine</h4>
                      <p className="text-sm text-gray-600">Learn about Church teachings and theological concepts</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer min-h-[80px]">
                      <h4 className="font-medium mb-2">Saints & Traditions</h4>
                      <p className="text-sm text-gray-600">Discover the lives of saints and Catholic traditions</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer min-h-[80px]">
                      <h4 className="font-medium mb-2">Spiritual Guidance</h4>
                      <p className="text-sm text-gray-600">
                        Get help with prayer, spiritual growth, and faith questions
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-4 lg:space-y-6 relative z-10">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 lg:gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Cross className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] lg:max-w-3xl p-3 lg:p-4 rounded-lg ${
                      message.role === "user" ? "bg-blue-600 text-white" : "bg-white border border-gray-200"
                    }`}
                  >
                    <div className="prose prose-sm max-w-none text-sm lg:text-base">{message.content}</div>
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 lg:gap-4 justify-start">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Cross className="h-4 w-4 text-white" />
                  </div>
                  <div className="max-w-[85%] lg:max-w-3xl p-3 lg:p-4 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4">
          {isTemporaryChat && (
            <div className="max-w-4xl mx-auto mb-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center gap-2 text-orange-800">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm font-medium">Temporary chat</span>
                <span className="text-xs text-orange-600 hidden sm:inline">- This conversation won't be saved</span>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="flex gap-2 lg:gap-3 items-end">
              <div className="flex-1 relative">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask about Catholic faith, doctrine, saints, or scripture..."
                  className="pr-12 py-3 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[44px]"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 h-8 w-8 p-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
