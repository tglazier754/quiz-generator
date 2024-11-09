'use client';

import { Provider } from "@/components/ui/provider";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider>
            {children}
        </Provider>
    );
}