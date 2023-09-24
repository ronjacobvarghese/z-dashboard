import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { data } from "../lib/dataset";
import { LinearProgress } from "@mui/material";

export default function Charts() {
  //chart variables
  let newCustomers = 0;
  let currentCustomers = 0;
  let satisfiedCustomers = 0;
  let active = 0;

  //New Customers are customer from the year 2022 onwards
  // Current Customer are all the customer from 2018 onwards;
  // range of years span from 2010-2023;

  data.forEach((item) => {
    let date = new Date(item.joinDate);
    if (date.getFullYear() > 2018) {
      currentCustomers += 1;
    }
    if (date.getFullYear() >= 2022) {
      newCustomers += 1;
    }
    if (item.satisfied === "Yes") {
      satisfiedCustomers += 1;
    }
    if (item.status === "Active") {
      active += 1;
    }
  });

  active = active / 2;

  let inactive = 100 - active;

  // here the total number of customers = 200; hence to convert to percentage we divide each figure by 2;

  satisfiedCustomers = satisfiedCustomers / 2;
  newCustomers = newCustomers / 2;
  currentCustomers = currentCustomers / 2;

  return (
    <section className="p-10 !pr-20 w-full flex items-center justify-around gap-10">
      <div className="bg-white mx-8 w-fit rounded-2xl">
        <h2 className="w-full font-bold text-xl pt-6 px-8 text-left">
          {" "}
          Customers{" "}
        </h2>
        <ul className="ring-charts">
          <li id="A">
            <CircularProgressbar
              className="progress-bar"
              value={currentCustomers}
              text={`${currentCustomers}%`}
            />
            <label>Current Customers</label>
          </li>{" "}
          <li id="B">
            <CircularProgressbar
              className="progress-bar"
              value={newCustomers}
              text={`${newCustomers}%`}
            />
            <label>New Customers</label>
          </li>{" "}
          <li id="C">
            <CircularProgressbar
              className="progress-bar"
              value={satisfiedCustomers}
              text={`${satisfiedCustomers}%`}
            />
            <label>Satisfied Customers</label>
          </li>{" "}
        </ul>
      </div>
      <div className="w-1/2 p-6 rounded-2xl bg-white">
        <h2 className="px-2 font-bold text-xl w-full text-left">
          {" "}
          Stats Overview{" "}
        </h2>
        <ul className="linear-charts">
          <li id="D">
            <label>Active</label>
            <LinearProgress variant="determinate" value={active} />
            <p>{active}%</p>
          </li>
          <li id="E">
            <label>Inactive</label>
            <LinearProgress variant="determinate" value={inactive} />
            <p>{inactive}%</p>
          </li>
        </ul>
      </div>
    </section>
  );
}
