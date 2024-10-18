'use client'

import React, { ReactNode } from "react"
import { getQueryClient } from "./queryclient"
import { QueryClientProvider } from "@tanstack/react-query"

export function Provider({ children }: { children: ReactNode }) {
    // NOTE: Avoid useState when initializing the query client if you don't
    //       have a suspense boundary between this and the code that may
    //       suspend because React will throw away the client on the initial
    //       render if it suspends and there is no boundary
    const queryClient = getQueryClient()

    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
} 