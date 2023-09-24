import {
  MenuItem,
  Paper,
  Select,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";

import { data } from "../lib/dataset";

type SortTypes = "Newest" | "Oldest" | "Country";

export default function dataTable() {
  //following states required for the table:
  // sorting options
  // pagination state for both showing visibility to a specific range of data as well as showing which page
  //tableData required for searching and sorting.

  const [sortOption, setSortOption] = useState<SortTypes>("Newest");
  const [page, setPage] = useState<number>(1);
  const [tableData, setTableData] = useState(data);

  // useEffect required as changes in table data comes as a side effect of changing the sort option.

  useEffect(() => {
    if (sortOption === "Country") {
      setTableData((state) =>
        [...state].sort((x, y) => {
          if (x.country > y.country) {
            return 1;
          }
          return -1;
        })
      );
    } else {
      setTableData((state) =>
        [...state].sort((x, y) => {
          let dateX = new Date(x.joinDate);
          let dateY = new Date(y.joinDate);
          if (dateX > dateY) {
            return sortOption === "Newest" ? 1 : -1;
          }
          return sortOption === "Newest" ? -1 : 1;
        })
      );
    }
  }, [sortOption]);

  //function for filtering the data on searching
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let search = e.target.value;
    setTableData(
      data.filter((item) => item.customer_name.toLowerCase().includes(search))
    );
  };

  return (
    <section className="mx-20 bg-white relative rounded-2xl">
      <div className="flex  h-full items-center w-full gap-8 pt-6 justify-end px-10 ">
        <input
          onChange={handleSearchChange}
          placeholder="Search"
          className="bg-gray-100 py-1 pl-10 text-sm w-[14rem] rounded-md"
        />
        <div className="bg-gray-200/60 relative">
          <BiSearch
            size="1.3rem"
            className="-left-[15.5rem] top-1  text-gray-500 absolute"
          />
          <label className="text-gray-600/70 px-2 ">Sort By:</label>
          <Select
            size="small"
            variant="standard"
            value={sortOption}
            className="!font-bold !text-sm"
            onChange={(e) => setSortOption(e.target.value as SortTypes)}
          >
            <MenuItem value={"Newest"}> Newest </MenuItem>
            <MenuItem value={"Oldest"}> Oldest </MenuItem>
            <MenuItem value={"Country"}> Country </MenuItem>
          </Select>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell className="!text-gray-400">Customer Name</TableCell>
              <TableCell className="!text-gray-400"> Company</TableCell>
              <TableCell className="!text-gray-400"> Phone Number</TableCell>
              <TableCell className="!text-gray-400"> Email</TableCell>
              <TableCell className="!text-gray-400"> Country</TableCell>
              <TableCell className="!text-gray-400">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData
              .slice((page - 1) * 5, page * 5)
              .map((item: (typeof data)[number], index) => (
                <Fragment key={index}>
                  <TableRow>
                    <TableCell>{item.customer_name}</TableCell>
                    <TableCell>{item.Company}</TableCell>
                    <TableCell>{item.phone_number}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.country}</TableCell>
                    <TableCell>
                      <p
                        className={` font-bold py-1 text-center border-2 rounded-md ${
                          item.status === "Active"
                            ? "text-emerald-600 bg-emerald-200  border-emerald-600 "
                            : "text-red-700 bg-red-200 border-red-700"
                        }`}
                      >
                        {item.status}
                      </p>
                    </TableCell>
                  </TableRow>
                </Fragment>
              ))}
          </TableBody>
        </Table>
        <Pagination
          className="py-4 px-8 w-full flex justify-end"
          defaultValue={1}
          count={Math.round(tableData.length / 5)}
          onChange={(e, number) => setPage(number)}
          variant="outlined"
          shape="rounded"
        />
      </TableContainer>
      <p className="absolute bottom-4 left-4 text-gray-600/70">
        Showing Data {(page - 1) * 5 + 1} to {page * 5} of {tableData.length}{" "}
        entries
      </p>
    </section>
  );
}
