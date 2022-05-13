import { useState } from "react";
import { ShowTableView } from "./ShowTableView";
import { ShowSingleView } from "./ShowSingleView";
import { Container } from "@chakra-ui/react";

export type SearchUser = {
  empId: number;
  empName: string;
  title: string;
  email?: string;
  legalName: string;
  namePhoneme?: string;
  role: string;
};

export default function Component({ search }: { search: string }) {
  const [currentUser, setCurrentUser] = useState(-1);

  if (currentUser !== -1) {
    return (
      <Container maxW="5xl" padding={10}>
        {ShowSingleView(currentUser)}
      </Container>
    );
  } else {
    return (
      <Container maxW="4xl" padding={10}>
        {ShowTableView(search, setCurrentUser)}
      </Container>
    );
  }
}
