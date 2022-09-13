import { Button } from "@mui/material";
import Container from "@mui/material/Container";
import { useState } from "react";
import "./App.css";
import CreateIssue from "./components/CreateIssue";
import IssuesList from "./components/IssuesList";

function App() {
  const [createIssueModal, setCreateIssueModal] = useState<boolean>(false);
  return (
    <Container fixed>
      <Button onClick={(e) => setCreateIssueModal(true)}>
        Create an Issue
      </Button>
      <CreateIssue
        open={createIssueModal}
        setCreateIssueModal={setCreateIssueModal}
      />
      <IssuesList />
    </Container>
  );
}

export default App;
