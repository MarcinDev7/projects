import { IssuesService } from "../services/issues.service";

const get = async (req, res, next) => {
  try {
    res.json(await IssuesService.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Fetching for issues failed`, err.message);
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    res.json(await IssuesService.create(req.body));
  } catch (err) {
    console.error(`Error while creating an issue`, err.message);
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
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
  get,
  create,
  update,
  remove,
};
