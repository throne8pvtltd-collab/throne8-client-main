//src/lib/socket/useChatSocket.ts
'use client';

import { useEffect, useRef } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { getSocket, initializeSocket } from './socket.client';
import TokenStorage from '../../lib/store/token.storage';
import {
  socketMessageReceived,
  socketMessageEdited,
  socketMessageDeleted,
  socketReactionUpdated,
  socketUserTyping,
  socketUserStoppedTyping,
  socketUserOnline,
  socketUserOffline,
  socketMemberSessionUpdate,
} from '@/hooks/studyGroup/features/chats/chatSlice';

export const useChatSocket = (groupId: string) => {
  const dispatch = useAppDispatch();
  const joinedRef = useRef(false); 

  useEffect(() => {
    if (!groupId || !TokenStorage.isAuthenticated()) return;
    if (joinedRef.current) return;

    let socket = getSocket();
    if (!socket?.connected) {
      socket = initializeSocket();
    }

    const emitJoinAndFetch = () => {
      socket!.emit('join-group', groupId);
      joinedRef.current = true;

      
      socket!.off('online-users'); 
      socket!.on('online-users', (data: any) => {
        const targetGroupId = data.groupId ?? groupId; 
        const users: string[] = data.users ?? [];
        users.forEach((uid) => {
          dispatch(socketUserOnline({ groupId: targetGroupId, userId: uid }));
        });
      });

      setTimeout(() => {
        socket!.emit('get-online-users', { groupId });
      }, 300); 
      socket!.once('online-users', (data) => {
        console.log('🧪 RAW online-users payload:', JSON.stringify(data));
      });
    };

    
    if (socket.connected) {
      emitJoinAndFetch();
    } else {
      
      console.log('⏳ Waiting for socket connection...');
      socket.once('connect', emitJoinAndFetch);
    }

    
    socket.on('new-message', (message: any) => {
      
      const normalizedMsg = {
        ...message,
        messageId: message.messageId || message._id,
        sender: message.sender?._id || message.sender,
      };
      dispatch(socketMessageReceived({ groupId, message: normalizedMsg }));
    });

    
    socket.on('message-edited', (message: any) => {
      dispatch(socketMessageEdited(message));
    });

    
    socket.on('message-deleted', (data: { messageId: string; deletedBy?: string }) => {
      dispatch(socketMessageDeleted({
        messageId: data.messageId?.toString() || (data as any)._id?.toString(),
        groupId
      }));
    });

    
    socket.on('message-reaction-updated', (data: { messageId: string; reactions: any[] }) => {
      
      dispatch(socketReactionUpdated({ ...data, groupId } as any));
    });

    
    
    socket.on('user-typing', (data: { userId: string; groupId: string }) => {
      const socket = getSocket();
      
      dispatch(socketUserTyping({ groupId, userId: data.userId, name: data.userId }));
    });
    socket.on('user-stopped-typing', (data: { userId: string; groupId: string }) => {
      dispatch(socketUserStoppedTyping({ groupId, userId: data.userId }));
    });

    
    socket.on('user-online', (data: { userId: string }) => {
      console.log('🟢 user-online received:', data); 
      dispatch(socketUserOnline({ groupId, userId: data.userId }));
    });

    socket.on('user-offline', (data: { userId: string }) => {
      dispatch(socketUserOffline({ groupId, userId: data.userId }));
    });

    //member session update listener
    socket.on('member-session-update', (data: { userId: string; groupId: string; elapsedTime: number }) => {
      console.log('⏱️ Member session update:', data);
      dispatch(socketMemberSessionUpdate({
        groupId: data.groupId,
        userId: data.userId,
        elapsedTime: data.elapsedTime
      }));
    });

    return () => {
      socket!.off('connect', emitJoinAndFetch); 
      socket!.emit('leave-group', groupId);
      socket!.off('new-message');
      socket!.off('message-edited');
      socket!.off('message-deleted');
      socket!.off('message-reaction-updated');
      socket!.off('user-typing');
      socket!.off('user-stopped-typing');
      socket!.off('user-online');
      socket!.off('user-offline');
      socket!.off('online-users');
      joinedRef.current = false;
    };
  }, [groupId, dispatch]);

  
  const emitTyping = () => {
    const socket = getSocket();
    if (socket?.connected) socket.emit('typing', { groupId });
  };

  const emitStopTyping = () => {
    const socket = getSocket();
    if (socket?.connected) socket.emit('stop-typing', { groupId });
  };

  return { emitTyping, emitStopTyping };
};

