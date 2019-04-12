import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from '../model/post.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[];
  postSubscription: Subscription;
  date = new Date();

  constructor(private postsService: PostService, private router: Router) { }

  ngOnInit() {
    this.postSubscription = this.postsService.postSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.postsService.emitPosts();
  }

  onNewPost() {
    this.router.navigate(['/posts', 'new']);
  }

  onDeletePost(post: Post) {
    this.postsService.removePost(post);
  }

  onLike(post: Post) {
    this.postsService.incrLike(post);
  }

  onDislike(post: Post) {
    this.postsService.decrLike(post);
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }
}
