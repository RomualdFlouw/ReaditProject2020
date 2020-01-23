<script>
export let url;
export let nsfw;
</script>

<div class="extra_image">
    {#if !nsfw}
        <img id="imageID" class="feed_extra__image js-image" src="{url}" alt="">
    {/if}
    {#if nsfw}
        <img id="imageID" class="feed_extra__image_nsfw js-image" src="{url}" alt="">
    {/if}
</div>
