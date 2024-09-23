import { io } from 'socket.io-client';

export const socketConfig = io(process.env.NEXT_PUBLIC_QUICKJOBS_ENDPOINT);