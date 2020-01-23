<script>
  import page from "page";
  import { onMount } from "svelte";
  import Image from "./Image.svelte";
  import DetailPage from "./DetailPage.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let ListingTitle; // required:
  export let Listings;
  import { fade, fly } from "svelte/transition";

  let chosenListing;
  let ListingOn = false;
  onMount(async () => {});

  function ClickedPost(ListingItem) {
    chosenListing = ListingItem;
    ListingOn = !ListingOn;
    if (ListingOn == true) {
      window.scrollTo({
        top: 0,
        left: 0
      });
    } else {
      console.log("hij keert nu terug");
    }
  }
  function HandleSubClick(event) {
    dispatch("clickedSub", {
      text: event.detail.text
    });
  }
  function subtosubreddit() {
    dispatch("clickedfollow", {
      text: ListingTitle
    });
  }
</script>

{#if !ListingOn}
  <div class="postTitleBox">
    <h1 class="postsTitle">{ListingTitle}</h1>
    <svg
      on:click={subtosubreddit}
      class="postTitleBoxIcon"
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="27"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  </div>
  <div
    class="posts"
    in:fly={{ y: 200, duration: 200 }}
    out:fade={{ duration: 100 }}>
    {#each Listings as Listing}
      <div id={Listing.id} class="post" on:click={ClickedPost(Listing)}>
        <div class="post__score">
          <svg
            class="score_vote"
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="17"
            viewBox="0 0 19 17">
            <path
              id="Polygon_1"
              data-name="Polygon 1"
              d="M9.5,0,19,17H0Z"
              fill="#a9a9a9" />
          </svg>
          <h4 class="score_num">{Listing.score}</h4>
          <svg
            class="score_vote"
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="17"
            viewBox="0 0 19 17">
            <path
              id="Polygon_2"
              data-name="Polygon 2"
              d="M9.5,0,19,17H0Z"
              transform="translate(19 17) rotate(180)"
              fill="#a9a9a9" />
          </svg>
        </div>
        <div class="post_right">
          <div class="post_right__content">
            <div class="right_content__frame">
              <h4 class="content_text">{Listing.title}</h4>
              <div class="content_under">
                <h5 class="under_text" style="margin: 0% 1% 0% 0%">
                  r/{Listing.subreddit}
                </h5>
                <h6 class="under_text" style="margin: 0% 1% 0% 0%">
                  by {Listing.author}
                </h6>
                <!-- <h6 class="under_categoryItem">{Listing.link[Object.keys(Listing.link)[0]]}</h6> -->
                {#if Listing.over_18}
                  <div class="under_nsfwItem">
                    <h6 class="under_nsfwItem_text">nsfw</h6>
                  </div>
                {/if}
              </div>
            </div>
          </div>
          <div class="post_right_extra">
            <Image
              class="right_extra__image"
              url={Listing.url}
              nsfw={Listing.over_18} />
            <svg
              class="feed_extra__options"
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#545454"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round">
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </div>
        </div>
      </div>
    {/each}
  </div>
{/if}
{#if ListingOn}
  <div
    class="detail"
    in:fly={{ y: 200, duration: 200 }}
    out:fade={{ duration: 100 }}>
    <DetailPage
      on:back={ClickedPost}
      on:clickedSub={HandleSubClick}
      Listing={chosenListing} />
  </div>
{/if}
