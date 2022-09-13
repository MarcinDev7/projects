import axios from "axios";
import { IIssue } from "../types";

export const fetchIssues = async () =>
  axios.get<IIssue[]>(`http://localhost:8000/issues`);

export const fetchIssue = async (id: string) => {
  return axios.get<IIssue>(`http://localhost:8000/issues/${id}`);
};

export const createIssue = async (
  issue: Pick<IIssue, "title" | "description">
) => axios.post<IIssue>(`http://localhost:8000/issues`, { ...issue });

export const updateIssue = async ({
  id,
  title,
  description,
  status,
}: {
  id: string;
  title: string;
  description: string;
  status: string;
}) =>
  axios.put<IIssue>(`http://localhost:8000/issues/${id}`, {
    title,
    description,
    status,
  });

export const deleteIssue = async (id: string) => {
  return axios.delete<IIssue>(`http://localhost:8000/issues/${id}`);
};
