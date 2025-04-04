export type VoteResult = {
    bill_title: string;
    legislator_name: string;
    vote_id: number;
    vote_type: "Yea" | "Nay" | string; 
} 