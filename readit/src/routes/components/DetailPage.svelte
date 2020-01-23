<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let Listing;

  function NavigateBack() {
    dispatch("back", {});
  }
  function HandleSubClick() {
    dispatch("clickedSub", {
      text: Listing.subreddit
    });
  }
</script>

<div class="detail_header">
  <svg
    class="header_backButton"
    on:click={NavigateBack}
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#767676"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round">
    <path d="M19 12H6M12 5l-7 7 7 7" />
  </svg>
</div>
<div class="detail_content">
  <div class="content_info">
    <div class="info_upvotes">
      <svg
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
      <h4 class="info_upvotes__num">{Listing.score}</h4>
      <svg
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
    <div class="info_text">
      <div class="info_text__userinfo">
        <img src="" alt="" />
        <h5 class="userinfo_text">{Listing.author}</h5>
        <h6 on:click={HandleSubClick}>posted this on r/{Listing.subreddit}</h6>
      </div>
      <div class="info_text_detailTitle">
        <h1 class="info_text_detailTitleText">{Listing.title}</h1>
      </div>
    </div>
  </div>
  <img class="content_image__style" src={Listing.url} alt={Listing.url} />
  <div class="content_comments">
    <div class="comments_header">
      <h2 class="comments_header__text">comments ({Listing.num_comments})</h2>
      <button class="comments_header__button">leave a comment</button>
    </div>
    <div class="comments_comment" />
  </div>
</div>
