<script lang="ts">
  import { getAnalytics, logEvent } from "firebase/analytics";
  import { app } from "./lib/firebase";

  const analytics = getAnalytics(app);

  type Suggestion = {
    activity: String;
    accessibility: number;
    price: number;
    participants: number;
    type: String;
    link: String;
  };

  const endpoint: URL = new URL("https://www.boredapi.com/api/activity/");
  let suggestion: Suggestion = {} as Suggestion;

  async function getSuggestion() {
    const res = await fetch(endpoint);
    console.log;
    const jsonRes: Suggestion = await res.json();
    return jsonRes; // { activity, accessibility, type, participants, price }
  }

  async function onRedButton() {
    suggestion = await getSuggestion();
    logEvent(analytics, "ButtonClicked");
    console.log(suggestion.activity);
  }
</script>

<main>
  <h1>Bored? Click My Red Button 😊</h1>
  <button on:click={onRedButton} />
  {#if suggestion.activity}
    {#await suggestion}
      <p>...waiting</p>
    {:then suggestion}
      <p>{suggestion.activity}</p>
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}
  {/if}
</main>

<style>
  button {
    background: url("/RedButton.svg");
    background-size: cover;
    background-repeat: no-repeat;
    width: 150px;
    height: 150px;
  }
</style>
