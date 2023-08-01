import {
  getListDiary,
  getListExcercise,
  getMenuRecord,
} from "@/pages/api/fakeAPI";
import { useEffect, useState } from "react";

const useRecord = () => {
  const [menus, setMenus] = useState([]);
  const [excercises, setExcercises] = useState([]);
  const [diaries, setDiaries] = useState([]);

  const getMenu = async () => {
    const res = await getMenuRecord();
    setMenus(res);
  };

  const getExcercises = async () => {
    const res = await getListExcercise();
    setExcercises(res);
  };

  const getDiaries = async () => {
    const res = await getListDiary();
    setDiaries(res);
  };

  useEffect(() => {
    getMenu();
    getDiaries();
    getExcercises();
  }, []);

  return { menus, diaries, excercises };
};

export default useRecord;
