'use client';

import { useState, useMemo, useCallback } from 'react';
import { markMessageRead } from '@/features/company/store/slices/inboxSlice';
import MessageRow from '@/features/company/components/inbox/MessageRow';
import ChatThread from '@/features/company/components/inbox/ChatThread';
import ChatInput from '@/features/company/components/inbox/ChatInput';
import { useAppDispatch, useAppSelector } from '@/core/store/store.hooks';
import { AUTO_REPLIES, AVATAR_COLORS, FULL_CONTACTS, SEED } from '@/features/company/constants/data';
import { ChatMessage, Contact } from '@/features/company/interface';



export default function InboxPage() {
  const dispatch = useAppDispatch();
  // Line — sliceMessages
  const sliceMessages = useAppSelector(s => s.inbox?.messages ?? []);

  const contacts = useMemo<Contact[]>(() => {
    const readMap = Object.fromEntries(sliceMessages.map(m => [m.id, m.read]));
    return FULL_CONTACTS.map(c => ({ ...c, read: readMap[c.id] ?? c.read }));
  }, [sliceMessages]);

  const [selectedId, setSelectedId] = useState('1');
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [conversations, setConversations] = useState<Record<string, ChatMessage[]>>(SEED);
  // FIX: per-contact typing indicator — string contactId instead of boolean
  const [typingFor, setTypingFor] = useState<string | null>(null);
  // Live previews that update as messages are sent/received
  const [previews, setPreviews] = useState<Record<string, { text: string; time: string }>>({});

  const selected = useMemo(() => contacts.find(c => c.id === selectedId) ?? contacts[0], [contacts, selectedId]);
  const unreadCount = useMemo(() => contacts.filter(c => !c.read).length, [contacts]);
  const filtered = useMemo(() => {
    const list = filter === 'all' ? contacts : contacts.filter(c => !c.read);
    return list.map(c => previews[c.id] ? { ...c, preview: previews[c.id].text, time: previews[c.id].time } : c);
  }, [filter, contacts, previews]);
  const thread = useMemo(() => conversations[selectedId] ?? [], [conversations, selectedId]);
  const isTyping = typingFor === selectedId;

  const selectContact = useCallback((contact: Contact) => {
    setSelectedId(contact.id);
    dispatch(markMessageRead(contact.id));
  }, [dispatch]);

  const markAllRead = useCallback(() => {
    contacts.forEach(c => { if (!c.read) dispatch(markMessageRead(c.id)); });
  }, [dispatch, contacts]);

  const handleSend = useCallback((msg: Omit<ChatMessage, 'id' | 'time'>) => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg: ChatMessage = { ...msg, id: Date.now().toString(), time: now };

    setConversations(prev => ({ ...prev, [selectedId]: [...(prev[selectedId] ?? []), newMsg] }));

    const previewText = msg.type === 'text' ? (msg.text ?? '')
      : msg.type === 'emoji' ? (msg.emoji ?? '')
        : msg.type === 'image' ? '📷 Photo'
          : '📎 Document';
    setPreviews(prev => ({ ...prev, [selectedId]: { text: `You: ${previewText}`, time: 'now' } }));

    // Simulate reply — bound to specific contactId so switching contacts doesn't corrupt
    if (msg.type === 'text' || msg.type === 'emoji') {
      const contactId = selectedId;
      setTypingFor(contactId);
      setTimeout(() => {
        setTypingFor(prev => prev === contactId ? null : prev);
        const replyText = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
        const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const reply: ChatMessage = { id: (Date.now() + 1).toString(), from: 'them', type: 'text', text: replyText, time: replyTime };
        setConversations(prev => ({ ...prev, [contactId]: [...(prev[contactId] ?? []), reply] }));
        setPreviews(prev => ({ ...prev, [contactId]: { text: replyText, time: 'now' } }));
      }, 1500 + Math.random() * 2000);
    }
  }, [selectedId]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: 'calc(100vh - 130px)', minHeight: '560px' }}>

      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-[#4a3728]">Inbox</h1>
          <p className="text-sm text-[#4a3728]/60 mt-0.5">
            {unreadCount > 0
              ? <><span className="font-semibold text-[#4a3728]">{unreadCount} unread</span> messages</>
              : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead}
            className="text-xs font-semibold text-[#4a3728] bg-[#e0d8cf] px-3 py-1.5 rounded-lg hover:bg-[#4a3728] hover:text-[#f6ede8] transition-all duration-200">
            Mark all read
          </button>
        )}
      </div>

      {/* Chat container — flex row, fills all remaining space */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0, border: '1px solid #e0d8cf', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>

        {/* Left: contact list */}
        <div style={{ width: '280px', flexShrink: 0, display: 'flex', flexDirection: 'column', minHeight: 0, background: '#f6ede8', borderRight: '1px solid #e0d8cf' }}>
          <div className="flex gap-1 p-3 border-b border-[#e0d8cf] bg-[#e0d8cf]/30 flex-shrink-0">
            {(['all', 'unread'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-200
                  ${filter === f ? 'bg-[#4a3728] text-[#f6ede8]' : 'text-[#4a3728]/60 hover:text-[#4a3728]'}`}>
                {f === 'unread' && unreadCount > 0 ? `Unread (${unreadCount})` : f}
              </button>
            ))}
          </div>
          {/* FIX: overflow-y-auto with flex-1 + min-height-0 = actual scrollable list */}
          <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
            {filtered.length === 0
              ? <div className="flex items-center justify-center h-24 text-sm text-[#4a3728]/40">No messages</div>
              : filtered.map(c => (
                <MessageRow key={c.id} msg={c} isSelected={selected?.id === c.id} onSelect={selectContact} />
              ))}
          </div>
        </div>

        {/* Right: chat panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, minWidth: 0, background: '#faf5f1' }}>

          {/* Chat header */}
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-[#e0d8cf] bg-[#f6ede8] flex-shrink-0">
            <div className="relative flex-shrink-0">
              <div className={`w-10 h-10 ${AVATAR_COLORS[selected?.avatar ?? ''] ?? 'bg-gray-400'} rounded-xl flex items-center justify-center text-white text-sm font-bold`}>
                {selected?.avatar}
              </div>
              {selected?.online && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#f6ede8]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#4a3728] truncate">{selected?.from}</p>
              <p className="text-xs">
                {isTyping
                  ? <span className="text-[#4a3728] font-medium animate-pulse">typing...</span>
                  : selected?.online
                    ? <span className="text-green-600 font-semibold">● Online</span>
                    : <span className="text-[#4a3728]/50">Last seen {selected?.lastSeen}</span>}
              </p>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button className="p-2 rounded-xl hover:bg-[#e0d8cf] text-[#4a3728]/50 hover:text-[#4a3728] transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="p-2 rounded-xl hover:bg-[#e0d8cf] text-[#4a3728]/50 hover:text-[#4a3728] transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
                </svg>
              </button>
            </div>
          </div>

          {/* Thread — must have flex:1 + minHeight:0 for scroll to work */}
          <ChatThread thread={thread} isTyping={isTyping} selected={selected} />

          {/* Input — flex-shrink:0 keeps it pinned to bottom */}
          <div style={{ flexShrink: 0 }}>
            <ChatInput onSend={handleSend} contactName={selected?.from ?? ''} />
          </div>
        </div>
      </div>
    </div>
  );
}