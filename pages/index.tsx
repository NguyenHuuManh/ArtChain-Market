import { images } from "@/assets";
import WithAuthor from "@/hocs/WithAuthor";
import useTopPage from "@/hocs/WithAuthor/useTopPage";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  CategoryScale, Chart as ChartJS, ChartOptions, Legend, LinearScale, LineElement, PointElement, Title,
  Tooltip
} from 'chart.js';
import Image from "next/image";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const plant = [{
  name: 'Moning'
},
{
  name: 'Lunch'
},
{
  name: 'Dinner'
},
{
  name: 'Slack'
}
]


function Home() {
  const { chartData, productList } = useTopPage()

  return (
    <div>
      <div className="firstBox">
        <div className="top-element left">
          <Image src={images.main_photo} alt="photo" style={{
            width: '100%',
            objectFit: 'contain'
          }} />
        </div>
        <div className="top-element right">
          <Line options={chartData.options} data={chartData.data} />
        </div>
      </div>
      <div className="display_flex center">
        <div className="memu-wapper">
          {plant.map((el, index) => (
            <div className="hexagon display_flex center" key={index}>
              <div style={{ display: 'block' }}>
                <Image src={images.icon_knife} alt="main_graph" />
                <span >{el.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ paddingLeft: '10%', paddingRight: '10%' }}>
        <div className="grid-container">
          {productList.map((el) => <div className="grid-item" key={el.id} >
            <Image src={images.m01} alt="main_graph" />
            <span className="tag-item">{el.title}</span>
          </div>)}

        </div>
        <div className="display_flex center" style={{ paddingTop: 20 }}>
          <button className="btn-linear" >記録をもっと見る</button>
        </div>
      </div>
    </div >
  );
}

export default WithAuthor(Home)