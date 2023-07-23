import MenuItem from "./MenuItem";

export default function Menu(props: any) {
  return (
    <aside className="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
      <p className="menu-label is-hidden-touch">Minhas Vendas</p>
      <ul className="menu-list">
        <MenuItem href="/" label="Home" />
        <MenuItem href="/consultas/produtos" label="Produtos" />
        <MenuItem href="/consultas/clientes" label="Clientes" />
        <MenuItem href="/vendas/nova-venda" label="Vendas" />
        <MenuItem href="/" label="Sair" />
      </ul>
    </aside>
  );
}
