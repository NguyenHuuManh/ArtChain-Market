import { images } from "@/assets";
import useRecord from "@/hocs/useRecord";
import WithAuthor from "@/hocs/WithAuthor";
import {
    CategoryScale, Chart as ChartJS, ChartOptions, Legend, LinearScale, LineElement, PointElement, Title,
    Tooltip
} from 'chart.js';
import moment from "moment";
import Image from "next/image";
import { useState } from "react";
import { Line } from 'react-chartjs-2';
import { diaryItem, excersiceItem, menuI } from "../api/fakeAPI";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);



const Record = () => {

    const { menus, diaries, excercises } = useRecord()



    const btnGroup = ['日', '週', '月', '年'];
    const [btnActive, setBtnActive] = useState(btnGroup[0]);

    const MenuItem = (item: menuI) => (
        <div className="item-container">
            <div className="item-layer display_flex center">
                <div>
                    <div className="title-image">{item.title}</div>
                    <div className="btn-image">{item.subtitle}</div>
                </div>
            </div>
            <div style={{ background: '#FFFF' }}>
                <Image src={images.Myrecommend1} alt="photo" className="item-image" />
            </div>

        </div>
    )

    const GridItem = (item: excersiceItem) => (
        <div className="grid-record-item">
            <div className="display_flex between">
                <div className="display_flex center">
                    <div className="dotWhite" style={{ marginRight: 10 }}></div>
                    <div className="title-grid-item textWhite">
                        {item.title}
                    </div>
                </div>
                <div className="title-grid-item textyellow">
                    {item.duration}
                </div>
            </div>
            <div className="title-grid-item textyellow" style={{ paddingLeft: 20 }}>
                {item.numCal}
            </div>
        </div>
    )

    const DiaryItem = (item: diaryItem) => {
        const date = moment(item.time, "yyyy.MM.dd HH:mm").format('yyyy.MM.DD');
        const hour = moment(item.time, 'yyyy.MM.dd HH:mm').format('HH:mm');

        return (
            <div className="diary-item-container">
                <div>{date}</div>
                <div>{hour}</div>
                <div>{item.title}</div>
                <div className="diary-content">{item.content}</div>
            </div>
        )
    }

    const labels: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

    const data = {
        labels: labels.map((el) => el + '月'),
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map(() => Math.random() * 100),
                borderColor: '#FFCC21',
                backgroundColor: '#FFCC21',
            },
            {
                label: 'Dataset 2',
                data: labels.map(() => Math.random() * 100),
                borderColor: '#8FE9D0',
                backgroundColor: '#8FE9D0',
            },
        ],
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        // maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
        },
        scales: {
            y: {
                display: false,
            }
        },

    };

    return (
        <div className="record-container">
            <div className="menu-record-container">
                {menus.map((item) => (<MenuItem key={item.id} {...item} />))}
            </div>
            <div className="black-box" >
                <div className="header-box display_flex">
                    <div>BODY RECORD</div>
                    <div>2021.05.21</div>
                </div>
                <Line options={options} data={data} />
                <div className="display_flex btn-body-group">
                    {btnGroup.map((item) => (
                        <button className={`btn-body ${item == btnActive ? 'btn-body-active' : ''}`} key={item} onClick={() => setBtnActive(item)}>{item}</button>
                    ))}
                </div>
            </div>
            <div className="black-box" style={{ paddingRight: 20, paddingBottom: 20 }}>
                <div className="header-box display_flex">
                    <div>MY EXERCISE</div>
                    <div>2021.05.21</div>
                </div>
                <div className="grid-record-container">
                    {excercises.map((item, index) => (
                        <GridItem key={index} {...item} />
                    ))}
                </div>
            </div>
            <div className="diary-container">
                <div>MY DIARY</div>
                <div className="grid-diary-container">
                    {diaries.map((item, index) => (
                        <DiaryItem key={index} {...item} />
                    ))}
                </div>
            </div>
            <div className="display_flex center" style={{ paddingTop: 20 }}>
                <button className="btn-linear" >自分の日記をもっと見る</button>
            </div>
        </div>
    )
}

export default WithAuthor(Record)