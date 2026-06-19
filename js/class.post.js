"use strict";

/*******************************************************
 *  Posts
 *
 *  See: https://jsonplaceholder.typicode.com/posts
 *
 *  Your posts should have:
 *      -id
 *      -title
 *      -body
 *
 *  You can skip the userId, your users know their posts (see class.user.js)
 *
 *  posts should also have comments[] (see main.js).
 *
 *  When printing a post, don't forget to make a button that
 *  loads the comments for the post. Once they are loaded, print them.
 *  *******************************************************/
export default class Post {
    constructor(id, title, body) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.comments = [];
    }

    renderHTML() {
        let html = "<div style='background-color: #ffeed3; border-left: 5px solid orange; margin: 10px; padding: 10px;'>";
        html += "<h3>" + this.title + "</h3>";
        html += "<p>" + this.body + "</p>";

        html += "<button class='comment-btn' data-postid='" + this.id + "'>Load Comments</button>";

        html += "<div id='post-comments-" + this.id + "' style='margin-top: 10px;'></div>";

        html += "</div>";
        return html;
    }
}