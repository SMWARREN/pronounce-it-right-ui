import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { SearchUser } from "./Component";

export function TableView({
  search,
  setCurrentUser,
}: {
  search: string;
  setCurrentUser: any;
}) {
  const { data, error } = useFetch<SearchUser[]>(
    `https://pronounce-it-right.azurewebsites.net/employee-info/search-employees/${search}`
  );

  if (error) return <p>There is an error.</p>;
  if (!data) return <p>Loading...</p>;
  if (data.length < 1) return <p>No Data Found.</p>;

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption placement={"top"}>Search Results</TableCaption>
          <Thead>
            <Tr>
              <Th>Employee Name</Th>
              <Th>Title</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((emp) => (
              <Tr onClick={() => setCurrentUser(emp.empId)} key={emp.empId}>
                <Td>{emp.empName}</Td>
                <Td>{emp.title}</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Employee Name</Th>
              <Th>Title</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
}
