import { Card, DonutChart, Title } from "@tremor/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getdataadmin } from "../../redux/actions/index";

const ChartDonut = () => {
  const dispatch = useDispatch();
  const { Comprasgenerales } = useSelector((state) => state.Comprasgenerales);

  useEffect(() => {
    dispatch(getdataadmin());
  }, []);

  return (
    <Card marginTop="mt-6">
      <Title>Ventas por Pais</Title>
      <DonutChart
        data={Comprasgenerales[1]}
        category="Cantidad"
        dataKey="Pais"
        marginTop="mt-6"
        colors={[
          "red",
          "fuchsia",
          "orange",
          "gray",
          "pink",
          "purple",
          "lime",
          "yellow",
          "violet",
          "red",
          "fuchsia",
          "orange",
          "gray",
          "pink",
          "purple",
          "lime",
          "yellow",
          "violet",
          "red",
          "fuchsia",
          "orange",
          "gray",
          "pink",
          "purple",
          "lime",
          "yellow",
          "violet",
          "red",
          "fuchsia",
          "orange",
          "gray",
          "pink",
          "purple",
          "lime",
          "yellow",
          "violet",
          "red",
          "fuchsia",
          "orange",
          "gray",
          "pink",
          "purple",
          "lime",
          "yellow",
          "violet",
        ]}
      />
    </Card>
  );
};

export default ChartDonut;

/* const cities = [
  {
    name: "New York",
    Sales: 9800,
  },
  {
    name: "London",
    Sales: 5849,
  },
  {
    name: "Hong Kong",
    Sales: 3650,
  },
  {
    name: "San Francisco",
    Sales: 2800,
  },
  {
    name: "Singapore",
    Sales: 3820,
  },
  {
    name: "Zurich",
    Sales: 6811,
  },
]; */
