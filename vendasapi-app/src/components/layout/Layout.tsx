import { ReactNode } from "react";
import Menu from "./Menu";
import { Message } from "@/util/Message";

interface LayoutProps {
  titulo?: string;
  children?: ReactNode;
}

export default function Layout(props: LayoutProps) {
  return (
    <div className="app">
      <section className="main-content columns is-fullheight">
        <Menu />
        <div className="container column is-10">
          <div className="section">
            <div className="card">
              <div className="card-header">
                <p className="card-header-title">{props.titulo}</p>
              </div>
              <div className="card-content">
                <div className="content">{props.children}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
