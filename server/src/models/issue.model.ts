import { Schema, model } from "mongoose";

enum IssueStatuses {
  Open = "open",
  Closed = "closed",
  Pending = "pending",
}

export interface IIssue {
  title: string;
  description: string;
  status: IssueStatuses;
}

const issueSchema = new Schema<IIssue>({
  title: { type: String, required: true },
  status: {
    type: String,
    enum: [IssueStatuses.Open, IssueStatuses.Closed, IssueStatuses.Pending],
    required: true,
  },
  description: { type: String },
});

export const IssueModel = model<IIssue>("Issue", issueSchema);
