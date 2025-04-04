import { useQuery } from '@tanstack/react-query';
import {
    fetchLegislatorSupportedBills,
    fetchLegislatorOpposedBills,
} from '../services/api'; 
import { LegislatorBillSupport } from '../types/api/legislator';

const STALE_TIME = 5 * 60 * 1000; 

interface LegislatorVoteCountsResult {
    supportedData: LegislatorBillSupport[] | undefined;
    opposedData: LegislatorBillSupport[] | undefined;
    supportedCount: number;
    opposedCount: number;
    isLoadingSupported: boolean;
    isLoadingOpposed: boolean;
    isErrorSupported: boolean;
    isErrorOpposed: boolean;
    errorSupported: Error | null;
    errorOpposed: Error | null;
}

export const useLegislatorVotes = (legislatorId: number | null): LegislatorVoteCountsResult => {
    const isEnabled = !!legislatorId;

    const { 
        data: supportedData, 
        isLoading: isLoadingSupported, 
        isError: isErrorSupported, 
        error: errorSupported 
    } = useQuery<LegislatorBillSupport[], Error>({
        queryKey: ['legislatorSupported', legislatorId],
        queryFn: () => fetchLegislatorSupportedBills(legislatorId!),
        enabled: isEnabled,
        staleTime: STALE_TIME,
    });

    const { 
        data: opposedData, 
        isLoading: isLoadingOpposed, 
        isError: isErrorOpposed, 
        error: errorOpposed 
    } = useQuery<LegislatorBillSupport[], Error>({
        queryKey: ['legislatorOpposed', legislatorId],
        queryFn: () => fetchLegislatorOpposedBills(legislatorId!), 
        enabled: isEnabled,
        staleTime: STALE_TIME,
    });

    return {
        supportedData,
        opposedData,
        supportedCount: supportedData?.length ?? 0,
        opposedCount: opposedData?.length ?? 0,
        isLoadingSupported,
        isLoadingOpposed,
        isErrorSupported,
        isErrorOpposed,
        errorSupported: errorSupported instanceof Error ? errorSupported : null,
        errorOpposed: errorOpposed instanceof Error ? errorOpposed : null,
    };
}; 