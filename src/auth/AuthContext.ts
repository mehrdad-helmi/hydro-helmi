import type { AuthState } from '@/types';
import { createContext } from 'react';

export const AuthCtx = createContext<AuthState | null>(null);
