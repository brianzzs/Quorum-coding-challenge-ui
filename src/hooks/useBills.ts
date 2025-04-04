import { useQuery } from '@tanstack/react-query';
import { fetchBills } from '../services/api';
import { Bill } from '../types/api/bills';

const STALE_TIME = 5 * 60 * 1000; 

export const useBills = () => {
    return useQuery<Bill[], Error>({
        queryKey: ['bills'],
        queryFn: fetchBills,
        staleTime: STALE_TIME,
    });
}; 