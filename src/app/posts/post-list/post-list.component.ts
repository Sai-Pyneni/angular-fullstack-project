import { Component, OnInit, OnDestroy } from '@angular/core';
import {Post} from '../post.model';
import {PostsService} from '../posts.service';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

 /*  posts = [
    {title: 'First Post', content: 'this is a first post comment'},
    {title: 'Second Post', content: 'this is a second post comment'},
  ]; */
 posts: Post[]=[];
 isLoading = false;
private postsSub: Subscription;
  constructor(public postsService: PostsService) { 


  }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();

    this.postsSub= this.postsService.getPostsUpdatedListen().subscribe((posts: Post[])=> 
    {
      this.isLoading = false;
      this.posts = posts;
    }
    );
  }

  onDelete(postID: string){

    this.postsService.deletePost(postID);
    

  }
  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
  

}
