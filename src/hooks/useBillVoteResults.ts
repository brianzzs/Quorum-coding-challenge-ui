import { useQuery } from '@tanstack/react-query';
import { fetchVoteResultsByBill } from '../services/api'; 
import { VoteResult } from '../types/api/votes';

const STALE_TIME = 5 * 60 * 1000; 

export const useBillVoteResults = (billId: number | null) => {
    const isEnabled = !!billId;

    return useQuery<VoteResult[], Error>({
        queryKey: ['voteResults', billId],
        queryFn: () => fetchVoteResultsByBill(billId!),
        enabled: isEnabled,
        staleTime: STALE_TIME,
    });
}; 