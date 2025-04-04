export type Bill = {
    id: number;
    sponsor_id: number | null;
    sponsor_name: string | null;
    title: string;
  }
  
  export type VoteSummary = {
    bill_id: number;
    bill_title: string;
    opponents_count: number;
    sponsor_name: string | null;
    supporters_count: number;
  }