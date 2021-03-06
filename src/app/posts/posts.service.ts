import {Post} from './post.model';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';

import {map} from 'rxjs/operators';
import { post } from 'selenium-webdriver/http';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})

export class PostsService{
    private posts: Post[] = [];
    private postsUpdated= new Subject<Post[]>();

constructor(private http: HttpClient, private router: Router){}



    getPosts(){
        
       this.http.
       get<{message: string, posts: any} >
       ('http://localhost:3000/api/posts')
       .pipe(map((postData) => {
        return postData.posts.map(post =>{
            return{
                title: post.title,
                content: post.content,
                id: post._id
            }

        });
       }))
       .subscribe((transformedPosts) =>{
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
       });
    }

    getPostsUpdatedListen(){
        return this.postsUpdated.asObservable();
    }


    getPost(id: string){
        return this.http.get<{_id: string, title: string, content: string} >("http://localhost:3000/api/posts/" + id);
    }

    addPosts(title: string, content: string, image: File){
        
       const postData = new FormData();
       postData.append("title", title);
       postData.append("content", content);
        postData.append("image", image, title);
        this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', postData).
        subscribe((response)=>{
            const post: Post = {id: response.postId, title: title, content: content};
            
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
            this.router.navigate(["/"]);
           
        });
        
    }

    deletePost(postID: string){
        this.http.delete("http://localhost:3000/api/posts/" + postID).subscribe(()=>
        {
            const updatedPosts = this.posts.filter(post => post.id !== postID);
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts]);
            alert("Deleted Post Successfully!")
        });
        
    }

    updatePost(id: string, title: string, content: string){
        const post: Post = {id:id, title: title, content: content};
        this.http
        .put("http://localhost:3000/api/posts/" + id, post)
        .subscribe(response =>
            {
                const updatedPosts = [...this.posts];
                const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
                updatedPosts[oldPostIndex] = post;
                this.posts = updatedPosts;
                this.postsUpdated.next([...this.posts]);
                this.router.navigate(["/"]);
            });
    
    }

}