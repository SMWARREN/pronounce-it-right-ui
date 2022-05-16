import { Dispatch, SetStateAction } from "react";
import { TableView } from "./TableView";
import { SingleView } from "./SingleView";
import { Box, Container } from "@chakra-ui/react";

export default function Component({
  show,
  search,
  currentUser,
  setCurrentUser,
}: {
  show: boolean;
  search: string;
  currentUser: number;
  setCurrentUser: Dispatch<SetStateAction<number>>;
}) {
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
