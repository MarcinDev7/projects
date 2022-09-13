export enum IssueStatuses {
  Open = "open",
  Closed = "closed",
  Pending = "pending",
}

export interface IIssue {
  _id: string;
  title: string;
  description: string;
  status: IssueStatuses;
}
