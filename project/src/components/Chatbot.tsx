import React, { useState, useRef, useEffect, useCallback } from "react";
import { Send, Sparkles, X, Loader2, MessageCircle, Phone, Minimize2, Maximize2, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";


// Using the powerful Gemini 1.5 Pro model.
const MODEL_NAME = "gemini-1.5-flash-latest"; 
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`;


// --- TYPES ---
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface MillionDollarChatbotProps {
  companyName?: string;
  companySlogan?: string;
  emergencyPhone?: string;
  initialMessage?: string;
  systemPrompt?: string;
  className?: string;
}

// --- API HELPER ---
const getGeminiResponse = async (history: Message[], systemPrompt: string): Promise<string> => {
  if (!GEMINI_API_KEY) {
    const errorMsg = "Gemini API key not found. Please ensure `VITE_GEMINI_API_KEY` is set in your .env file and that you have restarted the development server.";
    console.error(errorMsg);
    return errorMsg;
  }

  const formattedHistory = history.map(msg => ({
    role: msg.isUser ? "user" : "model",
    parts: [{ text: msg.text }],
  }));

  try {
    const res = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
            { role: "user", parts: [{ text: systemPrompt }] },
            { role: "model", parts: [{ text: "Understood. I am ready to assist." }] },
            ...formattedHistory
        ],
        generationConfig: {
            temperature: 0.7,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
        },
      }
    );
    return (
      res.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm sorry, I'm having trouble connecting right now. Please try again later."
    );
  } catch (err) {
    console.error("Error contacting Gemini API:", err);
    if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 403) {
            return "API Key is invalid or has restrictions. Please check your Google AI Studio settings.";
        }
        if (err.response.status === 404) {
             return "The API endpoint was not found. This might be due to an incorrect model name or region setting.";
        }
    }
    return "My apologies, I encountered a technical issue. Please try your request again in a few moments.";
  }
};


// The rest of the component remains the same.

/**
 * A premium, highly polished chatbot component powered by Google's Gemini API.
 * It features a sleek UI, smooth animations, and intelligent, context-aware conversations.
 */
const MillionDollarChatbot = ({
  companyName = "Premier Moving",
  companySlogan = "Your Premier Choice for a Seamless Move",
  emergencyPhone = "(555) 987-6543",
  initialMessage = "Hi there! I'm the Premier Moving assistant. How can I help with your moving needs today?",
  systemPrompt = `You are a world-class, friendly, and professional customer service assistant for ${companyName}.
Our company specializes in a wide range of residential and commercial moving services. This includes local and long-distance moving, professional packing and unpacking services, secure storage solutions, specialty item transport (e.g., pianos, antiques, art), and full-service corporate relocations.
We are known for our reliability, our team of trained and vetted professional movers, high-quality workmanship, transparent pricing, and our ability to handle last-minute and urgent moves.
Your primary goals are:
1. To be incredibly helpful and answer user questions accurately.
2. To encourage users to take the next step, such as scheduling a move, requesting a free, no-obligation quote, or calling for urgent assistance.
3. To always maintain a positive and professional tone, representing the premium quality of ${companyName}.
For urgent moves or to speak with someone immediately, direct them to call our direct line at ${emergencyPhone}.
When a user wants to schedule, ask for their preferred moving date, and their 'from' and 'to' locations to start the process.`,
  className = ""
}: MillionDollarChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false); // Bubble by default
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showHumanForm, setShowHumanForm] = useState(false);
  const [humanForm, setHumanForm] = useState({ name: '', email: '', message: '' });
  const [humanSubmitted, setHumanSubmitted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if(isOpen && messages.length === 0) {
      setMessages([{
        id: "initial-message",
        text: initialMessage,
        isUser: false,
        timestamp: new Date()
      }]);
    }
  }, [isOpen, initialMessage, messages.length]);


  const quickActions = [
    "Schedule an appointment",
    "Get a quote",
    "Emergency service",
    "Ask about EV chargers"
  ];

  const getBotResponse = useCallback(async (currentMessages: Message[]) => {
    setIsTyping(true);
    const response = await getGeminiResponse(currentMessages, systemPrompt);
    setIsTyping(false);
    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      }
    ]);
  }, [systemPrompt]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim() === "" || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date()
    };
    
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    
    await getBotResponse(newMessages);
  };

  const handleQuickAction = (action: string) => {
     const userMessage: Message = {
      id: Date.now().toString(),
      text: action,
      isUser: true,
      timestamp: new Date()
    };
    
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    
    setTimeout(() => getBotResponse(newMessages), 100);
  };


  // Scroll to bottom on new message, open, or minimize/maximize
  useEffect(() => {
    if (isOpen && !isMinimized) {
      // Wait for DOM update, then scroll
      const timeout = setTimeout(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: messages.length > 1 ? "smooth" : "auto", block: "end" });
        }
      }, 10); // Shorter delay for snappier feel
      return () => clearTimeout(timeout);
    }
  }, [messages, isOpen, isMinimized]);

  // Optional: Scroll to bottom on window resize (for mobile keyboard, etc.)
  useEffect(() => {
    const handleResize = () => {
      if (isOpen && !isMinimized && messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "auto", block: "end" });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, isMinimized]);
  
  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        whileHover={{ scale: 1.1, y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpen}
        className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 hover:bg-blue-700 rounded-full shadow-2xl flex items-center justify-center text-white z-50 transition-colors border-4 border-white"
        aria-label="Open Chat"
      >
        <MessageCircle className="w-8 h-8" />
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed bottom-6 right-6 w-[90vw] sm:w-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-2xl border-2 border-blue-200 flex flex-col z-50 overflow-hidden ${className}`}
        style={{ height: isMinimized ? "auto" : "clamp(320px, 60vh, 500px)" }}
      >
        <header className="sticky top-0 z-20 bg-gradient-to-br from-blue-600 to-indigo-600 p-4 flex items-center justify-between text-white flex-shrink-0 cursor-pointer" onClick={() => setIsMinimized(!isMinimized)}>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center ring-2 ring-white/20">
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">{companyName}</h3>
              <p className="text-indigo-100 text-xs">{companySlogan}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 ml-2" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
              aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>
        
        <div className="bg-blue-100 border-b border-blue-200 p-2 flex-shrink-0">
          <div className="flex items-center justify-center space-x-2 text-blue-700">
            <Phone className="w-4 h-4" />
            <span className="text-sm font-semibold">Emergency? Call <a href={`tel:${emergencyPhone}`} className="underline hover:opacity-80">{emergencyPhone}</a></span>
          </div>
        </div>

        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col flex-1"
            >
              <main className="flex-1 p-4 overflow-y-auto bg-white scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      layout
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className={`flex gap-3 ${msg.isUser ? "justify-end" : "justify-start"}`}
                    >
                      {!msg.isUser && <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex-shrink-0 flex items-center justify-center text-white"><Sparkles size={18}/></div>}
                      <div
                        className={`max-w-[85%] p-3 rounded-2xl shadow-md ${
                          msg.isUser
                            ? "bg-gradient-to-br from-blue-600 to-indigo-500 text-white rounded-br-lg"
                            : "bg-blue-50 text-blue-900 rounded-bl-lg border border-blue-100"
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                        <p className={`text-xs mt-1.5 text-right ${msg.isUser ? "text-blue-100/70" : "text-blue-400"}`}>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                      {msg.isUser && <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-700"><User size={18}/></div>}
                    </motion.div>
                  ))}
                  <AnimatePresence>
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex justify-start gap-3"
                      >
                         <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex-shrink-0 flex items-center justify-center text-white"><Sparkles size={18}/></div>
                        <div className="bg-blue-50 rounded-2xl rounded-bl-lg shadow-md border border-blue-100 p-3">
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]"></span>
                              <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]"></span>
                              <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div ref={messagesEndRef} tabIndex={-1} aria-live="polite" aria-label="End of chat" />
                </div>
              </main>

              <AnimatePresence>
              {messages.length <= 1 && !showHumanForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 bg-blue-50 border-t border-blue-100 flex-shrink-0"
                >
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action) => (
                      <button
                        key={action}
                        onClick={() => handleQuickAction(action)}
                        className="p-2 text-xs bg-white hover:bg-blue-100 rounded-lg border border-blue-200 transition-all text-blue-700 font-medium"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                   <button
                      onClick={() => setShowHumanForm(true)}
                      className="mt-2 w-full p-2 text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-lg border border-yellow-300 font-semibold transition-colors"
                    >
                      Need more help? Talk to a Human
                    </button>
                </motion.div>
              )}
              </AnimatePresence>

              {showHumanForm && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-blue-50 border-t border-blue-100">
                  {humanSubmitted ? (
                    <div className="text-center text-green-600 font-medium">
                      <p>Thank you! A representative will be in touch with you shortly.</p>
                       <button className="mt-2 text-xs text-blue-500 underline" onClick={() => setShowHumanForm(false)}>Back to Chat</button>
                    </div>
                  ) : (
                    <form onSubmit={e => { e.preventDefault(); setHumanSubmitted(true); }} className="space-y-3">
                      <p className="text-sm font-semibold text-blue-900 text-center">Please provide your details.</p>
                      <input className="w-full p-2 rounded-md bg-white border border-blue-200 focus:ring-2 focus:ring-blue-500 outline-none" name="name" placeholder="Your Name" value={humanForm.name} onChange={e => setHumanForm(f => ({ ...f, name: e.target.value }))} required />
                      <input className="w-full p-2 rounded-md bg-white border border-blue-200 focus:ring-2 focus:ring-blue-500 outline-none" name="email" placeholder="Your Email" value={humanForm.email} onChange={e => setHumanForm(f => ({ ...f, email: e.target.value }))} required type="email" />
                      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-md transition-colors">Request Help</button>
                      <button type="button" className="w-full text-center mt-1 text-xs text-blue-500 underline" onClick={() => setShowHumanForm(false)}>Cancel</button>
                    </form>
                  )}
                </motion.div>
              )}

              <footer className="p-3 bg-white border-t border-blue-100 flex-shrink-0">
                <form onSubmit={handleSubmit} className="relative flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full bg-blue-50 border border-blue-200 rounded-full py-3 pl-5 pr-14 text-blue-900 placeholder:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white transition-all"
                  />
                  <button
                    type="submit"
                    disabled={input.trim() === "" || isTyping}
                    className="absolute right-2 rounded-full p-2.5 transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 enabled:hover:scale-110 enabled:hover:shadow-lg enabled:bg-gradient-to-br enabled:from-blue-600 enabled:to-indigo-600"
                    aria-label="Send message"
                  >
                    {isTyping ? (
                      <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5 text-white" />
                    )}
                  </button>
                </form>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};


// --- MAIN COMPONENT ---
export default function ChatBot() {
  return (
    <div className="bg-background text-foreground">
      <MillionDollarChatbot />
    </div>
  );
}
