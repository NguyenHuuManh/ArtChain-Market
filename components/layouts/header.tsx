import { images } from "@/assets";
import { dispatchLogout, useAuth } from "@/context/authorContext";
import Image from "next/image";
import Link from "next/link";
import { memo, useMemo } from "react";
import { Button } from "reactstrap";

const Header = () => {
  const [controller, dispatch] = useAuth();

  return (
    <div className="header">
      <Link className="logo-link" href="/"><Image src={images.logo} alt="logo" /></Link>
      <Link className="item-link" href='/record'><span><Image src={images.icon_memo} alt="logo" />自分の記録</span></Link>
      <Link className="item-link" href='/heath'><span><Image src={images.icon_challenge} alt="logo" />チャレンジ</span></Link>
      <Link className="item-link" href='/'><span><Image src={images.icon_info} alt="logo" />お知らせ</span></Link>
      <div className="item-link"><Image src={images.icon_menu} alt="logo" /></div>
    </div>
  )
};

export default memo(Header);
