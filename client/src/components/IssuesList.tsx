import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import React, { useEffect, useState } from "react";
import { deleteIssue, fetchIssues, updateIssue } from "../api/requests";
import DeleteIcon from "@mui/icons-material/Delete";
import { IIssue } from "../types";
import Edit from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import IssueDetail from "./EditIssue";
export default function IssuesList() {
  const [issues, setIssues] = useState<IIssue[]>([]);
  const [error, setError] = useState<string>();
  const [isModalOpen, setModalOpen] = useState<string | false>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchIssues()
      .then((response) => {
        if (isMounted) setIssues(response.data);
      })
      .catch((err) => {
        setError("Fetch for issues failed");
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleEditModal = (id: string) => {
    setModalOpen(id);
  };

  const handleEditIssue = async (
    issue: Omit<IIssue & { id: string }, "_id">
  ) => {
    try {
      await updateIssue(issue);
      const copiedIssues = [...issues];
      let editedIssueIndex = copiedIssues.findIndex(
        (iss) => issue.id === iss._id
      );
      copiedIssues[editedIssueIndex] = {
        _id: issue.id,
        description: issue.description,
        title: issue.title,
        status: issue.status,
      };
      setIssues(copiedIssues);
      setModalOpen(false);
    } catch {
      setError("Could not edit the issue");
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await deleteIssue(id);
      const newIssues = [...issues].filter((issue) => issue._id !== id);
      setIssues(newIssues);
    } catch {
      setError("Could not remove the issue");
    }
  };

  return error ? (
    <>
      <p>Failed to fetch data</p>
      <span>{error}</span>
    </>
  ) : loading ? (
    <p>Loading ...</p>
  ) : (
    <>
      {isModalOpen ? (
        <IssueDetail issueId={isModalOpen} handleEditIssue={handleEditIssue} />
      ) : null}
      <List>
        {issues.map((issue, index) => (
          <React.Fragment key={issue._id}>
            <ListItem
              secondaryAction={
                <>
                  <DeleteIcon
                    onClick={(e) => {
                      handleRemove(issue._id);
                    }}
                  >
                    Remove
                  </DeleteIcon>
                  <Edit
                    onClick={(e) => {
                      handleEditModal(issue._id);
                    }}
                  >
                    Edit
                  </Edit>
                </>
              }
            >
              <ListItemText
                primary={`${issue.title} | status: ${issue.status}`}
                secondary={issue.description}
              ></ListItemText>
            </ListItem>
            {index !== issues.length - 1 ? <Divider /> : null}
          </React.Fragment>
        ))}
      </List>
    </>
  );
}
