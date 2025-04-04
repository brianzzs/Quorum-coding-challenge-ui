import { useQuery } from '@tanstack/react-query';
import { fetchVoteSummary } from '../services/api'; 
import { VoteSummary } from '../types/api/bills';

const STALE_TIME = 5 * 60 * 1000; 

export const useVoteSummaries = () => {
    return useQuery<VoteSummary[], Error>({
        queryKey: ['voteSummary'],
        queryFn: fetchVoteSummary,
        staleTime: STALE_TIME,
    });
}; 