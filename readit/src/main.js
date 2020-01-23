import App from './App.svelte';
import './assets/style/components/reset.scss';
import './assets/style/components/header.scss';
import './assets/style/components/navigation.scss';
import './assets/style/components/Home.scss';
import './assets/style/components/detailPage.scss';
import './assets/style/components/responsive.scss';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;