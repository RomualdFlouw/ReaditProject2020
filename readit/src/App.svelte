<script>
  import { onMount, beforeUpdate, afterUpdate } from "svelte";
  import Home from "./routes/components/Home.svelte";
  import Navigation from "./routes/components/Navigation.svelte";
  import { fade, fly } from "svelte/transition";
  import login from "./scripts/login.js";
  import { APIService } from "./scripts/api.service.js";

  const api = new APIService();

  //alles dat nodig is voor het inloggen
  let LoginUrl =
    "https://www.reddit.com/api/v1/authorize?client_id=BniURRuNGAryzQ&response_type=code&state=test&redirect_uri=http://localhost:5000/&duration=permanent&scope=identity,edit,flair,history,modconfig,modflair,modlog,modposts,modwiki,mysubreddits,privatemessages,read,report,save,submit,subscribe,vote,wikiedit,wikiread";
  let publicurl;
  let code;
  let isLoggedIn = false;
  let clientID = "BniURRuNGAryzQ";
  let clientSecret = "67X-3QmjnzruZxjT2BEGGlB9SNY";
  let token = [];
  let access_token;
  let token_type;
  let userData;
  let userName;
  let navigationprops = ["hot", "top", "rising"];
  let navigationpropsUser = [];
  let ShowSideBar = true;

  //Gewone listing properties
  let retrievedPosts = [];
  let postsVisible = false;
  let retrievedPostsTitle;

  //Autocomplete properties
  let foundsubreddits = [];
  let isSearching = false;

  onMount(async () => {
    NavHandler();
    postsVisible = false;
    retrievedPosts = await api.getListings();
    retrievedPostsTitle = api.retrievedPostsTitle;
    postsVisible = true;
    document
      .getElementById("subredditInput")
      .addEventListener("input", async function() {
        foundsubreddits = [];
        isSearching = false;
        foundsubreddits = await api.GetSubredditAutocomplete(this.value);
        isSearching = true;
      });

    code = login.getQueryVariable("code");
    await login.getToken(code).then(data => {
      token = data;
    });
    token_type = window.localStorage.getItem("auth_type");
    access_token = window.localStorage.getItem("bearerToken");
    userData = await login.getUserData(token_type, access_token);
    userName = window.localStorage.getItem("username");

    checkBearerToken();
  });

  function NavHandler() {
    let sideBar = document.getElementById("sideBar");
    if (ShowSideBar == false) {
      ShowSideBar = true;
      sideBar.classList.add("widthStyle");
    } else {
      ShowSideBar = false;
      sideBar.classList.remove("widthStyle");
    }
  }
  async function handleGetListings(event) {
    console.log("geraakt er in");
    console.log(event);
    postsVisible = false;
    retrievedPosts = [];
    retrievedPosts = await api.getListings(event);
    retrievedPostsTitle = api.retrievedPostsTitle;
    postsVisible = true;
  }
  async function handleGetSubreddit(subreddit) {
    isSearching = false;
    postsVisible = false;
    retrievedPosts = [];
    retrievedPosts = await api.SearchspecificSubPosts(subreddit);
    retrievedPostsTitle = api.retrievedPostsTitle;
    postsVisible = true;
  }
  async function handleGetSubredditDispatch(subreddit) {
    console.log(subreddit.detail.text);
    isSearching = false;
    postsVisible = false;
    retrievedPosts = [];
    retrievedPosts = await api.SearchspecificSubPosts(subreddit.detail.text);
    retrievedPostsTitle = api.retrievedPostsTitle;
    postsVisible = true;
  }
  async function handlefollowclicked(subreddit) {
    let token = window.localStorage.getItem("bearerToken");
    let token_type = window.localStorage.getItem("auth_type");
    let body = {
      action: "sub",
      skip_initial_defaults: "true",
      sr_name: subreddit
    };
    let response = await api.SubToSubreddit(token_type, token, body);
  }
  function logOut() {
    isLoggedIn = false;
    console.log("geklikt");
    window.localStorage.clear();
  }
  async function checkBearerToken() {
    let token = window.localStorage.getItem("bearerToken");
    let token_type = window.localStorage.getItem("auth_type");
    if (token != "undefined") {
      token = token;
      isLoggedIn = true;
      navigationpropsUser = await api.SearchSubbedSubs(token_type, token);
    } else {
      console.log("token is leeg");
      isLoggedIn = false;
      return undefined;
    }
  }
</script>

<div id="sideBar" class="sideBar shadow">
  <div class="sideBar_Logo">
    <h1>Readit</h1>
    <svg
      class="closeBtn"
      on:click={NavHandler}
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  </div>
  <div class="sideBar_content__listings">
    <h3 class="sideBar_Title">REDDIT FEEDS</h3>
    <div class="sideBar_Title__Underline" />
    {#each navigationprops as navigationprop}
      <Navigation on:refresh={handleGetListings} {navigationprop} />
    {/each}
  </div>
  {#if isLoggedIn}
    <div class="sideBar_content__listings">
      <h3 class="sideBar_Title">YOUR FEEDS</h3>
      <div class="sideBar_Title__Underline" />
      {#each navigationpropsUser as navigationpropUser}
        <Navigation
          on:refresh={handleGetListings}
          navigationprop={navigationpropUser.subredditName} />
      {/each}
    </div>
  {/if}
</div>

<main id="main">
  <div class="header">
    <div class="header_container">
      {#if ShowSideBar}
        <svg
          class="header_menu__icon"
          on:click={NavHandler}
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#A9A9A9"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      {/if}
      {#if !ShowSideBar}
        <svg
          class="header_menu__icon"
          on:click={NavHandler}
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      {/if}
      <div class="header_menu_searchbar">
        <input
          type="text"
          class="box_searchBar"
          placeholder="Search"
          id="subredditInput" />
        {#if isSearching}
          <div class="dropdown">
            {#each foundsubreddits as foundsub}
              <p
                class="dropdown_item"
                on:hover={foundsub.name}
                on:click={handleGetSubreddit(foundsub.name)}>
                {foundsub.name}
              </p>
            {/each}
          </div>
        {/if}
      </div>
      <div class="header_login">
        {#if !isLoggedIn}
          <a href={LoginUrl}>
            <h2 class="login_button">sign in</h2>
          </a>
        {/if}
        {#if isLoggedIn}
          <h2 class="login_userName">{userName}</h2>
          <svg
            on:click={logOut}
            class="login_logout_button"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#A9A9A9"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M16 17l5-5-5-5M19.8 12H9M10 3H4v18h6" />
          </svg>
        {/if}
      </div>
    </div>
  </div>
  {#if postsVisible}
    <div
      class="content"
      in:fly={{ y: 200, duration: 200 }}
      out:fade={{ duration: 100 }}>
      <Home
        on:clickedSub={handleGetSubredditDispatch}
        on:clickedfollow={handlefollowclicked}
        ListingTitle={retrievedPostsTitle}
        Listings={retrievedPosts} />
    </div>
  {/if}
</main>
