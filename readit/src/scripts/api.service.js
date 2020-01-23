export class APIService {
    constructor() {
        this.retrievedPostsTitle;
    }
    kFormatter(num) {
        return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
    };
    async getListings(event) {
        let publicurl;
        if (event == null) {
            this.retrievedPostsTitle = "hot";
            publicurl = "https://www.reddit.com/" + "hot.json";
        } else {
            this.retrievedPostsTitle = event.detail.text;
            publicurl = "https://www.reddit.com/" + event.detail.text + ".json";
        }
        return await fetch(publicurl)
            .then(response => response.json())
            .then(myJson => {
                return myJson.data.children.map(element => {
                    return {
                        id: element.data.id,
                        subreddit: element.data.subreddit,
                        author: element.data.author,
                        title: element.data.title,
                        url: element.data.url,
                        num_comments: element.data.num_comments,
                        score: this.kFormatter(element.data.score),
                        thumbnail: element.data.thumbnail,
                        preview: element.data.preview,
                        category: element.data.category,
                        over_18: element.data.over_18,
                        spoiler: element.data.spoiler,
                        locked: element.data.locked,
                        content_categories: element.data.content_categories,
                        link: element.data.link_flair_richtext,
                        num_comments: element.data.num_comments
                    }
                })
            })
            .catch(console.error);
    }

    async GetSubredditAutocomplete(subredditName) {
        let url = "https://www.reddit.com/api/subreddit_autocomplete.json?query=" + subredditName;
        return await fetch(url)
            .then(response => response.json())
            .then(myJson => {
                return myJson.subreddits.map(element => {
                    return {
                        numSubscribers: element.numSubscribers,
                        name: element.name,
                        id: element.id
                    }
                })
            })
            .catch(console.error);
    }

    async SearchspecificSubPosts(subreddit) {
        let url = "https://www.reddit.com/r/" + subreddit + ".json";
        this.retrievedPostsTitle = subreddit;
        return await fetch(url)
            .then(response => response.json())
            .then(myJson => {
                return myJson.data.children.map(element => {
                    return {
                        id: element.data.id,
                        subreddit: element.data.subreddit,
                        author: element.data.author,
                        title: element.data.title,
                        url: element.data.url,
                        num_comments: element.data.num_comments,
                        score: this.kFormatter(element.data.score),
                        thumbnail: element.data.thumbnail,
                        preview: element.data.preview,
                        category: element.data.category,
                        over_18: element.data.over_18,
                        spoiler: element.data.spoiler,
                        locked: element.data.locked,
                        content_categories: element.data.content_categories,
                        link: element.data.link_flair_richtext,
                        num_comments: element.data.num_comments
                    }
                })
            })
            .catch(console.error);
    }
    async SearchSubbedSubs(tokenType, token) {
        let url = "https://oauth.reddit.com/subreddits/mine/subscriber";
        return await fetch(url, {
                headers: {
                    'Authorization': tokenType + ' ' + token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(response => response.json())
            .then(myJson => {
                return myJson.data.children.map(element => {
                    return {
                        subredditName: element.data.display_name_prefixed,
                    }
                })
            })
            .catch(console.error);
    }
    async SubToSubreddit(tokenType, token, body) {
        fetch('https://oauth.reddit.com/subscribe', {
            method: 'post',
            headers: {
                'Authorization': tokenType + ' ' + token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(body)
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            ChromeSamples.log(data);
        });
    }
}