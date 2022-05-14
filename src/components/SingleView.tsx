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
} from "@chakra-ui/react";
import useFetch from "../hooks/useFetch";
import { SearchUser } from "../state/types/SearchUser";
import { UpdateInputControl } from "../hooks/useInputControl";
import { useEffect } from "react";
import { BASE_URL } from "../state/shared/constants";

export function SingleView({ empId }: { empId: number }) {
  const {
    state: { data, error },
    fetchData,
  } = useFetch<SearchUser>(`${BASE_URL}/employee-info/${empId}`);

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
          />{" "}
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
                  <UpdateInputControl {...{ namePhoneme: data.namePhoneme }} />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <Spacer></Spacer>
      </HStack>
    </>
  );
}
