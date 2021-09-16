import { SubscribeButton } from "../components/SubscribeButton";
import styles from "./home.module.scss";

export default function Home() {
  return (
    <main className={styles.contentContainer}>
      <section className={styles.hero}>
        <span> 👏 Hey, welcome</span>
        <h1>
          New about the <span>React</span> world.
        </h1>
        <p>
          Get access to al the publications <br />
          <span>for $9.90 month</span>
        </p>
        <SubscribeButton />
      </section>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/avatar.svg" alt="Girl coding" />
    </main>
  );
}
