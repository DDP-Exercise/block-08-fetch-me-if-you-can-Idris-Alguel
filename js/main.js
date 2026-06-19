"use strict";

/*******************************************************
 *    Asynchronotrigger - 100p
 *
 *    This is your last assignment. Finish this to proof that
 *    you are a grown up now, who doesn't need to be held by
 *    the hand.
 *
 *    Create a users-class. Fetch the users, create Instances.
 *    - https://jsonplaceholder.typicode.com/users
 *
 *    Create a posts-class. Fetch the posts. create Instances.
 *    Assign them to the users (see userId in the posts).
 *    - https://jsonplaceholder.typicode.com/posts
 *
 *    Print the shit. Beautifully:
 *    List the 10 users. On click, expand them with their posts.
 *    Each Post should also have a Button to "load comments".
 *    Yes, you are correct. This is the perfect usecase for
 *    event-delegation! You can get the comments to a post from either
 *    - https://jsonplaceholder.typicode.com/posts/1/comments
 *    or
 *    - https://jsonplaceholder.typicode.com/comments?postId=1
 *    where "1" stands for the posts ID of course.
 *
 *    I believe in...
 *    Idris - 2026-06-09
 *  *******************************************************/
import User from "./class.user.js";
import Post from "./class.post.js";

let usersArray = [];

async function init() {

    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    let daten = await response.json();

    for (let i = 0; i < daten.length; i++) {
        let u = daten[i];
        let neuerUser = new User(u.id, u.name, u.username, u.email, u.website);
        usersArray.push(neuerUser);

    let postResponse = await fetch("https://jsonplaceholder.typicode.com/posts");
    let postDaten = await postResponse.json();

    for (let i = 0; i < postDaten.length; i++) {
        let p = postDaten[i];
        let neuerPost = new Post(p.id, p.title, p.body);

        for (let j = 0; j < usersArray.length; j++) {
            if (usersArray[j].id === p.userId) {
                usersArray[j].posts.push(neuerPost);
            }
        }
    }

    let htmlString = "";
    for (let i = 0; i < usersArray.length; i++) {
        htmlString += usersArray[i].renderHTML();
    }

    let container = document.createElement("div");
    container.innerHTML = htmlString;
    document.body.appendChild(container);

    document.body.style.backgroundColor = "#ffe2b9";
    document.body.style.fontFamily = "Arial";

    setupClicks();
}

function setupClicks() {
    document.body.addEventListener("click", async function(event) {

        if (event.target.className === "post-btn") {
            let id = event.target.dataset.userid;
            let div = document.getElementById("user-posts-" + id);

            if (div.style.display === "none") {
                div.style.display = "block";
            } else {
                div.style.display = "none";
            }
        }

        if (event.target.className === "comment-btn") {
            let id = event.target.dataset.postid;
            let div = document.getElementById("post-comments-" + id);

            if (div.innerHTML !== "") {
                div.innerHTML = "";
                return;
            }

            event.target.innerText = "Lade...";

            let link = "https://jsonplaceholder.typicode.com/posts/" + id + "/comments";
            let res = await fetch(link);
            let kommentare = await res.json();

            let html = "";
            for (let i = 0; i < kommentare.length; i++) {
                html += "<div style='background: white; margin-top: 5px; padding: 5px; border-bottom: 1px solid gray;'>";
                html += "<b>" + kommentare[i].email + " sagt:</b><br>";
                html += kommentare[i].body;
                html += "</div>";
            }

            div.innerHTML = html;
            event.target.innerText = "Load Comments";
        }
    });
}

init();