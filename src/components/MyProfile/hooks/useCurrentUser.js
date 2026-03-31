import { useQuery } from "@tanstack/react-query";
import { getCurrentUserQueryFn } from "@/lib/api";

export const useCurrentUser = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["currentUser"],
        queryFn: getCurrentUserQueryFn,
        staleTime: 1000 * 60 * 5,
    });

    const user = data?.user ?? null;

    return { user, isLoading, isError };
};