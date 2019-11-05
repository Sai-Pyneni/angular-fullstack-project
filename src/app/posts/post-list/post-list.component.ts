import { Component, OnInit, Input } from '@angular/core';
import {Post} from '../post.model';
import {PostsService} from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

 /*  posts = [
    {title: 'First Post', content: 'this is a first post comment'},
    {title: 'Second Post', content: 'this is a second post comment'},
  ]; */
 @Input() posts: Post[]=[];

  constructor(public postsService: PostsService) { 


  }

  ngOnInit() {
  }
  

}
