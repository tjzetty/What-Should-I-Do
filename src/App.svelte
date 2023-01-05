<script lang="ts">
  import { initializeApp } from "firebase/app";
  import { getAnalytics, logEvent } from "firebase/analytics";

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_firebaseApiKey,
    authDomain: import.meta.env.VITE_firebaseAuthDomain,
    projectId: import.meta.env.VITE_firebaseProjectId,
    storageBucket: import.meta.env.VITE_firebaseStorageBucket,
    messagingSenderId: import.meta.env.VITE_firebaseMessagingSenderId,
    appId: import.meta.env.VITE_firebaseAppId,
    measurementId: import.meta.env.VITE_firebaseMeasurementId,
  };

  const app = initializeApp(firebaseConfig);
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
