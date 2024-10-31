'use client';

import { Provider } from '@/components/ui/provider';
import { defaultSystem } from "@chakra-ui/react"

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider>
            {children}
        </Provider>
    );
}