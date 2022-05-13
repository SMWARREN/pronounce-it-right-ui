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

export function ShowSingleView(empId: number) {
  const { data, error } = useFetch<SearchUser>(
    `https://pronounce-it-right.azurewebsites.net/employee-info/${empId}`
  );
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
                <Th>Email</Th>
                <Th>Legal Name</Th>
                <Th>Name Phoneme</Th>
                <Th>Role</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{data.title}</Td>
                <Td>{data.email}</Td>
                <Td>{data.legalName}</Td>
                <Td>{data.namePhoneme}</Td>
                <Td>{data.role}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <Spacer></Spacer>
      </HStack>
    </>
  );
}
