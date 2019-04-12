import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../model/post.model';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable()
export class PostService {

  constructor() {
    this.getPosts();
  }

  post: Post[] = [];
  postSubject = new Subject<Post[]>();

  emitPosts() {
    this.postSubject.next(this.post);
  }

  savePosts() {
    firebase.database().ref('/posts').set(this.post);
  }

  getPosts() {
    firebase.database().ref('/posts')
      .on('value', (data: DataSnapshot) => {
          this.post = data.val() ? data.val() : [];
          this.emitPosts();
        }
      );
  }

  getSinglePost(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/posts/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewPost(newPost: Post) {
    this.post.push(newPost);
    this.savePosts();
    this.emitPosts();
  }

  removePost(post: Post) {
    const postIndexToRemove = this.post.findIndex(
      (postEl) => {
        if (postEl === post) {
          return true;
        }
      }
    );
    this.post.splice(postIndexToRemove, 1);
    this.savePosts();
    this.emitPosts();
  }

  incrLike(post: Post) {
    const postIndexToRemove = this.post.findIndex(
      (postEl) => {
        if (postEl === post) {
          return true;
        }
      }
    );
    const ref = firebase.database().ref('/posts/' + postIndexToRemove + '/like');
    ref.transaction(function(currentLikes) {
      // If node/clicks has never been set, currentRank will be `null`.
      return (currentLikes || 0) + 1;
    });
  }


  decrLike(post: Post) {
    const postIndexToRemove = this.post.findIndex(
      (postEl) => {
        if (postEl === post) {
          return true;
        }
      }
    );
    const ref = firebase.database().ref('/posts/' + postIndexToRemove + '/dislike');
    ref.transaction(function(currentdisLikes) {
      // If node/clicks has never been set, currentRank will be `null`.
      return (currentdisLikes || 0) + 1;
    });
  }
}

