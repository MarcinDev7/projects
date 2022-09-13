import { IssueStatuses } from "./models/issue.model";

export const checkStatus = (
  oldStatus: IssueStatuses,
  newStatus: IssueStatuses
) => {
  if (oldStatus === "closed") {
    return newStatus === "closed";
  }

  if (oldStatus === "pending") {
    return newStatus === "pending" || newStatus === "closed";
  }

  return true;
};
