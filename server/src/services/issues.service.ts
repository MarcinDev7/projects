import { IIssue, IssueModel } from "../models/issue.model";

async function getMultiple(page = 1) {}

async function findOne(id: string) {
  await IssueModel.findById(id);
}

async function create(issue: IIssue) {
  await IssueModel.create({ issue });
}

async function update(id: string, issue) {
  await IssueModel.updateOne(
    { _id: id },
    {
      status: issue.status,
      title: issue.title,
      description: issue.description,
    }
  );
}

async function remove(id: string) {
  await IssueModel.deleteOne({ _id: id });
}

export const IssuesService = {
  create,
  findOne,
  getMultiple,
  update,
  remove,
};
