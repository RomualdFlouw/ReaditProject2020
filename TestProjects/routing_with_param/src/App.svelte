<script>
  import page from 'page';
  import qs from 'query-string';
  import Page1 from './Page1.svelte';
  import Page2 from './Page2.svelte';

  let component; 

  let props = {}; 

  function parseQueryString(context, next) { 
  context.query = qs.parse(context.querystring);
  props = {}; 
  next(); 
  }


  page('*', parseQueryString); 

  page('/', context => { 
	  component = Page1;
  props = {p1: 'alpha', q1: 'beta'};
  });

  page('/one/:p1/:p2?', context => { 
  component = Page1;
  const {params, query} = context;
  props = {...params, ...query}; 
  });

  page('/two', () => component = Page2); 
  
  page.start();
</script>
<nav>
  <a
  class:active={component === Page1}
  href="/one/v1/v2?q1=v3&q2=v4" 
  >
  One
  </a>
  <a class:active={component === Page2} href="/two">Two</a>
</nav>
<main>
  <svelte:component this={component} {...props} /> 
</main>
<style>
  :global(body) {
  padding: 0;
  }
  :global(h1) {
  margin-top: 0;
  }
  a {
  --padding: 0.5rem;
  background-color: white;
  border: solid gray 1px;
  border-radius: var(--padding);
  display: inline-block;
  margin-right: 1rem;
  padding: var(--padding);
  text-decoration: none;
  }
  .active {
  background-color: yellow;
  }
  main {
  padding: 1rem;
  }
  nav {
  background-color: cornflowerblue;
  padding: 1rem;
  }
</style>
