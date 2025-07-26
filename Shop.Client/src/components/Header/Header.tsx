import style from "./header.module.scss";
import logo from "./logo.png"

export default function Header() {
  return (
    <header className={style.header}>
      <div className="container">
        <div className={style.items}>
          <div className={style.logo}>
            <img src={logo} alt="logo" />
          </div>
          <h2 className={style.title}>Shop Project</h2>
        </div>
      </div>
    </header>
  );
}
