import { FC } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "routes"
import { ThemeProvider } from "shared/contexts"
import { LayoutBase } from "shared/layouts"


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
        }
    }
})

export const AppMain: FC = () => {

    return (
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <LayoutBase>
                        <AppRoutes />
                    </LayoutBase>
                </BrowserRouter>
            </QueryClientProvider>
        </ThemeProvider>
    )

}
