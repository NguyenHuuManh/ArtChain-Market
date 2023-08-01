import {
  getProductHeath,
  getRecommendHeath,
  productI,
  recommendI,
} from "@/pages/api/fakeAPI";
import { useEffect, useState } from "react";

const useHeath = () => {
  const [recommendList, setRecommendList] = useState<recommendI[]>([]);
  const [productList, setProductList] = useState<productI[]>([]);

  const getRecommendList = async () => {
    const res = await getRecommendHeath();
    setRecommendList(res);
  };

  const getProductList = async () => {
    const res = await getProductHeath();
    setProductList(res);
  };

  useEffect(() => {
    getProductList();
    getRecommendList();
  }, []);

  return { recommendList, productList };
};

export default useHeath;
