import { useMemo } from 'react';
import { useQueries, UseQueryResult } from '@tanstack/react-query';
import { LegislatorBillSupport, Legislator } from '../types/api/legislator';
import {
    fetchLegislatorSupportedBills,
    fetchLegislatorOpposedBills,
} from '../services/api'; 

const STALE_TIME = 10 * 60 * 1000; 

export interface LegislatorVoteCountsResult {
    supportedCount: number;
    opposedCount: number;
}

export const useLegislatorVoteQueries = (
    legislators: Legislator[] | undefined,
    initiallyEnabled: boolean = true
): UseQueryResult<LegislatorVoteCountsResult, Error>[] => {
    const legislatorVoteQueries = useMemo(() => {
        return (legislators ?? []).map(legislator => ({
            queryKey: ['legislatorVotes', legislator.id],
            queryFn: async (): Promise<LegislatorVoteCountsResult> => {
                const [supported, opposed]: [LegislatorBillSupport[], LegislatorBillSupport[]] = await Promise.all([
                    fetchLegislatorSupportedBills(legislator.id),
                    fetchLegislatorOpposedBills(legislator.id)
                ]);
                return { supportedCount: supported.length, opposedCount: opposed.length };
            },
            enabled: !!legislators && initiallyEnabled,
            staleTime: STALE_TIME,
        }));
    }, [legislators, initiallyEnabled]);

    const results = useQueries({
        queries: legislatorVoteQueries
    }) as UseQueryResult<LegislatorVoteCountsResult, Error>[];

    return results;
}; 