import { IIssue, IssueModel } from "../models/issue.model";

async function getMultiple(page = 1) {
  return await IssueModel.find();
}

async function findOne(id: string) {
  return await IssueModel.findById(id);
}

async function create(issue: IIssue) {
  return await IssueModel.create(issue);
}

async function update(id: string, issue) {
  return await IssueModel.updateOne(
    { _id: id },
    {
      status: issue.status,
      title: issue.title,
      description: issue.description,
    }
  );
}

async function remove(id: string) {
  return await IssueModel.deleteOne({ _id: id });
}

export const IssuesService = {
  create,
  findOne,
  getMultiple,
  update,
  remove,
};
