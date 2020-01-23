<script>
  import page from 'page';
  import {cartStore} from './stores.js';
  
  import Cart from './Cart.svelte';
  import NotFound from './NotFound.svelte';
  import Ship from './Ship.svelte';
  import Shop from './Shop.svelte';
  let component; 
  page.redirect('/', '/shop');
  page('/cart', () => (component = Cart));
  page('/ship', () => (component = Ship));
  page('/shop', () => (component = Shop));
  page('*', () => (component = NotFound)); 
  page.start();
</script>
<nav>
  <a href="/shop" class:active={component === Shop}>Shop</a>
  <a class="icon" href="/cart" class:active={component === Cart}>&#x1F6D2;
{$cartStore.length}</a>
  <a href="/ship" class:active={component === Ship}>Ship</a>
</nav>
<main>
  <svelte:component this={component} /> 
</main>
<style>
  /* styles for this component are the same as before */
</style>