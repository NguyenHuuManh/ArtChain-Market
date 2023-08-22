// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { images } from "@/assets";
import moment, { Moment } from "moment";
import type { NextApiRequest, NextApiResponse } from "next";
import { StaticImageData } from "next/image";

export interface menuI {
  title: string;
  subtitle: string;
  id: number;
}

export interface diaryItem {
  id: number;
  time: Moment;
  title: string;
  content: string;
}

export interface excersiceItem {
  title: string;
  duration: string;
  numCal: string;
}

export interface recommendI {
  id: number;
  title: string;
  subtitle: string;
}

export interface productI {
  id: number;
  image: StaticImageData;
  time: string;
  title: string;
  description: string;
}

const options: menuI[] = [
  {
    title: "BODY RECORD",
    subtitle: "自分のカラダの記録",
    id: 1,
  },
  {
    title: "MY EXERCISE",
    subtitle: "自分の運動の記録",
    id: 2,
  },
  {
    title: "MY DIARY",
    subtitle: "自分の日記",
    id: 3,
  },
];

const dateExample = moment();
const diaryList: diaryItem[] = [
  {
    id: 1,
    time: dateExample,
    title: "私の日記の記録が一部表示されます",
    content:
      "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  },
  {
    id: 2,
    time: dateExample,
    title: "私の日記の記録が一部表示されます",
    content:
      "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  },
  {
    id: 3,
    time: dateExample,
    title: "私の日記の記録が一部表示されます",
    content:
      "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  },
  {
    id: 4,
    time: dateExample,
    title: "私の日記の記録が一部表示されます",
    content:
      "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  },
  {
    id: 5,
    time: dateExample,
    title: "私の日記の記録が一部表示されます",
    content:
      "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  },
  {
    id: 6,
    time: dateExample,
    title: "私の日記の記録が一部表示されます",
    content:
      "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  },
  {
    id: 7,
    time: dateExample,
    title: "私の日記の記録が一部表示されます",
    content:
      "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  },
  {
    id: 8,
    time: dateExample,
    title: "私の日記の記録が一部表示されます",
    content:
      "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  },
];

const exerciseList: excersiceItem[] = [
  {
    title: "家事全般（立位・軽い）",
    duration: "10 min",
    numCal: "26kcal",
  },
  {
    title: "家事全般（立位・軽い）",
    duration: "10 min",
    numCal: "26kcal",
  },
  {
    title: "家事全般（立位・軽い）",
    duration: "10 min",
    numCal: "26kcal",
  },
  {
    title: "家事全般（立位・軽い）",
    duration: "10 min",
    numCal: "26kcal",
  },
  {
    title: "家事全般（立位・軽い）",
    duration: "10 min",
    numCal: "26kcal",
  },
  {
    title: "家事全般（立位・軽い）",
    duration: "10 min",
    numCal: "26kcal",
  },
  {
    title: "家事全般（立位・軽い）",
    duration: "10 min",
    numCal: "26kcal",
  },
  {
    title: "家事全般（立位・軽い）",
    duration: "10 min",
    numCal: "26kcal",
  },
  {
    title: "家事全般（立位・軽い）",
    duration: "10 min",
    numCal: "26kcal",
  },
  {
    title: "家事全般（立位・軽い）",
    duration: "10 min",
    numCal: "26kcal",
  },
  {
    title: "家事全般（立位・軽い）",
    duration: "10 min",
    numCal: "26kcal",
  },
  {
    title: "家事全般（立位・軽い）",
    duration: "10 min",
    numCal: "26kcal",
  },
  {
    title: "家事全般（立位・軽い）",
    duration: "10 min",
    numCal: "26kcal",
  },
  {
    title: "家事全般（立位・軽い）",
    duration: "10 min",
    numCal: "26kcal",
  },
  {
    title: "家事全般（立位・軽い）",
    duration: "10 min",
    numCal: "26kcal",
  },
  {
    title: "家事全般（立位・軽い）",
    duration: "10 min",
    numCal: "26kcal",
  },
  {
    title: "家事全般（立位・軽い）",
    duration: "10 min",
    numCal: "26kcal",
  },
];

const recommendList: recommendI[] = [
  {
    id: 1,
    subtitle: "オススメ",
    title: "RECOMMENDED COLUMN",
  },
  {
    id: 1,
    subtitle: "ダイエット",
    title: "RECOMMENDED DIET",
  },
  {
    id: 1,
    subtitle: "美容",
    title: "RECOMMENDED BEAUTY",
  },
  {
    id: 1,
    subtitle: "健康",
    title: "RECOMMENDED HEATH",
  },
];

export function getMenuRecord(): Promise<menuI[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(options);
    }, 100);
  });
}

export function getListExcercise(): Promise<excersiceItem[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(exerciseList);
    }, 100);
  });
}

export function getListDiary(): Promise<diaryItem[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(diaryList);
    }, 100);
  });
}

export function getRecommendHeath(): Promise<recommendI[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(recommendList);
    }, 100);
  });
}

