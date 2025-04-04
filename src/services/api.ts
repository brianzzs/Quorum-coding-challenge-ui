import  { Bill, VoteSummary } from '../types/api/bills';
import  { Legislator, LegislatorBillSupport } from '../types/api/legislator';
import  { VoteResult } from '../types/api/votes';

const API_BASE_URL = 'http://127.0.0.1:5000'; // I would move this to a .env file if I were to deploy this
// const API_BASE_URL =  import.meta.env.VITE_API_BASE_URL


async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`Network response was not ok for ${endpoint}: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

export const fetchBills = (): Promise<Bill[]> => {
  return fetchApi<Bill[]>('/bill');
};

export const fetchVoteSummary = (): Promise<VoteSummary[]> => {
  return fetchApi<VoteSummary[]>('/bill/vote-summary');
};

export const fetchLegislators = (): Promise<Legislator[]> => {
  return fetchApi<Legislator[]>('/legislator');
};

export const fetchLegislatorSupportedBills = (legislatorId: number): Promise<LegislatorBillSupport[]> => {
  return fetchApi<LegislatorBillSupport[]>(`/legislator/id/${legislatorId}/bills-supported`);
};

export const fetchLegislatorOpposedBills = (legislatorId: number): Promise<LegislatorBillSupport[]> => {
  return fetchApi<LegislatorBillSupport[]>(`/legislator/id/${legislatorId}/bills-opposed`);
};

export const fetchVoteResultsByBill = (billId: number): Promise<VoteResult[]> => {
  return fetchApi<VoteResult[]>(`/vote_results/bill/${billId}`);
}; 