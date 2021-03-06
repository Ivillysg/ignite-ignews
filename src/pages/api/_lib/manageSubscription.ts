import { fauna } from "../../../services/fauna";
import { query as q } from "faunadb";
import { stripe } from "../../../services/stripe";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false
) {
  //Busca o usuário no banco do FaunaDB com o ID{customerID}
  const userRef = await fauna.query(
    q.Select(
      "ref",
      q.Get(q.Match(q.Index("user_by_stripe_customer_id"), customerId))
    )
  );

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  };

  //Salvar os dados da subscription no FaunaDB
  if (createAction) {
    try {
      await fauna.query(
        q.Create(q.Collection("subscriptions"), { data: subscriptionData })
      );
    } catch (error) {
      console.log("error", error);
    }
  } else {
    try {
      await fauna.query(
        q.Replace(
          q.Select(
            "ref",
            q.Get(q.Match(q.Index("subscription_by_id"), subscriptionId))
          ),
          { data: subscriptionData }
        )
      );
    } catch (error) {}
  }
}
