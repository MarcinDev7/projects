import { IssueStatuses } from "../models/issue.model";
import { IssuesService } from "../services/issues.service";
import { checkStatus } from "../utils";

const get = async (req, res, next) => {
  try {
    const issues = await IssuesService.getMultiple(req.query.page);
    res.json(issues);
  } catch (err) {
    console.error(`Fetching for issues failed`, err.message);
    next(err);
  }
};

const findOne = async (req, res, next) => {
  try {
    res.json(await IssuesService.findOne(req.params.id));
  } catch (err) {
    console.error(`Fetching for issues failed`, err.message);
    next(err);
  }
};

const create = async (req, res, next) => {
  const { title, description }: { title: string; description: string } =
    req.body;
  try {
    const newIssue = {
      title,
      description,
      status: IssueStatuses.Open,
    };
    const createdIssue = await IssuesService.create(newIssue);
    res.json(createdIssue);
  } catch (err) {
    console.error(`Error while creating an issue`, err.message);
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const currentIssue = await IssuesService.findOne(req.params.id);
    const isValid = checkStatus(req.body.status, currentIssue.status);
    if (!isValid) return res.status(400).send("Bad request");
    res.json(await IssuesService.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating an issue`, err.message);
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    res.json(await IssuesService.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting an issue`, err.message);
    next(err);
  }
};

export const IssuesController = {
  create,
  findOne,
  get,
  remove,
  update,
};
