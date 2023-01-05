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

  let chipSelect = { zero: false, one: false, two: false };

  const apiURL = "https://www.boredapi.com/api/activity/";
  let apiWithConstraints = apiURL;
  let suggestion: Suggestion = {} as Suggestion;

  function constructURL(url: string) {
    let constraints: String = "";
    let firstParam = true;
    if (chipSelect["zero"] || chipSelect["one"] || chipSelect["two"]) {
      constraints += "?";
    }
    if (chipSelect["zero"]) {
      firstParam = false;
      constraints += "price=0";
    }
    if (chipSelect["one"]) {
      if (!firstParam) {
        constraints += "&";
      } else firstParam = false;
      constraints += "minaccessibility=0&maxaccessibility=0.3";
    }
    if (chipSelect["two"]) {
      if (!firstParam) {
        constraints += "&";
      } else firstParam = false;
      constraints += "participants=1";
    }
    return url + constraints;
  }

  async function getSuggestion() {
    const endpoint: URL = new URL(apiWithConstraints);
    const res = await fetch(endpoint);
    console.log;
    const jsonRes: Suggestion = await res.json();
    return jsonRes; // { activity, accessibility, type, participants, price }
  }

  function handleChipClick(id: string) {
    chipSelect[id] = !chipSelect[id];
    apiWithConstraints = constructURL(apiURL);
  }

  async function onRedButton() {
    suggestion = await getSuggestion();
    logEvent(analytics, "ButtonClicked");
  }
</script>

<main>
  <h1>Bored? Click My Red Button 😊</h1>
  <div class="selector">
    <button
      id="zero"
      class="rorange chip"
      on:click={() => handleChipClick("zero")}
    >
      Free
    </button>
    <button id="one" class="blue chip" on:click={() => handleChipClick("one")}>
      Accessible
    </button>
    <button
      id="two"
      class="dark-blue chip"
      on:click={() => handleChipClick("two")}
    >
      Solo
    </button>
  </div>
  <button id="suggestion" on:click={onRedButton} />
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

{#if !chipSelect["zero"]}
  <style>
    #zero,
    .chip {
      background-color: #e0e0e0 !important;
      color: #222222 !important;
    }
  </style>
{/if}
{#if !chipSelect["one"]}
  <style>
    #one,
    .chip {
      background-color: #e0e0e0 !important;
      color: #222222 !important;
    }
  </style>
{/if}
{#if !chipSelect["two"]}
  <style>
    #two,
    .chip {
      background-color: #e0e0e0 !important;
      color: #222222 !important;
    }
  </style>
{/if}

<style>
  .chip {
    border-radius: 50px;
    width: auto;
    height: 50px;
    text-align: center;
    color: #ffffff !important;
    margin-left: 10px;
    margin-right: 10px;
  }
  .blue {
    background-color: #1d8698 !important;
  }
  .dark-blue {
    background-color: #042054 !important;
  }
  .rorange {
    background-color: #fb3617 !important;
  }
  #suggestion {
    background: url("/RedButton.svg");
    background-size: cover;
    background-repeat: no-repeat;
    width: 150px;
    height: 150px;
  }
  .selector {
    margin: 25px 0 25px 0;
  }
</style>
