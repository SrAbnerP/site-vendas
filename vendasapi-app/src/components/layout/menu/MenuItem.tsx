import Link from "next/link";

interface MenuItemProps {
  href: string;
  label: string;
}

export default function MenuItem(props: MenuItemProps) {
  return (
    <li>
      <Link href={props.href}>
        <span className="icon"></span> {props.label}
      </Link>
    </li>
  );
}
