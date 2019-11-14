const express = require('express');

const app = express();


app.use("/api/posts",(req, res, next) =>
{
    const posts = [
        {id: '12hfj',
        title: 'First Server-side post',
        content: 'this is 1st content of post'
        },
        {id: '12hfffj',
        title: 'First Server-side post',
        content: 'this is 2nd content of post'
        }

    ];
    res.status(200).json({
        message: 'posts successfully fetchesd',
        posts: posts
    });
});


module.exports = app;