import style from "./header.module.scss";

export default function Header() {
  return (
    <header className={style.header}>
      <div className="container">
        <div className={style.items}>
          <div className={style.logo}>
            <img src="../../public/logo.png" alt="logo" />
          </div>
          <h2 className={style.title}>Shop Project</h2>
        </div>
      </div>
    </header>
  );
}
