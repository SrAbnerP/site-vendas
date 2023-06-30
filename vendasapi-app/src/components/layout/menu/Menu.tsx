import MenuItem from "./MenuItem";

export default function Menu(props: any) {
  return (
    <aside className="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
      <p className="menu-label is-hidden-touch">Minhas Vendas</p>
      <ul className="menu-list">
        <MenuItem href="/" label="Home" />
        <MenuItem href="/cadastros/produtos" label="Produtos" />
        <MenuItem href="/" label="Config" />
        <MenuItem href="/" label="Sair" />
      </ul>
    </aside>
  );
}
