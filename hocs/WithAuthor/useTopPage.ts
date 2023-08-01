import { getProductHeath, productI } from "@/pages/api/fakeAPI";
import { ChartOptions } from "chart.js";
import { useEffect, useState } from "react";

const useTopPage = () => {
  const [productList, setProductList] = useState<productI[]>([]);
  const getProductList = async () => {
    const res = await getProductHeath();
    setProductList(res);
  };

  useEffect(() => {
    getProductList();
  }, []);

  const labels: string[] = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
  const data = {
    labels: labels.map((el) => el + "月"),
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() => Math.random() * 100),
        borderColor: "#FFCC21",
        backgroundColor: "#FFCC21",
      },
      {
        label: "Dataset 2",
        data: labels.map(() => Math.random() * 100),
        borderColor: "#8FE9D0",
        backgroundColor: "#8FE9D0",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        display: false,
      },
    },
  };

  return { productList, chartData: { labels, options, data } };
};

export default useTopPage;
