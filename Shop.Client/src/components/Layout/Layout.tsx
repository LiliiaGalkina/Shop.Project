import Content from "../Content/Content";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import style from "./layout.module.scss";

export default function Layout() {
  return (
    <div className={style.wrapper}>
      <Header />
      <Content/>
      <Footer />
    </div>
  );
}
