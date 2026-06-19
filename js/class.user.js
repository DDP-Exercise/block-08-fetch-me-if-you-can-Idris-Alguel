"use strict";

/*******************************************************
 *  Users
 *
 *  See: https://jsonplaceholder.typicode.com/users
 *
 *  Your users should have:
 *      -id
 *      -name
 *      -username
 *      -email
 *      -website
 *
 *  You can skip address, phone and company.
 *
 *  users should also have posts[] (see main.js).
 *
 *  When printing a user, don't forget to make
 *      - href="mailto:.." for the email and
 *      - href=".." target="_blank" for the website.
 *  *******************************************************/

export default class User {
    constructor(id, name, username, email, website) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.website = website;
        this.posts = [];
    }

    renderHTML() {
        let html = "<div style='background-color: white; border: 2px solid orange; margin: 15px; padding: 15px; border-radius: 5px;'>";
        html += "<h2>" + this.name + " (@" + this.username + ")</h2>";
        html += "<p>Email: <a href='mailto:" + this.email + "'>" + this.email + "</a></p>";
        html += "<p>Website: <a href='http://" + this.website + "' target='_blank'>" + this.website + "</a></p>";

        html += "<button class='post-btn' data-userid='" + this.id + "'>Show / Hide Posts</button>";

        html += "<div id='user-posts-" + this.id + "' style='display: none; margin-top: 10px;'>";
        for (let i = 0; i < this.posts.length; i++) {
            html += this.posts[i].renderHTML();
        }
        html += "</div>";

        html += "</div>";
        return html;
    }
}