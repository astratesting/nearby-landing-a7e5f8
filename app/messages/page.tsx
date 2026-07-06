"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export const dynamic = "force-dynamic";

export default function MessagesPage() {

interface Conversation {
  otherUser: { id: string; name: string };
  listingId: string | null;
  listingTitle: string | null;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

interface Message {
  id: string;
  content: string;
  senderId: string;
  read: boolean;
  createdAt: string;
  sender: { id: string; name: string };
}

function MessagesContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialUserId = searchParams.get("user");
  const initialListingId = searchParams.get("listing");

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeUser, setActiveUser] = useState<{ id: string; name: string } | null>(null);
  const [activeListingId, setActiveListingId] = useState<string | null>(initialListingId);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?return=/messages");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user?.id) {
      fetch("/api/messages")
        .then((r) => r.json())
        .then((data) => {
          if (Array.isArray(data)) setConversations(data);
          setLoading(false);
        });
    }
  }, [session]);

  useEffect(() => {
    if (initialUserId && session?.user?.id) {
      selectConversation(initialUserId, initialListingId);
    }
  }, [initialUserId, session]);

  async function selectConversation(userId: string, listingId?: string | null) {
    const params = new URLSearchParams();
    if (listingId) params.set("listingId", listingId);

    const res = await fetch(`/api/messages/${userId}?${params}`);
    const data = await res.json();
    setMessages(data.messages || []);
    setActiveUser(data.otherUser);
    setActiveListingId(listingId || null);

    // Mark as read
    await fetch(`/api/messages/${userId}`, { method: "PATCH" });
    refreshConversations();
  }

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!newMessage.trim() || !activeUser) return;

    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: newMessage,
        receiverId: activeUser.id,
        listingId: activeListingId,
      }),
    });

    if (res.ok) {
      const msg = await res.json();
      setMessages((prev) => [...prev, msg]);
      setNewMessage("");
      refreshConversations();
    }
  }

  async function refreshConversations() {
    const res = await fetch("/api/messages");
    const data = await res.json();
    if (Array.isArray(data)) setConversations(data);
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-warm-white flex items-center justify-center">
        <p className="text-product-charcoal/40 font-source-sans">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="font-manrope text-3xl font-bold text-product-charcoal mb-8">Messages</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Conversation list */}
          <div className="md:col-span-1 bg-white rounded-xl border border-product-charcoal/5 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-product-charcoal/5">
              <h2 className="font-manrope font-semibold text-sm text-product-charcoal">Conversations</h2>
            </div>
            <div className="divide-y divide-product-charcoal/5 max-h-[500px] overflow-y-auto">
              {conversations.length === 0 ? (
                <div className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-violet/10 flex items-center justify-center mx-auto mb-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-product-charcoal/40 font-source-sans">No conversations yet</p>
                  <p className="text-xs text-product-charcoal/25 mt-1 font-source-sans">Contact a seller to start chatting</p>
                </div>
              ) : (
                conversations.map((conv) => (
                  <button
                    key={`${conv.otherUser.id}_${conv.listingId}`}
                    onClick={() => selectConversation(conv.otherUser.id, conv.listingId)}
                    className={`w-full text-left p-4 hover:bg-violet/5 transition-colors ${
                      activeUser?.id === conv.otherUser.id ? "bg-violet/5 border-l-2 border-l-violet" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet/30 to-coral/30 flex items-center justify-center text-product-charcoal font-bold font-manrope text-xs flex-shrink-0">
                        {conv.otherUser.name?.[0]?.toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-manrope font-semibold text-sm text-product-charcoal truncate">
                            {conv.otherUser.name}
                          </span>
                          {conv.unreadCount > 0 && (
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-violet text-white text-[10px] font-bold font-manrope flex items-center justify-center">
                              {conv.unreadCount}
                            </span>
                          )}
                        </div>
                        {conv.listingTitle && (
                          <p className="text-[11px] text-violet/60 font-source-sans truncate">Re: {conv.listingTitle}</p>
                        )}
                        <p className="text-xs text-product-charcoal/40 font-source-sans truncate mt-0.5">{conv.lastMessage}</p>
                        <p className="text-[10px] text-product-charcoal/25 font-source-sans mt-0.5">
                          {formatDistanceToNow(new Date(conv.lastMessageAt), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Message thread */}
          <div className="md:col-span-2 bg-white rounded-xl border border-product-charcoal/5 shadow-sm flex flex-col h-[500px]">
            {activeUser ? (
              <>
                <div className="p-4 border-b border-product-charcoal/5 flex items-center justify-between">
                  <div>
                    <h2 className="font-manrope font-semibold text-sm text-product-charcoal">{activeUser.name}</h2>
                    {activeListingId && (
                      <Link href={`/listings/${activeListingId}`} className="text-[11px] text-violet/60 hover:text-violet font-source-sans">
                        View listing
                      </Link>
                    )}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((msg) => {
                    const isMine = msg.senderId === session?.user?.id;
                    return (
                      <div key={msg.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                          isMine ? "bg-violet text-white" : "bg-warm-white text-product-charcoal"
                        }`}>
                          <p className="text-sm font-source-sans leading-relaxed">{msg.content}</p>
                          <p className={`text-[10px] mt-1 font-source-sans ${isMine ? "text-white/50" : "text-product-charcoal/30"}`}>
                            {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={sendMessage} className="p-4 border-t border-product-charcoal/5 flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2.5 bg-warm-white border border-product-charcoal/10 rounded-xl text-sm font-source-sans focus:border-violet focus:ring-2 focus:ring-violet/10 outline-none transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="px-4 py-2.5 bg-violet text-white text-sm font-semibold font-manrope rounded-xl hover:bg-violet/90 transition-colors disabled:opacity-50"
                  >
                    Send
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-16 h-16 rounded-full bg-violet/10 flex items-center justify-center mx-auto mb-4">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                  </div>
                  <p className="font-manrope text-lg text-product-charcoal/40 mb-2">Select a conversation</p>
                  <p className="font-source-sans text-sm text-product-charcoal/30">Choose a conversation from the list or contact a seller to start one.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}