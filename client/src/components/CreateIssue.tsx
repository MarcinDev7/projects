import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { createIssue } from "../api/requests";

type Props = {
  open: boolean;
  setCreateIssueModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateIssue(props: Props) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleCreateAction = async () => {
    try {
      await createIssue({ title, description });
      props.setCreateIssueModal(false);
    } catch {
      alert("Could not create issue");
    }
  };

  return (
    <Dialog open={props.open} maxWidth="lg">
      <DialogTitle>Edit issue</DialogTitle>
      <DialogContent>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleCreateAction()}>Create Action</Button>
      </DialogActions>
    </Dialog>
  );
}
