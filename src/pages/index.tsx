import { GetStaticProps } from "next";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";
import styles from "./home.module.scss";

//Client-side
//Server-side
//Static Site Generation
interface HomeProduct {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProduct) {
  return (
    <main className={styles.contentContainer}>
      <section className={styles.hero}>
        <span> 👏 Hey, welcome</span>
        <h1>
          New about the <span>React</span> world.
        </h1>
        <p>
          Get access to al the publications <br />
          <span>for {product.amount} month</span>
        </p>
        <SubscribeButton priceId={product.priceId} />
      </section>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/avatar.svg" alt="Girl coding" />
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1JaOn0B5Nd4yJ04dvX9bchLZ");

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  };

  return {
    props: { product },
    revalidate: 60 * 60 * 24, // 24 hours,
  };
};
