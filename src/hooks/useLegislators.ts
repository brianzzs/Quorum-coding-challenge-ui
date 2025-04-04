import { useQuery } from '@tanstack/react-query';
import { fetchLegislators } from '../services/api'; 
import { Legislator } from '../types/api/legislator';

const STALE_TIME = 10 * 60 * 1000; 

export const useLegislators = () => {
    return useQuery<Legislator[], Error>({
        queryKey: ['legislators'],
        queryFn: fetchLegislators,
        staleTime: STALE_TIME,
    });
}; 