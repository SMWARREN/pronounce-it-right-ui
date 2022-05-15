import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  HStack,
  Box,
  Avatar,
  Spacer,
  Container,
  Center,
} from "@chakra-ui/react";

import useFetch from "../hooks/useFetch";
import { SearchUser } from "../state/types/SearchUser";
import { UpdateInputControl } from "../hooks/useInputControl";
import { useEffect, useState } from "react";
import { BASE_URL } from "../state/shared/constants";
import Recorder from "./Recorder";

export function SingleView({ empId }: { empId: number }) {
  const {
    state: { data, error },
    fetchData,
  } = useFetch<SearchUser>(`${BASE_URL}/employee-info/${empId}`);
  const [val, setVal] = useState("");
  const updateHook = useFetch<SearchUser>(`${BASE_URL}/employee-info/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, namePhoneme: val }),
  });
  const updateData = (_val: string) => {
    setVal(_val);
    updateHook.fetchData(true);
  };
  useEffect(() => {
    fetchData(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <p>There is an error.</p>;
  if (!data) return <p>Loading...</p>;
  return (
    <>
      <HStack>
        <Box>
          <Avatar
            size="2xl"
            name={data.empName}
            src="https://bit.ly/broken-link"
          />
        </Box>
        <Spacer></Spacer>
        <TableContainer>
          <Table variant="simple">
            <TableCaption fontSize="2xl" placement={"top"}>
              {data.empName}
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Legal Name</Th>
                <Th>Phoneme</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{data.title}</Td>
                <Td>{data.legalName}</Td>
                <Td>
                  <UpdateInputControl props={data} updateData={updateData} />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>

        <Spacer></Spacer>
      </HStack>
      <Box>
        <Container maxW="4xl" padding={10}>
          <Center>
            <Recorder />
          </Center>
        </Container>
      </Box>
    </>
  );
}
