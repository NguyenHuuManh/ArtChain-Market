import useHeath from "@/hocs/useHeath";
import Image from "next/image";
import { recommendI } from "../api/fakeAPI";


const Heath = () => {

    const { productList, recommendList } = useHeath();

    const RecommendItem = (item: recommendI) => {
        return (
            <div className="recommend-box display_flex center">
                <div>
                    <div className="title-recommend">{item.title}</div>
                    <div className="divider"></div>
                    <div className="subtitle-recommend">{item.subtitle}</div>
                </div>
            </div>
        )
    }
    return (
        <div className="heath-container">
            <div className="recommend-container" style={{ marginBottom: 20 }}>
                {recommendList.map((item) => <RecommendItem {...item} key={item.id} />)}
            </div>
            <div className="display_flex center">
                <div className="product-grid-container">
                    {productList.map((el) =>
                        <div className="product-grid-item" key={el.id} >
                            <div className="product-img-card">
                                <Image src={el.image} alt="main_graph" className="product-img" />
                                <span className="product-tag">{el.time}</span>
                            </div>
                            <div className="product-titile">{el.description}</div>
                            <div className="product-titile hightlight">{el.title}</div>
                        </div>)}

                </div>
            </div>
            <div className="display_flex center" style={{ paddingTop: 20 }}>
                <button className="btn-linear" >コラムをもっと見る</button>
            </div>
        </div>
    )
}

export default Heath;