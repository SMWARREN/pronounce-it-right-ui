import { useState } from "react";
import { TableView } from "./TableView";
import { SingleView } from "./SingleView";
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

export default function Component({
  show,
  search,
}: {
  show: boolean;
  search: string;
}) {
  const [currentUser, setCurrentUser] = useState(-1);

  if (show) {
    return currentUser !== -1 ? (
      <Container maxW="5xl" padding={10}>
        <SingleView empId={currentUser} />{" "}
      </Container>
    ) : (
      <Container maxW="4xl" padding={10}>
        <TableView search={search} setCurrentUser={setCurrentUser} />
      </Container>
    );
  } else {
    return <></>;
  }
}
