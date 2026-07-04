"use client";

import { useState } from "react";
import { X, Lock, Send, Clock } from "lucide-react";
import { MyRequestsResponse } from "@/lib/api/studyGroup.service";

interface JoinGroupModalProps {
  group: { groupId: string; title: string; visibility: string };
  onClose: () => void;
  onJoin: (joinCode: string) => Promise<void>;
  onRequest: (message: string) => Promise<void>;
  isLoading: boolean;
  existingRequest?: MyRequestsResponse | null; // ADD
}


export default function JoinGroupModal({
  group, onClose, onJoin, onRequest, isLoading, existingRequest
}: JoinGroupModalProps) {
  const [joinCode, setJoinCode] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'code' | 'request'>('code');
  const [requested, setRequested] = useState(false);
  // State add karo component ke andar
  const [requestMessage, setRequestMessage] = useState('');

  const handleJoin = async () => {
    if (joinCode.length !== 8) {
      setError('Join code must be 8 characters');
      return;
    }
    setError('');
    try {
      await onJoin(joinCode.toUpperCase());
    } catch (err: any) {
      setError(err.message || 'Invalid join code');
    }
  };

  const handleRequest = async () => {
    setError('');
    try {
      await onRequest(requestMessage); // message pass karo
      setRequested(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send request');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/60 w-full max-w-md p-6">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8b7355] hover:text-[#4a3728] transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-gradient-to-br from-[#8b7355] to-[#6b5847] rounded-xl flex items-center justify-center">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#4a3728]">Private Group</h2>
            <p className="text-xs text-[#8b7355]">{group.title}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-5 bg-[#f6ede8] rounded-xl p-1">
          <button
            onClick={() => setMode('code')}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${mode === 'code'
              ? 'bg-white text-[#4a3728] shadow-sm'
              : 'text-[#8b7355]'
              }`}
          >
            Enter Join Code
          </button>
          <button
            onClick={() => setMode('request')}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${mode === 'request'
              ? 'bg-white text-[#4a3728] shadow-sm'
              : 'text-[#8b7355]'
              }`}
          >
            Request Access
          </button>
        </div>

        {/* Code Mode */}
        {mode === 'code' && (
          <div className="space-y-4">
            <p className="text-sm text-[#6b5847]">
              Enter the 8-character join code shared by the group leader.
            </p>
            <input
              type="text"
              maxLength={8}
              value={joinCode}
              onChange={(e) => {
                setJoinCode(e.target.value.toUpperCase());
                setError('');
              }}
              placeholder="e.g. ABC12XYZ"
              className="w-full px-4 py-3 rounded-xl border-2 border-[#e0d8cf] bg-white/80 text-[#4a3728] placeholder-[#c4b5a5] font-mono text-center tracking-[0.3em] text-lg focus:outline-none focus:border-[#8b7355] transition-colors uppercase"
            />
            {error && (
              <p className="text-red-500 text-xs text-center">{error}</p>
            )}
            <button
              onClick={handleJoin}
              disabled={isLoading || joinCode.length !== 8}
              className="w-full bg-gradient-to-r from-[#8b7355] to-[#6b5847] hover:from-[#6b5847] hover:to-[#4a3728] disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold text-sm shadow-lg transition-all duration-300"
            >
              {isLoading ? 'Joining...' : 'Join Group'}
            </button>
          </div>
        )}

        {/* Request Mode */}
        {mode === 'request' && (
          <div className="space-y-4">
            {/* Already requested — show status */}
            {existingRequest && existingRequest.status === 'pending' ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
                <p className="text-[#4a3728] font-semibold">Request Already Sent</p>
                <p className="text-sm text-[#8b7355]">
                  Your request is pending. The group leader will review it soon.
                </p>
                {existingRequest.message && (
                  <div className="bg-[#f6ede8] rounded-xl px-4 py-3 text-sm text-[#6b5847] italic text-left border border-[#e0d8cf]">
                    Your message: "{existingRequest.message}"
                  </div>
                )}
                <p className="text-xs text-[#a89080]">
                  Sent on {new Date(existingRequest.createdAt).toLocaleDateString()}
                </p>
              </div>
            ) : existingRequest && existingRequest.status === 'rejected' ? (
              /* Rejected — allow re-request */
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <p className="text-sm text-red-600 font-semibold">Previous request was rejected</p>
                  {existingRequest.rejectionReason && (
                    <p className="text-xs text-red-500 mt-1">
                      Reason: {existingRequest.rejectionReason}
                    </p>
                  )}
                </div>
                <p className="text-sm text-[#6b5847]">
                  You can send a new request with a different message.
                </p>
                <textarea
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  placeholder="Add a message for the leader (optional)..."
                  maxLength={500}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#e0d8cf] bg-white/80 text-[#4a3728] placeholder-[#c4b5a5] text-sm focus:outline-none focus:border-[#8b7355] transition-colors resize-none"
                />
                <p className="text-xs text-[#a89080] text-right">{requestMessage.length}/500</p>
                {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                <button
                  onClick={handleRequest}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#8b7355] to-[#6b5847] hover:from-[#6b5847] hover:to-[#4a3728] disabled:opacity-50 text-white py-3 rounded-xl font-semibold text-sm shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  {isLoading ? 'Sending...' : 'Send New Request'}
                </button>
              </div>
            ) : requested ? (
              /* Just sent */
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Send className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-[#4a3728] font-semibold">Request Sent!</p>
                <p className="text-sm text-[#8b7355] mt-1">
                  The group leader will review your request.
                </p>
              </div>
            ) : (
              /* Fresh request */
              <>
                <p className="text-sm text-[#6b5847]">
                  Don't have a join code? Send a request to the group leader.
                </p>
                <textarea
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  placeholder="Add a message for the leader (optional)..."
                  maxLength={500}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#e0d8cf] bg-white/80 text-[#4a3728] placeholder-[#c4b5a5] text-sm focus:outline-none focus:border-[#8b7355] transition-colors resize-none"
                />
                <p className="text-xs text-[#a89080] text-right">{requestMessage.length}/500</p>
                {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                <button
                  onClick={handleRequest}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#8b7355] to-[#6b5847] hover:from-[#6b5847] hover:to-[#4a3728] disabled:opacity-50 text-white py-3 rounded-xl font-semibold text-sm shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  {isLoading ? 'Sending...' : 'Send Request to Leader'}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}