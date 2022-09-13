import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useEffect, useState } from "react";
import { fetchIssue } from "../api/requests";
import { IIssue, IssueStatuses } from "../types";

interface Props {
  issueId: string;
  handleEditIssue: (editedIssue: Omit<IIssue & { id: string }, "_id">) => void;
}

export default function IssueDetail(props: Props) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<IssueStatuses | undefined>();
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchIssue(props.issueId)
      .then((response) => {
        const { title, description, status } = response.data;
        if (isMounted) {
          setTitle(title);
          setDescription(description);
          setStatus(status);
        }
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = () => {
    const editedIssue = {
      id: props.issueId,
      title,
      description,
      status: status as IssueStatuses,
    };
    props.handleEditIssue(editedIssue);
  };

  const options = ["closed", "pending", "open"];
  console.log("status", status);
  return error ? (
    <p>Failed to fetch issue data</p>
  ) : (
    <Dialog open={!!props.issueId} maxWidth="lg">
      <DialogTitle>Edit issue</DialogTitle>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <DialogContent
          style={{ display: "flex", flexDirection: "column" }}
          dividers
        >
          <label title="Title" htmlFor="title">
            Title:
          </label>
          <TextField
            id="title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
          <label title="Description" htmlFor="description">
            Description
          </label>
          <TextField
            id="description"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
          <label title="Status" htmlFor="status">
            Status
          </label>
          <Select
            id="status"
            onChange={(e) => setStatus(e.target.value as IssueStatuses)}
            value={status}
            required
          >
            {options
              .filter((option) => {
                if (status === "pending") {
                  return option === "open";
                }
                if (status === "closed") {
                  return option === "closed";
                }
                return false;
              })
              .map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
          </Select>
        </DialogContent>
      )}
      <DialogActions>
        <Button disabled={loading} type="submit" onClick={() => handleSubmit()}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
